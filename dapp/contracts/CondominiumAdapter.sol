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

  function getImplementationAddress() external view returns (address) {
    return address(implementation);
  }

  function upgrade(address newImplementation) external {
    require(msg.sender == owner, "You do not have permission");
    implementation = ICondominium(newImplementation);
  }

  function vote(string memory title, Lib.VoteOptions option) external {
    return implementation.vote(title, option);
  }

  function closeVoting(string memory title) external {
    return implementation.closeVoting(title);
  }

  function openVoting(string memory title) external {
    return implementation.openVoting(title);
  }

  function removeTopic(string memory title) external {
    return implementation.removeTopic(title);
  }

  function addTopic(string memory title, string memory description, Lib.Category category, uint amount, address responsible) external {
    return implementation.addTopic(title, description, category, amount, responsible);
  }

  function setCounselor(address resident, bool isEntering) external {
    return implementation.setCounselor(resident, isEntering);
  }

  function removeResident(address resident) external {
    return implementation.removeResident(resident);
  }

  function addResident(address resident, uint16 residenceNumber) external {
    return implementation.addResident(resident, residenceNumber);
  }
}