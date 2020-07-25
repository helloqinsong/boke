const sql = require('mysql');
const database = require('./config')

let connection = sql.createConnection(database);

const queryDataByMysql = sql => {
    return new Promise((resolve,reject) => {
        connection.query(sql,(err,res) => {
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}
module.exports = {
    queryDataByMysql
}

