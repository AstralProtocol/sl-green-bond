const express = require('express');
const axios = require('axios');
const path = require('path');
const smartgreenbond = require('../../build/contracts/SmartGreenBond.json');
const Web3 = require('web3');

const power = require("@textile/powergate-client");
const fs = require("fs");
const Decimal = require('decimal.js');
const { create } = require("domain");
const host = "http://localhost:6002"; // Powergate Instance PORT
const pow = power.createPow({ host });

const csv2json = require('csvjson-csv2json');

let web3 = new Web3("http://127.0.0.1:8545");

const router = express.Router();
require('dotenv').config();

var dataTable = [
    {
        data: {
            noxcode: "nox2003",
            cid: "QmbJUYRPXmJSGd1SLwkUu5Tqbqp7SJG86bJ8icVW4pgGW5",
        }
    },
    {
        data: {
            noxcode: "nox2004",
            cid: "QmSB9U7HaPv6vUWbs8o57ZTET5s33WLDcoekbQJR6pfhVh",
        }
    },
    {
        data: {
            noxcode: "nox2005",
            cid: "QmZPgQGMFAf4USsMiGs68ekq67EfzxmQTCLZhcqePuoYo5",
        }
    },
    {
        data: {
            noxcode: "nox2006",
            cid: "QmVqb9hMc668iBEBpifS2AxkypcKe38tqudzqiRV8siqpZ",
        }
    },
    {
        data: {
            noxcode: "nox2007",
            cid: "Qmbp4EW92FM7D5dJUxd3pVWFeZVC785g9bz1Gu1zj9F6tG",
        }
    },
    {
        data: {
            noxcode: "nox2008",
            cid: "QmQ1qjZVbVA2ssJf4EznwChfoYnwJkyEoKQqdXP5ULqJMS",
        }
    },
    {
        data: {
            noxcode: "nox2009",
            mean: "QmSzsKVeU37TG4xDUHiEgQio4JfE3JMqNYQB4J5J7G6b86",
        }
    },
    {
        data: {
            noxcode: "nox2010",
            cid: "QmeoxF1BKdqfYQfWrS5TB9mJQdnaqWvWUcHonzdmyxsEKd",
        }
    },
    {
        data: {
            noxcode: "nox2011",
            cid: "QmRpfiKhcYXCfChB6MPShBvVjZjACLA6rugMUWkAhnv23g",
        }
    },
    {
        data: {
            noxcode: "nox2012",
            cid: "QmUEcqETWEg4EeNicX3t4Sn3EY4geLJQLa3AyHUWQFWgJ8",
        }
    },
    {
        data: {
            noxcode: "nox2013",
            cid: "QmZuXbLFKiwx4K7XyXQbh9maDadjPEyE5wWuUbiXxtUnrr",
        }
    },
];

// This function calculates the Mean of the nox for a single datatable
async function calculateAverage(size, jsonObject, noxyear){
    // reinitialize the sum and mean to 0 before every Calculation
    var annual_sum = new Decimal(0)
    var annual_mean = new Decimal(0)
    var true_size = size 
    
    // loops through the jsonObject and sums the annual_mean nox values
    for (var j = 0; j < size; j++){
        var variable = jsonObject[j][noxyear]
        
        try{
            if(typeof(variable) == "number")
                var nox_Value = await new Decimal(variable)
            else {
                throw("Error: Undefined type")
            }   
        }catch(err){
            true_size -= 1
            console.log(j + " " + err)
        }

        annual_sum = Decimal.add(annual_sum, nox_Value)
    }
    console.log(annual_sum)
    console.log("Finished sum")

    // find annual mean for all of london
    annual_mean = Decimal.div(annual_sum, true_size)

    return annual_mean;
}

/** 
 *  @dev retrieve data from FFS by cid
 *  @param {string} cid - The cid of the data
 * */
const getDataFromFFS = async(req, res, next) => {

    const authToken = '14cf3d7d-1e4b-4109-9ce5-a5f63a00dfb1';
    // sets the authToken to the instance
    pow.setToken(authToken);

    const cid = dataTable[req.params.id].data.cid;

    try{

        const logsCancel = pow.ffs.watchLogs((cid) => {
            console.log(`received event for cid ${logEvent.cid}`)
        }, cid)

        var bytes = await pow.ffs.get(cid);
        console.log(bytes);
        const strj = new TextDecoder("utf-8").decode(bytes);
        
        const jsonObj = csv2json(strj, {parseNumbers: true});
        console.log(jsonObj);
        console.log(typeof(jsonObj));

        console.log(jsonObj[0]['nox2008'])

        var noxyear = dataTable[req.params.id].data.noxcode;
        
        // obtain the length of the json object(# of rows in csv)
        var dataTableSize = Object.keys(jsonObj).length;
        console.log("Datatable has length of " + dataTableSize);

        // create Decimal Instance for Mean
        var mean = new Decimal(0);
        // caluclate the Average of mean of the Nox in the Particular year
        req.getNoxMean = await calculateAverage(dataTableSize, jsonObj, noxyear);
        req.getNoxValue = req.getNoxMean * 1e18;

    }catch(error){
        console.log(error);
    }

    console.log("Converted NOxValue: " + req.getNoxValue + " = " + req.getNoxMean + " * 1e18" );

    next();
}

// will call the fetch the NOx value and update the contract
const fetchNOxAndUpdateContract = async (req, res, next) => {

    try{
        var contract = new web3.eth.Contract(smartgreenbond.abi, process.env.SMARTGREENBOND_ADDRESS, {
            from: process.env.ORACLE_ADDRESS, // default from address
            gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
            gas: '6721975',
        });
        // Transaction Object
        var tx = {
            // this could be provider.addresses[0] if it exists (ORACLE ADDRESS)
            from: process.env.ORACLE_ADDRESS, 
            // target address, this could be a smart contract address (EXAMPLE CONTRACT ADDRESS)
            to: process.env.SMARTGREENBOND_ADDRESS, 
            // optional if you want to specify the gas limit 
            gas: '6721975', 

            gasPrice: '20000000000',
            // this encodes the ABI of the method and the arguements
            data: await contract.methods.updateTotalOwed(`${req.getNoxValue}`).encodeABI()
        };
    }catch(error){
        console.log(error);
    }


    const { info } = await pow.ffs.info();
    console.log("Powergate Instance");
    console.log(info);
    
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
            console.log(err);
    });

    res.send(req.params.id);
}

router
  .route('/update/:id')
  .get(getDataFromFFS,fetchNOxAndUpdateContract);

module.exports = router;