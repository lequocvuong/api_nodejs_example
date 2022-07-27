const { Pool } = require('pg')
const db = new Pool({
  user: "postgres",
  host: "10.78.4.41",
  database: "calldb_production",
  password: "medon@123",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 600000,
  connectionTimeoutMillis: 30000
});
module.exports = db;
