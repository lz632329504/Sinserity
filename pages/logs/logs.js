//logs.js
const app = getApp()

Page({
  data: {
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function () {
    
  },
  map:function(){
    wx.openLocation({
      latitude: 28.7682845142,
      longitude: 105.3659731150,
      scale: 28
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  }
  
})
