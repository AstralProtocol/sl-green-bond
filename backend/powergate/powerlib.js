const power = require("@textile/powergate-client");
const fs = require("fs");
const host = "http://0.0.0.0:5002"; // Powergate Instance PORT

const pow = power.createPow({ host });
console.log(pow);
generateAndSetAuthToken();


// Generate and the Set the Auth Token 
async function generateAndSetAuthToken() {
    try{
        const { token } = await pow.ffs.create(); // save this token for later use!
        //console.log(token);
    }
    catch(error){
        console.log(error);
    }
}

//pow.setToken(token);

/**
 *  @dev Checks the Network Health
 *  */ 
async function checkNetworkHealthAndViewPeers () {
    const { status, messagesList } = await pow.health.check();
    return (status, messagesList);
    
}

/**
 *  @dev Checks the Network Health
 *  */ 
async function viewPeers () {
    const { peersList } = await pow.net.peers();
    return (peersList);
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
 *  @dev get general info about your ffs instance
 * */ 
async function getInfoOnFFS(){
    try{
        const { info } = await pow.ffs.info();
    }
    catch(error){
        console.log(error);
    } 
    return info;
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
 *  @dev retrieve data from FFS by cid
 *  @param {string} cid - The cid of the data
 * */
async function getDataFromFFS(cid){
    try{
        const bytes = await pow.ffs.get(cid);
    }catch(error){
        console.log(error);
    } 
    return bytes;
}

/** 
 *  @dev get the current actual storage configuration for a cid
 *  @param {string} cid - The cid of the data
 * */
async function getActualStorageConfig(cid){
    try{
        const { cidInfo } = await pow.ffs.show(cid);
    }catch(error){
        console.log(error);
    } 
    return cidInfo;
}

/** 
 *  @dev get the current actual storage configuration for a cid
 *  @param {string} cid - get the current desired storage configuration for a cid (this configuration may not be realized yet)
 * */ 
async function getDesiredStorageConfig(cid){
    try{
        const { config } = await pow.ffs.getStorageConfig(cid)
    }catch(error){
        console.log(error);
    } 
    return config;
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
 *  @dev watch all FFS events for a cid
 *  @param {string} cid - The cid of the piece of data
 *  @returns {string}
 * */
function watchAllEvents(cid) {
    const logsCancel = pow.ffs.watchLogs((cid) => {
        console.log(`received event for cid ${logEvent.cid}`)
    }, cid)

    return logsCancel;
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