import Common from './Common';

let MtvCore = {
  CurrentPage: null,
  CurrentZone: null,
  PrevPage: null,
  PrevZone: null,
  Page: {},
  createPage(pageId) {
    const Page = function (pageId) {
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
  createZone(zoneId, zoneParam) {
    let that = this;
    const Zone = function (zoneId, zoneParam) {
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
      }
    };
    this.Zone[zoneId] = new Zone(zoneId, zoneParam);
    this.Zone[zoneId].createItem = MtvCore.createItem;
    this.currentZoneId = zoneId;
    return this.Zone[zoneId];
  },
  /**
   * @param value
   */
  createItem(value) {
    const domId = Common.utils.uuid(9);
    const itemId = 'item_' + domId;
    this.Item[itemId] = {
      id: itemId,
      domId: domId,
      zone: this,
      value: value || null
    };
    this.Items.push(this.Item[itemId]);
    return this.Item[itemId];
  },
  initZone(pageConfig){
    let that = this;
    for(let config in pageConfig){
      let pageObj = pageConfig[config];
      let page = that.createPage(pageObj.id);
      pageObj.zone_ids.forEach((zoneId,index)=>{
        let zone = page.createZone(zoneId,{
          row:pageObj.row[index],
          column:pageObj.column[index],
          count:pageObj.count[index],
          Left:pageObj.Left[index],
          Right:pageObj.Right[index],
          Up:pageObj.Up[index],
          Down:pageObj.Down[index]
        });
        for(let i=0; i<pageObj.count[index]; i++){
          zone.createItem();
        }
      })
    }


  }


};
MtvCore.keyController = {
  $core: MtvCore,
  vm:null,
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
  boundVM(vueEntity){
    this.vm = vueEntity;
  },
  keyPress(keyName) {
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
        this.evtEnter()
      } else if (keyName === this.KeyName.Home) {
        this.evtHome()
      } else {
        this.evtArrow(keyName)
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
  changePage(pageId,zoomId,pageHide,currentIndex){
    this.$core.CurrentPage.currentZoneId = this.$core.CurrentZone.id;
    if(this.$core.Page[pageId]){
      this.$core.PrevPage = this.$core.CurrentPage;
      if(pageHide){
        this.vm.setPageShowHide(this.$core.PrevPage.id,false);
      }
      this.$core.CurrentPage = this.$core.Page[pageId];
      if(zoomId && this.$core.Page[pageId].Zone[zoomId]){
        this.$core.CurrentPage.currentZoneId = zoomId;
        this.$core.PrevZone = this.$core.CurrentZone;
        this.$core.CurrentZone = this.$core.Page[pageId].Zone[zoomId];
        if(currentIndex!==undefined){
          this.$core.CurrentZone.index = currentIndex
        }
        this.vm.setPageShowHide(pageId,true);
      }else if(this.$core.CurrentPage.currentZoneId){
        this.$core.PrevZone = this.$core.CurrentZone;
        this.$core.CurrentZone = this.$core.Page[pageId].Zone[this.$core.CurrentPage.currentZoneId];
        if(currentIndex!==undefined){
          this.$core.CurrentZone.index = currentIndex
        }
        this.vm.setPageShowHide(pageId,true);
      }else{
        this.$core.PrevZone = this.$core.CurrentZone;
        this.$core.CurrentZone = this.$core.Page[pageId].Zone[this.vm.pages[pageId].zone_ids[0]];
        this.$core.CurrentPage.currentZoneId = this.vm.pages[pageId].zone_ids[0];
        if(currentIndex!==undefined){
          this.$core.CurrentZone.index = currentIndex
        }
        this.vm.setPageShowHide(pageId,true);
      }
    }else{
      throw new Error('change page error, the destination page is not register in MtvCore!');
    }

  },
  /**
   * Page返回，默认返回到PrevPage
   * @param pageHide 是否隐藏当前page （必选）
   * @param zoomId 指定zone为CurrentZone （可选）
   * @param currentIndex 设置目标zone选中的Item的index （可选）
   */
  returnPage(pageHide,zoomId,currentIndex){
    if (this.$core.PrevPage) {
      if(pageHide){
        this.vm.setPageShowHide(this.$core.CurrentPage.id,false);
      }
      this.$core.CurrentPage = this.$core.PrevPage;
      this.vm.setPageShowHide(this.$core.CurrentPage.id,true);
      if(zoomId && this.$core.CurrentPage.Zone[zoomId]){
        this.$core.CurrentPage.currentZoneId = zoomId;
        this.$core.CurrentZone = this.$core.CurrentPage.Zone[zoomId];
        if(currentIndex!==undefined){
          this.$core.CurrentZone.index = currentIndex;
        }
      }else{
        if (this.$core.PrevZone) {
          this.$core.CurrentZone = this.$core.PrevZone;
          this.$core.CurrentPage.currentZoneId = this.$core.CurrentZone.id;
          if(currentIndex!==undefined){
            this.$core.CurrentZone.index = currentIndex;
          }
        } else {
          if (this.$core.CurrentPage.currentZoneId) {
            this.$core.CurrentZone = this.$core.CurrentPage.Zone[this.$core.CurrentPage.currentZoneId];
            if(currentIndex!==undefined){
              this.$core.CurrentZone.index = currentIndex;
            }
          }else{
            this.$core.CurrentZone = this.$core.CurrentPage.Zone[this.vm.pages[this.$core.CurrentPage.id].zone_ids[0]];
            this.$core.CurrentPage.currentZoneId = this.vm.pages[this.$core.CurrentPage.id].zone_ids[0];
            if(currentIndex!==undefined){
              this.$core.CurrentZone.index = currentIndex;
            }
          }
        }
      }
    }else{
      throw new Error('return page error, the PrevPage is undefined!');
    }

  },
  evtArrow(keyName) {
    let that = this;
    let CurrentPage = this.$core.CurrentPage;
    let CurrentZone = this.$core.CurrentZone;
    let index = CurrentZone.index;
    let Steps = CurrentZone.row * CurrentZone.column;
    let Row = Math.floor(index / CurrentZone.column);
    CurrentZone.StepSeq = CurrentZone.StepSeq || 0;
    if (this.onArrowItem(keyName)) {
      return;
    }
    let Border = CurrentZone[keyName];
    let cRow = CurrentZone.crow;
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
    const OverBorder = function () {
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
          const MaxSeq = Math.ceil(CurrentZone.count / Steps) - 1;
          if ((keyName === that.KeyName.Left) || (keyName === that.KeyName.Up)) {
            //左键或者上键，往前翻
            CurrentZone.StepSeq = (CurrentZone.StepSeq > 0) ? CurrentZone.StepSeq - 1 : MaxSeq;
          } else if ((keyName === that.KeyName.Right) || (keyName === that.KeyName.Down)) {
            //右键或者下键，往后翻
            CurrentZone.StepSeq = (CurrentZone.StepSeq < MaxSeq) ? CurrentZone.StepSeq + 1 : 0;
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
        that.$core.PrevPage = CurrentPage;
        that.$core.PrevZone = CurrentZone;
        CurrentZone = CurrentPage.Zone[Border];
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
  evtEnter() {
    this.vm.onEvtEnter();
  },
  evtAlt() {
    this.vm.onEvtAlt();
  },
  evtHome() {
    this.vm.onEvtHome();
  },
  onArrowItem(keyName) {
    return this.vm.onArrowItem(keyName);
  },
  onChangeItem(keyName) {
    this.vm.onChangeItem(keyName);
  },
  onScrollItem(keyName) {
    this.vm.onScrollItem(keyName);
  },
  onChangeZone(keyName) {
    this.vm.onChangeZone(keyName);
  }

};

let keyController = MtvCore.keyController;
window.MtvCore = MtvCore;

export {MtvCore, keyController};
export default MtvCore
