console.log(new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }));

const fs = require('fs')
fs.appendFile('x.txt', "vcl", (err) => { console.log(err); })