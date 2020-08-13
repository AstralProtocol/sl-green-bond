// // Contract Address: 0x1520d968810bCCc68AeAd2cb57413bf380775DE7 (ropsten)
// // To test go to Remix and deploy the contract at the address above.
// // Select the update function, wait for the transaction to complete, then click
// // on avgNoxValue, to view the requested result. 

// // NOTE: Requires enough ETH to make request. 
// pragma solidity ^0.6.0;

// import "github.com/oraclize/ethereum-api/provableAPI_0.6.sol";

// contract Oracle is usingProvable(){
    
//     // The Public String of the mean- Call this variable to reveal the result
//     string public avgNoxValue;

//     event LogConstructorInitiated(string nextStep);
//     event LogPriceUpdated(string price);
//     event LogNewProvableQuery(string description);
//     event LogPath(string path);

//     constructor() payable public {
//         emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
//     }
    
//     function __callback(bytes32 myid, string memory result) public override {
//         if (msg.sender != provable_cbAddress()) revert();
//         avgNoxValue = result;
//         emit LogPriceUpdated(result);
//     }

//     function update2003Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/0).mean");
//         }
//     }
    
//     function update2004Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/1).mean");
//         }
//     }
    
//     function update2005Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/2).mean");
//         }
//     }
    
//     function update2006Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/3).mean");
//         }
//     }
    
//     function update2007Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/4).mean");
//         }
//     }
    
//     function update2008Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/5).mean");
//         }
//     }
    
//     function update2009Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/6).mean");
//         }
//     }
    
//     function update2010Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/7).mean");
//         }
//     }
    
//     function update2011Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/8).mean");
//         }
//     }
    
//     function update2012Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/9).mean");
//         }
//     }
    
//     function update2013Mean() payable public {
//         if (provable_getPrice("URL") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//             provable_query("URL", "json(https://calm-caverns-22873.herokuapp.com/data/10).mean");
//         }
//     }
    
    
// }