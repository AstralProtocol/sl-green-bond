const power = require("@textile/powergate-client");
const fs = require("fs");
const { create } = require("domain");
const host = "http://localhost:6002"; // Powergate Instance PORT
const pow = power.createPow({ host });
    

console.log(pow);

async function bindAuthToken() {
    const { token } = await pow.ffs.create(); // save this token for later use!\
    console.log(token);
    // sets the authToken to the powergate instance
    pow.setToken(token)
}


//const authToken = '3a5b27c3-9c9d-4d6c-9f82-9c612803ad92';
// sets the authToken to the instance
//pow.setToken(authToken)

// Generate and the Set the Auth Token 
async function generateAndSetAuthToken() {
    try{
        const { token } = await pow.ffs.create(); // save this token for later use!
        console.log(token);
    }
    catch(error){
        console.log(error);
    }
}

// get general info about your ffs instance
async function loader(){
    var num = ["03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13"];
    // Test File path 
    for (var i = 0; i < num.length; i++){
        const filePathBase = "./csv-nox/london-mapnox20" + num[i] + ".csv";
        await loadTheDataToFFSMacroFunction(filePathBase);
        await getInfoOnFFS();
        console.log(filePathBase);
    }
}

/**
 *  @dev get general info about your ffs instance
 * */ 
async function getInfoOnFFS(){
    try{
        const { info } = await pow.ffs.info();
        console.log(info);
    }
    catch(error){
        console.log(error);
    } 
    
}

async function loadTheDataToFFSMacroFunction(filePath){

    try{
        // get wallet addresses associated with your FFS instance
        const { addrsList } = await pow.ffs.addrs()

        // create a new address associated with your ffs instance
        //const { addr } = await pow.ffs.newAddr("minerAddress")
            
        // get general info about your ffs instance
        //const { info } = await pow.ffs.info()
        
        // 3) Get use the file path to import the file and cache
        const buffer = fs.readFileSync(filePath);
        const { cid } = await pow.ffs.stage(buffer);
        console.log(buffer);
        console.log(cid);

        // 4) store the Data in the FFS instance. We need to save the auth toke nto retrieve it again
        const { jobId } = await pow.ffs.pushStorageConfig(cid);
        
        console.log(jobId);
        const job = jobId;
        
        // 5) watch the Job status
        /*
        const jobsCancel = pow.ffs.watchJobs((job) => {
            if (job.status === JobStatus.JOB_STATUS_CANCELED) {
            console.log("job canceled")
            } else if (job.status === JobStatus.JOB_STATUS_FAILED) {
            console.log("job failed")
            } else if (job.status === JobStatus.JOB_STATUS_SUCCESS) {
            console.log("job success!")
            }
        }, jobId)

        console.log(jobsCancel);*/
        // 6) Send the Fil to the miner
        //await pow.ffs.sendFil(addrsList[0].addr, addr, amountOfFil);
    }
    catch(error){
        console.log(error);
    }
    
}


// Runs the script 
bindAuthToken();
loader();



