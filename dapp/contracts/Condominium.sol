// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { CondominiumLib as Lib } from './CondominiumLib.sol';
import './ICondominium.sol';

contract Condominium is ICondominium {

  address public manager;
  uint public monthlyQuota = 0.01 ether;

  mapping (uint16 => bool) public residences; // unity => true
  address[] public counselors; // array wallets

  Lib.Resident[] public residents;
  mapping (address => uint) private _residentIndex; // array index

  Lib.Topic[] public topics;
  mapping (bytes32 => uint) private _topicIndex; // array index

  mapping (uint16 => uint) private _nextPayments; // next payment date
  mapping (bytes32 => Lib.Vote[]) private _votings;

  uint private constant _thirtyDays = 30 * 24 * 60 * 60;

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
    require(tx.origin == manager || _isCounselor(tx.origin), "Only the counselors or manager have access to this functionality");
    _;
  }

  modifier onlyResidents () { 
    if (tx.origin != manager) {
    require(isResident(tx.origin), "Only the residents or manager have access to this functionality");
    Lib.Resident memory resident = _getResident(tx.origin);
    require(block.timestamp <= resident.nextPayment, "The resident must be defaulter");
    }
    _;
  }

  modifier validAddress (address addr) { 
    require(addr != address(0), "Invalid address");
    _;
  }

  function _isCounselor(address resident) private view returns (bool) {
    for (uint i = 0; i < counselors.length; i++) {
      if (counselors[i] == resident) return true;
    }
    return false;
  }

  function _getResident(address resident) private view returns (Lib.Resident memory) {
    uint index = _residentIndex[resident];
    if (index < residents.length) {
      Lib.Resident memory result = residents[index];
      if (result.wallet == resident) {
        result.nextPayment = _nextPayments[result.residence];
        return result;
      }
    }

    return Lib.Resident({
      wallet: address(0),
      residence: 0,
      isCounselor: false,
      isManager: false,
      nextPayment: 0
    });
  }

  function getResident(address resident) external view returns (Lib.Resident memory) {
    return _getResident(resident);
  }

  function isResident(address resident) public view returns (bool) {
    return _getResident(resident).residence > 0;  
  }

  function residenceExists(uint16 residence) public view returns (bool) {
    return residences[residence];
  }

  function addResident(address resident, uint16 residenceNumber) external onlyCouncil validAddress(resident) {
    require(residenceExists(residenceNumber), "This residence does not exists");
    require(!isResident(resident), "This resident already exists");

    residents.push(Lib.Resident({
      wallet: resident,
      residence: residenceNumber,
      isCounselor: false,
      isManager: resident == manager,
      nextPayment: 0
    }));

    _residentIndex[resident] = residents.length - 1;
  }

  function removeResident(address resident) external onlyManager {
    require(!_isCounselor(resident), "A counselor cannot be removed");
    uint index = _residentIndex[resident];

    if (index == 0) {
      require(residents[index].wallet == resident, "The resident does not exists");
    }

    if (index != residents.length - 1) {
      Lib.Resident memory latest = residents[residents.length - 1];
      residents[index] = latest;
      _residentIndex[latest.wallet] = index;
    }

    residents.pop();
    delete _residentIndex[resident];
  }

  function _addCounselor(address counselor) private onlyManager validAddress(counselor) {
    require(isResident(counselor), "The counselor must be a resident");
    counselors.push(counselor);
    residents[_residentIndex[counselor]].isCounselor = true;
  }

  function _removeCounselor(address counselor) private onlyManager validAddress(counselor) {
    uint index = 1000000;
    for (uint i = 0; i < counselors.length; i++) {
      if (counselors[i] == counselor) {
        index = i;
        break;
      }
    }
    require(index != 1000000, "Counselor not found");

    if (index != counselors.length - 1) {
      address latest = counselors[counselors.length -1 ];
      counselors[index] = latest;
    }
    counselors.pop();
    residents[_residentIndex[counselor]].isCounselor = false;
  }

  function setCounselor(address resident, bool isEntering) external onlyManager validAddress(resident) {
    isEntering ? _addCounselor(resident) : _removeCounselor(resident);
  }

  function getTopic(string memory title) external view returns (Lib.Topic memory) {
    return _getTopic(title);
  }

  function _getTopic(string memory title) private view returns (Lib.Topic memory) {
    bytes32 topicId = keccak256(bytes(title));
    uint index = _topicIndex[topicId];
    if (index < topics.length) {
      Lib.Topic memory result = topics[index];
      if (index > 0 || keccak256(bytes(result.title)) == topicId) {
        return result;
      }
    }

    return Lib.Topic({
      title: "",
      description: "",
      status: Lib.Status.DELETED,
      createdDate: 0,
      startDate: 0,
      endDate: 0,
      responsible: address(0),
      amount: 0,
      category: Lib.Category.DECISION
    });
  }

  function topicExists(string memory title) public view returns (bool) {
    return _getTopic(title).createdDate > 0;
  }

  function addTopic(string memory title,
    string memory description,
    Lib.Category category,
    uint amount,
    address responsible
  ) external onlyResidents {
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

    _topicIndex[keccak256(bytes(title))] = topics.length;
    topics.push(newTopic);
  }

  function removeTopic(string memory title) external onlyManager returns (Lib.TopicUpdate memory) {
    Lib.Topic memory topic = _getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be removed");
    
    bytes32 topicId = keccak256(bytes(title));
    uint index = _topicIndex[topicId];

    if (index != topics.length - 1) {
      Lib.Topic memory latest = topics[topics.length - 1];
      topics[index] = latest;
      _topicIndex[keccak256(bytes(latest.title))] = index;
    }

    topics.pop();
    delete _topicIndex[topicId];

    return Lib.TopicUpdate({
      topicId: topicId,
      title: topic.title,
      status: Lib.Status.DELETED,
      category: topic.category
    });
  }

  function openVoting(string memory title) external onlyManager returns (Lib.TopicUpdate memory) {
    Lib.Topic memory topic = _getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be open for voting");

    bytes32 topicId = keccak256(bytes(title));
    uint index = _topicIndex[topicId];
    topics[index].status = Lib.Status.VOTING;
    topics[index].startDate = block.timestamp;

    return Lib.TopicUpdate({
      topicId: topicId,
      title: topic.title,
      status: Lib.Status.VOTING,
      category: topic.category
    });
  }

  function closeVoting(string memory title) external onlyManager returns (Lib.TopicUpdate memory) {
    Lib.Topic memory topic = _getTopic(title);
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
    Lib.Vote[] memory votes = _votings[topicId];

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
    uint index = _topicIndex[topicId];
    topics[index].status = newStatus;
    topics[index].endDate = block.timestamp;

    if (newStatus == Lib.Status.APPROVED) {
      if (topic.category == Lib.Category.CHANGE_QUOTA) {
        monthlyQuota = topic.amount;
      } else if (topic.category == Lib.Category.CHANGE_MANAGER) {
        if (isResident(manager)) {
          residents[_residentIndex[manager]].isManager = false;
        }
        if (isResident(topic.responsible)) {
          residents[_residentIndex[topic.responsible]].isManager = true;
        }
        manager = topic.responsible;
      }
    }

    return Lib.TopicUpdate({
      topicId: topicId,
      title: topic.title,
      status: newStatus,
      category: topic.category
    });
  }

  function vote(string memory title, Lib.VoteOptions option) external onlyResidents {
    require(option != Lib.VoteOptions.EMPTY, "The option cannot be EMPTY");
    Lib.Topic memory topic = _getTopic(title);

    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.VOTING, "Only VOTING topics can be voted");

    uint index = _residentIndex[tx.origin];
    require(index > 0 || residents[0].wallet == tx.origin, "Resident not found");

    uint16 residence = residents[index].residence;
    bytes32 topicId = keccak256(bytes(title));

    Lib.Vote[] memory votes = _votings[topicId];

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

    _votings[topicId].push(newVote);
  }

  function getVotes(string memory topicTitle) external view returns (Lib.Vote[] memory) {
    return _votings[keccak256(bytes(topicTitle))];
  }

  function numberOfVotes(string memory title) public view returns (uint256) {
    bytes32 topicId = keccak256(bytes(title));
    return _votings[topicId].length;
  }

  function editTopic(
    string memory topicToEdit,
    string memory description, 
    uint amount, 
    address responsible
  ) external onlyManager returns (Lib.TopicUpdate memory) {
    Lib.Topic memory topic = _getTopic(topicToEdit);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Lib.Status.IDLE, "Only IDLE topics can be edited");

    bytes32 topicId = keccak256(bytes(topicToEdit));
    uint index = _topicIndex[topicId];

    if (bytes(description).length > 0) {
      topics[index].description = description;
    }
    if (amount >= 0) {
      topics[index].amount = amount;
    }
    if (responsible != address(0)) {
      topics[index].responsible = responsible;
    }
    
    return Lib.TopicUpdate({
      topicId: topicId,
      title: topic.title,
      status: topic.status,
      category: topic.category
    });
  }

  function payQuota(uint16 residence) external payable {
    require(residenceExists(residence), "The residence does not exists");
    require(msg.value >= monthlyQuota, "Wrong value");
    require(block.timestamp > _nextPayments[residence], "You can not pay twice a month");
    
    if (_nextPayments[residence] == 0) {
      _nextPayments[residence] = block.timestamp + _thirtyDays;
    } else {
      _nextPayments[residence] += _thirtyDays;
    }
  }

  function transfer(string memory title, uint amount) external onlyManager returns (Lib.TransferReceipt memory) {
    require(address(this).balance >= amount, "Insufficient funds");
    Lib.Topic memory topic = _getTopic(title);

    require(topic.status == Lib.Status.APPROVED && topic.category == Lib.Category.SPENT, "Only APPROVED SPENT topics can be used for transfers");
    require(topic.amount>= amount, "The amount must be less or equal the APPROVED topic");

    payable(topic.responsible).transfer(amount);

    bytes32 topicId = keccak256(bytes(title));
    uint index = _topicIndex[topicId];
    topics[index].status = Lib.Status.SPENT;

    return Lib.TransferReceipt({
      to: topic.responsible,
      amount: amount,
      topic: title
    });
  }

  function getManager() external view returns (address) {
    return manager;
  }

  function getQuota() external view returns (uint) {
    return monthlyQuota;
  }

  function getResidents(uint page, uint pageSize) external view returns (Lib.ResidentPage memory) {
    Lib.Resident[] memory result = new Lib.Resident[](pageSize);
    uint skip = ((page -1) * pageSize);
    uint index = 0;

    for (uint i = skip; i < (skip + pageSize) && i < residents.length; i++) {
      result[index++] = _getResident(residents[i].wallet);
    }

    return Lib.ResidentPage({
      residents: result,
      total: residents.length
    });
  }

  function getTopics(uint page, uint pageSize) external view returns (Lib.TopicPage memory) {
    Lib.Topic[] memory result = new Lib.Topic[](pageSize);
    uint skip = ((page -1) * pageSize);
    uint index = 0;

    for (uint i = skip; i < (skip + pageSize) && i < topics.length; i++) {
      result[index++] = topics[i];
    }

    return Lib.TopicPage({
      topics: result,
      total: topics.length
    });
  }
}
