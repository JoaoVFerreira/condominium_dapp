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

  it('Should throw an error when trying to remove a counselor resident', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.setCounselor(resident.address, true);

    await expect(contract.removeResident(resident.address))
      .to.be.revertedWith("A counselor cannot be removed")
  });

  it('Should set a different manager', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    const oldManager = await contract.manager();
    await contract.setManager(resident.address);
    const newManager = await contract.manager();

    expect(newManager).to.be.equal(resident.address);
    expect(oldManager).not.to.be.equal(newManager);
  });

  it('Should throw an error when trying to set an invalid manager', async () => {
    const { contract } = await loadFixture(deployFixture);
    
    await expect(contract.setManager('0x0000000000000000000000000000000000000000'))
      .to.be.revertedWith("The address must be valid");
  });

  it('Should set a counselor with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.setCounselor(resident.address, true);
    const result = await contract.counselors(resident.address);

    expect(result).to.be.true;
  });

  it('Should throw an error when trying to set a counselor that is not a resident', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    
    await expect(contract.setCounselor(resident.address, true))
      .to.be.revertedWith("The counselor must be a resident");
  });

  it('Should delete a counselor with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.setCounselor(resident.address, true);
    const counselor = await contract.counselors(resident.address);
    await contract.setCounselor(resident.address, false);
    const counselorRemoved = await contract.counselors(resident.address);

    expect(counselor).to.be.true;
    expect(counselorRemoved).to.equal(false);
  });

  it('Should add a topic with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.title).to.be.equal(TOPIC_TITLE);
    expect(result.description).to.be.equal(TOPIC_DESCRIPTION);
  });

  it('Should throw an error when topic already exists', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    await contract.addTopic(TOPIC_TITLE, '');
    
    await expect(contract.addTopic(TOPIC_TITLE, ''))
      .to.be.revertedWith('This topic already exists');
  });

  it('Should throw an error when trying to add a topic by a non resident', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    const instance = contract.connect(resident);
    
    await expect(instance.addTopic(TOPIC_TITLE, ''))
      .to.be.revertedWith('Only the residents or manager have access to this functionality');
  });

  it('Should return false when a topic does not exists', async () => {
    const { contract } = await loadFixture(deployFixture);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(false);
  });

  it('Should return true when a topic exists', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const result = await contract.topicExists(TOPIC_TITLE);

    expect(result).to.equal(true);
  });

  it('Should remove a topic with success', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const topic = await contract.getTopic(TOPIC_TITLE);
    await contract.removeTopic(TOPIC_TITLE);
    const topicRemoved = await contract.topicExists(TOPIC_TITLE);

    expect(topic.title).to.be.equal(TOPIC_TITLE);
    expect(topicRemoved).to.equal(false);
  });

  it('Should throw an error when trying to remove a topic by a resident', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const instance = contract.connect(resident);

    await expect(instance.removeTopic(TOPIC_TITLE))
      .to.be.revertedWith('Only the manager has access to this functionality');
  });

  it('Should throw an error when trying to remove a topic that does not exists', async () => {
    const { contract } = await loadFixture(deployFixture);

    await expect(contract.removeTopic(TOPIC_TITLE))
      .to.be.revertedWith('This topic does not exists');
  });

  it('Should throw an error when a resident tried to open a voting', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    const instance = contract.connect(resident);

    await expect(instance.openVoting(TOPIC_TITLE))
      .to.be.revertedWith('Only the manager has access to this functionality');
  });

  it('Should open a voting with success', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
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
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await contract.openVoting(TOPIC_TITLE);

    await expect(contract.vote(TOPIC_TITLE, Options.EMPTY))
      .to.be.revertedWith('The option cannot be EMPTY');
  });

  it('Should throw an error when trying to vote in a topic with other status than voting', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);

    await expect(contract.vote(TOPIC_TITLE, Options.YES))
      .to.be.revertedWith('Only VOTING topics can be voted');
  });

  it('Should throw an error when trying to vote twice', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await contract.openVoting(TOPIC_TITLE);
    await contract.vote(TOPIC_TITLE, Options.YES)

    await expect(contract.vote(TOPIC_TITLE, Options.YES))
      .to.be.revertedWith('A residence should vote only once');
  });

  it('Should vote with success', async () => {
    const { contract, resident } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await contract.openVoting(TOPIC_TITLE);
    await contract.vote(TOPIC_TITLE, Options.YES)
    await contract.addResident(resident.address, RESIDENCE_NUMBER);
    const instance = contract.connect(resident);
    await instance.vote(TOPIC_TITLE, Options.YES);
    const result = await instance.numberOfVotes(TOPIC_TITLE);

    expect(result).to.be.equal(2);
  });

  it('Should closeVoting with success', async () => {
    const { contract } = await loadFixture(deployFixture);
    await contract.addTopic(TOPIC_TITLE, TOPIC_DESCRIPTION);
    await contract.openVoting(TOPIC_TITLE);
    await contract.vote(TOPIC_TITLE, Options.YES);
    await contract.closeVoting(TOPIC_TITLE);
    const result = await contract.getTopic(TOPIC_TITLE);

    expect(result.endDate).not.to.be.equal(0);
  });
});
