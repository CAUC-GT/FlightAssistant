// pages/ordinaryTodoInfo/ordinaryTodoInfo.js
const db = wx.cloud.database();
const todos = db.collection("todos");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {}
  },

  pageData: {
    id: null
  },

  finish: function (e) {
    todos.doc(this.pageData.id).update({
      data: {
        process: 0,
      },
      success: function (res) {
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
  },

  delete: function (e) {
    todos.doc(this.pageData.id).update({
      data: {
        state: 0,
      },
      success: function (res) {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageData.id = options.id;
    todos.doc(options.id).get().then(res => {
      this.setData({
        task: res.data,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})