// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Condominium {

  address public manager;
  mapping (uint16 => bool) public residences;
  mapping (address => bool) public counselors;
  mapping (address => uint16) public residents;

  constructor() {
    manager = msg.sender;
    for(uint8 i = 1; i<= 2; i++) { // blocks
      for(uint16 j = 1; j <= 5; j++) { // floors
        for(uint8 k = 1; k <= 5; k++) { // units
          residences[(i * 1000) + (j * 100) + k] = true; // (1101) -> (2505)
        }
      }
    }
  }


}
