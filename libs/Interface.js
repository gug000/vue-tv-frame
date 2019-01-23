import {MtvCore,keyController} from './MtvCore'

const Interface = {
    dispatchKeyEvent(event_type) {
        event_type = parseInt(event_type, 10);
        switch (event_type) {
            case 1:
                keyController.keyPress(keyController.KeyName.Left);
                break;
            case 2:
                keyController.keyPress(keyController.KeyName.Up);
                break;
            case 3:
                keyController.keyPress(keyController.KeyName.Right);
                break;
            case 4:
                keyController.keyPress(keyController.KeyName.Down);
                break;
            case 5:
                keyController.keyPress(keyController.KeyName.Enter);
                break;
            case 6:
                keyController.keyPress(keyController.KeyName.Alt);
                break;
        }
        console.log('android dispatchKeyEvent:' + event_type);
    },
    /**
     * Android执行的异步回调
     * @param event_type
     * @param value
     */
    execCommonEvent(event_type, value) {
        // event_type = parseInt(event_type, 10);
        // value = JSON.stringify(value);
        MtvCore.execCommonEvent(event_type, value);
        console.log('android execCommonEvent:' + event_type+'-----'+value);
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
    onWebViewFocusChanged(gainFocus,direction){
        MtvCore.onWebViewFocusChanged(gainFocus,direction);
    },
    /**
     * webview可见状态变化时回调
     * @param visibility  0:可见 , 1:不可见
     */
    onWebViewVisiable(visibility){
        MtvCore.onWebViewVisiable(visibility);
    },
    init() {
        window.dispatchKeyEvent = this.dispatchKeyEvent;
        window.execCommonEvent = this.execCommonEvent;
        window.onWebViewFocusChanged = this.onWebViewFocusChanged;
        window.onWebViewVisiable = this.onWebViewVisiable;
        document.onkeydown = function (evt) {
            var KeyName = {
                19: keyController.KeyName.Up,
                38: keyController.KeyName.Up, //Keyboard
                20: keyController.KeyName.Down,
                40: keyController.KeyName.Down, //Keyboard
                21: keyController.KeyName.Left,
                37: keyController.KeyName.Left, //Keyboard
                22: keyController.KeyName.Right,
                39: keyController.KeyName.Right, //Keyboard
                23: keyController.KeyName.Enter,
                13: keyController.KeyName.Enter, //Keyboard
                4: keyController.KeyName.Alt,
                18: keyController.KeyName.Alt, //Keyboard Alt键
                27: keyController.KeyName.Alt, //Keyboard ESC
                24: keyController.KeyName.Alt, //Keyboard ESC
                66: keyController.KeyName.Enter,
                111: keyController.KeyName.Alt

            };
            evt = evt || window.event;
            const KeyCode = evt.which || evt.keyCode;
            keyController.keyPress(KeyName[KeyCode]);
            return true;
        }
    }
};
Interface.init();
export default Interface;

