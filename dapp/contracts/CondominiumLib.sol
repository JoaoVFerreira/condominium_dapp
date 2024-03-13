// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

library CondominiumLib {
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
}