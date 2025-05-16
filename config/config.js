require('dotenv').config();

function validateEnvVars() {
    const requiredEnvVars = [
        'MONGODB_USERNAME',
        'MONGODB_PASSWORD',
        'MONGODB_HOST',
        'DATABASE',
        'DATABASE_CRAQUE',
        'PROCESSING_QUEUE_URL',
        'AWS_REGION'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
}

module.exports = { validateEnvVars };