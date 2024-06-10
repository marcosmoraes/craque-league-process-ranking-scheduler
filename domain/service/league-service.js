const { findActiveLeagues } = require('../../infrastructure/data-access/mongodb');

async function getOngoingLeagues() {
    return await findActiveLeagues();
}

module.exports = { getOngoingLeagues };
