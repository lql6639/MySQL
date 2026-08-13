
// const crypto = require('crypto')

// GMT(UTC + 0)

const time = new Date().toUTCString()

console.log(time)   // Mon, 10 Aug 2026 19:11:38 GMT

// 本地(UTC + 8)

const Time = new Date().toString()

console.log(Time)   // Tue Aug 11 2026 03:11:38 GMT+0800 (中国标准时间)

// Refresh Token

const refreshToken = crypto.randomUUID(256).toString('hash')

console.log(refreshToken)
