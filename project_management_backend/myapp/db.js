const { Pool } = require('pg');
const schedule = require('node-schedule');
const multer = require('multer');
require('dotenv').config();


console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
 
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
  },
  upload: multer ({
    storage: multer.memoryStorage(),
    limits: {
      fileSize:5*1024*1024,
    }
  })
};

