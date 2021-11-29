'use strict'
// synchronize data at 6h30AM everyday by cron job

let currentTime = new Date()
let toDay = currentTime.getDate() + "/" + currentTime.getMonth() + "/" + currentTime.getFullYear()
let CronJob = require("cron").CronJob
let fs = require("fs")
let mysql = require("mysql")

function sync(separated_character) {
    // get data from file text
    let presses = fs.readFileSync('text.txt', 'utf8')
    let keyPressArr = presses.split(separated_character)
    // create query
    let query = "start transaction;\n"
    query += "delete from keypress_histories;\n"
    query += "insert into keypress_histories(key_name) values "
    keyPressArr.forEach((keyPress) => {
        if (keyPress === "") {
        } else {
            query += "('" + keyPress + "'),"
        }
    });
    query = query.slice(0, query.length - 1)
    query += ";\n"
    query += "commit;"
    // start connect and sync to db
    try {
        let conn
        conn = mysql.createConnection({
            host: '127.0.0.11',
            user: 'root',
            password: '',
            port: '3340',
            database: 'node_db',
            multipleStatements: true,
        });
        conn.query(query)
    } catch (err) {
        console.log(err)
        console.log("!!! " + toDay + ": Synchronize failed!")
        return false
    } finally {
    }
    console.log("*** " + toDay + ": Synchronize completed!")
    return true
}

let job = new CronJob('* * * * * *',
    () => {
        sync("\n")
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
);

job.start()
