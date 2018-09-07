// pages/comdet/comdet.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    comid:"",
    comxq:[],
    comprice:"",
    comyprice:"",
    chosYs:"",
    //chosBb:"",
    chosSl: "1",
    numnow: ['1', '2', '3', '4', '5', "更多请联系店主"],
    csnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      comid:options.id
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=comsear&id=' + that.data.comid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          comxq: res.data,
          comprice:res.data.price[0],
          comyprice:res.data.allprice[0]
        })
      }
    })
  },
  //加入购物车
  gogwc:function(){
    var that = this;
    if (that.data.chosYs == "") {
      wx.showToast({
        title: '请选择参数',
        image: "/pages/images/fail.png",
        duration: 2000
      })
    } else if (that.data.chosSl == "更多请联系店主") {
      wx.showToast({
        title: '请另选参数',
        image: "/pages/images/fail.png",
        duration: 2000
      })
    } else {
      wx.request({
        url: that.data.host + 'small/sear.php?act=joingwc&id=' + that.data.comxq.id + "&yanse=" + that.data.chosYs + "&num=" + that.data.chosSl +"&csnum="+that.data.csnum+ "&opid=" + wx.getStorageSync('user').openid,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.data==true){
            wx.showToast({
              title: '添加成功',
              icon: "success",
              duration: 2000
            })
          } else if (res.data == false){
            wx.showToast({
              title: '添加失败',
              image: "/pages/images/fail.png",
              duration: 2000
            })
          }
        }
      })
    }
  },
  //跳转购物车
  clickgogwc:function(){
    wx.switchTab({
      url: '/pages/shopCart/shopCart',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
  },
  //立即结算
  gotoDd:function(){
    var that = this;
    if(that.data.chosYs==""){
      wx.showToast({
        title: '请选择参数',
        image:"/pages/images/fail.png",
        duration: 2000
      })
    } else if (that.data.chosSl == "更多请联系店主"){
      wx.showToast({
        title: '请另选参数',
        image: "/pages/images/fail.png",
        duration: 2000
      })
    }else{
      var comxq = that.data.comxq;
      var id = [{ "imgsrc": comxq.imgsrc[1], "comname": comxq.comname, "num": that.data.chosSl, "yanse": that.data.chosYs, "price": that.data.comprice}];
      wx.navigateTo({
        url: '/pages/userSet/userSet?id=' +JSON.stringify(id),
      })
    }
  },
  //选择颜色
  chooscolor:function(){
    var that=this;
    wx.showActionSheet({
      itemList: that.data.comxq.yanse,
      success: function (res) {
        //console.log(res.tapIndex);
        that.setData({
          chosYs: that.data.comxq.yanse[res.tapIndex],
          comprice: that.data.comxq.price[res.tapIndex],
          comyprice: that.data.comxq.allprice[res.tapIndex],
          csnum: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //选择数量
  choosnumbei: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['1', '2', '3', '4', '5', "更多请联系店主"],
      success: function (res) {
        that.setData({
          chosSl: that.data.numnow[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
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
    var that = this;
    var num = parseInt(Math.random() * 3 + 1); 
    return {
      title: "你家隔壁的电器商城太便宜了",
      path: '/pages/comdet/comdet?id='+that.data.comid,
      imageUrl: that.data.imgUrl+'zf'+num+'.jpg'
    }
  }
})