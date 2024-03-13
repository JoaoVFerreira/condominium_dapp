import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const RESIDENCE_NUMBER = 2102;
const TOPIC_TITLE = 'Installing speed bumps';
const TOPIC_DESCRIPTION = 'Installing speed bumps to slow down speeding drivers';
enum Status {
  IDLE = 0,
  VOTING = 1,
  APPROVED = 2,
  DENIED = 3
}
enum Options {
  EMPTY = 0,
  YES = 1,
  NO = 2,
  ABSTENTION = 3
}

async function deployAdapterFixture() {
  const accounts = await ethers.getSigners();
  const manager = accounts[0];
  const CondominiumAdapter = await ethers.getContractFactory("CondominiumAdapter");
  const adapter = await CondominiumAdapter.deploy();

  return { adapter, manager, accounts };
}

async function deployImplementationFixture() {
  const Condominium = await ethers.getContractFactory("Condominium");
  const contract = await Condominium.deploy();

  return { contract };
}

describe('CondominiumAdapter', () => {

  it('Should upgrade', async () => {
    const { adapter } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    const result = await adapter.getImplementationAddress();

    expect(result).to.equal(await contract.getAddress());
  });

  it('Should throw an error when trying to upgrade and it is not an owner', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const instace = adapter.connect(accounts[1]); 

    await expect(instace.upgrade(contract.getAddress())).to.be.revertedWith("You do not have permission")
  });

  it('Should add a resident with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(accounts[1].address, RESIDENCE_NUMBER)
    const result = await contract.isResident(accounts[1].address);

    expect(result).to.equal(true);
  });

  it('Should remove a resident with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(accounts[1].address, RESIDENCE_NUMBER)
    await adapter.removeResident(accounts[1].address)
    const result = await contract.isResident(accounts[1].address);

    expect(result).to.equal(false);
  });

  it('Should remove a resident with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(accounts[1].address, RESIDENCE_NUMBER)
    await adapter.removeResident(accounts[1].address)
    const result = await contract.isResident(accounts[1].address);

    expect(result).to.equal(false);
  });

  it('Should set counselor with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(accounts[1].address, RESIDENCE_NUMBER)
    await adapter.setCounselor(accounts[1].address, true)
    const result = await contract.counselors(accounts[1].address);

    expect(result).to.equal(true);
  });

  it('Should add topic with success', async () => {
    const { adapter } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(true);
  });

  it('Should remove topic with success', async () => {
    const { adapter } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await adapter.removeTopic(TOPIC_TITLE);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(false);
  });

  it('Should open voting with success', async () => {
    const { adapter } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await adapter.openVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.equal(Status.VOTING);
  });

  it('Should vote with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(await accounts[1].getAddress(), RESIDENCE_NUMBER);
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await adapter.openVoting(TOPIC_TITLE);
    const instance = adapter.connect(accounts[1])
    await instance.vote(TOPIC_TITLE, Options.YES);
    const result = await contract.numberOfVotes(TOPIC_TITLE);

    expect(result).to.equal(1);
  });

  it('Should closeVoting with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(await accounts[1].getAddress(), RESIDENCE_NUMBER);
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await adapter.openVoting(TOPIC_TITLE);
    const instance = adapter.connect(accounts[1])
    await instance.vote(TOPIC_TITLE, Options.YES);
    await adapter.closeVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.equal(Status.APPROVED);
  });
});