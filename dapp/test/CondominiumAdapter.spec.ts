import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CondominiumAdapter } from "../typechain-types";

const RESIDENCE_NUMBER = 2101;
const ZERO_AMOUNT = 0;
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
enum Category {
  DECISION = 0,
  SPENT = 1,
  CHANGE_QUOTA = 2,
  CHANGE_MANAGER = 3
}

async function addResidents(adapter: CondominiumAdapter, count: number, accounts: SignerWithAddress[]) {
  const skip = count < 20 ? 0 : 1;
  for (let i = 1; i <= count; i++) {
    const residenceId = (1000 * Math.ceil(i / 25)) + (100 * Math.ceil(i / 5)) + (i - (5 * Math.floor((i - 1) / 5)));
    await adapter.addResident(accounts[i - skip].address, residenceId); //1 101
  }
}

async function addVotes(adapter: CondominiumAdapter, count: number, accounts: SignerWithAddress[], deny: boolean = false) {
  const skip = count < 20 ? 0 : 1;
  for (let i = 1; i <= count; i++) {
    const instance = adapter.connect(accounts[i - skip]);
    await instance.vote(TOPIC_TITLE, deny ? Options.NO : Options.YES);
  }
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
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const ACCOUNT_1 = await accounts[1].getAddress();
    await adapter.upgrade(contract.getAddress());
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, ACCOUNT_1);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(true);
  });

  it('Should remove topic with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const ACCOUNT_1 = await accounts[1].getAddress();
    await adapter.upgrade(contract.getAddress());
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, ACCOUNT_1);
    await adapter.removeTopic(TOPIC_TITLE);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(false);
  });

  it('Should open voting with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const ACCOUNT_1 = await accounts[1].getAddress();
    await adapter.upgrade(contract.getAddress());
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, ACCOUNT_1);
    await adapter.openVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.equal(Status.VOTING);
  });

  it('Should vote with success', async () => {
    const { adapter, accounts } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const ACCOUNT_1 = await accounts[1].getAddress();
    await adapter.upgrade(contract.getAddress());
    await adapter.addResident(await accounts[1].getAddress(), RESIDENCE_NUMBER);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, ACCOUNT_1);
    await adapter.openVoting(TOPIC_TITLE);
    const instance = adapter.connect(accounts[1])
    await instance.vote(TOPIC_TITLE, Options.YES);
    const result = await contract.numberOfVotes(TOPIC_TITLE);

    expect(result).to.equal(1);
  });

  it('Should closeVoting with success', async () => {
    const { adapter, accounts, manager } = await loadFixture(deployAdapterFixture);
    const { contract } = await loadFixture(deployImplementationFixture);
    const address = await contract.getAddress();
    await adapter.upgrade(address);
    await addResidents(adapter, 5, accounts);
    await adapter.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, manager.address);
    await adapter.openVoting(TOPIC_TITLE);
    await addVotes(adapter, 5, accounts);
    await adapter.closeVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.equal(Status.APPROVED);
  });
});