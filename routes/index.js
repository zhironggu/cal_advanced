var express = require('express');
const mysql = require("mysql");
var router = express.Router();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'GZRyuna0715!',
    database: 'calculator',
    port: '3306'
});

/* GET home page. */
connection.connect((err) => {
    if (err) throw err;
    console.log(`连接成功`)
});

router.post('/addHistory', function (req, res) {

    let expression = req.body.expression;
    if (expression) {
        let query = connection.query("INSERT INTO history(id,expression)VALUES(null,?)", expression, function (error, results, fields) {
            if (error) throw error;
        })
    }
    res.send(req.body);
})

router.get('/getHistory', function (req, res) {

    let sql = 'select * from history  ORDER BY id DESC LIMIT 10';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        } else {
            res.send(result);
        }
    })
})
// 存款利率
router.get('/getDepositInterestRate', function (req, res) {
    let time = req.query.time;
    let sql
    if (time < 3) {
        sql = 'select * from deposit_rate where month = 0';
    } else if (time <= 6) {
        sql = 'select * from deposit_rate where month = 3';
    } else if (time <= 12) {
        sql = 'select * from deposit_rate where month = 6';
    } else if (time <= 24) {
        sql = 'select * from deposit_rate where month = 12';
    } else if (time <= 36) {
        sql = 'select * from deposit_rate where month = 24';
    } else if (time <= 60) {
        sql = 'select * from deposit_rate where month = 36';
    } else {
        sql = 'select * from deposit_rate where month = 60';
    }
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        } else {
            res.send(result[0]);
        }
    })
})
// 贷款利率
router.get('/getLendingRate', function (req, res) {

    let time = req.query.time;
    let sql
    if (time > 6 && time<12) {
        sql = 'select * from lending_rate where month = 6';
    } else if (time == 12) {
        sql = 'select * from lending_rate where month = 12';
    } else if (time > 12 &&time < 36) {
        sql = 'select * from lending_rate where month = 36';
    } else if (time > 36 &&time < 60) {
        sql = 'select * from lending_rate where month = 60';
    } else  {
        sql = 'select * from lending_rate where month = -1';
    }
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        } else {
            res.send(result[0]);
        }
    })
})
module.exports = router;
