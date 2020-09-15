// pages/searchPackageResult/searchPackageResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ //this.setData的方法用于把传递过来的id转化成小程序模板语言
      flight_no: options.flight_no
    })
    wx.cloud.callFunction({
      name:"searchByPackage",
      data:{
          ffid:that.data.flight_no,
      }
  }).then(res => {
      console.log(res);
      that.setData({items:res.result.data});
    })
    // wx.request({
    //     url: "http://114.116.32.124:9000/findPackage",
    //     method: 'get',
    //     data: {
    //       ffid:that.data.flight_no,
    //       fatt:"",
    //       btid:"",
    //       code:"",
    //       btsc:""
    //     },
    //     header: {
    //         'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     },
    //     success(res) {
    //         that.setData({items: res.data});
    //         console.log(that.data.items);
    //     }
    // })
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