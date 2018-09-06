// pages/category/category.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigCate:[],
    isfocu:"d1",
    comName:[],
    comUrl:[],
    imgUrl: app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    resHeight:"",
    comlist:[],
  },
  //更新点击值实现同步跳转
  oncli:function(e){
    this.setData({
      isfocu:e.currentTarget.dataset.id
    })
  },
  //滚动监听
  scrollTing:function(e){
    
  },
  //进入商品详情
  goxq:function(e){
    wx.navigateTo({
      url: '/pages/comdet/comdet?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          resHeight: res.windowHeight
        })
      }
    }),
    //分类列表查询
    wx.request({
      url: getApp().globalData.host+'small/sear.php?act=list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        /*var list = [];
        for(var i=0;i<res.data.length;i++){
          list[i] = res.data[i][0];
        }
        that.setData({
          bigCate: list
        })
        console.log(that.data.bigCate);*/
        that.setData({
          bigCate: res.data
        })
        console.log(that.data.bigCate);
      }
    }),
    //分类列表查询
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=comlist',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          comlist: res.data
        })
        console.log(that.data.comlist);
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
    wx.stopPullDownRefresh();
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