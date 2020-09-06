// pages/todo/todo.js
const db = wx.cloud.database();
const todos = db.collection("todos");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [],
  },

  pageDate: {
    skip: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  onPullDownRefresh: function () {
    this.getData(res => {
      this.pageDate.skip = 0;
      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });
  },

  onReachBottom: function () {
    this.getData();
  },

  getData: function (callback) {
    this.data.tasks = [];
    if (!callback) {
      callback = res => {}
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    todos.skip(this.pageDate.skip).where({
        state: 1,
      })
      .get().then(res => {
        let oldData = this.data.tasks;
        this.setData({
          tasks: oldData.concat(res.data),
        }, res => {
          this.pageDate.skip += 20;
          wx.hideLoading({
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
          callback();
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})