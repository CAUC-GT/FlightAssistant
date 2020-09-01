// pages/flightTodo/flightTodo.js
const db = wx.cloud.database();
const todos = db.collection("todos");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    show: false,
    show2: false,
    currentTime: '12:00',
    minHour: 0,
    maxHour: 23,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  onConfirm2(event) {
    this.setData({
      show2: false,
      time: event.detail,
    });
  },

  onInput2(event) {
    this.setData({
      currentTime: event.detail,
    });
  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  showPopup2() {
    this.setData({
      show2: true
    });
  },

  onClose2() {
    this.setData({
      show2: false
    });
  },

  onSubmit: function (event) {
    todos.add({
      data: {
        flightno: event.detail.value.flightno,
        land: event.detail.value.land,
        takeoff: event.detail.value.takeoff,
        takeoff_date: this.formatDate(this.data.currentDate),
        takeoff_time: this.data.currentTime,
      }
    }).then(res => {
      console.log(res._id);
      wx.showToast({
        title: 'Success',
        icon: 'success',
        success: res2 => {
          // wx.redirectTo({
          //   url: `../todoInfo/todoInfo?id=${res._id}`,
          // })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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