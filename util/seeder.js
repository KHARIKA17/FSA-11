/**
 * Seed the database with sample data.
 *
 * During development, drop & recreate the database on startup.
 *
 * Only as we move into production (and the app is stable) will we
 * begin to store real data.
 *
 * *
 */

// NEW! Best practices recommend:
// put ALL imports FIRST rather than 'hiding' them in code below
// use a LOGGER that writes to files / turns off console logging in production

const LOG = require('./logger');

module.exports = async (db) => {
    LOG.info('Starting seeder.......................');

    try {
        const syncResult = await db.sync({ force: true });
        LOG.info(`Recreated all tables: ${syncResult}`);
    } catch (err) {
        LOG.error(`ERROR: on sync process - ${err.message}`);
    }

    try {
        await db.models.Location.bulkCreate(
            [
                // first quest locations........
                { id: 11, name: 'Bearcat football stadium' },
                { id: 12, name: 'Colden Pond' },
                { id: 13, name: 'Bearcat Soccer field' },
                { id: 14, name: 'Field House' },

                // second quest locations........
                { id: 21, name: 'Bell tower' },
                { id: 22, name: 'Bearcat football stadium' },
                { id: 23, name: 'Colden Pond' },
                { id: 24, name: 'Bearcat Soccer field' },

       ],
            { validate: true } // add options object to call new model validators
        );
        const num = await db.models.Location.count();
        LOG.info(`Seeded ${num} locations.`);
    } catch (err) {
        LOG.error(`ERROR: Location seeding - ${err.message}`);
    }



    LOG.info('Done with seeder................');

    return db;
};