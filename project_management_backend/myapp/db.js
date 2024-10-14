const { Pool } = require('pg');
const schedule = require('node-schedule');

const pool = new Pool({
  user: 'postgres',
  password: '2000',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'project management'
});

function cleanupTokens() {
  pool.query(`select delete_token`, (err, res) => {
    if (err) {
      console.log({ err });
    }
    else {
      console.log("token cleaned up successfully");
    }
  })
}

const job = schedule.scheduleJob("0 0 * * * ", cleanupTokens);




module.exports = {
  query: (text, params) => pool.query(text, params),
  startCleanUpJob: () => { console.log("task cleanup token just started"); },
  stopCleanUpJob: () => {
    job.cancel(); 
    console.log("task clean up tokens just cancelled");
  }
};

