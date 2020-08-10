const express = require('express');
const axios = require('axios');
const path = require('path');
//const smartgreenbondabi = require('../../build/contracts/SmartGreenBond.json');
const exampleabi = require('./exampleabi.json');
const Web3 = require('web3');
let web3 = new Web3("https://ropsten-rpc.linkpool.io/");

const router = express.Router();
require('dotenv').config();



// register middleware
//router.use(getNoxValue);
//router.use(fetchNOXAndUpdateContract);

// create instance of Contract
// TODO: find the contract address and deployer address
// 0xE254A460D561fE53843F20760722772B7512fc15 is dummy contract used to test


const getNoxValue = async(req,res,next) => {
    try {
        const response = await axios.get(`https://calm-caverns-22873.herokuapp.com/data/${req.params.id}`);
        //console.log(response);
        // convert the value
        req.getNoxValue = response.data.mean * 1e18;
        console.log("Converted NOxValue: " + req.getNoxValue + " = " + response.data.mean + " * 1e18" );
    } catch (error) {
        console.log(error);
    }
    next();
}

// will call the fetch the NOx value and update the contract
const fetchNOxAndUpdateContract = async (req, res, next) => {

    try{
        var contract = new web3.eth.Contract(exampleabi, process.env.EXAMPLE_ADDRESS, {
            from: process.env.ORACLE_ADDRESS, // default from address
            gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
            gas: '8000000',
        });
        // Transaction Object
        var tx = {
            // this could be provider.addresses[0] if it exists (ORACLE ADDRESS)
            from: process.env.ORACLE_ADDRESS, 
            // target address, this could be a smart contract address (EXAMPLE CONTRACT ADDRESS)
            to: process.env.EXAMPLE_ADDRESS, 
            // optional if you want to specify the gas limit 
            gas: '8000000', 

            gasPrice: '20000000000',
            // this encodes the ABI of the method and the arguements
            data: await contract.methods.updateTotalOwed(`${req.getNoxValue}`).encodeABI()
        };
    }catch(error){
        console.log(error);
    }
    
    console.log("Contract Metadata: ");
    console.log(contract);

    console.log("Transaction Metadata: ")
    console.log(tx);

    let signedTx = web3.eth.accounts.signTransaction(tx, process.env.ORACLE_PRIVATE_KEY);
        
    signedTx.then((signedTx) => {
        // raw transaction string may be available in .raw or 
        // .rawTransaction depending on which signTransaction
        // function was called
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
            .on('transactionHash', function(hash){
                console.log(hash);
            })
            .on('receipt', function(receipt){
                console.log(receipt);
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
                console.log(confirmationNumber || receipt);
            })
            .on('error', console.error);
            })
        .catch((err) => {
            console.log("Promise Failed");
    });

    res.send(req.params.id);
}

router
  .route('/update/:id')
  .get(getNoxValue,fetchNOxAndUpdateContract);

module.exports = router;