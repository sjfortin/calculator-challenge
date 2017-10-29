var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/', function (req, res) {
    pool.connect(function (errDatabase, client, done) {
        if (errDatabase) {
            console.log('Error connecting to database', errDatabase);
            res.sendStatus(500);
        } else {
            const now = new Date();
            client.query('INSERT INTO calculations (first_number, second_number, operator, date_created, name) VALUES ($1, $2, $3, $4, $5);', [req.body.first_number, req.body.second_number, req.body.operator, now, req.body.name], function (errQuery, data) {
                done();
                if (errQuery) {
                    console.log('Error making database query', errQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/', function (req, res) {
    pool.connect(function (errDatabase, client, done) {
        if (errDatabase) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM calculations ORDER BY date_created DESC LIMIT 10;', function (errQuery, data) {
                done();
                if (errQuery) {
                    console.log('Error making database query', errQuery);
                    res.sendStatus(500);
                } else {
                    res.send(data.rows);
                }
            });
        }
    });
});

module.exports = router;