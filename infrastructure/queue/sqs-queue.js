const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'us-east-1' });

async function sendMessageToQueue(queueUrl, messageBody) {
    console.log('Sending message to queue', queueUrl);
    const params = {
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(messageBody)
    };
    return sqs.sendMessage(params).promise();
}

module.exports = { sendMessageToQueue };