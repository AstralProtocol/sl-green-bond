// // Contract Addess: 0xEEE5b03a866426Da5dc6d9142eD06ce859bFe3B1
// // @dev This is a test contract to test the updateTotalOwed from the nodeJS server.
// // Add the contract address to you .env file or redploy it in remix at a new address.
// pragma solidity 0.6.12;

// contract Example {
    
//     uint256 public totalOwed; 
//     string construct;
//     address oracle;
    
//     event TotalOwedUpdated(uint256 totalOwed);
//     event Constructed(string construct);
    
//     modifier onlyOracle() {
//         require(msg.sender == oracle, "Only the oracle is authorized to call this function.");
//         _;
//     }
    
//     constructor(address add_oracle) public {
//         emit Constructed("Contract Compiled");
//         oracle = add_oracle;
//     }
    
//     function updateTotalOwed(uint256 variablePayment) public onlyOracle {
//         // Check to make sure that oracle update is due?
//         // This is a security flaw: it can be called any time past 
//         //require(intervalCount.add(1).mul(couponThreshold) < block.number, 'An update to the variable rate is not yet due.');

        
//         // TODO: Call the update____Mean method in the Oracle Contract.
//         // We will probably have to redeploy the contract and edit how to convert the 
//         // returned value and into a type that solidity will recognize.
//         // I also have to route the proper index to the method calls. 
//         // TODO: Figure out how to convert the string of the requested value into uint or floating point.


//         // other checks on the input value?
//         // We could have a range of possible values (from 0 to max variable payment) to reduce risks

//         totalOwed = variablePayment;

//         emit TotalOwedUpdated(totalOwed);

//     }
// }

