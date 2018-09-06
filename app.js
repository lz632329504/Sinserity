//app.js
App({

  globalData: {
    userInfo: null,
    imgUrl: "https://www.dreamcool.top/SincerityApp/small/images/small/",//全局图片路径
    host: "https://www.dreamcool.top/SincerityApp/",//服务器主机路径
    comUrl: "https://www.dreamcool.top/SincerityApp/small/images/com/",//商品图片路径
    indUrl: "https://www.dreamcool.top/SincerityApp/small/images/inhome/"//主页图片地址
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    //自加
    var that = this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};

    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    wx.login({
      success: function (res) {
        if (res.code) {
          var l = that.globalData.host + 'small/getmothes.php?js_code=' + res.code;
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              //console.log(obj);
              wx.setStorageSync('user', obj);//存储openid
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    /*wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/

  }

})