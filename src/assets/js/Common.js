const Common = {
  constants: {
    uid_key : '_m_tv3_uid',
    music_bg_timer: null,
    music_bg_out_timer: null
  },
  android: {
    type: {
      COMMONEVENT_PINCODE: 1,
      COMMONEVENT_USERID: 2,//userID             (电视猫)
      COMMONEVENT_APPVERSION: 3,//APP 版本号
      COMMONEVENT_CONNECT_URL: 4,
      COMMONEVENT_NEW_APPVERSION: 5,//APP 版本号
      COMMONEVENT_ACCOUNTID: 6,//当前登录账户ID   (微鲸)
      COMMONEVENT_GUID: 7,//当前设备唯一识别ID    (微鲸)
      COMMONEVENT_SN: 8,//电视机设备号           (微鲸 ota16)
      COMMONEVENT_DEVICEID: 9,//电视机设备id    (微鲸 ota16   电视猫3.1.6 )
      COMMONEVENT_ACCESSTOKEN: 10,//帐号系统登录成功后下发的鉴权凭证    (微鲸 ota16)
      COMMONEVENT_UPGRADE: 12,//获取当前设备可升级的版本   (微鲸 ota19 电视猫3.1.6)
      COMMONEVENT_WUI: 14,//获取当前WUI   (微鲸 ota19)
      COMMONEVENT_MORETV_MAC: 7,//获取当前设备MAC地址             (电视猫)
      COMMONEVENT_IP: 13,//获取当前ip                            (电视猫3.1.6  微鲸 ota21)
      COMMONEVENT_OS: 14,//获取当前设备操作系统信息，0代表安卓系统   (电视猫3.1.6)
      COMMONEVENT_WHALEY_OS: 18,// 获取当前设备操作系统信息，0代表安卓系统   (微鲸 ota21)
      COMMONEVENT_ADPUTTINGID: 15,//广告投放Id                   (电视猫3.1.6  微鲸 ota21)
      COMMONEVENT_MODEL: 16,//设备型号                           (电视猫3.1.6  微鲸 ota21 )
      COMMONEVENT_WHALEY_MAC: 17,//获取当前设备Mac地址            (微鲸 ota21)
      COMMONEVENT_VIDEO_MESSAGE: 19,//获取当前视频播放信息        (电视猫 3.1.7)
      COMMONEVENT_MORETV_USERMESSAGE: 20,   //查询电视猫会员信息               (电视猫 3.1.7)
      COMMONEVENT_WHALEY_USERMESSAGE:1004,//查询微鲸会员信息(ota19)
      COMMONEVENT_LOGINSTATUS: 21,  //查询登录状态                (电视猫 3.1.7)
      EXTERBALJUMP: 400, //外部跳转                          (微鲸 ota19)
      EXEC_PLAYMUSIC: 1,
      EXEC_PAUSEMUSIC: 2,
      EXEC_STOPMUSIC: 3,
      EXEC_JUMPPAGE: 4,
      EXEC_VOICECONTROL: 5,
      EXEC_PAGELAYOUT: 6,
      EXEC_PAGETITLE: 7,
      EXEC_BOXCONNECT: 8,
      EVENT_AUDIO_TEXT: 101,
      EVENT_LAYOUT_LEVEL: 102,
      EVENT_LAYOUT_BACK: 103,
      EVENT_TVCONNECTED: 104,
      EVENT_LOGIN: 1001,
      EVENT_EXCHANGE: 1002,//(value:{"clubCode":"", "cdkey":""}, 其中clubCode为兑换码对应的产品编码（比如少儿"child"，白金"basic"，钻石"diamond"等），cdkey为兑换码)
      EVENT_BUY: 1003,
      EVENT_LOADINGSTART: 1009,  //调取安卓loading圈           (电视猫 3.1.7  微鲸 ota22)
      EVENT_LOADINGEND: 1010,    //关闭安卓loading圈           (电视猫 3.1.7  微鲸 ota22)
      EVENT_TOAST: 1011,        //调用安卓toast                (电视猫 3.1.7  微鲸 ota22)
      //常量定义
      JUMPPAGE: {
        AccountHomePage: 'page=AccountHomePage', //电视猫页面跳转 - 会员中心页       (电视猫 3.1.7)
        TencentLoginPage: 'page=TencentLoginPage', //电视猫页面跳转 - 腾讯登录页     (电视猫 3.1.7)
        TencentVipPage: 'page=TencentVipPage&entrance=H5&from=200&vipBid=90&cid=""&vid=""&pid=""&mid=""&extraParam=""' //电视猫页面跳转 - 腾讯商品购买页    (电视猫 3.1.7)
      },
    },
    log: function (str) {
      try {
        Android.log(str);
      } catch (e) {
        console.log('Exception: Android.log is undefined');
      }
    },
    getCommonInfo: function (type) {
      Common.log.log('Android.getCommonInfo(' + type + ')', null, true);
      var return_str = '';
      try {
        return_str = Android.getCommonInfo(type);
      } catch (e) {
        return_str = '';
        Common.log.log('Android.getCommonInfo is undefined', Common.log.type.Error.type, true);
      }
      return return_str;
    },
    execCommonEvent: function (event, value) {
      Common.log.log('Android.execCommonEvent(' + event + ',' + value + ')', null, true);
      var return_str = '';
      try {
        return_str = Android.execCommonEvent(event, value);
      } catch (e) {
        return_str = '';
        Common.log.log('Android.execCommonEvent is undefined', Common.log.type.Error.type, true);
      }
      return return_str;
    },
    md5Encrypt: function (str) {
      Common.log.log('Android.md5Encrypt(' + str + ')', null, true);
      var return_str = '';
      try {
        return_str = Android.md5Encrypt(str);
      } catch (e) {
        return_str = '';
        Common.log.log('Android.md5Encrypt is undefined', Common.log.type.Error.type, true);
      }
      return return_str;
    },
    back: function () {
      var that = this;
      try {
        Common.log.log('Android.back', null, true);
        that.stop();
        Android.back();
      } catch (e) {
        Common.log.log('Exception: Android.back is undefined', Common.log.type.Error.type, true);
      }
    },
    getUserId: function () {
      var that = this;
      var user_id = that.getCommonInfo(that.type.COMMONEVENT_MORETV_MAC);
      if(user_id){
        return user_id;
      }else{
        user_id = that.getCommonInfo(that.type.COMMONEVENT_USERID);
        if(user_id){
          return user_id;
        }else{
          return '';
        }
      }
    },
    gotoApp: function (page, sid, contentType, whaley) {
      var that = this;
      if(page === 'subject'){
        var flag = 0;
        if(contentType === 'kids'){
          flag = 1;
        }
        if(whaley){
          that.execCommonEvent(that.type.EXEC_JUMPPAGE,'page='+page+'&keyword='+sid+'&contentType='+contentType+'&flag='+flag);
        }else{
          that.execCommonEvent(that.type.EXEC_JUMPPAGE,'page='+page+'%26keyword='+sid+'%26contentType='+contentType+'%26flag='+flag);
        }

      }else{
        if(whaley){
          that.execCommonEvent(that.type.EXEC_JUMPPAGE,'page='+page+'&sid='+sid+'&contentType='+contentType);
        }else{
          that.execCommonEvent(that.type.EXEC_JUMPPAGE,'page='+page+'%26sid='+sid+'%26contentType='+contentType);
        }

      }
    },
    /**
     * 播放音频文件
     * @param fullPath 音频文件绝对路径
     */
    play: function (fullPath) {
      var that = this;
      if (fullPath) {
        //document.getElementById('audio').src = fullPath;
        //document.getElementById('audio').play();
        var res = '' + that.execCommonEvent(Common.android.type.EXEC_PLAYMUSIC, fullPath);
        if (res == '0') {
          Common.log.log('media play success,fullPath=' + fullPath, null, true);
        } else {
          Common.log.log('media play failed,fullPath=' + fullPath, null, true);
        }
      } else {
        Common.log.log('media play failed, fullPath is null', null, true);
      }
    },
    /**
     * 暂停音频播放
     */
    pause: function () {
      var that = this;
      var res = '' + that.execCommonEvent(Common.android.type.EXEC_PAUSEMUSIC);
      if (res == '0') {
        Common.log.log('media pause success', null, true);
      } else {
        Common.log.log('media pause failed', null, true);
      }
    },
    /**
     * 停止音频播放
     */
    stop: function () {
      clearTimeout(Common.constants.music_bg_out_timer);
      clearInterval(Common.constants.music_bg_timer);
      var that = this;
      var res = '' + that.execCommonEvent(Common.android.type.EXEC_STOPMUSIC);
      if (res == '0') {
        Common.log.log('media stop success');
      } else {
        Common.log.log('media stop failed');
      }
    },
    /**
     * 播放音效，一次
     * @param effectPath
     * @param effectDuration
     * @param bgPath
     * @param bgDuration
     * @param bgContinue 音效播放完成后是否自动播放背景音乐
     */
    playEffect: function (effectPath, effectDuration, bgPath, bgDuration, bgContinue) {
      var that = this;
      if (effectPath) {
        clearTimeout(Common.constants.music_bg_out_timer);
        clearInterval(Common.constants.music_bg_timer);
        var res = '' + that.execCommonEvent(Common.android.type.EXEC_PLAYMUSIC, effectPath);
        if (res == '0') {
          Common.log.log('media play success,fullPath=' + effectPath, null, true);
        } else {
          Common.log.log('media play failed,fullPath=' + effectPath, null, true);
        }
        if (bgContinue) {
          if (bgPath) {
            Common.constants.music_bg_out_timer = setTimeout(function () {
              that.playBg(bgPath, bgDuration, true);
            }, effectDuration);
          }
        }
      } else {
        Common.log.log('media play failed, fullPath is null', null, true);
      }

    },
    /**
     * 循环播放背景音乐
     * @param bgPath
     * @param bgDuration
     * @param loop
     */
    playBg: function (bgPath, bgDuration, loop) {
      var that = this;
      if (bgPath) {
        that.play(bgPath);
        clearTimeout(Common.constants.music_bg_out_timer);
        clearInterval(Common.constants.music_bg_timer);
        if (loop) {
          Common.constants.music_bg_timer = setInterval(function () {
            that.execCommonEvent(Common.android.type.EXEC_STOPMUSIC);
            that.play(bgPath);
          }, bgDuration);
        }
      }
    },
    playController: {
      WEB_PLAYEVENT_GET: {
        INFO_CUR_PLAYTIME: 1,//视频当前播放时长
        INFO_TOTAL_PLAYTIME: 2,//视频的总时长
        INFO_SCALE_MODE: 3//当前播放窗口模式
      },
      WEB_PLAYEVENT_EXEC: {
        TRAILER_LOCATION: 1,    //定位小窗位置，确定小窗大小
        TRAILER_STARTPLAY: 2,   //起播，播放指定节目
        TRAILER_PAUSE: 3,		 //暂停
        TRAILER_RESUME: 4,		 //恢复播放
        TRAILER_SEEK: 5,		 //进度跳转
        TRAILER_SCALE_LARGE: 6, //小窗->全屏
        TRAILER_SCALE_SMALL: 7, //全屏->小窗
        TRAILER_STOPPLAY: 8    //停止播放
      },
      getPlayInfo: function (info_type) {
        Common.android.log('android.playController.getPlayInfo(' + info_type + ')');
        if (window.PlayController && window.PlayController.getPlayInfo) {
          return window.PlayController.getPlayInfo(info_type);
        } else {
          Common.android.log('PlayController or PlayController.getPlayInfo undefined');
        }
      },
      getCurrentPlayTime: function () {
        Common.android.log('android.playController.getCurrentPlayTime()');
        return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_CUR_PLAYTIME);
      },
      getTotalPlayTime: function () {
        Common.android.log('android.playController.getTotalPlayTime()');
        return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_TOTAL_PLAYTIME);
      },
      getPlayMode: function () {
        Common.android.log('android.playController.getPlayMode()');
        return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_SCALE_MODE);
      },
      execPlayEvent: function (event, value) {
        Common.android.log('android.playController.execPlayEvent(' + event + ',' + value + ')');
        if (window.PlayController && window.PlayController.execPlayEvent) {
          window.PlayController.execPlayEvent(event, value);
        } else {
          Common.android.log('PlayController or PlayController.execPlayEvent undefined');
        }
      },
      setWin: function (pos) {
        Common.android.log('android.playController.setWin(' + pos + ')');
        var location = {
          left: pos.left,
          top: pos.top,
          width: pos.width,
          height: pos.height
        };
        var location_str = JSON.stringify(location);
        Common.android.log(location_str);
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LOCATION, location_str);
      },
      smallWin: function () {
        Common.android.log('android.playController.smallWin()');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SCALE_SMALL);
      },
      setFullScreen: function () {
        Common.android.log('android.playController.smallWin()');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SCALE_LARGE);
      },
      winPlay: function (play_obj) {
        Common.android.log('android.playController.winPlay(' + play_obj + ')');
        var play = {
          sid: play_obj.sid,
          title: play_obj.title,
          contentType: play_obj.contentType,
          linkType: play_obj.linkType
        };
        var play_str = JSON.stringify(play);
        Common.android.log(play_str);
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STARTPLAY, play_str);
      },
      pause: function () {
        Common.android.log('android.playController.pause()');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_PAUSE);
      },
      resume: function () {
        Common.android.log('android.playController.resume()');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_RESUME);
      },
      stop: function () {
        Common.android.log('android.playController.stop()');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STOPPLAY);
      },
      seek: function (second) {
        Common.android.log('android.playController.seek(' + second + ')');
        this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SEEK, second);
      }

    }
  },
  utils: {
    hexcase: 0,
    b64pad: '',
    chrsz: 8,
    CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    hex_md5: function (s) {
      var that = this;
      return that.impl.binl2hex(that.core_md5(that.impl.str2binl(s), s.length * Common.utils.chrsz));
    },
    b64_md5: function (s) {
      var that = this;
      return that.impl.binl2b64(that.core_md5(that.impl.str2binl(s), s.length * Common.utils.chrsz));
    },
    str_md5: function (s) {
      var that = this;
      return that.impl.binl2str(that.core_md5(that.impl.str2binl(s), s.length * Common.utils.chrsz));
    },
    hex_hmac_md5: function (key, data) {
      var that = this;
      return that.impl.binl2hex(that.core_hmac_md5(key, data));
    },
    b64_hmac_md5: function (key, data) {
      var that = this;
      return that.impl.binl2b64(that.core_hmac_md5(key, data));
    },
    str_hmac_md5: function (key, data) {
      var that = this;
      return that.impl.binl2str(that.core_hmac_md5(key, data));
    },
    core_md5: function (x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var that = this;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = that.impl.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = that.impl.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = that.impl.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = that.impl.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = that.impl.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = that.impl.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = that.impl.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = that.impl.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = that.impl.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = that.impl.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = that.impl.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = that.impl.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = that.impl.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = that.impl.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = that.impl.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = that.impl.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = that.impl.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = that.impl.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = that.impl.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = that.impl.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = that.impl.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = that.impl.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = that.impl.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = that.impl.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = that.impl.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = that.impl.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = that.impl.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = that.impl.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = that.impl.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = that.impl.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = that.impl.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = that.impl.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = that.impl.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = that.impl.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = that.impl.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = that.impl.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = that.impl.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = that.impl.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = that.impl.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = that.impl.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = that.impl.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = that.impl.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = that.impl.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = that.impl.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = that.impl.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = that.impl.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = that.impl.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = that.impl.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = that.impl.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = that.impl.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = that.impl.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = that.impl.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = that.impl.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = that.impl.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = that.impl.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = that.impl.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = that.impl.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = that.impl.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = that.impl.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = that.impl.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = that.impl.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = that.impl.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = that.impl.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = that.impl.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = that.impl.safe_add(a, olda);
        b = that.impl.safe_add(b, oldb);
        c = that.impl.safe_add(c, oldc);
        d = that.impl.safe_add(d, oldd);
      }
      return Array(a, b, c, d);

    },
    core_hmac_md5: function (key, data) {
      var that = this;
      var bkey = that.impl.str2binl(key);
      if (bkey.length > 16) bkey = that.core_md5(bkey, key.length * Common.utils.chrsz);

      var ipad = Array(16), opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }
      var hash = that.core_md5(ipad.concat(that.impl.str2binl(data)), 512 + data.length * Common.utils.chrsz);
      return that.core_md5(opad.concat(hash), 512 + 128);
    },
    impl: {
      bit_rol: function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
      },
      str2binl: function (str) {
        var chrsz = Common.utils.chrsz;
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
          bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
      },
      binl2str: function (bin) {
        var chrsz = Common.utils.chrsz;
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz)
          str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
      },
      binl2hex: function (binarray) {
        var hex_tab = Common.utils.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
          str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
      },
      binl2b64: function (binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
          var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += Common.utils.b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
          }
        }
        return str;
      },
      safe_add: function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      },
      md5_cmn: function (q, a, b, x, s, t) {
        var that = this;
        return that.safe_add(that.bit_rol(that.safe_add(that.safe_add(a, q), that.safe_add(x, t)), s), b);
      },
      md5_ff: function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
      },
      md5_gg: function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
      },
      md5_hh: function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
      },
      md5_ii: function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
      }
    },
    dateFormat: function (date, formatStr) {
      /*
       函数：填充0字符
       参数：value-需要填充的字符串, length-总长度
       返回：填充后的字符串
       */
      var zeroize = function (value, length) {
        if (!length) {
          length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
          zeros += '0';
        }
        return zeros + value;
      };
      return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
          case 'd': return date.getDate();
          case 'dd': return zeroize(date.getDate());
          case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
          case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
          case 'M': return date.getMonth() + 1;
          case 'MM': return zeroize(date.getMonth() + 1);
          case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
          case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
          case 'yy': return new String(date.getFullYear()).substr(2);
          case 'yyyy': return date.getFullYear();
          case 'h': return date.getHours() % 12 || 12;
          case 'hh': return zeroize(date.getHours() % 12 || 12);
          case 'H': return date.getHours();
          case 'HH': return zeroize(date.getHours());
          case 'm': return date.getMinutes();
          case 'mm': return zeroize(date.getMinutes());
          case 's': return date.getSeconds();
          case 'ss': return zeroize(date.getSeconds());
          case 'l': return date.getMilliseconds();
          case 'll': return zeroize(date.getMilliseconds());
          case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
          case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
        }
      });
    },
    uuid: function (len, radix) {
      var chars = Common.utils.CHARS.split(''), uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join('');
    },
    uuidFast: function () {
      var chars = Common.utils.CHARS.split(''), uuid = new Array(36), rnd = 0, r;
      for (var i = 0; i < 36; i++) {
        if (i == 8 || i == 13 || i == 18 || i == 23) {
          uuid[i] = '-';
        } else if (i == 14) {
          uuid[i] = '4';
        } else {
          if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
          r = rnd & 0xf;
          rnd = rnd >> 4;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
      return uuid.join('');
    },
    uuidCompact: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    /****************************************
     算法：split
     输入：数组A[low...high]
     输出：
     1.若有必要，输出按上述描述的重新排列的数组A;
     2.划分元素A[low]的新位置w;
     ****************************************/
    split: function (array, low, high) {
      var i = low;
      var x = array[low];
      for (var j = low + 1; j <= high; j++) {
        if (array[j] <= x) {
          i++;
          if (i != j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        }
      }
      temp = array[low];
      array[low] = array[i];
      array[i] = temp;
      return i;
    },
    /****************************************
     算法：rquicksort
     输入：A[0...n-1]
     输出：按非降序排列数组A[0...n-1]
     rquicksort(A, 0, n-1);
     ****************************************/
    quicksort: function (array, low, high) {
      var that = this;
      if (low < high) {
        /******随机化拆分元素的主元*******/
        var v = parseInt(Math.random() * (high - low + 1) + low);
        var tmp = array[low];
        array[low] = array[v];
        array[v] = tmp;
        /******随机化拆分元素的主元*******/
        var w = that.split(array, low, high);
        that.quicksort(array, low, w - 1);
        that.quicksort(array, w + 1, high);
        return array;
      }
    },
    /**
     * 随机取数组一个元素
     * @param array
     * @returns {*}
     */
    arrayRandomOne: function (array) {
      return array[Math.floor(Math.random() * array.length + 1) - 1];
    },
    /**
     * 数组随机打乱
     * @param array
     * @returns {*}
     */
    arrayShuffle: function (array) {
      for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
      return array;
    },
    /**
     * 对象克隆
     * @param jsonObj
     * @returns {*}
     */
    clone: function (jsonObj) {
      return JSON.parse(JSON.stringify(jsonObj));
    },
    getUrlParams: function () {
      var urlParams = {};
      var urlSearch = location.search;
      if (urlSearch.indexOf("?") == 0 && urlSearch.indexOf("=") > 1) {
        var arrSource = unescape(urlSearch).substring(1, urlSearch.length).split("&");
        for (var i = 0; i < arrSource.length; i++) {
          var arrName = arrSource[i].split("=");
          urlParams[arrName[0]] = arrName[1];
        }
      }
      return urlParams;
    },
    consoleLog: function(msg){
      console.log('web activity log: '+msg);
    },
    isEmpty: function (obj) {
      if (typeof obj === 'undefined' || obj == null || obj == 'undefined' || obj == 'null' || obj == '') {
        return true;
      }
      return false;
    },
    //两个数组arr1 arr2合成一个json，json格式{arr1[0]:arr2[0],arr1[1]:arr2[1]}
    arrToJson: function (arr1, arr2) {
      var retJson = {};
      for (var i = 0; i < arr1.length; i++) {
        retJson[arr1[i]] = arr2[i];
      }
      return retJson;
    },
    setLocalItem: function (name, value, expire) {
      try {
        var expireDate = new Date();
        if (typeof expire != 'undefined' && expire != null) {
          expireDate.setTime(expireDate.getTime() + expire);
        }
        if (window.localStorage) {
          window.localStorage[name] = value;
        } else {
          document.cookie = name + "=" + escape(value) + ((typeof expire == 'undefined' || expire == null) ? "" : ";expires=" + expireDate.toGMTString()) + ";path=/";
        }
      } catch (e) { }
    },
    getLocalItem: function (name) {
      if (window.localStorage) {
        return window.localStorage[name];
      } else {
        if (document.cookie) {
          if (document.cookie.length > 0) {
            var begin = document.cookie.indexOf(name + "=");
            if (begin != -1) {
              begin += name.length + 1;//cookie值的初始位置
              var end = document.cookie.indexOf(";", begin);//结束位置
              if (end == -1) {
                end = document.cookie.length;
              }//没有;则end为字符串结束位置
              return unescape(document.cookie.substring(begin, end));
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    },
    removeLocalItem: function (name) {
      var that = this;
      try {
        if (window.localStorage) {
          window.localStorage.removeItem(name);
        } else {
          var _value = that.getLocalItem(name);
          if (_value) {
            document.cookie = (name + "=" + escape(_value) + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
          }
        }
      } catch (e) { }
    },
    /********************
     * 取窗口滚动条高度
     ******************/
    getScrollTop: function () {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      }
      else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    /********************
     * 取窗口可视范围的高度
     *******************/
    getClientHeight: function () {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    /********************
     * 取文档内容实际高度
     *******************/
    getScrollHeight: function () {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    secondToTimeFormat2: function (seconds, defaultStr) {
      if (this.isEmpty(seconds)) {
        return defaultStr || '00:00';
      }
      var minutes = parseInt(seconds / 60);
      var second = parseInt(seconds - minutes * 60);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;
      return minutes + ":" + second;
    },
    secondToTimeFormat3: function (seconds, defaultStr) {
      if (this.isEmpty(seconds)) {
        return defaultStr || '';
      }
      var hours = parseInt(seconds / (60 * 60));
      var minutes = parseInt((seconds - (hours * 60 * 60)) / 60);
      var second = parseInt(seconds - (hours * 60 * 60) - minutes * 60);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;
      return hours + ":" + minutes + ":" + second;
    },
    trim: function (str) {
      if (!str) {
        return '';
      }
      var trimLeft = /^\s+/,
        trimRight = /\s+$/;
      return str.toString().replace(trimLeft, '').replace(trimRight, '');
    },
    trimLeft: function (str) {
      if (!str) {
        return '';
      }
      var trimLeft = /^\s+/;
      return str.toString().replace(trimLeft, '');
    },
    trimRight: function (str) {
      if (!str) {
        return '';
      }
      var trimRight = /\s+$/;
      return str.toString().replace(trimRight, '');
    },
    isNumber: function (s) {
      var regu = "^[0-9]+$";
      var re = new RegExp(regu);
      if (s.search(re) != -1) {
        return true;
      } else {
        return false;
      }
    },
    preLoadRes: function(pathArr,perCall,finishCall){
      var counter = 0;
      var loadImg = (function(src,finish,count){
        var img = new Image();
        img.onload = function(){
          finish && finish();
        };
        img.onerror = function(){
          if(!count){
            loadImg(src,finish,1)
          }else{
            finish && finish();
          }
        };
        img.src = src;
      });
      for(var i=0; i<pathArr.length; i++){
        loadImg(pathArr[i],function(){
          counter++;
          if(counter>=pathArr.length){
            finishCall && finishCall(pathArr.length,pathArr.length)
          }else{
            perCall && perCall(counter,pathArr.length)
          }
        })
      }
    },
    preLoadImg: function (imgEle, url, load) {
      var img = new Image();
      img.onload = function () {
        Common.log.log('success preLoadImg: ' + url);
        imgEle.previousElementSibling.style.display = 'none';
        imgEle.src = url;
        load && load.call(imgEle, img);
      };
      img.onerror = function () {
        Common.log.log('error preLoadImg: ' + url);
        var imgid = Math.random(),
          frameid = 'frameimg' + imgid;
        window['img' + imgid] = '<img style="position:absolute;top:0;left:0;" width="100%" height="100%" id="img" src=\'' + this.src + '?kilobug\' />';
        var htmlStr = '<iframe id="' + frameid + '" src="javascript:parent[\'img' + imgid + '\'];" frameBorder="0" scrolling="no" width="100%" height="100%"></iframe>';
        if (imgEle.parentElement) {
          imgEle.previousElementSibling.style.display = 'none';
          imgEle.parentElement.innerHTML = htmlStr;
        }
      };
      img.src = url;
      return this;
    },
    request: function(config,data, success, fail, timeout, count){
      console.log('request url '+config.url);
      console.log('request data '+(data && JSON.stringify(data)));
      var method = (config.method || 'get').toUpperCase();
      var _data = data;
      if(method === 'POST'){
        _data = data;
      }
      var that = this;
      $.ajax({
        type: method,
        url: config.url,
        // data to be added to query string:
        data: _data,
        // type of data we are expecting in return:
        dataType: 'json',
        timeout: 3000,
        success: function(data){
          // console.log(data)
          console.log('request url '+config.url+' success');
          try{
            console.log('response data '+JSON.stringify(data))
          }catch(e){}
          success && success(data);
        },
        error: function(xhr, type){
          if(type === 'timeout' && config.retry){
            if(!count){
              console.log('request url '+config.url+' retry');
              that.request(config,data, success, fail, timeout,1)
            }else{
              console.log('request url '+config.url+' timeout callback');
              timeout && timeout();
            }
          }else{
            console.log('request url '+config.url+' error');
            fail && fail();
          }
        }
      })
    }
  },
  browser: {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }()
  },
  log: {
    type: {
      Info: { type: 1, prefix: 'MoreTV Web Console Log ~ Info: ' },
      Debug: { type: 2, prefix: 'MoreTV Web Console Log ~ Debug: ' },
      Error: { type: 3, prefix: 'MoreTV Web Console Log ~ Error: ' }
    },
    log: function (msg, type, _android) {
      var that = this;
      var time = new Date();
      if (!type) {
        type = that.type.Info.type;
      }
      switch (type) {
        case that.type.Info.type:
          console.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' ' + that.type.Info.prefix + msg);
          if (_android) {
            try {
              Common.android.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' Android ' + that.type.Info.prefix + msg);
            } catch (e) {
            }
          }
          break;
        case that.type.Debug.type:
          console.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' ' + that.type.Debug.prefix + msg);
          if (_android) {
            try {
              Common.android.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' Android ' + that.type.Debug.prefix + msg);
            } catch (e) {
            }
          }
          break;
        case that.type.Error.type:
          console.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' ' + that.type.Error.prefix + msg);
          if (_android) {
            try {
              Common.android.log(Common.utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss:ll') + ' Android ' + that.type.Error.prefix + msg);
            } catch (e) {
            }
          }
          break;
      };
    }
  },
  base64: function () {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }
      return utftext;
    };

    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c, c1, c2, c3;
      c = c1 = c2 = c3 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    };
    // public method for encoding
    this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    };

    // public method for decoding
    this.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = _utf8_decode(output);
      return output;
    };
  },
  jLink: function () {
    this.active = 0;
    this.link = [];
    this.content = [];
    this.setActive = function (_active) {
      if (!isNaN(_active)) {
        _active = parseInt(_active, 10);
        var _size = this.content.length;
        if (_active < 0) {
          _active = 0;
        }
        if (_active > _size - 1) {
          _active = 0;
        }
        this.active = _active;
      }
      return this;
    };
    this.getActive = function () {
      return this.active;
    };
    this.setLink = function (_content) {
      if (Object.prototype.toString.call(_content) === '[object Array]') {
        var _size = _content.length;
        if (_size <= 1) {
          this.link = [];
        } else {
          this.link = _content;
        }
        this.active = 0;
      }
      return this;
    };
    this.getLink = function () {
      return this.link;
    };
    this.setContent = function (_content) {
      if (Object.prototype.toString.call(_content) === '[object Array]') {
        var _size = _content.length;
        if (_size <= 1) {
          this.content = [];
        } else {
          this.content = _content;
        }
        this.active = 0;
      }
      return this;
    };
    this.getContent = function () {
      return this.content;
    };
    this.refresh = function (_callback) {
      var _active = this.active;
      var _content = this.content;
      var _size = _content.length;
      if (Object.prototype.toString.call(_content) !== '[object Array]' || _size <= 2) {
        if (_size == 2) {
          if (_active == 0) {
            this.link = [this.content[0], this.content[1]];
          } else {
            this.link = [this.content[1], this.content[0]];
          }
        } else {
          this.link = [];
        }
      } else {
        //数组长度为奇数
        if (_size % 2 != 0) {
          var _per_side_num = (_size - 1) / 2;
          //当前索引超过数组一半
          if ((_active + _per_side_num) > (_size - 1)) {
            var _temp = [];
            var _start = _per_side_num - (_size - _active - 1);
            for (var x = _start; x < _size; x++) {
              _temp.push(_content[x]);
            }
            for (var y = 0; y < _start; y++) {
              _temp.push(_content[y]);
            }
            this.link = _temp;
            //当前索引正好在数组一半位置，左右个数正好相等
          } else if ((_active + _per_side_num) == (_size - 1)) {
            this.link = this.content;
            //当前索引未超过数组一半
          } else {
            var _temp = [];
            var _end = _active + _per_side_num + 1;
            for (var x = 0; x < _end; x++) {
              _temp.push(_content[x]);
            }
            for (var y = _size - 1; y >= _end; y--) {
              _temp.unshift(_content[y]);
            }
            this.link = _temp;
          }
          //数组长度为偶数(默认约定前一半比后一半多一个)
        } else {
          var _right_side_num = _size / 2;
          var _left_side_num = _right_side_num - 1;
          //当前索引超过数组一半
          if ((_active + _right_side_num) > (_size - 1)) {
            var _temp = [];
            var _start = _right_side_num - (_size - _active - 1);
            for (var x = _start; x < _size; x++) {
              _temp.push(_content[x]);
            }
            for (var y = 0; y < _start; y++) {
              _temp.push(_content[y]);
            }
            this.link = _temp;
            //当前索引正好在数组一半位置，左右个数正好相等
          } else if ((_active + _right_side_num) == (_size - 1)) {
            this.link = this.content;
            //当前索引未超过数组一半
          } else {
            var _temp = [];
            var _end = _active + _right_side_num + 1;
            for (var x = 0; x < _end; x++) {
              _temp.push(_content[x]);
            }
            for (var y = _size - 1; y >= _end; y--) {
              _temp.unshift(_content[y]);
            }
            this.link = _temp;
          }
        }
      }
      _callback && _callback(this);
      return this;
    }
  }
}
export default Common;
