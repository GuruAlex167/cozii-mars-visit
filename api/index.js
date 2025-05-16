// /api/index.js
const serverless = require('serverless-http');
const expressApp = require('../server/server'); // import your existing app

module.exports = serverless(expressApp);
