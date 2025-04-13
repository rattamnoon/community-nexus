// This file acts as a bridge between ESM and CommonJS
const { default: AppDataSource } = require('./src/config/data-source');
module.exports = AppDataSource;
