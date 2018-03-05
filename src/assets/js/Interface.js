import {keyController} from './MtvCore'
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
    };
    console.log('dispatchKeyEvent:' + event_type);
  },
  init(){
    window.dispatchKeyEvent = this.dispatchKeyEvent;
    document.onkeydown=function(evt){
      var KeyName = {
        19:keyController.KeyName.Up,
        38:keyController.KeyName.Up, //Keyboard
        20:keyController.KeyName.Down,
        40:keyController.KeyName.Down, //Keyboard
        21:keyController.KeyName.Left,
        37:keyController.KeyName.Left, //Keyboard
        22:keyController.KeyName.Right,
        39:keyController.KeyName.Right, //Keyboard
        23:keyController.KeyName.Enter,
        13:keyController.KeyName.Enter, //Keyboard
        4:keyController.KeyName.Alt,
        18:keyController.KeyName.Alt, //Keyboard Alt键
        27:keyController.KeyName.Alt, //Keyboard ESC
        24:keyController.KeyName.Alt, //Keyboard ESC
        66:keyController.KeyName.Enter,
        111:keyController.KeyName.Alt

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

