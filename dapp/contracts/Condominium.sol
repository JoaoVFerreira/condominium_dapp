// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Condominium {

  enum Status {
    IDLE,
    VOTING,
    APPROVED,
    DENIED
  }

  enum VoteOptions {
    EMPTY,
    YES,
    NO,
    ABSTENTION
  }

  struct Topic {
    string title;
    string description;
    Status status;
    uint256 createdDate;
    uint256 startDate;
    uint256 endDate;
  }

  struct Vote {
    address resident;
    uint16 residence;
    VoteOptions option;
    uint256 timestamp;
  }

  address public manager;
  mapping (uint16 => bool) public residences;
  mapping (address => bool) public counselors;
  mapping (address => uint16) public residents;

  mapping (bytes32 => Topic) public topics;
  mapping (bytes32 => Vote[]) public votings;

  constructor() {
    manager = msg.sender;
    for(uint8 i = 1; i<= 2; i++) { // blocks
      for(uint16 j = 1; j <= 5; j++) { // floors
        for(uint8 k = 1; k <= 5; k++) { // units
          unchecked {
            residences[(i * 1000) + (j * 100) + k] = true; // (1101) -> (2505)
          }
        }
      }
    }
  }

  modifier onlyManager () {
    require(msg.sender == manager, "Only the manager has access to this functionality");
    _;
  }

  modifier onlyCouncil () {
    require(msg.sender == manager || counselors[msg.sender], "Only the counselors or manager have access to this functionality");
    _;
  }

  modifier onlyResidents () { 
    require(msg.sender == manager || isResident(msg.sender), "Only the residents or manager have access to this functionality");
    _;
  }

  function isResident(address resident) public view returns (bool) {
    return residents[resident] > 0;  
  }

  function residenceExists(uint16 residence) public view returns (bool) {
    return residences[residence];
  }

  function addResident(address resident, uint16 residenceNumber) external onlyCouncil {
    require(residenceExists(residenceNumber), "This residence does not exists");
    residents[resident] = residenceNumber;
  }

  function removeResident(address resident) external onlyManager {
    require(!counselors[resident], "A counselor cannot be removed");
    delete residents[resident];
    if (counselors[resident]) delete counselors[resident];
  }

  function setCounselor(address resident, bool isEntering) external onlyManager {
    if (isEntering) {
      require(isResident(resident), "The counselor must be a resident");
      counselors[resident] = true;
    } else {
      delete counselors[resident];
    }
  }

  function setManager(address newManager) external onlyManager {
    require(newManager != address(0), "The address must be valid");
    manager = newManager;
  }

  function getTopic(string memory title) public view returns (Topic memory) {
    bytes32 topicId = keccak256(bytes(title));
    return topics[topicId];
  }

  function topicExists(string memory title) public view returns (bool) {
    return getTopic(title).createdDate > 0;
  }

  function addTopic(string memory title, string memory description) external onlyResidents {
    require(!topicExists(title), "This topic already exists");
    Topic memory newTopic = Topic({
      title: title,
      description: description,
      createdDate: block.timestamp,
      startDate: 0,
      endDate: 0,
      status: Status.IDLE
    });

    topics[keccak256(bytes(title))] = newTopic;
  }

  function removeTopic(string memory title) external onlyManager {
    Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Status.IDLE, "Only IDLE topics can be removed");
    
    delete topics[keccak256(bytes(title))];
  }

  function openVoting(string memory title) external onlyManager {
    Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Status.IDLE, "Only IDLE topics can be open for voting");

    bytes32 topicId = keccak256(bytes(title));
    topics[topicId].status = Status.VOTING;
    topics[topicId].startDate = block.timestamp;
  }

  function closeVoting(string memory title) external onlyManager {
    Topic memory topic = getTopic(title);
    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Status.VOTING, "Only VOTING topics can be closed");

    bytes32 topicId = keccak256(bytes(title));
    uint8 approved = 0;
    uint8 denied = 0;
    uint8 abstentions = 0;
    Vote[] memory votes = votings[topicId];

    for(uint8 i = 0; i < votes.length; i++) {
      if (votes[i].option == VoteOptions.YES) {
        approved++;
      } else if (votes[i].option == VoteOptions.NO) {
        denied++;
      } else {
        abstentions++;
      }
    }

    if (approved > denied) {
      topics[topicId].status = Status.APPROVED;
    } else {
      topics[topicId].status = Status.DENIED;
    }
    
    topics[topicId].endDate = block.timestamp;
  }

  function vote(string memory title, VoteOptions option) external onlyResidents {
    require(option != VoteOptions.EMPTY, "The option cannot be EMPTY");
    Topic memory topic = getTopic(title);

    require(topic.createdDate > 0, "This topic does not exists");
    require(topic.status == Status.VOTING, "Only VOTING topics can be voted");

    uint16 residence = residents[msg.sender];
    bytes32 topicId = keccak256(bytes(title));

    Vote[] memory votes = votings[topicId];

    for(uint8 i = 0; i < votes.length; i++) {
      if (votes[i].residence == residence) {
        require(false, "A residence should vote only once");
      }
    }

    Vote memory newVote = Vote({
      resident: msg.sender,
      residence: residence,
      option: option,
      timestamp: block.timestamp
    });

    votings[topicId].push(newVote);
  }

  function numberOfVotes(string memory title) external view returns (uint256) {
    bytes32 topicId = keccak256(bytes(title));
    return votings[topicId].length;
  }
}
