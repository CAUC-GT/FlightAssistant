// pages/searchFlightResult/searchFlightResult.js
Page({

    /**
   * 页面的初始数据
   */
    data: {},

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var that = this;
        that.setData({ //this.setData的方法用于把传递过来的id转化成小程序模板语言
            flightSrc: options.flight_src,
            flightDes: options.flight_des,
            flightDate: options.flight_day,
        })
        wx.cloud.callFunction({
            name:"searchByFlight"
        }).then(res => {
            console.log(res);
            that.setData({items:res.result.data});
          })
        // wx.request({
        //     url: "http://114.116.32.124:9000/searchFlights",
        //     method: 'get',
        //     data: {
        //         flight_no: "",
        //         flight_destination: that.data.flightSrc+"-"+that.data.flightDes,
        //         flight_type: "",
        //         flight_day: that.data.flightDate
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
    }
})