const axios = require('axios');
const CronJob = require('cron').CronJob;

var count = 0;

async function updateNoxValue(index) {
    try {
        const response = await axios.get(`http://localhost:3000/update/${index}`);
        index = response.data;
        console.log('New Year: ' + response.data + '  ' + index);
    } catch (error) {
        console.log(error);
    }
}


//updateNoxValue();

// This is the Job that will perform the functionality every 5 of minutes
// Seconds, Minutes, Hours, Days of Month, Months (5th asterisk), Day of Week
var job = new CronJob('*/5 * * * *', function() {
    
    if(count<10){
        updateNoxValue(count);
        count++;
    }
    else{
        task.stop();
    }
});

job.start();
