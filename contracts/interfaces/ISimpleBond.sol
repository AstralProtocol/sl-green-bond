// SPDX-License-Identifier: GPL
pragma solidity 0.6.12;

contract ISimpleBond {

  event MintedBond(address buyer, uint256 bondsAmount);

  event RedeemedCoupons(address indexed caller, uint256[] bonds);

  event ClaimedPar(address indexed caller, uint256 amountClaimed);

  event Transferred(address indexed from, address indexed to, uint256[] bonds);


  function changeLoopLimit(uint256 _loopLimit) public;

  function mintBond(address buyer, uint256 bondsAmount) public;

  function redeemCoupons(uint256[] _bonds) public;

  function transfer(address receiver, uint256[] bonds) public;

  function donate() public payable;

  //PRIVATE

  function getMoney(uint256 amount, address receiver) private;

  //GETTERS

  function getBondOwner(uint256 bond) public view returns (address);

  function getRemainingCoupons(uint256 bond) public view returns (int256);

  function getLastTimeRedeemed(uint256 bond) public view returns (uint256);

  function getSimpleInterest() public view returns (uint256);

  function getCouponsRedeemed(uint256 bond) public view returns (uint256);

  function getTokenAddress() public view returns (address);

  function getTimesToRedeem() public view returns (uint256);

  function getTerm() public view returns (uint256);

  function getMaturity(uint256 bond) public view returns (uint256);

  function getCouponRate() public view returns (uint256);

  function getParValue() public view returns (uint256);

  function getCap() public view returns (uint256);

  function getBalance(address who) public view returns (uint256);

  function getParDecimals() public view returns (uint256);

  function getTokenToRedeem() public view returns (address);

  function getName() public view returns (string);

  function getTotalDebt() public view returns (uint256);

  function getTotalBonds() public view returns (uint256);

  function getNonce() public view returns (uint256);

  function getCouponThreshold() public view returns (uint256);

}