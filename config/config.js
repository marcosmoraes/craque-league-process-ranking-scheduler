require('dotenv').config();

function validateEnvVars() {
    const requiredEnvVars = ['MONGODB_USERNAME', 'MONGODB_PASSWORD', 'DATABASE', 'DATABASE_CRAQUE', 'PROCESSING_QUEUE_URL', 'FOOTBALL_API_KEY'];
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    });
}

module.exports = { validateEnvVars };