import wixData from 'wix-data';

export function logToDevLog(eventType, event) {
    let logEntry = {
        type: 'console',
        log: `Event Type: ${eventType}, Event Data: ${JSON.stringify(event)}`,
        timestamp: new Date() 
    };

    wixData.insert('devLog', logEntry)
        .then((results) => {
            console.log('Log submitted: ', results);
        })
        .catch((err) => {
            console.error('Error logging to devLog: ', err);
        });
}
