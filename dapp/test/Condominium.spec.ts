import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const RESIDENCE_NUMBER = 2102;

describe("Condominium", function () {
  async function deployFixture() {
    const [manager, resident] = await ethers.getSigners();
    const Condominium = await ethers.getContractFactory("Condominium");
    const contract = await Condominium.deploy();

    return { contract, manager, resident };
  }

  it('Should exists a given residence number', async () => {
    const { contract } = await loadFixture(deployFixture);
    const result = await contract.residenceExists(RESIDENCE_NUMBER);

    expect(result).to.be.true;
  })
});
