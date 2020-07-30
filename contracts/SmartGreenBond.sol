// SPDX-License-Identifier: GPL
pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/ISimpleBond.sol";

contract SmartGreenBond is ISimpleBond, Ownable {

  using SafeMath for uint256;

  string name;
  uint256 totalDebt;
  uint256 parDecimals;
  uint256 bondsNumber;
  uint256 cap;
  uint256 parValue;
  uint256 couponRate;
  uint256 term;
  uint256 timesToRedeem;
  uint256 loopLimit;
  uint256 nonce = 0;
  uint256 couponThreshold = 0;

  ERC20 token;

  mapping(uint256 => address) bonds;
  mapping(uint256 => uint256) maturities;
  mapping(uint256 => uint256) couponsRedeemed;
  mapping(address => uint256) bondsAmount;

  constructor(string memory _name, uint256 _par, uint256 _parDecimals, uint256 _coupon,
              uint256 _term, uint256 _cap, uint256 _timesToRedeem, address _tokenToRedeem,
              uint256 _loopLimit) public {

    require(bytes(_name).length > 0, "Empty name provided");
    require(_coupon > 0, "Coupon rate lower than or equal 0 ");
    require(_par > 0, "Par lower than or equal 0");
    require(_term > 0, "Term lower than or equal 0");
    require(_loopLimit > 0, "Loop limit lower than or equal 0");
    require(_timesToRedeem > 0, "Times to redeem lower or equal to 0");

    name = _name;
    parValue = _par;
    cap = _cap;
    loopLimit = _loopLimit;
    parDecimals = _parDecimals;
    timesToRedeem = _timesToRedeem;
    couponRate = _coupon;
    term = _term;
    couponThreshold = term.div(timesToRedeem);

    if (_tokenToRedeem != address(0)){
      token = ERC20(_tokenToRedeem);
    }

   }

   /**
   * @notice Change the number of elements you can loop through in this contract
   * @param _loopLimit The new loop limit
   */

   function changeLoopLimit(uint256 _loopLimit) public override onlyOwner {

     require(_loopLimit > 0, "Loop limit lower than or equal to 0");

     loopLimit = _loopLimit;

   }

   /**
   * @notice Mint bonds to a new buyer
   * @param buyer The buyer of the bonds
   * @param _bondsAmount How many bonds to mint
   */
    // Add payable function ()
   function mintBond(address buyer, uint256 _bondsAmount) public override onlyOwner {

     require(buyer != address(0), "Buyer can't be address null");
     require(_bondsAmount > 0, "Amount of bonds to mint must be higher than 0");
     require(_bondsAmount <= loopLimit, "Amount of bonds to mind must be lower than the loop limit");

     if (cap > 0){
       require(bondsNumber.add(_bondsAmount) <= cap, "Total amount of bonds must be lower or equal to the cap");
     }

     bondsNumber = bondsNumber.add(_bondsAmount);

     nonce = nonce.add(_bondsAmount);


    // WARNING: we should consider switching 'now' for the 'block.number', this is insecure - João
    maturities[nonce.sub(i)] = block.timestamp.add(term);
    bonds[nonce.sub(i)] = buyer;
    couponsRedeemed[nonce.sub(i)] = 0;
    bondsAmount[buyer] = bondsAmount[buyer].add(_bondsAmount);

    totalDebt = totalDebt.add(parValue.mul(_bondsAmount))
                .add((parValue.mul(couponRate)
                .div(100)).mul(timesToRedeem.mul(_bondsAmount)));

    emit MintedBond(buyer, _bondsAmount);

   }
}