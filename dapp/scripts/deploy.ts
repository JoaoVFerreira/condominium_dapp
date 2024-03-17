import { ethers } from "hardhat";

async function main() {
  const Condominium = await ethers.getContractFactory("Condominium");
  const contract = await Condominium.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`[CONTRACT DEPLOYED] Tx - ${contractAddress}`);

  const CondominiumAdapter = await ethers.getContractFactory("CondominiumAdapter");
  const adapter = await CondominiumAdapter.deploy();
  await adapter.waitForDeployment();
  const adapterAddress = await adapter.getAddress();
  console.log(`[ADAPTER DEPLOYED] Tx - ${adapterAddress}`);

  await adapter.upgrade(contract);
  console.log(`[UPGRADED] Tx - ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
