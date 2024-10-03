const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '2000',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'project management'
});



module.exports = {
  query: (text, params) => pool.query(text, params)
};