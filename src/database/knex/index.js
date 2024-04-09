const settings = require("./config/knexfile");
const knex = require("knex");
const connection = knex(settings.development);

module.exports = connection;