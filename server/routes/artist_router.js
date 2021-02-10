const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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

module.exports = router;
