// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { CondominiumLib as Lib } from './CondominiumLib.sol';
import './ICondominium.sol';

contract Condominium is ICondominium {

  address public manager;
  uint public monthlyQuota = 0.01 ether;
  mapping (uint16 => bool) public residences;
  mapping (address => bool) public counselors;
  mapping (address => uint16) public residents;

  mapping (bytes32 => Lib.Topic) public topics;
  mapping (bytes32 => Lib.Vote[]) public votings;

  constructor() {
    manager = msg.sender;
    for(uint16 i = 1; i<= 2; i++) { // blocks
      for(uint16 j = 1; j <= 5; j++) { // floors
        for(uint16 k = 1; k <= 5; k++) { // units
          residences[(i * 1000) + (j * 100) + k] = true; // (1101) -> (2505)
        }
      }
    }
  }

  modifier onlyManager () {
    require(tx.origin == manager, "Only the manager has access to this functionality");
    _;
  }

  modifier onlyCouncil () {
    require(tx.origin == manager || counselors[tx.origin], "Only the counselors or manager have access to this functionality");
    _;
  }

  modifier onlyResidents () { 
    require(tx.origin == manager || isResident(tx.origin), "Only the residents or manager have access to this functionality");
    _;
  }

  modifier validAddress (address addr) { 
    require(addr != address(0), "Invalid address");
    _;
  }

  function isResident(address resident) public view returns (bool) {
    return residents[resident] > 0;  
  }

  function residenceExists(uint16 residence) public view returns (bool) {
    return residences[residence];
  }

  function addResident(address resident, uint16 residenceNumber) external onlyCouncil validAddress(resident) {
    require(residenceExists(residenceNumber), "This residence does not exists");
    residents[resident] = residenceNumber;
  }

  function removeResident(address resident) external onlyManager {
    require(!counselors[resident], "A counselor cannot be removed");
    delete residents[resident];
  }

  function setCounselor(address resident, bool isEntering) external onlyManager validAddress(resident) {
    if (isEntering) {
      require(isResident(resident), "The counselor must be a resident");
      counselors[resident] = true;
    } else {
      delete counselors[resident];
    }
  }

  function getTopic(string memory title) public view returns (Lib.Topic memory) {
    bytes32 topicId = keccak256(bytes(title));
    return topics[topicId];
  }

  function topicExists(string memory title) public view returns (bool) {
    return getTopic(title).createdDate > 0;
  }

  function addTopic(string memory title, string memory description, Lib.Category category, uint amount, address responsible) external onlyResidents {
    require(!topicExists(title), "This topic already exists");
    if (amount > 0) {
      require(category == Lib.Category.CHANGE_QUOTA || category == Lib.Category.SPENT, "Wrong category");
    }

    Lib.Topic memory newTopic = Lib.Topic({
      title: title,
      description: description,
      createdDate: block.timestamp,
      startDate: 0,
      endDate: 0,
      status: Lib.Status.IDLE,
      category: category,
      amount: amount,
      responsible: responsible != address(0) ? responsible : tx.origin
    });

    topics[keccak256(bytes(title))] = newTopic;
  }

  function removeTopic(string memory title) external onlyManager {
    Lib.Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be removed");
    
    delete topics[keccak256(bytes(title))];
  }

  function openVoting(string memory title) external onlyManager {
    Lib.Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be open for voting");

    bytes32 topicId = keccak256(bytes(title));
    topics[topicId].status = Lib.Status.VOTING;
    topics[topicId].startDate = block.timestamp;
  }

  function closeVoting(string memory title) external onlyManager {
    Lib.Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.VOTING, "Only VOTING topics can be closed");

    uint8 minimumVotes = 5;
    if (topic.category == Lib.Category.SPENT) {
      minimumVotes = 10;
    } else if (topic.category == Lib.Category.CHANGE_MANAGER) {
      minimumVotes = 15;
    } else if (topic.category == Lib.Category.CHANGE_QUOTA) {
      minimumVotes = 20;
    }

    require(numberOfVotes(title) >= minimumVotes, "You can not finish a voting without reach the minimum votes necessary");

    bytes32 topicId = keccak256(bytes(title));
    uint8 approved = 0;
    uint8 denied = 0;
    uint8 abstentions = 0;
    Lib.Vote[] memory votes = votings[topicId];

    for(uint8 i = 0; i < votes.length; i++) {
      if (votes[i].option == Lib.VoteOptions.YES) {
        approved++;
      } else if (votes[i].option == Lib.VoteOptions.NO) {
        denied++;
      } else {
        abstentions++;
      }
    }

    Lib.Status newStatus = approved > denied ? Lib.Status.APPROVED : Lib.Status.DENIED; 

    topics[topicId].status = newStatus;
    topics[topicId].endDate = block.timestamp;

    if (newStatus == Lib.Status.APPROVED) {
      if (topic.category == Lib.Category.CHANGE_QUOTA) {
        monthlyQuota = topic.amount;
      } else if (topic.category == Lib.Category.CHANGE_MANAGER) {
        manager = topic.responsible;
      }
    }
  }

  function vote(string memory title, Lib.VoteOptions option) external onlyResidents {
    require(option != Lib.VoteOptions.EMPTY, "The option cannot be EMPTY");
    Lib.Topic memory topic = getTopic(title);

    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.VOTING, "Only VOTING topics can be voted");

    uint16 residence = residents[tx.origin];
    bytes32 topicId = keccak256(bytes(title));

    Lib.Vote[] memory votes = votings[topicId];

    for(uint8 i = 0; i < votes.length; i++) {
      if (votes[i].residence == residence) {
        require(false, "A residence should vote only once");
      }
    }

    Lib.Vote memory newVote = Lib.Vote({
      resident: tx.origin,
      residence: residence,
      option: option,
      timestamp: block.timestamp
    });

    votings[topicId].push(newVote);
  }

  function numberOfVotes(string memory title) public view returns (uint256) {
    bytes32 topicId = keccak256(bytes(title));
    return votings[topicId].length;
  }

  function editTopic(string memory topicToEdit, string memory description, uint amount, address responsible) external onlyManager {
    Lib.Topic memory topic = getTopic(topicToEdit);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be edited");

    bytes32 topicId = keccak256(bytes(topicToEdit));

    if (bytes(description).length > 0) {
      topics[topicId].description = description;
    }
    if (amount >= 0) {
      topics[topicId].amount = amount;
    }
    if (responsible != address(0)) {
      topics[topicId].responsible = responsible;
    }
  }
}
