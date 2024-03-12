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
}
