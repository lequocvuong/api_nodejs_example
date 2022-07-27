var moment = require("moment-timezone");
const axios = require('axios');
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['58.186.85.189:31090', '58.186.85.189:31091']
});
  
const producer = kafka.producer({
    allowAutoTopicCreation: false,
    transactionTimeout: 30000
});

async function getDataList() {
    const url = 'https://vcc-web1.vinaphone.com.vn/0889685656/api/v1/calls?';
    var isNext = true;
    var pageIdx = 0;
    const format = 'YYYY-MM-DD';
    const startTimeSince = moment(new Date()).format(format) + 'T00:00:00Z';
    const startTimeTo = moment(new Date()).format(format) + 'T23:59:59Z';
    await producer.connect();
    while (isNext) {
        ++pageIdx;
        const vccList = await getVccData(url, startTimeSince, startTimeTo, pageIdx);
        if(vccList == null || vccList.length == 0) {
            isNext = false;
            console.log('no data to fetch');
        } else {
            console.log('syncVcc success');

            await producer.send({
                topic: 'tp-sync-vcc',
                messages: [
                    { value: JSON.stringify(vccList) },
                ],
            });
        }

        await sleep(3000);
    }
    // await producer.disconnect();
}

async function getDataMissList() {
    const url = 'https://vcc-web1.vinaphone.com.vn/0889685656/api/v1/calls?';
    var isNext = true;
    var pageIdx = 0;
    const format = 'YYYY-MM-DD';
    const startTimeSince = moment(new Date()).format(format) + 'T00:00:00Z';
    const startTimeTo = moment(new Date()).format(format) + 'T23:59:59Z';
    await producer.connect();
    while (isNext) {
        ++pageIdx;
        const vccList = await getVccData(url, startTimeSince, startTimeTo, pageIdx, "0", "miss");
        if(vccList == null || vccList.length == 0) {
            isNext = false;
            console.log('no data to fetch');
        } else {
            console.log('syncVccMiss success');

            await producer.send({
                topic: 'tp-sync-vcc-miss',
                messages: [
                    { value: JSON.stringify(vccList) },
                ],
            });
        }

        await sleep(3000);
    }
    // await producer.disconnect();
}

async function getVccData(url, startTimeSince, startTimeTo, pageIdx, callType, callStatus) {
    try {
        url = url + 'start_time_since=' + startTimeSince + '&start_time_to=' + startTimeTo + '&page=' + pageIdx + '&count=500'; 
        if(callType) url = url + '&call_type=' + callType;
        if(callStatus) url = url + '&call_status=' + callStatus;
        console.log('url: ' + url);

        var config = {
            method: 'get',
            url: url,
            headers: { 
                'Authorization': 'Bearer 5XTTp2q2i5ceFOI', 
            }
        };
        
        let res = await axios(config);
        console.log(res.status);
        if(res.status == 200) {
            if(res.data.code == 'OK') {
                console.log('numFound: ' + res.data.numFound + ", length: " + res.data.calls.length);
                return res.data.calls;
            }
        } 
        return null;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function isEmpty(value){
    return (value == null || value.length === 0);
}
module.exports = {
    getDataList,
    getDataMissList
};
  