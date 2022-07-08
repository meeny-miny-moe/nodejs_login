// lowdb 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(__dirname + '/db.json');
const db = low(adapter)
db.defaults(
  {
    users:[],
    files:[],
    msg:[]
  }
).write();

module.exports = db;
