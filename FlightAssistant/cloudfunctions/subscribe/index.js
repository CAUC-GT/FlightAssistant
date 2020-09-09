// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await db.collection('messages').add({
      data: {
        touser: event.userInfo.openId,
        page: 'index',
        data: event.data,
        templateId: event.templateId,
        date: new Date(event.date),
        done: false,
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}