const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ligaDbConnection } = require('../../infrastructure/database/connect-database');

async function createLigaModel() {
  const dbConnection = await ligaDbConnection(); // Garante que a conexão esteja estabelecida

  const ligaSchema = new Schema({
    bubbleId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    season: {
      type: Number,
      required: true
    },
    leagueId: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    fixtures: [String] // Assumindo que os IDs das fixtures são armazenados como strings
  });

  return dbConnection.model('Liga', ligaSchema, 'ligas');
}

module.exports = { createLigaModel };

