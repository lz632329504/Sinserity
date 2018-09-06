// pages/orderinfo/orderinfo.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    ddlist:[],
    comallprice:"",
    nowzt: {
      "0": "等待付款",
      "1": "等待发货",
      "2": "等待收货",
      "3": "完成订单",
      "4": "售后处理"
    },
    nowtxt: {
      "0": "请在两天内完成付款，逾期订单将关闭",
      "1": "商家正在紧急给您包装派送，请耐心等候",
      "2": "您的物品正在路上，请耐心等候",
      "3": "订单已完成交易，祝您购物愉快",
      "4": "售后处理中，请等待商家回应"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=ddsear&id='+options.id,
      success: function (res) {
        /*console.log(res.data.num);
        var ddlist = [];
        for (var i = 0; i < res.data.num.length;i++){
          ddlist[i][i] = res.data.num[i],
          ddlist[i][i+1] = res.data.price[i]
        }
        console.log(res.data)*/
        var comallprice = parseInt(res.data.allprice)+10
        that.setData({
          ddlist:res.data,
          comallprice: comallprice
        })
      }
    })
  },
  //微信支付
  wxzhifu:function(){
    console.log("dianji");
    wx.requestPayment({
      'timeStamp': '2548524',
      'nonceStr': 'fdfa2f6adfdsafdaf',
      'package': 'vdfdsdfsdfdse',
      'signType': 'MD5',
      'paySign': 'sdsasdsfdsfsfsd',
      'success': function (res) {
        console.log("s"+res.data)
      },
      'fail': function (res) {
        console.log("f" + res)
      }
    })
  },
  //删除订单
  deletedd:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.host + 'small/sear.php?act=deletedd&id=' + that.data.ddlist.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data == true) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                })
                wx.navigateTo({
                  url: '/pages/myorder/myorder',
                })
              } else {
                wx.showToast({
                  title: '删除失败',
                  images: '../images/fail.png',
                  duration: 1000,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //确认收货
  ysedingdan:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认商品无误并选择确认收货吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.host + 'small/sear.php?act=yescon&id=' + that.data.ddlist.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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