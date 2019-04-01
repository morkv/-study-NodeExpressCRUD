const moment = require('moment');

// Create middleware
// Every time we make a request this middleware gona be run!
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;