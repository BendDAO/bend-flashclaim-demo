//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "./IFlashLoanReceiver.sol";
import "./IAirdropGrapesToken.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ApeCoinFlashLoanReceiver is IFlashLoanReceiver {
  address public immutable bnftRegistry;
  address public immutable apeCoinAirdropAddress;
  address public immutable apeCoinTokenAddress;

  constructor(
    address bnftRegistry_,
    address apeCoinAirdropAddress_,
    address apeCoinTokenAddress_
  ) {
    bnftRegistry = bnftRegistry_;
    apeCoinAirdropAddress = apeCoinAirdropAddress_;
    apeCoinTokenAddress = apeCoinTokenAddress_;
  }

  function executeOperation(
    address nftAsset,
    uint256[] calldata nftTokenIds,
    address initiator,
    address operator,
    bytes calldata params
  ) external override returns (bool) {
    params;

    require(nftTokenIds.length > 0, "empty token list");
    require(initiator != address(0), "initiator is zero address");
    require(operator != address(0), "operator is zero address");

    // allow operator transfer borrowed nfts back to bnft
    IERC721(nftAsset).setApprovalForAll(operator, true);

    // call airdrop contract to claim tokens
    IAirdropGrapesToken(apeCoinTokenAddress).claimTokens();

    // transfer airdroped ERC20 tokens to initiator
    uint256 airdropBalance = IERC20(apeCoinTokenAddress).balanceOf(address(this));
    if (airdropBalance > 0) {
      IERC20(apeCoinTokenAddress).transfer(initiator, airdropBalance);
    }

    return true;
  }
}
