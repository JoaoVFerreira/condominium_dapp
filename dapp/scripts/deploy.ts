import { ethers } from "hardhat";

async function main() {
  const condominium = await ethers.deployContract("Condominium");
  await condominium.waitForDeployment();
  const tx = await condominium.getAddress();

  console.log(`[CONTRACT DEPLOYED] Tx - ${tx}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
