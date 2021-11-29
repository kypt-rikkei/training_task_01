const fs = require('fs');
const ioHook = require("iohook")

ioHook.on('keypress', function (event) {
    console.log(event)
})

fs.writeFileSync('text.txt', "Start =====>\n");
setInterval(() => {
    fs.appendFile('text.txt', "" + Date() + "\n", function (err) {
        console.log(err)
    })
}, 1000);