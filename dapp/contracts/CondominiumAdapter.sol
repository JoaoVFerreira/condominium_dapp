// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import './Condominium.sol';
import './ICondominium.sol';

contract CondominiumAdapter {

  address public immutable owner;
  ICondominium private implementation;

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
    return implementation.closeVoting(title);
  }

  function openVoting(string memory title) external upgraded {
    return implementation.openVoting(title);
  }

  function removeTopic(string memory title) external upgraded {
    return implementation.removeTopic(title);
  }

  function addTopic(string memory title, string memory description, Lib.Category category, uint amount, address responsible) external upgraded {
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

  function editTopic(string memory topicToEdit, string memory description, uint amount, address responsible) external upgraded {
    return implementation.editTopic(topicToEdit, description, amount, responsible);
  }
}