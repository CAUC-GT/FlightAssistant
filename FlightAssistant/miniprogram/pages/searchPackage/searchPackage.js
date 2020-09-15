Page({

  data: {
    flightNo: "",
    date: "2020-01-01"
  },

  getFlightNo: function (e) {
    this.setData({
      flightNo: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  sendSearchMessage: function (e) {
    var that = this;
    if (that.data.flightNo.length == 0) {
      wx.showToast({
        title: '航班号不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
              url: '../searchPackageResult/searchPackageResult?flight_no=' + that.data.flightNo+"-"+that.data.date.replace(/-/g,"")+"-A"
          });
    }
  }
})