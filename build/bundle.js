/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtvCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return keyController; });
// import Common from './Common';

var MtvCore = {
    vm: null,
    CurrentPage: {},
    CurrentZone: {},
    PrevPage: {},
    PrevZone: {},
    Page: {},
    ReturnPage: [],
    createPage: function createPage(pageId) {
        var Page = function Page(pageId) {
            return {
                id: pageId,
                currentZoneId: '',
                Zone: {}
            };
        };
        this.Page[pageId] = new Page(pageId);
        this.Page[pageId].createZone = this.createZone;
        return this.Page[pageId];
    },

    /**
     * @param zoneId
     * @param zoneParam
     */
    createZone: function createZone(zoneId, zoneParam) {
        var that = this;
        var Zone = function Zone(zoneId, zoneParam) {
            return {
                id: zoneId,
                row: zoneParam.row || 0,
                column: zoneParam.column || 0,
                count: zoneParam.count || 0,
                crow: 0,
                page: that,
                Up: zoneParam.Up || '',
                Down: zoneParam.Down || '',
                Left: zoneParam.Left || '',
                Right: zoneParam.Right || '',
                index: 0,
                Item: {},
                Items: []
            };
        };
        this.Zone[zoneId] = new Zone(zoneId, zoneParam);
        this.Zone[zoneId].createItem = MtvCore.createItem;
        this.currentZoneId = zoneId;
        return this.Zone[zoneId];
    },

    /**
     * @param value
     */
    createItem: function createItem(value) {
        // const domId = Common.utils.uuid(9);
        // const itemId = 'item_' + domId;
        var itemId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        this.Item[itemId] = {
            id: itemId,
            // domId: domId,
            zone: this,
            value: value || null
        };
        this.Items.push(this.Item[itemId]);
        return this.Item[itemId];
    },
    boundVM: function boundVM(vueEntity) {
        this.vm = vueEntity;
    },
    initZone: function initZone(pageConfig) {
        var that = this;

        var _loop = function _loop(config) {
            var pageObj = pageConfig[config];
            var page = that.createPage(pageObj.id);
            pageObj.zone_ids.forEach(function (zoneId, index) {
                var zone = page.createZone(zoneId, {
                    row: pageObj.row[index],
                    column: pageObj.column[index],
                    count: pageObj.count[index],
                    Left: pageObj.Left[index],
                    Right: pageObj.Right[index],
                    Up: pageObj.Up[index],
                    Down: pageObj.Down[index]
                });
                for (var i = 0; i < pageObj.count[index]; i++) {
                    zone.createItem();
                }
            });
        };

        for (var config in pageConfig) {
            _loop(config);
        }
    },
    resetZone: function resetZone(pageId, zoneId, row, column, count) {
        var that = this;
        if (that.Page[pageId]) {
            if (!that.Page[pageId].Zone[zoneId]) {
                that.Page[pageId].createZone(zoneId, {
                    row: row,
                    column: column,
                    count: count,
                    Left: '',
                    Right: '',
                    Up: '',
                    Down: ''
                });
            }
            that.Page[pageId].Zone[zoneId].Items = [];
            for (var i = 0; i < count; i++) {
                that.Page[pageId].Zone[zoneId].createItem();
            }
        }
    },

    /**
     * Android执行的异步回调
     * @param event_type
     * @param value
     */
    execCommonEvent: function execCommonEvent(event_type, value) {
        if (this.vm && this.vm.execCommonEvent) {
            this.vm.execCommonEvent(event_type, value);
        }
    },
    onWebViewFocusChanged: function onWebViewFocusChanged(gainFocus, direction) {
        if (this.vm && this.vm.onWebViewFocusChanged) {
            this.vm.onWebViewFocusChanged(gainFocus, direction);
        }
    },
    onWebViewVisiable: function onWebViewVisiable(visibility) {
        if (this.vm && this.vm.onWebViewVisiable) {
            this.vm.onWebViewVisiable(visibility);
        }
    }
};
MtvCore.keyController = {
    $core: MtvCore,
    vm: null,
    Loading: false,
    KeyName: {
        Up: 'Up',
        Down: 'Down',
        Left: 'Left',
        Right: 'Right',
        Enter: 'Enter',
        Alt: 'Alt',
        Home: 'Home'
    },
    keyPress: function keyPress(keyName) {
        if (this.Loading) {
            if (keyName === this.KeyName.Alt) {
                this.evtAlt();
            } else {
                return false;
            }
        } else {
            if (keyName === this.KeyName.Alt) {
                this.evtAlt();
            } else if (keyName === this.KeyName.Enter) {
                this.evtEnter();
            } else if (keyName === this.KeyName.Home) {
                this.evtHome();
            } else {
                this.evtArrow(keyName);
            }
        }
    },

    /**
     * Page跳转
     * @param pageId 目标页面id （必选）
     * @param zoomId 目标zoneId （可选）
     * @param pageHide 是否隐藏当前page （可选）
     * @param currentIndex 设置目标zone选中Item的index （可选）
     */
    changePage: function changePage(pageId, zoomId, pageHide, currentIndex) {
        if (!this.$core.vm) {
            throw new Error('change page error, vue entity is not bounded');
            return;
        }
        this.$core.CurrentPage.currentZoneId = this.$core.CurrentZone.id;
        if (this.$core.Page[pageId]) {
            this.$core.ReturnPage.push(this.$core.CurrentPage);
            var prePageId = this.$core.CurrentPage.id;
            this.$core.PrevPage = this.$core.CurrentPage;
            this.$core.PrevZone = this.$core.CurrentZone;
            this.$core.CurrentPage = this.$core.Page[pageId];
            if (zoomId && this.$core.Page[pageId].Zone[zoomId]) {
                this.$core.CurrentPage.currentZoneId = zoomId;
                this.$core.CurrentZone = this.$core.Page[pageId].Zone[zoomId];
                if (currentIndex !== undefined) {
                    this.$core.CurrentZone.index = currentIndex;
                }
                this.$core.vm.setPageShowHide(pageId, true);
            } else if (this.$core.CurrentPage.currentZoneId) {
                this.$core.CurrentZone = this.$core.Page[pageId].Zone[this.$core.CurrentPage.currentZoneId];
                if (currentIndex !== undefined) {
                    this.$core.CurrentZone.index = currentIndex;
                }
                this.$core.vm.setPageShowHide(pageId, true);
            } else {
                this.$core.CurrentZone = this.$core.Page[pageId].Zone[this.$core.vm.pages[pageId].zone_ids[0]];
                this.$core.CurrentPage.currentZoneId = this.$core.vm.pages[pageId].zone_ids[0];
                if (currentIndex !== undefined) {
                    this.$core.CurrentZone.index = currentIndex;
                }
                this.$core.vm.setPageShowHide(pageId, true);
            }
            if (pageHide) {
                this.$core.vm.setPageShowHide(prePageId, false);
            }
        } else {
            throw new Error('change page error, the destination page is not register in MtvCore!');
        }
    },

    /**
     * Page返回，默认返回到PrevPage
     * @param pageHide 是否隐藏当前page （必选）
     * @param zoomId 指定zone为CurrentZone （可选）
     * @param currentIndex 设置目标zone选中的Item的index （可选）
     */
    returnPage: function returnPage(pageHide, zoomId, currentIndex) {
        if (!this.$core.vm) {
            throw new Error('return page error, vue entity is not bounded');
            return;
        }
        if (!this.$core.ReturnPage.length) {
            console.warn('The ReturnPage array is empty,do nothing!');
            return;
        } else {
            var prevPage = this.$core.ReturnPage.pop();
            this.$core.PrevPage = prevPage;
            this.$core.PrevZone = this.$core.CurrentZone;
            if (pageHide) {
                this.$core.vm.setPageShowHide(this.$core.CurrentPage.id, false);
            }
            this.$core.CurrentPage = prevPage;
            this.$core.vm.setPageShowHide(this.$core.CurrentPage.id, true);
            if (!zoomId) {
                zoomId = this.$core.CurrentPage.currentZoneId;
            }
            if (this.$core.CurrentPage.Zone[zoomId]) {
                this.$core.CurrentPage.currentZoneId = zoomId;
                this.$core.CurrentZone = this.$core.CurrentPage.Zone[zoomId];
                if (currentIndex !== undefined) {
                    this.$core.CurrentZone.index = currentIndex;
                }
            } else {
                throw new Error('return page error, the destination zone is not register in MtvCore!');
            }
        }
    },

    /**
     * 切换Zone
     * @param zoomId 指定zone为CurrentZone （必选）
     * @param currentIndex 设置目标zone选中的Item的index （可选）
     */
    changeZone: function changeZone(zoomId, currentIndex) {
        if (!zoomId) {
            console.warn('The zoomId is empty, change zone do nothing!');
            return;
        }
        this.$core.PrevZone = this.$core.CurrentZone;
        if (this.$core.CurrentPage.Zone[zoomId]) {
            this.$core.CurrentPage.currentZoneId = zoomId;
            this.$core.CurrentZone = this.$core.CurrentPage.Zone[zoomId];
            if (currentIndex !== undefined) {
                this.$core.CurrentZone.index = currentIndex;
            }
        } else {
            throw new Error('change zone error, the destination zone is not register in MtvCore!');
        }
    },
    evtArrow: function evtArrow(keyName) {
        var that = this;
        var CurrentPage = this.$core.CurrentPage;
        var CurrentZone = this.$core.CurrentZone;
        var index = CurrentZone.index;
        var Steps = CurrentZone.row * CurrentZone.column;
        var Row = Math.floor(index / CurrentZone.column);
        CurrentZone.StepSeq = CurrentZone.StepSeq || 0;
        if (this.onArrowItem(keyName)) {
            return;
        }
        var Border = CurrentZone[keyName];
        var cRow = CurrentZone.crow;
        switch (keyName) {
            case this.KeyName.Left:
                index -= 1;
                if (Math.floor(index / CurrentZone.column) !== Row) {
                    index = index - Steps;
                }
                break;
            case this.KeyName.Right:
                index += 1;
                if (Math.floor(index / CurrentZone.column) !== Row) {
                    index = index + Steps;
                }
                break;
            case this.KeyName.Up:
                index -= CurrentZone.column;
                CurrentZone.crow = cRow - 1;
                break;
            case this.KeyName.Down:
                index += CurrentZone.column;
                CurrentZone.crow = cRow + 1;
                break;
        }
        var OverBorder = function OverBorder() {
            if (Border) {
                if (Border === CurrentZone.id) {
                    ScrollItem();
                } else {
                    ChangeZone();
                }
            }

            function ScrollItem() {
                switch (keyName) {
                    case that.KeyName.Up:
                        index = CurrentZone.index + CurrentZone.column * (CurrentZone.row - 1);
                        CurrentZone.crow = CurrentZone.row - 1;
                        break;
                    case that.KeyName.Down:
                        index = CurrentZone.item - CurrentZone.column * (CurrentZone.row - 1);
                        CurrentZone.crow = 0;
                        break;
                    case that.KeyName.Left:
                        index = (Row + 1) * CurrentZone.column - 1;
                        break;
                    case that.KeyName.Right:
                        index = Row * CurrentZone.column;
                        break;
                }
                //当前焦点区域对应的数值的个数超过一屏的显示个数，产生翻页效果
                if (CurrentZone.count > Steps) {
                    CurrentZone.StepSeq = CurrentZone.StepSeq || 0;
                    var MaxSeq = Math.ceil(CurrentZone.count / Steps) - 1;
                    if (keyName === that.KeyName.Left || keyName === that.KeyName.Up) {
                        //左键或者上键，往前翻
                        CurrentZone.StepSeq = CurrentZone.StepSeq > 0 ? CurrentZone.StepSeq - 1 : MaxSeq;
                    } else if (keyName === that.KeyName.Right || keyName === that.KeyName.Down) {
                        //右键或者下键，往后翻
                        CurrentZone.StepSeq = CurrentZone.StepSeq < MaxSeq ? CurrentZone.StepSeq + 1 : 0;
                    }
                }
                //数值个数不够时，光标定位在第一个上面
                if (index + CurrentZone.StepSeq * Steps + 1 > CurrentZone.count) {
                    index = 0;
                }
                CurrentZone.index = index;
                //执行用户定义函数
                that.onScrollItem(keyName);
            }

            function ChangeZone() {
                that.$core.PrevZone = CurrentZone;
                that.$core.CurrentZone = CurrentZone = CurrentPage.Zone[Border];
                that.$core.Page[CurrentPage.id].Zone[CurrentZone.id].index = that.$core.Page[CurrentPage.id].Zone[CurrentZone.id].index || 0;
                that.$core.Page[CurrentPage.id].currentZoneId = CurrentZone.id;
                //执行用户定义函数
                that.onChangeZone(keyName);
            }
        };
        if (index >= 0 && index <= Steps - 1) {
            if (index + CurrentZone.StepSeq * Steps + 1 > CurrentZone.count) {
                index = CurrentZone.count - CurrentZone.StepSeq * Steps - 1;
            }
            CurrentZone.index = index;
            //执行用户定义函数
            that.onChangeItem(keyName);
        } else {
            CurrentZone.crow = cRow;
            OverBorder();
        }
    },
    evtEnter: function evtEnter() {
        this.$core.vm.onEvtEnter();
    },
    evtAlt: function evtAlt() {
        this.$core.vm.onEvtAlt();
    },
    evtHome: function evtHome() {
        this.$core.vm.onEvtHome();
    },
    onArrowItem: function onArrowItem(keyName) {
        return this.$core.vm.onArrowItem(keyName);
    },
    onChangeItem: function onChangeItem(keyName) {
        this.$core.vm.onChangeItem(keyName);
    },
    onScrollItem: function onScrollItem(keyName) {
        this.$core.vm.onScrollItem(keyName);
    },
    onChangeZone: function onChangeZone(keyName) {
        this.$core.vm.onChangeZone(keyName);
    }
};

var keyController = MtvCore.keyController;
window.MtvCore = MtvCore;


/* harmony default export */ __webpack_exports__["b"] = (MtvCore);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_Interface__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_Utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_MtvCore__ = __webpack_require__(0);




exports.common = __WEBPACK_IMPORTED_MODULE_1__libs_Utils__["a" /* default */]
exports.MtvCore = __WEBPACK_IMPORTED_MODULE_2__libs_MtvCore__["b" /* default */]





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MtvCore__ = __webpack_require__(0);

var prevTs = 0;
var Interface = {
    dispatchKeyEvent: function dispatchKeyEvent(event_type) {
        var ct = new Date().getTime();
        if (ct - prevTs < 200) {
            return;
        }
        prevTs = ct;
        event_type = parseInt(event_type, 10);
        switch (event_type) {
            case 1:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Left);
                break;
            case 2:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Up);
                break;
            case 3:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Right);
                break;
            case 4:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Down);
                break;
            case 5:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Enter);
                break;
            case 6:
                __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(__WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt);
                break;
        }
        console.log('android dispatchKeyEvent:' + event_type);
    },

    /**
     * Android执行的异步回调
     * @param event_type
     * @param value
     */
    execCommonEvent: function execCommonEvent(event_type, value) {
        // event_type = parseInt(event_type, 10);
        // value = JSON.stringify(value);
        __WEBPACK_IMPORTED_MODULE_0__MtvCore__["a" /* MtvCore */].execCommonEvent(event_type, value);
        console.log('android execCommonEvent:' + event_type + '-----' + value);
        // switch (event_type) {
        //     case 1001:
        //         /* 登录的异步回调 */
        //         //{status:200,accountid:"",phone:""}
        //         break;
        //     case 1002:
        //         /* 兑换的异步回调 */
        //         //{status:200}
        //         break;
        //     case 1003:
        //         /* 视频播放全屏变小窗异步回调 */
        //         // value = JSON.parse(value);
        //         // if (value.status == 200 && value.hasPlayed && !value.isFull) {
        //             // common.android.playController.stop();
        //             // var value = common.android.getCommonInfo(common.android.type.COMMONEVENT_VIDEO_MESSAGE);
        //             // $('#win_callback').html(value)
        //         // } else {
        //             // var value= '没有起播';
        //         // }
        //         break;
        //     case 1004:
        //         /* 跳转会员中心异步回调  -- 返回H5时 会重新加载页面 光标需要手动聚焦（单独处理） -- */
        //
        //         break;
        //     case 1005:
        //         /* 跳转商品购买异步回调  */
        //         break;
        //     case 1006:
        //         /* webview加载完成异步回调  */
        //         break;
        //     case 1007:
        //         /* 视频播放结束后异步回调 */
        //         // $('#video_callback').html(value)
        //         break;
        //     case 1008:
        //         /* 音频播放结束后异步回调 */
        //         // $('#audio_callback').html(value)
        //         break;
        //     case 12:
        //         // $('#upgrade').html(value)
        //         break;
        // }
    },

    /**
     * webview焦点变化时回调
     * @param gainFocus 0:聚焦 , 1:失焦
     * @param direction 聚焦方向
     */
    onWebViewFocusChanged: function onWebViewFocusChanged(gainFocus, direction) {
        __WEBPACK_IMPORTED_MODULE_0__MtvCore__["a" /* MtvCore */].onWebViewFocusChanged(gainFocus, direction);
    },

    /**
     * webview可见状态变化时回调
     * @param visibility  0:可见 , 1:不可见
     */
    onWebViewVisiable: function onWebViewVisiable(visibility) {
        __WEBPACK_IMPORTED_MODULE_0__MtvCore__["a" /* MtvCore */].onWebViewVisiable(visibility);
    },
    init: function init() {
        window.dispatchKeyEvent = this.dispatchKeyEvent;
        window.execCommonEvent = this.execCommonEvent;
        window.onWebViewFocusChanged = this.onWebViewFocusChanged;
        window.onWebViewVisiable = this.onWebViewVisiable;
        document.onkeydown = function (evt) {
            var KeyName = {
                19: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Up,
                38: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Up, //Keyboard
                20: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Down,
                40: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Down, //Keyboard
                21: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Left,
                37: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Left, //Keyboard
                22: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Right,
                39: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Right, //Keyboard
                23: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Enter,
                13: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Enter, //Keyboard
                4: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt,
                18: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt, //Keyboard Alt键
                27: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt, //Keyboard ESC
                24: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt, //Keyboard ESC
                66: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Enter,
                111: __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].KeyName.Alt

            };
            evt = evt || window.event;
            var KeyCode = evt.which || evt.keyCode;
            __WEBPACK_IMPORTED_MODULE_0__MtvCore__["c" /* keyController */].keyPress(KeyName[KeyCode]);
            return true;
        };
    }
};
Interface.init();
/* unused harmony default export */ var _unused_webpack_default_export = (Interface);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var webLog = function webLog(msg) {
    console.log('[vue-tv-frame log] ' + msg);
};
var Constants = {
    uid_key: '_m_tv3_uid',
    music_bg_timer: null,
    music_bg_out_timer: null,
    requestRejectTypes: {
        fail: 1,
        timeout: 2,
        error: 3
    }
};
var android = {
    type: {
        COMMONEVENT_PINCODE: 1,
        COMMONEVENT_USERID: 2, //userID             (电视猫)
        COMMONEVENT_APPVERSION: 3, //APP 版本号
        COMMONEVENT_CONNECT_URL: 4,
        COMMONEVENT_NEW_APPVERSION: 5, //APP 版本号
        COMMONEVENT_ACCOUNTID: 6, //当前登录账户ID   (微鲸)
        COMMONEVENT_GUID: 7, //当前设备唯一识别ID    (微鲸)
        COMMONEVENT_SN: 8, //电视机设备号           (微鲸 ota16)
        COMMONEVENT_DEVICEID: 9, //电视机设备id    (微鲸 ota16   电视猫3.1.6 )
        COMMONEVENT_ACCESSTOKEN: 10, //帐号系统登录成功后下发的鉴权凭证    (微鲸 ota16)
        COMMONEVENT_UPGRADE: 12, //获取当前设备可升级的版本   (微鲸 ota19 电视猫3.1.6)
        COMMONEVENT_WUI: 14, //获取当前WUI   (微鲸 ota19)
        COMMONEVENT_MORETV_MAC_ID: 7, //获取当前设备MAC ID地址             (电视猫)
        COMMONEVENT_IP: 13, //获取当前ip                            (电视猫3.1.6  微鲸 ota21)
        COMMONEVENT_OS: 14, //获取当前设备操作系统信息，0代表安卓系统   (电视猫3.1.6)
        COMMONEVENT_WHALEY_OS: 18, // 获取当前设备操作系统信息，0代表安卓系统   (微鲸 ota21)
        COMMONEVENT_ADPUTTINGID: 15, //广告投放Id                   (电视猫3.1.6  微鲸 ota21)
        COMMONEVENT_MODEL: 16, //设备型号                           (电视猫3.1.6  微鲸 ota21 )
        COMMONEVENT_WHALEY_MAC: 17, //获取当前设备Mac地址            (微鲸 ota21)
        COMMONEVENT_VIDEO_MESSAGE: 19, //获取当前视频播放信息        (电视猫 3.1.7)
        COMMONEVENT_MORETV_USERMESSAGE: 20, //查询电视猫会员信息               (电视猫 3.1.7)
        COMMONEVENT_WHALEY_USERMESSAGE: 1004, //查询微鲸会员信息(ota19)
        COMMONEVENT_LOGINSTATUS: 21, //查询登录状态                (电视猫 3.1.7)
        COMMONEVENT_MORETV_MAC_ADDRESS: 22, //获取电视猫MAC地址                (电视猫 4.0.1)
        COMMONEVENT_WEBVIEW_VISIBLE: 31, //获取webview可见状态（电视猫 4.0.4）"0":可见状态 ,  "1":非可见状态
        COMMONEVENT_WEBVIEW_FOCUS: 30, //获取webview聚焦状态（电视猫 4.0.4）"0":聚焦状态 ,  "1":非聚焦状态
        EXTERBALJUMP: 400, //外部跳转                          (微鲸 ota19)
        EXEC_PLAYMUSIC: 1,
        EXEC_PAUSEMUSIC: 2,
        EXEC_STOPMUSIC: 3,
        EXEC_JUMPPAGE: 4,
        EXEC_VOICECONTROL: 5,
        EXEC_PAGELAYOUT: 6,
        EXEC_PAGETITLE: 7,
        EXEC_BOXCONNECT: 8,
        EXEC_APPINSTALL: 10, //407 获取应用安装情况
        EXEC_WATCHTIME: 13, //407 获取观看时长
        EVENT_AUDIO_TEXT: 101,
        EVENT_LAYOUT_LEVEL: 102,
        EVENT_LAYOUT_BACK: 103,
        EVENT_TVCONNECTED: 104,
        EVENT_LOGIN: 1001,
        EVENT_EXCHANGE: 1002, //(value:{"clubCode":"", "cdkey":""}, 其中clubCode为兑换码对应的产品编码（比如少儿"child"，白金"basic"，钻石"diamond"等），cdkey为兑换码)
        EVENT_BUY: 1003,
        EVENT_LOADINGSTART: 1009, //调取安卓loading圈           (电视猫 3.1.7  微鲸 ota22)
        EVENT_LOADINGEND: 1010, //关闭安卓loading圈           (电视猫 3.1.7  微鲸 ota22)
        EVENT_TOAST: 1011, //调用安卓toast                (电视猫 3.1.7  微鲸 ota22)
        //常量定义
        JUMPPAGE: {
            AccountHomePage: 'page=AccountHomePage', //电视猫页面跳转 - 会员中心页       (电视猫 3.1.7)
            TencentLoginPage: 'page=TencentLoginPage', //电视猫页面跳转 - 腾讯登录页     (电视猫 3.1.7)
            TencentVipPage: 'page=TencentVipPage&entrance=H5&from=200&vipBid=90&cid=""&vid=""&pid=""&mid=""&extraParam=""' //电视猫页面跳转 - 腾讯商品购买页    (电视猫 3.1.7)
        }
    },
    log: function log(str) {
        try {
            Android.log(str);
        } catch (e) {
            webLog('Exception: Android.log is undefined');
        }
    },
    getCommonInfo: function getCommonInfo(type) {
        webLog('Android.getCommonInfo(' + type + ')');
        var return_str = '';
        try {
            return_str = Android.getCommonInfo(type);
        } catch (e) {
            return_str = '';
            webLog('Android.getCommonInfo is undefined');
        }
        return return_str;
    },
    execCommonEvent: function execCommonEvent(event, value) {
        webLog('Android.execCommonEvent(' + event + ',' + value + ')');
        var return_str = '';
        try {
            return_str = Android.execCommonEvent(event, value);
        } catch (e) {
            return_str = '';
            webLog('Android.execCommonEvent is undefined');
        }
        return return_str;
    },
    md5Encrypt: function md5Encrypt(str) {
        webLog('Android.md5Encrypt(' + str + ')');
        var return_str = '';
        try {
            return_str = Android.md5Encrypt(str);
        } catch (e) {
            return_str = '';
            webLog('Android.md5Encrypt is undefined');
        }
        return return_str;
    },
    back: function back() {
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
    outKey: function outKey(keyName) {
        var keyNum = 6;
        switch (keyName) {
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
        try {
            webLog('Android.outKey');
            Android.outKey(keyNum);
        } catch (e) {
            webLog('Exception: Android.outKey is undefined');
        }
    },
    getUserId: function getUserId() {
        var user_id = this.getCommonInfo(this.type.COMMONEVENT_MORETV_MAC_ID);
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
    gotoApp: function gotoApp(page, sid, contentType, whaley) {
        if (page === 'subject') {
            var flag = 0;
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
    play: function play(fullPath) {
        if (fullPath) {
            var res = '' + this.execCommonEvent(this.type.EXEC_PLAYMUSIC, fullPath);
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
    pause: function pause() {
        var res = '' + this.execCommonEvent(this.type.EXEC_PAUSEMUSIC);
        if (res == '0') {
            webLog('media pause success');
        } else {
            webLog('media pause failed');
        }
    },

    /**
     * 停止音频播放
     */
    stop: function stop() {
        clearTimeout(Constants.music_bg_out_timer);
        clearInterval(Constants.music_bg_timer);
        var res = '' + this.execCommonEvent(this.type.EXEC_STOPMUSIC);
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
    playEffect: function playEffect(effectPath, effectDuration, bgPath, bgDuration, bgContinue) {
        var _this = this;

        if (effectPath) {
            clearTimeout(Constants.music_bg_out_timer);
            clearInterval(Constants.music_bg_timer);
            var res = '' + this.execCommonEvent(this.type.EXEC_PLAYMUSIC, effectPath);
            if (res == '0') {
                webLog('media play success,fullPath=' + effectPath);
            } else {
                webLog('media play failed,fullPath=' + effectPath);
            }
            if (bgContinue) {
                if (bgPath) {
                    Constants.music_bg_out_timer = setTimeout(function () {
                        _this.playBg(bgPath, bgDuration, true);
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
    playBg: function playBg(bgPath, bgDuration, loop) {
        var _this2 = this;

        if (bgPath) {
            this.play(bgPath);
            clearTimeout(Constants.music_bg_out_timer);
            clearInterval(Constants.music_bg_timer);
            if (loop) {
                Constants.music_bg_timer = setInterval(function () {
                    _this2.execCommonEvent(_this2.type.EXEC_STOPMUSIC);
                    _this2.play(bgPath);
                }, bgDuration);
            }
        }
    },

    playController: {
        WEB_PLAYEVENT_GET: {
            INFO_CUR_PLAYTIME: 1, //视频当前播放时长
            INFO_TOTAL_PLAYTIME: 2, //视频的总时长
            INFO_SCALE_MODE: 3, //当前播放窗口模式
            INFO_SHOW_HIDE: 4, //404新增当前播放窗口显示隐藏:0:显示,1:隐藏,2:隐藏有声音
            INFO_LAYER_MODE: 5 //404新增当前播放窗口层级:0:小窗在上层,1:小窗在下层
        },
        WEB_PLAYEVENT_EXEC: {
            TRAILER_LOCATION: 1, //定位小窗位置，确定小窗大小 404开始支持播放中调整大小及位置
            TRAILER_STARTPLAY: 2, //起播，播放指定节目
            TRAILER_PAUSE: 3, //暂停
            TRAILER_RESUME: 4, //恢复播放
            TRAILER_SEEK: 5, //进度跳转
            TRAILER_SCALE_LARGE: 6, //小窗->全屏
            TRAILER_SCALE_SMALL: 7, //全屏->小窗
            TRAILER_STOPPLAY: 8, //停止播放
            TRAILER_SHOW: 0, //404新增显示小窗
            TRAILER_HIDE: 1, //404新增隐藏小窗无声音
            TRAILER_HIDE_VOICE: 2, //404新增隐藏小窗有声音
            TRAILER_TYPE: 200, //404新增直播等播放类型支持
            TRAILER_SHOW_HIDE: 201, //404新增小窗隐藏显示
            TRAILER_LAYER: 202, //404新增小窗层级调整
            TRAILER_LAYER_UP: 0, //404新增小窗置于上层
            TRAILER_LAYER_DOWN: 1, //404新增小窗置于下层
            TRAILER_SHOW_XY: 11, //小鹰显示小窗
            TRAILER_HIDE_XY: 10 //小鹰隐藏小窗
        },
        getPlayInfo: function getPlayInfo(info_type) {
            webLog('android.playController.getPlayInfo(' + info_type + ')');
            if (window.PlayController && window.PlayController.getPlayInfo) {
                return window.PlayController.getPlayInfo(info_type);
            } else {
                webLog('PlayController or PlayController.getPlayInfo undefined');
            }
        },
        getCurrentPlayTime: function getCurrentPlayTime() {
            webLog('android.playController.getCurrentPlayTime()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_CUR_PLAYTIME);
        },
        getTotalPlayTime: function getTotalPlayTime() {
            webLog('android.playController.getTotalPlayTime()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_TOTAL_PLAYTIME);
        },
        getPlayMode: function getPlayMode() {
            webLog('android.playController.getPlayMode()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_SCALE_MODE);
        },
        getPlayLayer: function getPlayLayer() {
            webLog('android.playController.getPlayLayer()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_LAYER_MODE);
        },
        getPlayShowStatus: function getPlayShowStatus() {
            webLog('android.playController.getPlayShowStatus()');
            return this.getPlayInfo(this.WEB_PLAYEVENT_GET.INFO_SHOW_HIDE);
        },
        execPlayEvent: function execPlayEvent(event, value) {
            webLog('android.playController.execPlayEvent(' + event + ',' + value + ')');
            if (window.PlayController && window.PlayController.execPlayEvent) {
                window.PlayController.execPlayEvent(event, value);
            } else {
                webLog('PlayController or PlayController.execPlayEvent undefined');
            }
        },
        setWin: function setWin(pos) {
            webLog('android.playController.setWin(' + pos + ')');
            var location = {
                left: pos.left,
                top: pos.top,
                width: pos.width,
                height: pos.height
            };
            var location_str = JSON.stringify(location);
            webLog(location_str);
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LOCATION, location_str);
        },
        smallWin: function smallWin() {
            webLog('android.playController.smallWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SCALE_SMALL);
        },
        setFullScreen: function setFullScreen() {
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
        livePlay: function livePlay(value) {
            webLog('android.playController.livePlay()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_TYPE, value);
        },
        setLayerUp: function setLayerUp() {
            webLog('android.playController.setLayerUp()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER, this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER_UP);
        },
        setLayerDown: function setLayerDown() {
            webLog('android.playController.setLayerDown()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER, this.WEB_PLAYEVENT_EXEC.TRAILER_LAYER_DOWN);
        },
        showPlayWin: function showPlayWin() {
            webLog('android.playController.showPlayWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW);
        },
        hidePlayWin: function hidePlayWin() {
            webLog('android.playController.hidePlayWin()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_HIDE);
        },
        hidePlayWinWithVoice: function hidePlayWinWithVoice() {
            webLog('android.playController.hidePlayWinWithVoice()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SHOW_HIDE, this.WEB_PLAYEVENT_EXEC.TRAILER_HIDE_VOICE);
        },
        winPlay: function winPlay(play_obj) {
            webLog('android.playController.winPlay(' + play_obj + ')');
            var play = {
                sid: play_obj.sid,
                title: play_obj.title,
                contentType: play_obj.contentType,
                linkType: play_obj.linkType
            };
            var play_str = JSON.stringify(play);
            webLog(play_str);
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STARTPLAY, play_str);
        },
        pause: function pause() {
            webLog('android.playController.pause()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_PAUSE);
        },
        resume: function resume() {
            webLog('android.playController.resume()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_RESUME);
        },
        stop: function stop() {
            webLog('android.playController.stop()');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_STOPPLAY);
        },
        seek: function seek(second) {
            webLog('android.playController.seek(' + second + ')');
            this.execPlayEvent(this.WEB_PLAYEVENT_EXEC.TRAILER_SEEK, second);
        }
    }
};
var md5 = {
    hexcase: 0,
    b64pad: '',
    chrsz: 8,
    CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    hex_md5: function hex_md5(s) {
        var that = this;
        return that.impl.binl2hex(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
    },
    b64_md5: function b64_md5(s) {
        var that = this;
        return that.impl.binl2b64(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
    },
    str_md5: function str_md5(s) {
        var that = this;
        return that.impl.binl2str(that.core_md5(that.impl.str2binl(s), s.length * that.chrsz));
    },
    hex_hmac_md5: function hex_hmac_md5(key, data) {
        var that = this;
        return that.impl.binl2hex(that.core_hmac_md5(key, data));
    },
    b64_hmac_md5: function b64_hmac_md5(key, data) {
        var that = this;
        return that.impl.binl2b64(that.core_hmac_md5(key, data));
    },
    str_hmac_md5: function str_hmac_md5(key, data) {
        var that = this;
        return that.impl.binl2str(that.core_hmac_md5(key, data));
    },
    core_md5: function core_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;

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
    core_hmac_md5: function core_hmac_md5(key, data) {
        var that = this;
        var bkey = that.impl.str2binl(key);
        if (bkey.length > 16) bkey = that.core_md5(bkey, key.length * that.chrsz);

        var ipad = Array(16),
            opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = that.core_md5(ipad.concat(that.impl.str2binl(data)), 512 + data.length * that.chrsz);
        return that.core_md5(opad.concat(hash), 512 + 128);
    },
    impl: {
        bit_rol: function bit_rol(num, cnt) {
            return num << cnt | num >>> 32 - cnt;
        },
        str2binl: function str2binl(str) {
            var chrsz = md5.chrsz;
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
            }return bin;
        },
        binl2str: function binl2str(bin) {
            var chrsz = md5.chrsz;
            var str = "";
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < bin.length * 32; i += chrsz) {
                str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
            }return str;
        },
        binl2hex: function binl2hex(binarray) {
            var hex_tab = md5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
            }
            return str;
        },
        binl2b64: function binl2b64(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) str += md5.b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
                }
            }
            return str;
        },
        safe_add: function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 0xFFFF;
        },
        md5_cmn: function md5_cmn(q, a, b, x, s, t) {
            var that = this;
            return that.safe_add(that.bit_rol(that.safe_add(that.safe_add(a, q), that.safe_add(x, t)), s), b);
        },
        md5_ff: function md5_ff(a, b, c, d, x, s, t) {
            return this.md5_cmn(b & c | ~b & d, a, b, x, s, t);
        },
        md5_gg: function md5_gg(a, b, c, d, x, s, t) {
            return this.md5_cmn(b & d | c & ~d, a, b, x, s, t);
        },
        md5_hh: function md5_hh(a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        },
        md5_ii: function md5_ii(a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
        }
    }
};
var utils = {
    requestConfig: {
        url: '',
        ts: 0
    },
    dateFormat: function dateFormat(date, formatStr) {
        /*
         函数：填充0字符
         参数：value-需要填充的字符串, length-总长度
         返回：填充后的字符串
         */
        var zeroize = function zeroize(value, length) {
            if (!length) {
                length = 2;
            }
            value = new String(value);
            for (var i = 0, zeros = ''; i < length - value.length; i++) {
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
    uuid: function uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
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
                    uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    uuidFast: function uuidFast() {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = new Array(36),
            rnd = 0,
            r;
        for (var i = 0; i < 36; i++) {
            if (i == 8 || i == 13 || i == 18 || i == 23) {
                uuid[i] = '-';
            } else if (i == 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
            }
        }
        return uuid.join('');
    },
    uuidCompact: function uuidCompact() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    },

    /**
     * 随机取数组一个元素
     * @param array
     * @returns {*}
     */
    arrayRandomOne: function arrayRandomOne(array) {
        return array[Math.floor(Math.random() * array.length + 1) - 1];
    },

    /**
     * 数组随机打乱
     * @param array
     * @returns {*}
     */
    arrayShuffle: function arrayShuffle(array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) {}
        return array;
    },
    getUrlParams: function getUrlParams() {
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
    isEmpty: function isEmpty(obj) {
        if (typeof obj === 'undefined' || obj == null || obj == 'undefined' || obj == 'null' || obj == '') {
            return true;
        }
        return false;
    },
    setLocalItem: function setLocalItem(name, value, expire) {
        try {
            var expireDate = new Date();
            if (typeof expire != 'undefined' && expire != null) {
                expireDate.setTime(expireDate.getTime() + expire);
            }
            if (window.localStorage) {
                window.localStorage[name] = value;
            } else {
                document.cookie = name + "=" + escape(value) + (typeof expire == 'undefined' || expire == null ? "" : ";expires=" + expireDate.toGMTString()) + ";path=/";
            }
        } catch (e) {}
    },
    getLocalItem: function getLocalItem(name) {
        if (window.localStorage) {
            return window.localStorage[name];
        } else {
            if (document.cookie) {
                if (document.cookie.length > 0) {
                    var begin = document.cookie.indexOf(name + "=");
                    if (begin != -1) {
                        begin += name.length + 1; //cookie值的初始位置
                        var end = document.cookie.indexOf(";", begin); //结束位置
                        if (end == -1) {
                            end = document.cookie.length;
                        } //没有;则end为字符串结束位置
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
    removeLocalItem: function removeLocalItem(name) {
        try {
            if (window.localStorage) {
                window.localStorage.removeItem(name);
            } else {
                var _value = this.getLocalItem(name);
                if (_value) {
                    document.cookie = name + "=" + escape(_value) + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }
            }
        } catch (e) {}
    },
    secondToTimeFormat2: function secondToTimeFormat2(seconds, defaultStr) {
        if (this.isEmpty(seconds)) {
            return defaultStr || '00:00';
        }
        var minutes = parseInt(seconds / 60);
        var second = parseInt(seconds - minutes * 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        second = second < 10 ? '0' + second : second;
        return minutes + ":" + second;
    },
    secondToTimeFormat3: function secondToTimeFormat3(seconds, defaultStr) {
        if (this.isEmpty(seconds)) {
            return defaultStr || '';
        }
        var hours = parseInt(seconds / (60 * 60));
        var minutes = parseInt((seconds - hours * 60 * 60) / 60);
        var second = parseInt(seconds - hours * 60 * 60 - minutes * 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        second = second < 10 ? '0' + second : second;
        return hours + ":" + minutes + ":" + second;
    },
    trim: function trim(str) {
        if (!str) {
            return '';
        }
        var trimLeft = /^\s+/,
            trimRight = /\s+$/;
        return str.toString().replace(trimLeft, '').replace(trimRight, '');
    },

    preLoadRes: function preLoadRes(pathArr, perCall, finishCall) {
        var counter = 0;
        var loadImg = function loadImg(src, finish, count) {
            var img = new Image();
            img.onload = function () {
                finish && finish();
            };
            img.onerror = function () {
                if (!count) {
                    loadImg(src, finish, 1);
                } else {
                    finish && finish();
                }
            };
            img.src = src;
        };
        var loopLoad = function loopLoad(src) {
            loadImg(src, function () {
                counter++;
                if (counter >= pathArr.length) {
                    finishCall && finishCall(pathArr.length, pathArr.length);
                } else {
                    perCall && perCall(counter, pathArr.length);
                    loopLoad(pathArr[counter]);
                }
            });
        };
        loopLoad(pathArr[counter]);
    },
    request: function request(config, data, _success, fail, timeout, count) {
        var that = this;
        webLog('request url ' + config.url);
        var cts = new Date().getTime();
        if (config.url === this.requestConfig.url && config.ignoreFast && cts - this.requestConfig.ts < 200) {
            webLog('request too fast in 200ms ');
            return;
        }
        this.requestConfig.url = config.url;
        this.requestConfig.ts = cts;
        webLog('request data ' + (data && JSON.stringify(data)));
        var method = (config.method || 'get').toUpperCase();
        var _data = data;
        if (config.contentType === 'application/json') {
            _data = JSON.stringify(data);
        }
        $.ajax({
            type: method,
            contentType: config.contentType ? config.contentType : 'application/x-www-form-urlencoded',
            url: config.cache ? config.url : config.url.indexOf('?') > -1 ? config.url + '&_T=' + cts + '_' + this.uuid(8) : config.url + '?_T=' + cts + '_' + this.uuid(8),
            // data to be added to query string:
            data: _data,
            // type of data we are expecting in return:
            dataType: 'json',
            timeout: config.time || 5000,
            success: function success(data) {
                webLog('request url ' + config.url + ' success');
                try {
                    webLog('response data ' + JSON.stringify(data));
                } catch (e) {}
                _success && _success(data);
            },
            error: function error(xhr, type) {
                if (type === 'timeout' && config.retry) {
                    if (!count) {
                        webLog('request url ' + config.url + ' retry');
                        that.request(config, data, _success, fail, timeout, 1);
                    } else {
                        webLog('request url ' + config.url + ' timeout callback');
                        timeout && timeout();
                    }
                } else {
                    webLog('request url ' + config.url + ' error');
                    fail && fail();
                }
            }
        });
    },
    promiseRequest: function promiseRequest(config, data) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
            try {
                _this3.request(config, data, function (res) {
                    resolve(res);
                }, function () {
                    reject({ rejectType: Constants.requestRejectTypes.fail });
                }, function () {
                    reject({ rejectType: Constants.requestRejectTypes.timeout });
                });
            } catch (e) {
                reject({ rejectType: Constants.requestRejectTypes.error });
            }
        });
    }
};
var useId = '';
var getUseId = function getUseId(type) {
    if (!useId) {
        var getUid = function getUid() {
            var uid = utils.getLocalItem(Constants.uid_key);
            if (uid) {
                webLog('uid from local ' + useId);
            } else {
                uid = md5.hex_md5(utils.uuid(32) + utils.uuid(8) + new Date().getTime());
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
var getCommonParams = function getCommonParams(activityId, ts, secret) {
    var token = '';
    if (activityId) {
        if (!secret) {
            token = android.md5Encrypt(activityId + '_' + ts + '_');
        } else {
            token = md5.hex_md5(activityId + '_' + ts + '_' + secret);
        }
        return {
            activityId: activityId,
            timestamp: ts,
            signkey: token
        };
    } else {
        var id = getUseId();
        if (!secret) {
            token = android.md5Encrypt(id + ts);
        } else {
            token = md5.hex_md5(id + ts + secret);
        }
        return {
            uid: id,
            openId: id,
            timestamp: ts,
            token: token
        };
    }
};
var Common = { android: android, md5: md5, utils: utils, getUseId: getUseId, getCommonParams: getCommonParams };
/* harmony default export */ __webpack_exports__["a"] = (Common);

/***/ })
/******/ ]);