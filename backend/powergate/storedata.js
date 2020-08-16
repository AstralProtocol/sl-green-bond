const power = require("@textile/powergate-client");
const fs = require("fs");
const host = "http://localhost:6002"; // Powergate Instance PORT

// Test File path 
const filePath = `./csv-nox/london-mapnox2003.csv`;



const pow = power.createPow({ host });
console.log(pow);
generateAndSetAuthToken();
checkNetworkHealthAndViewPeers();


getPowerWalletAddressList()
cacheData(filePath)
storeDataInFFS(cid)
watchJobStatus(jobId)
sendFilTo(senderAddress, minerAddress, amountOfFil)


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

/**
 *  @dev Checks the Network Health
 *  */ 
async function checkNetworkHealthAndViewPeers () {
    //const { status, messagesList } = await pow.health.check();
    const { peersList } = await pow.net.peers()
    return peersList;
    
}

/**
 *  @dev Creates a new address associated with your FFS instance
 *  @returns {string} 
 * */ 
async function createNewWallet(){
    try{
        const { addr } = await pow.ffs.newAddr("my new addr");
    }
    catch(error){
        console.log(error);
    }
    return addr;
}

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

/** 
 *  @dev Cache data in IPFS in preparation to store it using FFS
 *  @param {string} filePath - The path of the file.
 *  @returns {string} 
 * */
async function cacheData(filePath){
    //const buffer = fs.readFileSync(`path/to/a/file`)
    try{
        const buffer = fs.readFileSync(filePath);
        const { cid } = await pow.ffs.stage(buffer);
    }
    catch(error){
        console.log(error);
    }
    return cid;
}

/** 
 *  @dev store the data in FFS using the default storage configuration
 *  @param {string} cid - The cid of the data
 * */
async function storeDataInFFS(cid){
    try{
        const { jobId } = await pow.ffs.pushStorageConfig(cid);
    }
    catch(error){
        console.log(error);
    } 
    return jobId;
}

/** 
 *  @dev send FIL from an address managed by your FFS instance to any other address
 *      [Note:] needs to be called before every request and after every retrieval of data from the miner
 *  @param {string} senderAddress - Address of the Sender
 *  @param {string} minderAddress - Address of the Miner 
 *  @param {string} amountOfFil - The Amount of FIL the Sender wants to send the Miner
 * */ 
async function sendFilTo(senderAddress, minerAddress, amountOfFil) {
    try{
        await pow.ffs.sendFil(senderAddress, minerAddress, amountOfFil);
    }catch(error){
        console.log(error);
    }
}

/** 
 *  @dev watch the FFS job status to see the storage process progressing
 *  @param {string} jobId - The job ID
 *  @returns {string}
 * */
function watchJobStatus(jobId) {
    const jobsCancel = pow.ffs.watchJobs((jobId) => {
        if (job.status === JobStatus.JOB_STATUS_CANCELED) {
          console.log("job canceled")
        } else if (job.status === JobStatus.JOB_STATUS_FAILED) {
          console.log("job failed")
        } else if (job.status === JobStatus.JOB_STATUS_SUCCESS) {
          console.log("job success!")
        }
      }, jobId)
    
    return jobsCancel;
}