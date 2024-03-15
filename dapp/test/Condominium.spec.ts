import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Condominium } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

const RESIDENCE_NUMBER = 2102;
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

async function addResidents(contract: Condominium, count: number, accounts: SignerWithAddress[]) {
  for (let i = 1; i <= count; i++) {
    const residenceId = (1000 * Math.ceil(i / 25)) + (100 * Math.ceil(i / 5)) + (i - (5 * Math.floor((i - 1) / 5)));
    await contract.addResident(accounts[i - 1].address, residenceId); //1 101
  }
}

async function addVotes(contract: Condominium, count: number, accounts: SignerWithAddress[], shouldApprove: boolean = true) {
  for (let i = 1; i <= count; i++) {
    const instance = contract.connect(accounts[i - 1]);
    await instance.vote(TOPIC_TITLE, shouldApprove ? Options.YES : Options.NO);
  }
}

async function deployFixture() {
  const accounts = await ethers.getSigners();
  const manager = accounts[0];
  const Condominium = await ethers.getContractFactory("Condominium");
  const contract = await Condominium.deploy();

  return { contract, manager, accounts };
}

describe("Condominium", function () {
  it('Should exists a given residence number', async () => {
    const { contract } = await loadFixture(deployFixture);
    const result = await contract.residenceExists(RESIDENCE_NUMBER);

    expect(result).to.be.true;
  });

  it('Should exists a given resident', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    const result = await contract.isResident(accounts[1].address);

    expect(result).to.be.true;
  });

  it('Should add a resident with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    const result = await contract.residents(accounts[1].address);
    
    expect(result).to.be.equal(RESIDENCE_NUMBER);
  });

  it('Should remove a resident with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.removeResident(accounts[1].address);
    const result = await contract.isResident(accounts[1].address);
    
    expect(result).to.equal(false);
  });

  it('Should throw an error when trying to remove a residence that does not exists', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    
    await expect(contract.addResident(accounts[1].address, 9999))
      .to.be.revertedWith("This residence does not exists")
  });

  it('Should throw an error when trying to add a residence that does not have permission', async () => {
    const { contract, accounts, manager } = await loadFixture(deployFixture);
    const instance = contract.connect(accounts[1]);
    
    await expect(instance.addResident(manager.address, RESIDENCE_NUMBER))
      .to.be.revertedWith("Only the counselors or manager have access to this functionality")
  });

  it('Should throw an error when trying to remove a resident when does not have permission', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    const instance = contract.connect(accounts[1]);
    
    await expect(instance.removeResident(accounts[1].address))
      .to.be.revertedWith("Only the manager has access to this functionality")
  });

  it('Should throw an error when trying to remove a counselor resident', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.setCounselor(accounts[1].address, true);

    await expect(contract.removeResident(accounts[1].address))
      .to.be.revertedWith("A counselor cannot be removed")
  });

  it('Should set a counselor with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.setCounselor(accounts[1].address, true);
    const result = await contract.counselors(accounts[1].address);

    expect(result).to.be.true;
  });

  it('Should throw an error when trying to set a counselor that is not a resident', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    
    await expect(contract.setCounselor(accounts[1].address, true))
      .to.be.revertedWith("The counselor must be a resident");
  });

  it('Should delete a counselor with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.setCounselor(accounts[1].address, true);
    const counselor = await contract.counselors(accounts[1].address);
    await contract.setCounselor(accounts[1].address, false);
    const counselorRemoved = await contract.counselors(accounts[1].address);

    expect(counselor).to.be.true;
    expect(counselorRemoved).to.equal(false);
  });

  it('Should add a topic with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.title).to.be.equal(TOPIC_TITLE);
    expect(result.description).to.be.equal(TOPIC_DESCRIPTION);
  });

  it('Should throw an error when topic already exists', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    
    await expect(contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address))
      .to.be.revertedWith('This topic already exists');
  });

  it('Should throw an error when trying to add a topic by a non resident', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    const instance = contract.connect(accounts[1]);
    
    await expect(instance.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address))
      .to.be.revertedWith('Only the residents or manager have access to this functionality');
  });

  it('Should return false when a topic does not exists', async () => {
    const { contract } = await loadFixture(deployFixture);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(false);
  });

  it('Should return true when a topic exists', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(true);
  });

  it('Should remove a topic with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    const topic = await contract.getTopic(TOPIC_TITLE);
    await contract.removeTopic(TOPIC_TITLE);
    const topicRemoved = await contract.topicExists(TOPIC_TITLE);

    expect(topic.title).to.be.equal(TOPIC_TITLE);
    expect(topicRemoved).to.equal(false);
  });

  it('Should throw an error when trying to remove a topic by a resident', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    const instance = contract.connect(accounts[1]);

    await expect(instance.removeTopic(TOPIC_TITLE))
      .to.be.revertedWith('Only the manager has access to this functionality');
  });

  it('Should throw an error when trying to remove a topic that does not exists', async () => {
    const { contract } = await loadFixture(deployFixture);

    await expect(contract.removeTopic(TOPIC_TITLE))
      .to.be.revertedWith('This topic does not exists');
  });

  it('Should throw an error when a resident tried to open a voting', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    const instance = contract.connect(accounts[1]);

    await expect(instance.openVoting(TOPIC_TITLE))
      .to.be.revertedWith('Only the manager has access to this functionality');
  });

  it('Should open a voting with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    await contract.openVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.be.equal(Status.VOTING);
  });

  it('Should throw an error when trying to open a topic to voting that does not exists', async () => {
    const { contract } = await loadFixture(deployFixture);

    await expect(contract.openVoting(TOPIC_TITLE))
      .to.be.revertedWith('This topic does not exists');
  });

  it('Should throw an error when trying to vote in a topic with empty option', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    await contract.openVoting(TOPIC_TITLE);

    await expect(contract.vote(TOPIC_TITLE, Options.EMPTY))
      .to.be.revertedWith('The option cannot be EMPTY');
  });

  it('Should throw an error when trying to vote in a topic with other status than voting', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);

    await expect(contract.vote(TOPIC_TITLE, Options.YES))
      .to.be.revertedWith('Only VOTING topics can be voted');
  });

  it('Should throw an error when trying to vote twice', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    await contract.openVoting(TOPIC_TITLE);
    await contract.vote(TOPIC_TITLE, Options.YES)

    await expect(contract.vote(TOPIC_TITLE, Options.YES))
      .to.be.revertedWith('A residence should vote only once');
  });

  it('Should vote with success', async () => {
    const { contract, accounts } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, accounts[1].address);
    await contract.openVoting(TOPIC_TITLE);
    await contract.vote(TOPIC_TITLE, Options.YES)
    await contract.addResident(accounts[1].address, RESIDENCE_NUMBER);
    const instance = contract.connect(accounts[1]);
    await instance.vote(TOPIC_TITLE, Options.YES);
    const result = await instance.numberOfVotes(TOPIC_TITLE);

    expect(result).to.be.equal(2);
  });

  it('Should closeVoting with success', async () => {
    const { contract, accounts, manager } = await loadFixture(deployFixture);
    await addResidents(contract, 5, accounts);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION, Category.DECISION, ZERO_AMOUNT, manager.address);
    await contract.openVoting(TOPIC_TITLE);
    await addVotes(contract, 5, accounts);
    await contract.closeVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.status).to.equal(Status.APPROVED);
  });
});
