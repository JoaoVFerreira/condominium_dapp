// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { CondominiumLib as Lib } from './CondominiumLib.sol';

interface ICondominium {
  function vote(string memory title, Lib.VoteOptions option) external;
  function closeVoting(string memory title) external;
  function openVoting(string memory title) external;
  function removeTopic(string memory title) external;
  function addTopic(string memory title, string memory description, Lib.Category category, uint amount, address responsible) external;
  function setCounselor(address resident, bool isEntering) external;
  function removeResident(address resident) external;
  function addResident(address resident, uint16 residenceNumber) external;
}