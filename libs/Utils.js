const webLog = (msg) => {
    console.log('[vue-tv-frame log] ' + msg)
};
const Constants = {
    uid_key: '_m_tv3_uid',
    music_bg_timer: null,
    music_bg_out_timer: null,
    requestRejectTypes: {
        fail: 1,
        timeout: 2,
        error: 3
    },
};
const android = {
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
        COMMONEVENT_MORETV_MAC_ID: 7,//获取当前设备MAC ID地址             (电视猫)
        COMMONEVENT_IP: 13,//获取当前ip                            (电视猫3.1.6  微鲸 ota21)
        COMMONEVENT_OS: 14,//获取当前设备操作系统信息，0代表安卓系统   (电视猫3.1.6)
        COMMONEVENT_WHALEY_OS: 18,// 获取当前设备操作系统信息，0代表安卓系统   (微鲸 ota21)
        COMMONEVENT_ADPUTTINGID: 15,//广告投放Id                   (电视猫3.1.6  微鲸 ota21)
        COMMONEVENT_MODEL: 16,//设备型号                           (电视猫3.1.6  微鲸 ota21 )
        COMMONEVENT_WHALEY_MAC: 17,//获取当前设备Mac地址            (微鲸 ota21)
        COMMONEVENT_VIDEO_MESSAGE: 19,//获取当前视频播放信息        (电视猫 3.1.7)
        COMMONEVENT_MORETV_USERMESSAGE: 20,   //查询电视猫会员信息               (电视猫 3.1.7)
        COMMONEVENT_WHALEY_USERMESSAGE: 1004,//查询微鲸会员信息(ota19)
        COMMONEVENT_LOGINSTATUS: 21,  //查询登录状态                (电视猫 3.1.7)
        COMMONEVENT_MORETV_MAC_ADDRESS: 22,  //获取电视猫MAC地址                (电视猫 4.0.1)
        COMMONEVENT_WEBVIEW_VISIBLE: 31,//获取webview可见状态（电视猫 4.0.4）"0":可见状态 ,  "1":非可见状态
        COMMONEVENT_WEBVIEW_FOCUS: 30,//获取webview聚焦状态（电视猫 4.0.4）"0":聚焦状态 ,  "1":非聚焦状态
        EXTERBALJUMP: 400, //外部跳转                          (微鲸 ota19)
        EXEC_PLAYMUSIC: 1,
        EXEC_PAUSEMUSIC: 2,
        EXEC_STOPMUSIC: 3,
        EXEC_JUMPPAGE: 4,
        EXEC_VOICECONTROL: 5,
        EXEC_PAGELAYOUT: 6,
        EXEC_PAGETITLE: 7,
        EXEC_BOXCONNECT: 8,
        EXEC_APPINSTALL: 10,//407 获取应用安装情况
        EXEC_WATCHTIME: 13,//407 获取观看时长
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
    log(str) {
        try {
            Android.log(str);
        } catch (e) {
            webLog('Exception: Android.log is undefined');
        }
    },
    getCommonInfo(type) {
        webLog('Android.getCommonInfo(' + type + ')');
        let return_str = '';
        try {
            return_str = Android.getCommonInfo(type);
        } catch (e) {
            return_str = '';
            webLog('Android.getCommonInfo is undefined');
        }
        return return_str;
    },
    execCommonEvent(event, value) {
        webLog('Android.execCommonEvent(' + event + ',' + value + ')');
        let return_str = '';
        try {
            return_str = Android.execCommonEvent(event, value);
        } catch (e) {
            return_str = '';
            webLog('Android.execCommonEvent is undefined');
        }
        return return_str;
    },
    md5Encrypt(str) {
        webLog('Android.md5Encrypt(' + str + ')');
        let return_str = '';
        try {
            return_str = Android.md5Encrypt(str);
        } catch (e) {
            return_str = '';
            webLog('Android.md5Encrypt is undefined');
        }
        return return_str;
    },
    back() {
        try {
            webLog('Android.back');
            this.stop();
            Android.back();
        } catch (e) {
            webLog('Exception: Android.back is undefined');
        }
    },
    /**
     * 电视猫4.0.4 将键值交给安卓处理
     * @param keyName
     */
    outKey(keyName){
        let keyNum = 6;
        switch(keyName){
            case 'Left':
                keyNum = 1;
                break;
            case 'Up':
                keyNum = 2;
                break;
            case 'Right':
                keyNum = 3;
                break;
            case 'Down':
                keyNum = 4;
                break;
            case 'Enter':
                keyNum = 5;
                break;
            case 'Alt':
                keyNum = 6;
                break;
        }
        try{
            webLog('Android.outKey');
            Android.outKey(keyNum)
        }catch(e){
            webLog('Exception: Android.outKey is undefined');
        }
    },
    getUserId() {
        let user_id = this.getCommonInfo(this.type.COMMONEVENT_MORETV_MAC_ID);
        if (user_id) {
            return user_id;
        } else {
            user_id = this.getCommonInfo(this.type.COMMONEVENT_USERID);
            if (user_id) {
                return user_id;
            } else {
                return '';
            }
        }
    },
    gotoApp(page, sid, contentType, whaley) {
        if (page === 'subject') {
            let flag = 0;
            if (contentType === 'kids') {
                flag = 1;
            }
            if (whaley) {
                this.execCommonEvent(this.type.EXEC_JUMPPAGE, 'page=' + page + '&keyword=' + sid + '&contentType=' + contentType + '&flag=' + flag);
            } else {
                this.execCommonEvent(this.type.EXEC_JUMPPAGE, 'page=' + page + '%26keyword=' + sid + '%26contentType=' + contentType + '%26flag=' + flag);
            }

        } else {
            if (whaley) {
                this.execCommonEvent(this.type.EXEC_JUMPPAGE, 'page=' + page + '&sid=' + sid + '&contentType=' + contentType);
            } else {
                this.execCommonEvent(this.type.EXEC_JUMPPAGE, 'page=' + page + '%26sid=' + sid + '%26contentType=' + contentType);
            }

        }
    },
    /**
     * 播放音频文件
     * @param fullPath 音频文件绝对路径
     */
    play(fullPath) {
        if (fullPath) {
            let res = '' + this.execCommonEvent(this.type.EXEC_PLAYMUSIC, fullPath);
            if (res == '0') {
                webLog('media play success,fullPath=' + fullPath);
            } else {
                webLog('media play failed,fullPath=' + fullPath);
            }
        } else {
            webLog('media play failed, fullPath is null');
        }
    },
    /**
     * 暂停音频播放
     */
    pause() {
        let res = '' + this.execCommonEvent(this.type.EXEC_PAUSEMUSIC);
        if (res == '0') {
            webLog('media pause success');
        } else {
            webLog('media pause failed');
        }
    },
    /**
     * 停止音频播放
     */
    stop() {
        clearTimeout(Constants.music_bg_out_timer);
        clearInterval(Constants.music_bg_timer);
        let res = '' + this.execCommonEvent(this.type.EXEC_STOPMUSIC);
        if (res == '0') {
            webLog('media stop success');
        } else {
            webLog('media stop failed');
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
    playEffect(effectPath, effectDuration, bgPath, bgDuration, bgContinue) {
        if (effectPath) {
            clearTimeout(Constants.music_bg_out_timer);
            clearInterval(Constants.music_bg_timer);
            let res = '' + this.execCommonEvent(this.type.EXEC_PLAYMUSIC, effectPath);
            if (res == '0') {
                webLog('media play success,fullPath=' + effectPath);
            } else {
                webLog('media play failed,fullPath=' + effectPath);
            }
            if (bgContinue) {
                if (bgPath) {
                    Constants.music_bg_out_timer = setTimeout( ()=> {
                        this.playBg(bgPath, bgDuration, true);
                    }, effectDuration);
                }
            }
        } else {
            webLog('media play failed, fullPath is null');
        }

    },
    /**
     * 循环播放背景音乐
     * @param bgPath
     * @param bgDuration
     * @param loop
     */
    playBg(bgPath, bgDuration, loop) {
        if (bgPath) {
            this.play(bgPath);
            clearTimeout(Constants.music_bg_out_timer);
            clearInterval(Constants.music_bg_timer);
            if (loop) {
                Constants.music_bg_timer = setInterval( ()=> {
                    this.execCommonEvent(this.type.EXEC_STOPMUSIC);
                    this.play(bgPath);
                }, bgDuration);
            }
        }
    },
    playController: {
        WEB_PLAYEVENT_GET: {
            INFO_CUR_PLAYTIME: 1,//视频当前播放时长
            INFO_TOTAL_PLAYTIME: 2,//视频的总时长
            INFO_SCALE_MODE: 3,//当前播放窗口模式
            INFO_SHOW_HIDE: 4,//404新增当前播放窗口显示隐藏:0:显示,1:隐藏,2:隐藏有声音
            INFO_LAYER_MODE: 5//404新增当前播放窗口层级:0:小窗在上层,1:小窗在下层
        },
        WEB_PLAYEVENT_EXEC: {
            TRAILER_LOCATION: 1,    //定位小窗位置，确定小窗大小 404开始支持播放中调整大小及位置
            TRAILER_STARTPLAY: 2,   //起播，播放指定节目
            TRAILER_PAUSE: 3,		 //暂停
            TRAILER_RESUME: 4,		 //恢复播放
            TRAILER_SEEK: 5,		 //进度跳转
            TRAILER_SCALE_LARGE: 6, //小窗->全屏
            TRAILER_SCALE_SMALL: 7, //全屏->小窗
            TRAILER_STOPPLAY: 8,    //停止播放
            TRAILER_SHOW: 0,    //404新增显示小窗
            TRAILER_HIDE: 1,    //404新增隐藏小窗无声音
            TRAILER_HIDE_VOICE: 2,    //404新增隐藏小窗有声音
            TRAILER_TYPE: 200,//404新增直播等播放类型支持
            TRAILER_SHOW_HIDE: 201,//404新增小窗隐藏显示
            TRAILER_LAYER: 202,//404新增小窗层级调整
            TRAILER_LAYER_UP: 0,//404新增小窗置于上层
            TRAILER_LAYER_DOWN: 1,//404新增小窗置于下层
            TRAILER_SHOW_XY: 11,    //小鹰显示小窗
            TRAILER_HIDE_XY: 10,    //小鹰隐藏小窗
        },
        getPlayInfo(info_type) {
            webLog('android.playController.getPlayInfo(' + info_type + ')');
            if (window.PlayController && window.PlayController.getPlayInfo) {
                return window.PlayController.getPlayInfo(info_type);
            } else {
                webLog('PlayController or PlayController.getPlayInfo undefined');
            }
        },
        getCurrentPlayTime() {
            webLog('android.playController.getCurrentPlayTime()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_CUR_PLAYTIME);
        },
        getTotalPlayTime() {
            webLog('android.playController.getTotalPlayTime()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_TOTAL_PLAYTIME);
        },
        getPlayMode() {
            webLog('android.playController.getPlayMode()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_SCALE_MODE);
        },
        getPlayLayer() {
            webLog('android.playController.getPlayLayer()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_LAYER_MODE);
        },
        getPlayShowStatus() {
            webLog('android.playController.getPlayShowStatus()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_SHOW_HIDE);
        },
        execPlayEvent(event, value) {
            webLog('android.playController.execPlayEvent(' + event + ',' + value + ')');
            if (window.PlayController && window.PlayController.execPlayEvent) {
                window.PlayController.execPlayEvent(event, value);
            } else {
                webLog('PlayController or PlayController.execPlayEvent undefined');
            }
        },
        setWin(pos) {
            webLog('android.playController.setWin(' + pos + ')');
            let location = {
                left: pos.left,
                top: pos.top,
                width: pos.width,
                height: pos.height
            };
            let location_str = JSON.stringify(location);
            webLog(location_str);
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LOCATION, location_str);
        },
        smallWin() {
            webLog('android.playController.smallWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SCALE_SMALL);
        },
        setFullScreen() {
            webLog('android.playController.smallWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SCALE_LARGE);
        },
        /**
         *  2.1 普通直播:sid=5hxzp8stuwa2&contentType=live
         2.2 体育直播:sid=5hxzp8stuwa2&contentType=sportlive
         2.3 网络直播:sid=5hxzp8stuwa2&contentType=webcast
         2.4 轮播:  sid=5hxzp8stuwa2&contentType=cyclelive
         3.1 直接播放地址 sid=vxhi7oc3kle5&playUrlList={"imgUrl":"","playUrl":"http%3A%2F%2Fbpic.wotucdn.com%2F17%2F80%2F83%2F98bOOOPIC78.mp4","title":"%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%91%E5%9C%B0%E5%9D%8011","source":"12"};{"imgUrl":"","playUrl":"http%3A%2F%2Fbpic.wotucdn.com%2F16%2F95%2F30%2F86bOOOPICea.mp4","title":"%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%91%E5%9C%B0%E5%9D%8022","source":"12"}
         ** sid、source、playUrl必传， imgUrl , playUrl, title 的值需要使用urlencode
         * @param value
         */
        livePlay(value) {
            webLog('android.playController.livePlay()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_TYPE, value);
        },
        setLayerUp() {
            webLog('android.playController.setLayerUp()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER, this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER_UP);
        },
        setLayerDown() {
            webLog('android.playController.setLayerDown()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER, this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER_DOWN);
        },
        showPlayWin() {
            webLog('android.playController.showPlayWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW);
        },
        hidePlayWin() {
            webLog('android.playController.hidePlayWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_HIDE);
        },
        hidePlayWinWithVoice() {
            webLog('android.playController.hidePlayWinWithVoice()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_HIDE_VOICE);
        },
        winPlay(play_obj) {
            webLog('android.playController.winPlay(' + play_obj + ')');
            let play = {
                sid: play_obj.sid,
                title: play_obj.title,
                contentType: play_obj.contentType,
                linkType: play_obj.linkType
            };
            let play_str = JSON.stringify(play);
            webLog(play_str);
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STARTPLAY, play_str);
        },
        pause() {
            webLog('android.playController.pause()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_PAUSE);
        },
        resume() {
            webLog('android.playController.resume()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_RESUME);
        },
        stop() {
            webLog('android.playController.stop()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STOPPLAY);
        },
        seek(second) {
            webLog('android.playController.seek(' + second + ')');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SEEK, second);
        }

    }
};
const md5 = {
    hexcase: 0,
    b64pad: '',
    chrsz: 8,
    CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    hex_md5: function (s) {
        var that = this;
        return that.impl.binl2hex(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
    },
    b64_md5: function (s) {
        var that = this;
        return that.impl.binl2b64(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
    },
    str_md5: function (s) {
        var that = this;
        return that.impl.binl2str(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
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
        if (bkey.length > 16) bkey = that.core_md5(bkey, key.length * that.chrsz);

        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = that.core_md5(ipad.concat(that.impl.str2binl(data)), 512 + data.length * that.chrsz);
        return that.core_md5(opad.concat(hash), 512 + 128);
    },
    impl: {
        bit_rol: function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        },
        str2binl: function (str) {
            var chrsz = md5.chrsz;
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
            return bin;
        },
        binl2str: function (bin) {
            var chrsz = md5.chrsz;
            var str = "";
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < bin.length * 32; i += chrsz)
                str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
            return str;
        },
        binl2hex: function (binarray) {
            var hex_tab = md5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
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
                    if (i * 8 + j * 6 > binarray.length * 32) str += md5.b64pad;
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
    }
};
const utils = {
    requestConfig:{
        url:'',
        ts:0
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
                case 'd':
                    return date.getDate();
                case 'dd':
                    return zeroize(date.getDate());
                case 'ddd':
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd':
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M':
                    return date.getMonth() + 1;
                case 'MM':
                    return zeroize(date.getMonth() + 1);
                case 'MMM':
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM':
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy':
                    return new String(date.getFullYear()).substr(2);
                case 'yyyy':
                    return date.getFullYear();
                case 'h':
                    return date.getHours() % 12 || 12;
                case 'hh':
                    return zeroize(date.getHours() % 12 || 12);
                case 'H':
                    return date.getHours();
                case 'HH':
                    return zeroize(date.getHours());
                case 'm':
                    return date.getMinutes();
                case 'mm':
                    return zeroize(date.getMinutes());
                case 's':
                    return date.getSeconds();
                case 'ss':
                    return zeroize(date.getSeconds());
                case 'l':
                    return date.getMilliseconds();
                case 'll':
                    return zeroize(date.getMilliseconds());
                case 'tt':
                    return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT':
                    return date.getHours() < 12 ? 'AM' : 'PM';
            }
        });
    },
    uuid: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = [], i;
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
    uuidFast () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = new Array(36), rnd = 0, r;
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
    uuidCompact () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    /**
     * 随机取数组一个元素
     * @param array
     * @returns {*}
     */
    arrayRandomOne (array) {
        return array[Math.floor(Math.random() * array.length + 1) - 1];
    },
    /**
     * 数组随机打乱
     * @param array
     * @returns {*}
     */
    arrayShuffle (array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) ;
        return array;
    },
    getUrlParams () {
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
    isEmpty (obj) {
        if (typeof obj === 'undefined' || obj == null || obj == 'undefined' || obj == 'null' || obj == '') {
            return true;
        }
        return false;
    },
    setLocalItem (name, value, expire) {
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
        } catch (e) {
        }
    },
    getLocalItem (name) {
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
    removeLocalItem (name) {
        try {
            if (window.localStorage) {
                window.localStorage.removeItem(name);
            } else {
                var _value = this.getLocalItem(name);
                if (_value) {
                    document.cookie = (name + "=" + escape(_value) + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
                }
            }
        } catch (e) {
        }
    },
    secondToTimeFormat2 (seconds, defaultStr) {
        if (this.isEmpty(seconds)) {
            return defaultStr || '00:00';
        }
        let minutes = parseInt(seconds / 60);
        let second = parseInt(seconds - minutes * 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        second = second < 10 ? '0' + second : second;
        return minutes + ":" + second;
    },
    secondToTimeFormat3 (seconds, defaultStr) {
        if (this.isEmpty(seconds)) {
            return defaultStr || '';
        }
        let hours = parseInt(seconds / (60 * 60));
        let minutes = parseInt((seconds - (hours * 60 * 60)) / 60);
        let second = parseInt(seconds - (hours * 60 * 60) - minutes * 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        second = second < 10 ? '0' + second : second;
        return hours + ":" + minutes + ":" + second;
    },
    trim (str) {
        if (!str) {
            return '';
        }
        const trimLeft = /^\s+/,
            trimRight = /\s+$/;
        return str.toString().replace(trimLeft, '').replace(trimRight, '');
    },
    preLoadRes: function (pathArr, perCall, finishCall) {
        let counter = 0;
        const loadImg = ((src, finish, count) =>{
            let img = new Image();
            img.onload =  ()=> {
                finish && finish();
            };
            img.onerror =  ()=> {
                if (!count) {
                    loadImg(src, finish, 1)
                } else {
                    finish && finish();
                }
            };
            img.src = src;
        });
        const loopLoad = src=> {
            loadImg(src, () =>{
                counter++;
                if (counter >= pathArr.length) {
                    finishCall && finishCall(pathArr.length, pathArr.length)
                } else {
                    perCall && perCall(counter, pathArr.length);
                    loopLoad(pathArr[counter])
                }
            })
        };
        loopLoad(pathArr[counter]);
    },
    request (config, data, success, fail, timeout, count) {
        webLog('request url ' + config.url);
        const cts = new Date().getTime();
        if(config.url===this.requestConfig.url && !config.ignoreFast && cts-this.requestConfig.ts<200){
            webLog('request too fast in 200ms ');
            return
        }
        this.requestConfig.url=config.url;
        this.requestConfig.ts=cts;
        webLog('request data ' + (data && JSON.stringify(data)));
        const method = (config.method || 'get').toUpperCase();
        let _data = data;
        if (method === 'POST') {
            _data = data;
        }
        $.ajax({
            type: method,
            contentType:config.contentType?config.contentType:'application/x-www-form-urlencoded',
            url: config.cache ? config.url : (config.url.indexOf('?') > -1 ? config.url + '&_T=' + cts +'_'+ this.uuid(8) : config.url + '?_T=' + cts +'_'+ this.uuid(8)),
            // data to be added to query string:
            data: _data,
            // type of data we are expecting in return:
            dataType: 'json',
            timeout: config.time || 5000,
            success (data) {
                // webLog(data)
                webLog('request url ' + config.url + ' success');
                try {
                    webLog('response data ' + JSON.stringify(data))
                } catch (e) {
                }
                success && success(data);
            },
            error (xhr, type) {
                if (type === 'timeout' && config.retry) {
                    if (!count) {
                        webLog('request url ' + config.url + ' retry');
                        this.request(config, data, success, fail, timeout, 1)
                    } else {
                        webLog('request url ' + config.url + ' timeout callback');
                        timeout && timeout();
                    }
                } else {
                    webLog('request url ' + config.url + ' error');
                    fail && fail();
                }
            }
        })
    },
    promiseRequest(config, data) {
        return new Promise((resolve, reject) => {
            try {
                this.request(config, data, res => {
                    resolve(res);
                }, () => {
                    reject({rejectType: Constants.requestRejectTypes.fail});
                }, () => {
                    reject({rejectType: Constants.requestRejectTypes.timeout})
                })
            } catch (e) {
                reject({rejectType: Constants.requestRejectTypes.error})
            }
        })
    }

};
let useId = '';
const getUseId = type => {
    if (!useId) {
        const getUid = ()=>{
            let uid = utils.getLocalItem(Constants.uid_key);
            if(uid){
                webLog('uid from local ' + useId);
            }else{
                uid = md5.hex_md5(utils.uuid(32) +utils.uuid(8)+ new Date().getTime());
                utils.setLocalItem(Constants.uid_key, uid);
                webLog('uid from set ' + uid);
            }
            return uid;
        };
        switch (type) {
            case 1:
                useId = android.getUserId();
                break;
            case 2:
                useId = android.getCommonInfo(android.type.COMMONEVENT_DEVICEID);
                break;
            case 3:
                useId = getUid();
                break;
            default:
                useId = getUid();
                break;
        }
    }
    return useId;
};
const getCommonParams = (ts,secret)=>{
    const id = getUseId();
    if(!secret){
        return {
            uid: id,
            openId: id,
            timestamp: ts,
            token: android.md5Encrypt(id + ts)
        }
    }else{
        return {
            uid: id,
            openId: id,
            timestamp: ts,
            token: md5.hex_md5(id + ts + secret)
        }
    }
};
const Common = {android,md5,utils,getUseId,getCommonParams};
export default Common
