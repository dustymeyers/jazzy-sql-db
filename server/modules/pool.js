const pg = require('pg');

// CREATE a connection to our database
const pool = new pg.Pool({
  // This option is required
  database: 'jazzy_sql',

  // These options are not required,
  // but you may see them around
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
