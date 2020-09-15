// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let now = Date.parse(new Date());
    const todos = await db.collection('todos').where({
      type: 1,
      process: 1,
    }).get();
    const sendPromises = todos.data.map(async todo => {
      return now > todo.takeoff_timestamp ? db.collection('todos').doc(todo._id).update({
        data: {
          process: 0
        }
      }) : null
    });
    return Promise.all(sendPromises);
  } catch (error) {
    console.log(error);
    return error;
  }
}