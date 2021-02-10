const express = require('express');

const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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

module.exports = router;
