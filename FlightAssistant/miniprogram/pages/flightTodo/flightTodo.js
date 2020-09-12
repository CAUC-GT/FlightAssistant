// pages/flightTodo/flightTodo.js
const db = wx.cloud.database();
const todos = db.collection("todos");
const tmpId = 'T5Go5dI7ZA9PWoy9DrdHlH2bwKrgv1jSdbb88dtL5Kc';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    date2: '',
    time2: '',
    show: false,
    show3: false,
    show4: false,
    show2: false,
    currentTime: '12:00',
    currentTime2: '12:00',
    minHour: 0,
    maxHour: 23,
    currentDate: new Date().getTime(),
    currentDate2: new Date().getTime(),
    minDate: new Date().getTime(),
    minDate2: new Date().getTime(),
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
      minDate2: event.detail,
    });
  },

  onConfirm2(event) {
    this.setData({
      show2: false,
      time: event.detail,
    });
  },

  onConfirm3(event) {
    this.setData({
      show3: false,
      date2: this.formatDate(event.detail),
    });
  },

  onConfirm4(event) {
    this.setData({
      show4: false,
      time2: event.detail,
    });
  },

  onInput2(event) {
    this.setData({
      currentTime: event.detail,
    });
  },

  onInput3(event) {
    this.setData({
      currentDate2: event.detail,
    });
  },

  onInput4(event) {
    this.setData({
      currentTime2: event.detail,
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

  showPopup3() {
    this.setData({
      show3: true
    });
  },

  onClose3() {
    this.setData({
      show3: false
    });
  },

  showPopup4() {
    this.setData({
      show4: true
    });
  },

  onClose4() {
    this.setData({
      show4: false
    });
  },

  onSubmit: function (event) {
    let date0 = new Date(new Date(this.data.date + " " + this.data.time + ":00").getTime() - 7200000);
    var timestamp = new Date(this.data.date + " " + this.data.time + ":00").getTime();
    const item = {
      thing10: {
        value: "航班行程提醒" + event.detail.value.flightno
      },
      thing1: {
        value: "请提早两个小时到机场进行值机哦"
      },
      date2: {
        value: this.formatDate(this.data.currentDate) + " " + this.data.currentTime
      },
      thing13: {
        value: "请关注机场的截止值机时间及时办理值机手续"
      }
    }
    wx.requestSubscribeMessage({
      tmplIds: [tmpId],
      success(res) {
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          wx.showLoading({
            title: '订阅中',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'subscribe',
            data: {
              data: item,
              date: date0,
              templateId: tmpId,
            },
          }).then(() => {
            wx.hideLoading();
            wx.showToast({
              title: '订阅成功',
            });
          }).catch((e) => {
            console.log(e);
            wx.showToast({
              title: '订阅失败',
              icon: 'none'
            })
          })
        }
      }
    })
    todos.add({
      data: {
        type: 1,
        flightno: event.detail.value.flightno,
        land: event.detail.value.land,
        takeoff: event.detail.value.takeoff,
        state: 1,
        process: 1,
        takeoff_timestamp: timestamp,
        takeoff_date: this.formatDate(this.data.currentDate),
        takeoff_time: this.data.currentTime,
        landing_date: this.formatDate(this.data.currentDate2),
        landing_time: this.data.currentTime2,
      }
    }).then(res => {
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