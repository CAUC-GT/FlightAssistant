// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
let db=cloud.database();
// 云函数入口函数
exports.main = async (event, context, cb) => {
  return await db.collection('flights').where({
    flight_destination:event.flight_destination,
    flight_day:event.flight_day,
  }).get();
}