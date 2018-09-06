// pages/myorder/myorder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    ddlist:[],
    nowzt: {
      "0": "等待付款",
      "1": "等待发货",
      "2": "等待收货",
      "3": "完成订单",
      "4": "售后处理"},
    nowclass: {
      "0": "dengdai",
      "1": "daishou",
      "2": "daishou",
      "3": "wancheng",
      "4": "shouhou"
    },
    array: ["所有订单","等待付款","等待发货","等待收货","完成订单","售后处理"],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    that.nowgetdata();
  },
  //获取数据
  nowgetdata:function(){
    var that = this;
    var searzt = "more";
    if (that.data.index!=0){
      searzt = that.data.index-1;
    }
    console.log(wx.getStorageSync('user').openid);
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=seardd&opid=' + wx.getStorageSync('user').openid + "&searzt=" + searzt,
      success: function (res) {
        console.log(res.data);
        that.setData({
          ddlist: res.data
        })
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideLoading();
      }
    })
  },
  //塞选
  bindPickerChange:function(e){
    var that = this;
    that.setData({
      index: e.detail.value
    })
    that.nowgetdata();
  },
  goinfo:function(e){
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id=' + e.currentTarget.dataset.id,
    })
  },
  //跳转商场
  goSC: function () {
    wx.switchTab({
      url: '/pages/index/index'
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
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    that.nowgetdata();
    wx.hideLoading()
    wx.stopPullDownRefresh(); //在标题栏中显示加载    
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