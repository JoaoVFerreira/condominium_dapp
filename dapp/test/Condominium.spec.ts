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
  });

  it('Should exists a given resident', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    const result = await contract.isResident(resident.address);

    expect(result).to.be.true;
  });

  it('Should add a resident with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    const result = await contract.residents(resident.address);
    
    expect(result).to.be.equal(RESIDENCE_NUMBER);
  });

  it('Should remove a resident with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.removeResident(resident.address);
    const result = await contract.isResident(resident.address);
    
    expect(result).to.equal(false);
  });

  it('Should throw an error when trying to remove a residence that does not exists', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    
    await expect(contract.addResident(resident.address, 9999))
      .to.be.revertedWith("This residence does not exists")
  });

  it('Should throw an error when trying to add a residence that does not have permission', async () => {
    const { contract, resident, manager } = await loadFixture(deployFixture);
    const instance = contract.connect(resident);
    
    await expect(instance.addResident(manager.address, RESIDENCE_NUMBER))
      .to.be.revertedWith("Only the counselors or manager have access to this functionality")
  });

  it('Should throw an error when trying to remove a resident when does not have permission', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    const instance = contract.connect(resident);
    
    await expect(instance.removeResident(resident.address))
      .to.be.revertedWith("Only the manager has access to this functionality")
  });
});
