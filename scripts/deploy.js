const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Allowance = await hre.ethers.getContractFactory("Allowance");
  const allowance = await Allowance.deploy();

  await allowance.deployed();

  console.log("Allowance deployed to:", allowance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });