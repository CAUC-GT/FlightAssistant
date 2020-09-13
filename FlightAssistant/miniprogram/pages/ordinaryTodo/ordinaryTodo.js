// pages/ordinaryTodo/ordinaryTodo.js
const db = wx.cloud.database();
const todos = db.collection("todos");
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: null,
    position: null,
  },

  pageData: {
    locationObj: {},
  },

  selectImage: function (e) {
    wx.chooseImage({
      success: res => {
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*10000000)}.png`, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            this.setData({
              image: res.fileID,
            })
          },
          fail: console.error,
        });
      }
    })
  },

  chooseLocation: function (e) {
    wx.chooseLocation({
      success: res => {
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address,
        }
        this.pageData.locationObj = locationObj;
        this.setData({
          position: res.name,
        })
      }
    })
  },

  onSubmit: function (event) {
    if (event.detail.value.title.length == 0) {
      Toast.fail('请输入标题');
    } else {
      todos.add({
        data: {
          type: 0,
          title: event.detail.value.title,
          content: event.detail.value.content,
          image: this.data.image,
          location: this.pageData.locationObj,
          state: 1,
          process: 1,
        }
      }).then(res => {
        console.log(res._id);
        wx.showToast({
          title: 'Success',
          icon: 'success',
          success: res2 => {
            wx.switchTab({
              url: "../todo/todo",
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          }
        })
      })
    }
  }
})