// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { CondominiumLib as Lib } from './CondominiumLib.sol';

interface ICondominium {
  function vote(string memory title, Lib.VoteOptions option) external;
  function closeVoting(string memory title) external returns (Lib.TopicUpdate memory);
  function openVoting(string memory title) external returns (Lib.TopicUpdate memory);
  function removeTopic(string memory title) external returns (Lib.TopicUpdate memory);
  function addTopic(string memory title, string memory description, Lib.Category category, uint amount, address responsible) external;
  function editTopic(
    string memory topicToEdit, 
    string memory description,
    uint amount, 
    address responsible
  ) external returns (Lib.TopicUpdate memory);
  function setCounselor(address resident, bool isEntering) external;
  function removeResident(address resident) external;
  function addResident(address resident, uint16 residenceNumber) external;
  function payQuota(uint16 residence) external payable;
  function transfer(string memory title, uint amount) external returns (Lib.TransferReceipt memory);
  function getManager() external returns (address);
  function getQuota() external returns (uint);
}