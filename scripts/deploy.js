// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const bnftRegistryAddress = process.env.BNFT_REGISTRY;
  if (bnftRegistryAddress == undefined || bnftRegistryAddress == "") {
    throw Error("invalid BNFT_REGISTRY address");
  }
  const apeCoinAirdropAddress = process.env.APECOIN_AIRDROP;
  if (apeCoinAirdropAddress == undefined || apeCoinAirdropAddress == "") {
    throw Error("invalid APECOIN_AIRDROP address");
  }
  const apeCoinTokenAddress = process.env.APECOIN_TOKEN;
  if (apeCoinTokenAddress == undefined || apeCoinTokenAddress == "") {
    throw Error("invalid APECOIN_TOKEN address");
  }
  console.log("BNFT_REGISTRY:", bnftRegistryAddress);
  console.log("APECOIN_AIRDROP:", apeCoinAirdropAddress);
  console.log("APECOIN_TOKEN:", apeCoinTokenAddress);

  const ApeCoinFlashLoanReceiver = await hre.ethers.getContractFactory("ApeCoinFlashLoanReceiver");
  const apeCoinReceiver = await ApeCoinFlashLoanReceiver.deploy(
    bnftRegistryAddress,
    apeCoinAirdropAddress,
    apeCoinTokenAddress
  );

  await apeCoinReceiver.deployed();

  console.log("ApeCoinFlashLoanReceiver deployed to:", apeCoinReceiver.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
