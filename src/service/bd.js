const mysql = require('mysql2')
const conn = mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'netflixa'

    }
)

module.exports = conn