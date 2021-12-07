const http = require('http')
const host = 'localhost'
const port = '8000'
const url = require('url')
const mysql = require('mysql2')
let pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "node_db",
    port: "3340",
})
let promisePool = pool.promise()

async function requestListener(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader("Content-Disposition", "attachment;filename=capture_keypresses.csv");
    res.writeHead(200);
    let csv_data = ''
    let queryClients = await promisePool.query('select * from client')
    clients = queryClients[0]
    let queryKeyPress = await promisePool.query('select * from key_press')
    keyPressesAllClient = queryKeyPress[0]
    clients.forEach(client => {
        keyPresses = []
        keyPressesAllClient.forEach(keyPressesClient => {
            if (keyPressesClient.client_id == client.id) {
                keyPresses.push(keyPressesClient.key_name)
            }
        })
        csv_data += client.ip_address + ",\"" + keyPresses.join() + "\"\n"
    });
    res.end(csv_data.toString())
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log("Server is running on host ${host} and port ${port}");
})

