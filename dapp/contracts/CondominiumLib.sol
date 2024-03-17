// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

library CondominiumLib {
  enum Status {
    IDLE,
    VOTING,
    APPROVED,
    DENIED,
    DELETED,
    SPENT
  }

  enum Category {
    DECISION,
    SPENT,
    CHANGE_QUOTA,
    CHANGE_MANAGER
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
    Category category;
    uint amount;
    address responsible;
  }

  struct Vote {
    address resident;
    uint16 residence;
    VoteOptions option;
    uint256 timestamp;
  }

  struct TopicUpdate {
    bytes32 topicId;
    string title;
    Status status;
    Category category;
  }

  struct TransferReceipt {
    address to;
    uint amount;
    string topic;
  }
}