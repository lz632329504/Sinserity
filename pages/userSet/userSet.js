// pages/orderinfo/orderinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    comUrl: app.globalData.comUrl,
    host: app.globalData.host,
    shdz:null,
    comlist:[],
    yunfei:10,
    comallprice:0,
    allprice:0,
    pleasexz:"请选择收获地址"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      comlist: JSON.parse(options.id)
    })
    var comprice=0;
    this.data.comlist.forEach(function (currentValue, index){
      comprice = parseInt(comprice) + parseInt(currentValue.price) * parseInt(currentValue.num)
    })
    this.setData({
      comallprice: comprice,
      allprice: comprice+this.data.yunfei
    })
    /*var that = this;
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=comsear&id=' + that.data.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          comxq: res.data
        })
        console.log(that.data.comxq)
      }
    })
    wx.request({
      url: getApp().globalData.host + 'small/sear.php?act=comlist',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          comlist: res.data
        })
        console.log(that.data.comlist)
      }
    })*/
  },
  setdizhi:function(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          that.setData({
            shdz: res,
            pleasexz:"收"
          })
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  //支付
  zhifu:function(){
    var that = this;
    if (that.data.shdz==null){
      wx.showToast({
        title: '请选择收货地址',
        image: "/pages/images/fail.png",
        duration: 2000
      })
      return false;
    }
    var comlist = that.data.comlist;
    var shdz = that.data.shdz;
    var imgsrc = "";
    var yanse = "";
    var num = "";
    var price = "";
    var comname = "";
    for (var i = 0; i < comlist.length; i++) {
      if (imgsrc==""){
        imgsrc = comlist[i]["imgsrc"];
        yanse = comlist[i]["yanse"];
        num = comlist[i]["num"];
        price = comlist[i]["price"];
        comname = comlist[i]["comname"];
      }else{
        imgsrc = imgsrc + "," + comlist[i]["imgsrc"];
        yanse = yanse + "," + comlist[i]["yanse"];
        num = num + "," + comlist[i]["num"];
        price = price+","+ comlist[i]["price"];
        comname = comname + "," + comlist[i]["comname"];
      }
    }
    var phone = shdz['telNumber'];
    var username = shdz['userName'];
    var address = shdz['cityName'] + shdz['countyName'] + shdz['detailInfo'];
    wx.request({
      url: that.data.host + 'small/sear.php?act=joinorder',
      data:{
        imgsrc:imgsrc,
        yanse: yanse,
        num: num,
        phone: phone,
        name: username,
        address: address,
        zt:"0",
        price:price,
        allprice: that.data.comallprice,
        comname: comname,
        openid: wx.getStorageSync('user').openid
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if(res.data!=false){
          wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id='+res.data
          })
        }
        console.log(res.data)
      },
      fail: function (e) {
        console.log(e)
      }
    })
    /*wx.showToast({
      title: '敬请期待',
      image: "/pages/images/fail.png",
      duration: 2000
    })*/
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