Page({

  data: {
    flightSrc: "",
    flightDes: "",
    date: "2020-01-01"
  },

  getFlightSrc: function (e) {
    this.setData({
      flightSrc: e.detail.value
    })
  },

  getFlightDes: function (e) {
    this.setData({
      flightDes: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  sendSearchMessage: function (e) {

    var that = this;
    if (that.data.flightSrc.length == 0 || that.data.flightDes.length == 0) {
      wx.showToast({
        title: '出发地和目的地不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      // wx.navigateTo({
      //   url: '../searchFlightResult/searchFlightResult?flight_src=' + that.data.flightSrc +
      //     "&flight_des=" + that.data.flightDes + '&flight_day=' + that.data.date
      // });
    }
  }
})