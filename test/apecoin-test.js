const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ApeCoinFlashLoanReceiver", function () {
  it("Should return the new balance once it's claimed", async function () {
    const ApeCoinFlashLoanReceiver = await ethers.getContractFactory("ApeCoinFlashLoanReceiver");
  });
});
