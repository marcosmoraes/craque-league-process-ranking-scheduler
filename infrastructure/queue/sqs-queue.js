const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
    region: process.env.AWS_REGION,
    maxRetries: 3,
    httpOptions: {
        timeout: 5000
    }
});

async function sendMessageToQueue(queueUrl, messageBody) {
    if (!queueUrl || !messageBody) {
        throw new Error('Queue URL and message body are required');
    }

    try {
        const params = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(messageBody),
            MessageAttributes: {
                'Timestamp': {
                    DataType: 'String',
                    StringValue: new Date().toISOString()
                }
            }
        };

        const result = await sqs.sendMessage(params).promise();
        console.log('Message sent successfully:', result.MessageId);
        return result;
    } catch (error) {
        console.error('Error sending message to queue:', error.message);
        throw new Error('Failed to send message to queue');
    }
}

module.exports = { sendMessageToQueue };