const express =  require('express');
const mysql = require('mysql');
const app = express();
require('dotenv').config();


app.use(express.static('public'));


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASS,
    database: 'sample_db'
});



//テーブルのデータを取得してindex.ejsで表示
app.get('/' , (req, res) => {
    connection.query(
        'SELECT * FROM items',
        (error, results) => {
            res.render('index.ejs', {items: results});
        }
    );
});


connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('接続成功');
});

app.listen(3000);
