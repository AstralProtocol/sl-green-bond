const power = require("@textile/powergate-client");
const fs = require("fs");
const { create } = require("domain");
const host = "http://localhost:6002"; // Powergate Instance PORT
const pow = power.createPow({ host });
const path = require('path');


console.log(pow);

async function bindAuthToken() {
  try {
    const { token } = await pow.ffs.create(); // save this token for later use!\
    console.log(token);
    // sets the authToken to the powergate instance
    pow.setToken(token);
  } catch (error) {
    console.log(error);
  }
}

// load the data to FFS
async function loadTheDataToFFSMacroFunction(){
    var num = ["/london-mapnox2003.csv", "/london-mapnox2004.csv", "/london-mapnox2005.csv", 
    "/london-mapnox006.csv", "/london-mapnox2007.csv", "/london-mapnox2008.csv", "/london-mapnox2009.csv", 
    "/london-mapnox2010.csv", "/london-mapnox2011.csv", "/london-mapnox2012.csv", "/london-mapnox2013.csv"];
 
    for (var i = 0; i < num.length; i++){
        const filePathBase = path.join(__dirname, "csv-nox", num[i]);
        try {
            await loadTheDataToFFS(filePathBase);
            await getInfoOnFFS();
        }catch(error){
            console.log(error)
        }
        console.log(filePathBase);
    }
}

/**
 *  @dev get general info about your ffs instance
 * */

async function getInfoOnFFS() {
  try {
    const { info } = await pow.ffs.info();
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

async function loadTheDataToFFS(filePath){

    try{
        // get wallet addresses associated with your FFS instance
        const { addrsList } = await pow.ffs.addrs()
        
        // 3) Get use the file path to import the file and cache
        const buffer = fs.readFileSync(filePath);
        const { cid } = await pow.ffs.stage(buffer);
        console.log(buffer);
        console.log(cid);

        // 4) store the Data in the FFS instance. We need to save the auth toke nto retrieve it again
        const { jobId } = await pow.ffs.pushStorageConfig(cid);
        
        console.log("The Job ID: " + jobId);
    }
    catch(error){
        console.log(error);
    }
    
}

// Runs the script 
async function startScript(){
    try{
        await bindAuthToken();
        await loadTheDataToFFSMacroFunction();
    }catch(error){
        console.log(error);
    }    
}

// The start script:
startScript();
//console.log("The Auth Token for this instance is " + tokenForThisInstance);
console.log(
  "Save the token to retrieve these files later and re-access this instance of Powergate"
);
