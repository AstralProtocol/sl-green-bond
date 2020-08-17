const power = require("@textile/powergate-client");
const fs = require("fs");
const Decimal = require('decimal.js');
const { create } = require("domain");
const host = "http://localhost:6002"; // Powergate Instance PORT
const pow = power.createPow({ host });

//const csv = require('csvtojson');

const csv2json = require('csvjson-csv2json');

const authToken = '14cf3d7d-1e4b-4109-9ce5-a5f63a00dfb1';
// sets the authToken to the instance
pow.setToken(authToken);

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






/**
 *  @dev Get wallet addresses associated with your FFS instance
 *  @returns {Array}
 * */
async function getPowerWalletAddressList() { 
    try{
        const { addrsList } = await pow.ffs.addrs();
    }
    catch(error){
        console.log(error);
    }
    return addrsList;
}

getInfoOnFFS()
getDataFromFFS(0);