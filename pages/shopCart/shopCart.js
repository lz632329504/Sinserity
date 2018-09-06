// pages/shopCart/shopCart.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShop:"false",//是否显示购物空页面，true显示，false不显示
    imgUrl: app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    list:[],
    isallxuan:false,
    allprice:0,
    allnum:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.nowgetdata();
  },     
  //获取数据
  nowgetdata:function(){
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    wx.request({
      url: that.data.host + 'small/sear.php?act=seargwc&opid=' + wx.getStorageSync('user').openid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data
        })
        wx.hideLoading();
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  //选择商品
  xuanze:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var listnow = 'list[' + id + '].isxz'
    if(that.data.list[id].isxz==false){
      that.setData({
        [listnow]: true
      })
    }else{
      that.setData({
        [listnow]: false
      })
    }
    that.pricechange();
  },
  //删除
  deletedd:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除此条购物车信息吗？',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id;
          that.ondelete(id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除服务器数据
  ondelete:function(e){
    var that = this;
    wx.request({
      url: that.data.host + 'small/sear.php?act=deletegwc&id=' + e,
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
          that.nowgetdata();
        } else {
          wx.showToast({
            title: '删除失败',
            images: '../images/fail.png',
            duration: 1000,
          })
          that.nowgetdata();
        }
      }
    })
  },
  //全选效果
  allxuan:function(){
    var that = this ;
    var listnow = that.data.list;
    if(that.data.isallxuan == false){
      for (var i = 0; i < listnow.length; i++) {
        var lista = 'list[' + i + '].isxz';
        that.setData({
          [lista]: true
        })
      }
      that.setData({
        isallxuan: true
      })
    }else{
      for (var i = 0; i < listnow.length; i++) {
        var lista = 'list[' + i + '].isxz';
        that.setData({
          [lista]: false
        })
      }
      that.setData({
        isallxuan: false,
      })
    }
    that.pricechange();
  },
  //总价改变
  pricechange:function(){
    var that = this;
    var lista = that.data.list;
    var gprice = 0;
    var gnum = 0;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].isxz == true){
        gprice = parseInt(gprice) + parseInt(lista[i].price) * parseInt(lista[i].num);
        gnum = parseInt(gnum) + 1;
      }
    }
    that.setData({
      allprice: gprice,
      allnum: gnum
    })
  },
  //前往结算
  gouser:function(){
    var that = this;
    var lista = that.data.list;
    var idnow = [];
    var j=0;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].isxz == true) {
        idnow[j] = lista[i];
        j++;
      }
    }
    if (that.data.allnum==0){
      wx.showToast({
        title: '请勾选商品',
        image: "/pages/images/fail.png",
        duration: 2000
      })
    }else(
      wx.navigateTo({
        url: '/pages/userSet/userSet?id=' + JSON.stringify(idnow),
        success:function(){
          for (var i = 0; i < idnow.length; i++) {
            that.ondelete(idnow[i].id);
          }
        }
      })
    )
  },
  //跳转到商城
  goSC:function(){
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
    console.log("下拉");
    wx.showLoading({
      title: "加载中",
    })
    that.nowgetdata();
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