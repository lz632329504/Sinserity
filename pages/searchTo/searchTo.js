// pages/searchTo/searchTo.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpVal:"",
    name_focus:"false",
    imgUrl:app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    inputValue:"",
    searesult:null,
    addxci: ["美的空调", "K520冰箱","玉蝉"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.searesult)
  },
  //进入商品详情页
  goxq: function (e) {
    wx.navigateTo({
      url: '/pages/comdet/comdet?id=' + e.currentTarget.dataset.id,
    })
  },
  //点击x清空输入框内容
  inpVno:function(){
    this.setData({
      inpVal: "",
      name_focus: "true",
      inputValue:""
    })
  },
  //实时监测键盘输入的值
  input2input:function(e){
    var that = this;
    this.setData({
      inputValue:e.detail.value
    })
  },
  //提交服务器搜索并获取数据
  starSearch:function(){
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    }) 
    wx.request({
      url: that.data.host+'small/sear.php?act=search',
      data: {
        searValue: that.data.inputValue
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          searresult: res.data
        })
        wx.hideToast();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //增加无匹配商品时的搜索关键词
  addci:function(e){
    var that = this;
    that.setData({
      inputValue: e.currentTarget.dataset.id,
      inpVal: e.currentTarget.dataset.id
    })
    that.starSearch();
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