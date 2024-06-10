const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ligaDbConnection } = require('../../infrastructure/database/connect-database');

async function createProcessingStateModel() {
    const dbConnection = await ligaDbConnection();

    const processingStateSchema = new Schema({
        bubbleId: { type: String, required: true, index: true },
        userId: { type: String, required: true, index: true },
        fixtureId: { type: Number, required: true, index: true },
        step: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    });

    return dbConnection.model('ProcessingState', processingStateSchema, 'processing_state');
}

module.exports = { createProcessingStateModel };
