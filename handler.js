const { validateEnvVars } = require('./config/config');
const { getOngoingLeagues } = require('./domain/service/league-service');
const { sendMessageToQueue } = require('./infrastructure/queue/sqs-queue');
const { closeAllConnections } = require('./infrastructure/database/connect-database'); // Importe a função closeConnection

exports.handler = async () => {
    console.log('Scheduler started.');
    let ligaConnection;
    let craqueConnection;

    try {
        validateEnvVars();

        const ongoingLeagues = await getOngoingLeagues();
        if (ongoingLeagues.length === 0) {
            console.log('No ongoing leagues found. Skipping processing.');
            return;
        }

        for (const league of ongoingLeagues) {
            await sendMessageToQueue(process.env.PROCESSING_QUEUE_URL, {
                bubbleId: league.bubbleId,
                fixtures: league.fixtures
            });
        }

        console.log('Leagues scheduled for processing.');
    } catch (error) {
        console.error('Error during scheduler execution:', error);
        throw new Error('Scheduler execution failed');
    } finally {
        await closeAllConnections();
    }
};
