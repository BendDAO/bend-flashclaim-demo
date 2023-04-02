# Basic Sample Flash Claim Project

This project demonstrates a basic flash claim use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
```

## Deploying Samle ApeCoin Flash Claim

### Setting environment variable for hardhat
```shell

# Goto infura.io, register an free account, and create new project
# https://docs.infura.io/infura/create-a-project
export MAINNET_NODE_URL="https://mainnet.infura.io/v3/{PROJECT ID}"

# Using existed private key or generate new private key in your wallet
export MAINNET_PRIVATE_KEY=""

```

### Setting environment variable for contract

```shell

# Query contract address from Etherescan.io
export BNFT_REGISTRY=0x79d922DD382E42A156bC0A354861cDBC4F09110d;

export APECOIN_AIRDROP=0x025C6da5BD0e6A5dd1350fda9e3B6a614B205a1F;

export APECOIN_TOKEN=0x4d224452801ACEd8B2F0aebE155379bb5D594381;

```

### Deploying contract to mainnet
```shell

npx hardhat --network mainnet run ./scripts/deploy.js

# You will get contract address at here

```

### Calling BoundNFT flashloan methods

You can find the boundBAYC, boundMAYC contract address [here](https://docs.benddao.xyz/developers/deployed-contracts/lending-protocol#boundnft-contracts).

Search contract address on the Etherscan website and go to Write as Proxy tab page.

boundBAYC: https://etherscan.io/address/0xDBfD76AF2157Dc15eE4e57F3f942bB45Ba84aF24#writeProxyContract

boundMAYC: https://etherscan.io/address/0x69f37e419bD1457d2a25ed3f5d418169caAe8D1F#writeProxyContract

Find the flashLoan method and fill the correct parameters.

*receiverAddress*: your deployed receiver contract addres in previous step.

*nftTokenIds*: Your owned BAYC or MAYC token id list.

*params*: Fill it with just 0x, because this demo contract does not need any extra encode params.

## About BoundNFT
BoundNFTs are promissory-note tokens that are minted and burned upon borrow and repay, representing the NFT used as collateral which owed by the token holder, with same token ID.

The BoundNFTs' token is pegged to the token of the corresponding NFT collateral at a 1:1. All tokens owned by the boundNFTs holders can be simply integrate into NFT wallet and social medias.
The source code can be found on [Github](https://github.com/BoundNFT/boundnft-protocol) here.

You can find all supported [BoundNFT Contract Addresses](https://docs.benddao.xyz/developers/deployed-contracts/main-market#boundnft-contracts) here.
