const csv = require('csvtojson');
const Decimal = require('decimal.js');
const fs = require('fs');
const e = require('express');
const { data } = require('autoprefixer');

var dataTable = [
    {
        data: {
            noxcode: "nox2003",
            year: "2003",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2003.csv",
            json: "",    
        },
    },
    {
        data: {
            noxcode: "nox2004",
            year: "2004",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2004.csv",
            json: "",    
        },
    },
    {
        data: {
            noxcode: "nox2005",
            year: "2005",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2005.csv",
            json: "",     
        },
    },
    {
        data: {
            noxcode: "nox2006",
            year: "2006",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2006.csv",
            json: "",    
        },
    },
    {
        data: {
            noxcode: "nox2007",
            year: "2007",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2007.csv",
            json: "",  
        },
    },
    {
        data: {
            noxcode: "nox2008",
            year: "2008",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2008.csv",
            json: "", 
        },
    },
    {
        data: {
            noxcode: "nox2009",
            year: "2009",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2009.csv",
            json: "", 
        },
    },
    {
        data: {
            noxcode: "nox2010",
            year: "2010",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2010.csv",
            json: "", 
        },
    },
    {
        data: {
            noxcode: "nox2011",
            year: "2011",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2011.csv",
            json: "", 
        },
    },
    {
        data: {
            noxcode: "nox2012",
            year: "2012",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2012.csv",
            json: "",   
        },
    },
    {
        data: {
            noxcode: "nox2013",
            year: "2013",
            mean: 0,
        },
        file: {
            path: "../data/data-defra/london/csv/london-mapnox2013.csv",
            json: "", 
        },
    }
];

async function initializeDatabaseToJSON(){

    for (var i = 0; i < 11; i++) {
        // Set noxyear to the appropriate value
        var noxyear = dataTable[i].data.noxcode

        data_path = dataTable[i].file.path
    
        console.log(data_path)
        
        // Transform CSV to JSON and Calculate the Mean.
        try{
            const jsonObj = await csv().fromFile(data_path)

            // save the json object in the dataTables object
            dataTable[i].file.json = jsonObj

            // obtain the length of the json object(# of rows in csv)
            var dataTableSize = Object.keys(jsonObj).length
            console.log("Datatable has length of " + dataTableSize);

            // create Decimal Instance for Mean
            var mean = new Decimal(0)
            // caluclate the Average of mean of the Nox in the Particular year
            mean = await calculateAverageOftableSize(dataTableSize, jsonObj, noxyear)

            // update the dataTable Object to hold the mean for that year
            dataTable[i].data.mean = mean

        } catch(err){
            console.log(err)
        }
        
        console.log("The annual mean is: " + mean);

        console.log("Check: The annual mean is : " + dataTable[i].data.mean)
    }
    console.log("Successfully converted!")

    showResults(dataTable)
}

// This function calculates the Mean of the nox for a single datatable
async function calculateAverageOftableSize(size, jsonObject, noxyear){
    // reinitialize the sum and mean to 0 before every Calculation
    var annual_sum = new Decimal(0)
    var annual_mean = new Decimal(0)
    var true_size = size 
    
    // loops through the jsonObject and sums the annual_mean nox values
    for (var j = 0; j < size; j++){
        var variable = jsonObject[j][noxyear]
        
        try{
            if(variable != "")
                var nox_Value = await new Decimal(variable)
            else
                throw("Error: Undefined type")
        }catch(err){
            true_size--
            console.log(j + " " + err)
        }

        annual_sum = Decimal.add(annual_sum, nox_Value)
    }
    console.log("Finished sum")

    // find annual mean for all of london
    annual_mean = Decimal.div(annual_sum, true_size)

    return annual_mean
}

function showResults(dataTableParam){
    console.log(dataTableParam)
    console.log("")
}

initializeDatabaseToJSON()

// TODO: Have the Node server call constructor to initialize the Dataset, convert object into JSON object

// TODO: Write a Function to calculate the Coupon Rate and the Variable Interest Rate

// TODO: Write web3 functions in to query the data in the dataTables object

// TODO: Write Unit Tests, Integration Tests, and clean up code
