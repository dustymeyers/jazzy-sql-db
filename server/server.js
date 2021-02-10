const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

// CREATE a connection to our database
const pool = new pg.Pool({
  // This option is required
  database: 'jazzy_sql',

  // These options are not required,
  // but you may see them around
  host: 'localhost',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// TODO - Replace static content with a database tables
/* 
const artistList = [
  {
    name: 'Ella Fitzgerald',
    birthdate: '04-25-1917',
  },
  {
    name: 'Dave Brubeck',
    birthdate: '12-06-1920',
  },
  {
    name: 'Miles Davis',
    birthdate: '05-26-1926',
  },
  {
    name: 'Esperanza Spalding',
    birthdate: '10-18-1984',
  },
];
const songList = [
  {
    title: 'Take Five',
    length: '5:24',
    released: '1959-09-29',
  },
  {
    title: 'So What',
    length: '9:22',
    released: '1959-08-17',
  },
  {
    title: 'Black Gold',
    length: '5:17',
    released: '2012-02-01',
  },
]; */

app.get('/artist', (req, res) => {
  console.log(`In /songs GET`);
  // Query the database
  pool
    .query('SELECT * FROM "artists"')
    // get back DB results
    .then(function (dbRes) {
      // console.log(dbRes.rows);
      res.send(dbRes.rows);
    })
    // or handle DB error
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST /artist
 *
 * Request body looks like:
 * { name: 'This is a test artist', birthdate: '10-17-1992' }
 */
app.post('/artist', (req, res) => {
  /**
   * Query should look like this:
   *
   * INSERT INTO "artists"
   *    ("name", "birthdate")
   * VALUES
   *    ('Ella Fitzgerald', '04-25-1917')
   */
  let artistQueryString = `
    INSERT INTO "artists"
        ("name", "birthdate")
    VALUES
        ($1, $2);
  `;
  let artistQueryArg = [
    req.body.name, // $1
    req.body.birthdate, // $2
  ];

  console.log('new artist is:', req.body);
  pool
    .query(artistQueryString, artistQueryArg)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/song', (req, res) => {
  console.log(`In /songs GET`);
  // Query the database
  pool
    .query('SELECT * FROM "songs"')
    // Get back database results
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    // Or handle DB Error
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  // res.send(songList);
});

/**
 * POST /song
 *
 * Request body looks like:
 * { title: 'Test Song', length: '6:66', released: '06-06-1966' }
 */
app.post('/song', (req, res) => {
  console.log(req.body);
  let songQueryString = `
  INSERT INTO "songs"
      ("title", "length", "released")
  VALUES
      ($1, $2, $3);
  `;

  let songQueryArg = [
    req.body.title, // $1
    req.body.length, // $2
    req.body.released, // $3
  ];
  pool
    .query(songQueryString, songQueryArg)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
