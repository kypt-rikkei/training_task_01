const mysql2 = require("mysql2")
const fs = require("fs")
const bluebird = require("bluebird")

async function create_conn(){
    var conn = mysql2.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "node_db",
        port: "3340",
        Promise: bluebird
    })
}

function get_client_id(ip_address) {
    let res
    conn.execute("select id from client where ip_address='" + ip_address + "'", (err, results, _) => {
        if (err) {
            console.log(err)
        } else {
            res = results
        }
    })
    return res
}

function to_key_and_time(str) {
    str = str.trim()
    let [key, time] = str.split("|")
    key = key.substring(1, key.length - 1)
    return
}

function to_query(key, time) {

}

function execute_sync(ip_address) {
    data = fs.readFileSync(ip_address + ".txt", 'utf-8')
    dataArr = data.split("\n")
    dataArr.forEach(element => {
        element += "TTT"
    })
    console.log(dataArr);
}

console.log(get_client_id("127.0.0.1"));