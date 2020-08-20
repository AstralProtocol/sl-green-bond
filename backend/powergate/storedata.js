const power = require("@textile/powergate-client");
const fs = require("fs");
const { create } = require("domain");
const host = "http://localhost:6002"; // Powergate Instance PORT
const pow = power.createPow({ host });

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

//const authToken = '3a5b27c3-9c9d-4d6c-9f82-9c612803ad92';
// sets the authToken to the instance
//pow.setToken(authToken)

// get general info about your ffs instance
async function loadTheDataToFFSMacroFunction() {
  var num = ["03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13"];
  // Test File path
  for (var i = 0; i < num.length; i++) {
    const filePathBase = "./csv-nox/london-mapnox20" + num[i] + ".csv";
    await loadTheDataToFFS(filePathBase);
    await getInfoOnFFS();
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

async function loadTheDataToFFS(filePath) {
  try {
    // get wallet addresses associated with your FFS instance
    const { addrsList } = await pow.ffs.addrs();

    // 3) Get use the file path to import the file and cache
    const buffer = fs.readFileSync(filePath);
    const { cid } = await pow.ffs.stage(buffer);
    console.log(buffer);
    console.log(cid);

    // 4) store the Data in the FFS instance. We need to save the auth toke nto retrieve it again
    const { jobId } = await pow.ffs.pushStorageConfig(cid);

    console.log("The Job ID: " + jobId);
  } catch (error) {
    console.log(error);
  }
}

// Runs the script
async function startScript() {
  try {
    await bindAuthToken();
    await loadTheDataToFFSMacroFunction();
  } catch (error) {
    console.log(error);
  }
}

// The start script:
startScript();
//console.log("The Auth Token for this instance is " + tokenForThisInstance);
console.log(
  "Save the token to retrieve these files later and re-access this instance of Powergate"
);
