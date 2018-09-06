// pages/searchTo/searchTo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpVal: "",
    name_focus: "false",
    imgUrl: app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    inputValue: "",
    searesult: null,
    multiArray: [['所有'], ['销量', '价格','上架时间'], ['从高到低', '从低到高']],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    }) 
    wx.request({
      url: that.data.host + 'small/sear.php?act=list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var multiArray = that.data.multiArray;
        for (var i = 1; i <= res.data.length; i++) {
          multiArray[0][i]=res.data[i-1][0];
        }
        that.setData({
          multiArray: multiArray
        })
        if(options.id!=null){
          var multiIndex = that.data.multiIndex;
          if (options.id == "新品") {
            multiIndex[1]=2;
          }else{
            for (var i = 0; i < that.data.multiArray[0].length;i++){
              if (that.data.multiArray[0][i]==options.id){
                multiIndex[0] = i;
              }
            }
          }
          that.setData({
            multiIndex: multiIndex
          })
        }
        that.categetData();
      }
    })
  },

  bindMultiPickerChange: function (e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    }) 
    that.setData({
      multiIndex: e.detail.value
    })
    that.categetData();
  },
  /*bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },*/

  //进入商品详情页
  goxq: function (e) {
    wx.navigateTo({
      url: '/pages/comdet/comdet?id=' + e.currentTarget.dataset.id,
    })
  },
  //查询获取数据
  categetData:function(){
    var that = this;
    var cate = "time";
    if(that.data.multiArray[1][that.data.multiIndex[1]]=="销量"){
      cate = "xiaoliang";
    } else if (that.data.multiArray[1][that.data.multiIndex[1]] == "价格"){
      cate = "price";
    }
    var atype = that.data.multiArray[2][that.data.multiIndex[2]]=="从高到低"?"desc":"asc";
    wx.request({
      url: that.data.host + 'small/sear.php?act=searchsx&catename=' + that.data.multiArray[0][that.data.multiIndex[0]]+"&cate="+cate+"&atype="+atype,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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
  onShareAppMessage: function (res) {
  
  }
})