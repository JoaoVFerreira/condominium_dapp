// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import './Condominium.sol';
import './ICondominium.sol';

contract CondominiumAdapter {

  address public immutable owner;
  ICondominium private implementation;

  event QuotaChanged(uint amount);
  event ManagerChanged(address manager);
  event TopicChanged(bytes32 indexed topicId, string title, Lib.Status indexed status);
  event Transfer(address to, uint indexed amount, string topic);

  constructor() {
    owner = msg.sender;
  }

  modifier upgraded () {
    require(address(implementation) != address(0), "You must upgrade first");
    _;
  }

  function getImplementationAddress() external view returns (address) {
    return address(implementation);
  }

  function upgrade(address newImplementation) external {
    require(msg.sender == owner, "You do not have permission");
    implementation = ICondominium(newImplementation);
  }

  function vote(string memory title, Lib.VoteOptions option) external upgraded {
    return implementation.vote(title, option);
  }

  function closeVoting(string memory title) external upgraded {
    Lib.TopicUpdate memory topic = implementation.closeVoting(title);
    emit TopicChanged(topic.topicId, topic.title, topic.status);

    if (topic.status == Lib.Status.APPROVED) {
      if (topic.category == Lib.Category.CHANGE_MANAGER) {
        emit ManagerChanged(implementation.getManager());
      } else if (topic.category == Lib.Category.CHANGE_QUOTA) {
        emit QuotaChanged(implementation.getQuota());
      }
    }
  }

  function openVoting(string memory title) external upgraded {
    Lib.TopicUpdate memory topic = implementation.openVoting(title);
    emit TopicChanged(topic.topicId, topic.title, topic.status);
  }

  function removeTopic(string memory title) external upgraded {
    Lib.TopicUpdate memory topic = implementation.removeTopic(title);
    emit TopicChanged(topic.topicId, topic.title, topic.status);
  }

  function addTopic(string memory title,
    string memory description,
    Lib.Category category,
    uint amount, 
    address responsible
  ) external upgraded {
    return implementation.addTopic(title, description, category, amount, responsible);
  }

  function setCounselor(address resident, bool isEntering) external upgraded {
    return implementation.setCounselor(resident, isEntering);
  }

  function removeResident(address resident) external upgraded {
    return implementation.removeResident(resident);
  }

  function addResident(address resident, uint16 residenceNumber) external upgraded {
    return implementation.addResident(resident, residenceNumber);
  }

  function editTopic(
    string memory topicToEdit,
    string memory description,
    uint amount,
    address responsible
  ) external upgraded {
    Lib.TopicUpdate memory topic = implementation.editTopic(topicToEdit, description, amount, responsible);
    emit TopicChanged(topic.topicId, topic.title, topic.status);
  }

  function payQuota(uint16 residence) external payable upgraded {
    return implementation.payQuota{value: msg.value}(residence);
  }

  function transfer(string memory title, uint amount) external upgraded {
    Lib.TransferReceipt memory receipt = implementation.transfer(title, amount);
    emit Transfer(receipt.to, receipt.amount, receipt.topic);
  }

  function getManager() external view upgraded returns (address) {
    return implementation.getManager();
  }

  function getQuota() external view upgraded returns (uint) {
    return implementation.getQuota();
  }

  function getResident(address resident) external view upgraded returns(Lib.Resident memory) {
    return implementation.getResident(resident);
  }

  function getResidents(uint page, uint pageSize) external view upgraded returns (Lib.ResidentPage memory) {
    return implementation.getResidents(page, pageSize);
  }

  function getTopic(string memory title) external view upgraded returns(Lib.Topic memory) {
    return implementation.getTopic(title);
  }

  function getTopics(uint page, uint pageSize) external view upgraded returns (Lib.TopicPage memory) {
    return implementation.getTopics(page, pageSize);
  }

  function getVotes(string memory topicTitle) external view upgraded returns (Lib.Vote[] memory) {
    return implementation.getVotes(topicTitle);
  }
}