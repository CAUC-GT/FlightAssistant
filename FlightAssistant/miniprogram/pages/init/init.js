// pages/init/init.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUser: function (e) {
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
    wx.setStorageSync('nickName', e.detail.userInfo.nickName);
    wx.switchTab({
      url: '../todo/todo',
    });
  },

  skip: function (e) {
    wx.switchTab({
      url: '../todo/todo',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (e) {
              wx.setStorageSync('avatarUrl', e.userInfo.avatarUrl);
              wx.setStorageSync('nickName', e.userInfo.nickName);
              wx.switchTab({
                url: '../todo/todo',
              });
            }
          })
        }
      }
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