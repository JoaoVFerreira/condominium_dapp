import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Condominium", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Condominium = await ethers.getContractFactory("Condominium");
    const condominium = await Condominium.deploy();

    return { condominium, owner, otherAccount };
  }
});
