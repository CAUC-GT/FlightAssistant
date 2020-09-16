// pages/searchFlightResult/searchFlightResult.js
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
    items: []
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({ //this.setData的方法用于把传递过来的id转化成小程序模板语言
      flightSrc: options.flight_src,
      flightDes: options.flight_des,
      flightDate: options.flight_day,
    })
    wx.cloud.callFunction({
      name: "searchByFlight",
      data: {
        flight_destination: that.data.flightSrc + "-" + that.data.flightDes,
        flight_day: that.data.flightDate,
      }
    }).then(res => {
      console.log(res);
      that.setData({
        items: res.result.data
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  splitString: function (str) {
    arr = str.split("-");
    return arr;
  },
  bindtodo: function (e) {

    wx.showModal({
      title: '提示',
      content: '是否添加代办',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定'),
            console.log(e.currentTarget.dataset.id);
          let date0 = new Date(new Date(e.currentTarget.dataset.id.flight_day + " " + e.currentTarget.dataset.id.flight_stime + ":00").getTime() - 7200000);
          const item = {
            thing10: {
              value: "航班行程提醒" + e.currentTarget.dataset.id.flight_no
            },
            thing1: {
              value: "请提早两个小时到机场进行值机哦"
            },
            date2: {
              value: e.currentTarget.dataset.id.flight_day + " " + e.currentTarget.dataset.id.flight_stime
            },
            thing13: {
              value: "请关注机场的截止值机时间及时办理值机手续"
            }
          }
          wx.requestSubscribeMessage({
            tmplIds: [tmpId],
            success(res) {
              console.log(res);
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
              flightno: e.currentTarget.dataset.id.flight_no,
              land: e.currentTarget.dataset.id.flight_eairport,
              takeoff: e.currentTarget.dataset.id.flight_sairport,
              state: 1,
              landing_date: e.currentTarget.dataset.id.flight_day,
              landing_time: e.currentTarget.dataset.id.flight_etime,
              takeoff_date: e.currentTarget.dataset.id.flight_day,
              takeoff_time: e.currentTarget.dataset.id.flight_stime,
            }
          }).then(res => {
            console.log(res._id);
            wx.showToast({
              title: 'Success',
              icon: 'success',
              success: res2 => {
                wx.redirectTo({
                  url: `../todoInfo/todoInfo?id=${res._id}`,
                })
              }
            })
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
})