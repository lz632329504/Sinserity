//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    iconStyle:'ic',
    imgUrl:app.globalData.imgUrl,
    indUrl: app.globalData.indUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    banner:[],
    list:[]
  },
  
  //跳转到搜索页
  searchTo:function(){
    wx.navigateTo({
      url: '../searchTo/searchTo'
    })
  },
  //跳转到所有宝贝
  goall:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../alllist/alllist?id=' + e.currentTarget.dataset.id
    })
  },
  /*
  //搜索框聚焦时动画
  fosCome:function(){
    this.setData({
      iconStyle: 'ic-left'
    })
  },
  //搜索框离开聚焦时动画
  fosBack:function () {
    this.setData({
      iconStyle: 'ic'
    })
  },
  */
  onLoad:function () {
    var that = this;
    wx.showLoading({
      title: "加载中",
    });
    that.nowgetdata();
  },
  //获取数据
  nowgetdata: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=getbanner',
      success: function (res) {
        var list=[];
        //console.log(res.data);
        for(var i=3;i<res.data.length;i++){
          list[i-3] = res.data[i]
        }
        that.setData({
          banner: res.data,
          list:list
        })
        //console.log(that.data.list);
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideLoading();
      }
    })
  },
  //进入详情页
  goxq: function (e) {
    wx.navigateTo({
      url: '/pages/comdet/comdet?id=' + e.currentTarget.dataset.id,
    })
  },
  //下来刷新
  onPullDownRefresh: function () {
    var that = this;
    that.nowgetdata();
    wx.stopPullDownRefresh(); //在标题栏中显示加载    
  },

  onShareAppMessage: function () {
    var that = this;
    var num = parseInt(Math.random() * 3 + 1);
    return {
      title: "你家隔壁的电器商城太便宜了",
      path: '/pages/index/index',
      imageUrl: that.data.imgUrl + 'zf' + num + '.jpg'
    }
  }
  
})
