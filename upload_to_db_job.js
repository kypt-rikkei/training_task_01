const mysql2 = require("mysql2")
const fs = require("fs")
let CronJob = require('cron').CronJob

var conn = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "node_db",
    port: "3340",
})

let ipAddress = '127.0.0.1'


async function execute_sync(ip_address) {
    let client_id = -1
    await new Promise((resolve, reject) => {
        conn.query("select id from client where ip_address='" + ip_address + "'", (err, results, _) => {
            if (err) {
                console.log(err)
            }
            client_id = results[0].id
            resolve()
        })
    })
    let query = build_query(ip_address, client_id)
    await new Promise((resolve, reject) => {
        conn.query(query, (err, res, fields) => {
            if (!err) {
                fs.writeFileSync(ipAddress + '.txt', '')
                console.log('*** Synchronous complete! Time: ' + new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }));
            } else {
                console.log(err);
                console.log('!!! Synchronous FAILED! Time: ' + new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }));
            }
            resolve()
        })
    })

}


function to_key_and_time(str) {
    str = str.trim()
    let [key, time] = str.split("|")
    key = key.substring(1, key.length - 1)
    return [key, time]
}

function build_query(id_address, client_id) {
    let values = []
    data = fs.readFileSync(id_address + '.txt', 'utf8')
    data.split("\n").forEach(line => {
        if (line === "") {
        } else {
            let [key, time] = to_key_and_time(line)
            values.push("('" + client_id + "','" + key + "','" + time + "')")
        }
    })
    if (values.length == 0) {
        return null
    }
    return "insert into key_press(client_id,key_name,time_press) values" + values.toString() + ";"
}

let sync_job = new CronJob(
    '0,15,30,45 * * * * *',
    () => { execute_sync(ipAddress) },
    null,
    true,
    'Asia/Ho_Chi_Minh'
)

sync_job.start()
console.log("CronJob Upload DB STARTED ...")