<template>
  <div id="app">
    <div class="page" id="home" v-show="pageShow.home">
      <div class="full-bg"></div>
      <p class="title">今日奖金池：{{todayCash}}</p>
      <div class="rule">
        <p class="rule-text">·&nbsp;答对全部12道题，即可获得微信现金红包</p>
        <p class="rule-text">·&nbsp;活动时间：2月15日-19日，奖金总额超百万</p>
        <p class="rule-text">·&nbsp;活动当天0点起算，每3个小时每人可拥有8次答题机会，</p>
        <p class="rule-text">&nbsp;&nbsp;各个时段内未使用的答题机会不会累加</p>
      </div>
      <mtv-foc-class class="start-btn-fail"  :index="0" :pageId="pages.home.id" :zoneId="pages.home.zone_ids[0]">开始答题</mtv-foc-class>
      <div class="prize-box">
        <div class="prize-content" ref="prizeContent">
          <div class="prize-list">
            <div class="prize-item" v-for="(winner,index) in winnerList" :key="index">
              <div class="nickname">{{winner.name}}</div>
              <div>赢得{{winner.money}}元红包</div>
            </div>
          </div>
          <div class="prize-list">
            <div class="prize-item" v-if="winnerList.length>3" v-for="(winner,index) in winnerList" :key="index">
              <div class="nickname">{{winner.name}}</div>
              <div>赢得{{winner.money}}元红包</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-mask"></div>
      <p class="opportunity-text">答题机会剩余：{{opportunity}}次&nbsp;&nbsp;&nbsp;&nbsp;{{tipMsg}}</p>
    </div>
    <div class="page" id="question" v-show="pageShow.question">
      <div class="full-bg"></div>
      <p id="question_text">{{questionTitle}}</p>
      <div class="answer-list">
        <div class="answer-foc" :style="{'top':answerFocTop+'px'}"></div>
        <div class="answer-box" v-if="currentQuestion.options && currentQuestion.options.length" v-for="(option,index) in currentQuestion.options" >
          {{optionsMap[index]}}.<span class="answer">{{option}}</span>
        </div>
      </div>
      <div class="loading-default">
        <div class="loading-highlighted" :style="{width:timeProcess+'%'}"></div>
        <div class="time-line"></div>
        <div class="time-box">
          <div>倒计时：</div>
          <div>0s</div>
          <div>5s</div>
          <div>10s</div>
          <div>15s</div>
        </div>
      </div>
      <div class="correct-pic" v-show="correctPicShow"></div>
    </div>
    <div class="page" id="fail" v-show="pageShow.fail">
      <div class="full-bg"></div>
      <div class="fail-title" :class="{'fail-title-error':failError,'fail-title-time':failTimeout}"></div>
      <div class="fail-btn-box" id="fail_btn_box">
        <mtv-foc-class class="fail-btn"  :index="0" :pageId="pages.fail.id" :zoneId="pages.fail.zone_ids[0]">{{failBtnText}}</mtv-foc-class>
      </div>
      <p class="opportunity-text" v-show="failTipMsgShow">答题机会剩余：0次&nbsp;&nbsp;&nbsp;&nbsp;<span>{{failTipMsg}}</span></p>
    </div>
    <div class="page" id="success"  v-show="pageShow.success">
      <div class="full-bg"></div>
      <div class="qrcode-box">
        <div class="qrcode-retry">按OK键重试</div>
        <div class="qrcode" :style="{'background-image':'url(\''+qrcodeUrl+'\')','background-size':'100% 100%'}"></div>
      </div>

    </div>
    <div class="page" id="poplayer"  v-show="pageShow.poplayer">
      <div class="layer-content" id="no_cash" v-show="layerShow.cashLayer">
        <div class="layer-title">当天奖金已被领完</div>
        <div class="layer-msg">奖金被领完后，当天无法再参加答题活动，明天再来吧。</div>
        <div class="layer-msg">注：活动有效期为2月15日-19日。</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[0]">返回</mtv-foc-class>
        </div>
      </div>
      <div class="layer-content" id="ended" v-show="layerShow.endLayer">
        <div class="layer-title">活动已结束</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[1]">返回</mtv-foc-class>
        </div>
      </div>
      <div class="layer-content" id="no_opportunity"  v-show="layerShow.opportunityLayer">
        <div class="layer-title">当前时段答题机会已用完</div>
        <div class="layer-msg">活动当天0点起算，每3个小时每人可拥有8次答题</div>
        <div class="layer-msg">机会，各个时段内未使用的答题机会不会累加</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[2]">返回</mtv-foc-class>
        </div>
      </div>
      <div class="layer-content" id="exit" v-show="layerShow.exitLayer">
        <div class="layer-title">答题中，确认退出？</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[3]">取消</mtv-foc-class>
          <mtv-foc-class class="layer-btn"  :index="1" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[3]">确认</mtv-foc-class>
        </div>
      </div>
      <div class="layer-content" id="back"  v-show="layerShow.backLayer">
        <div class="layer-title">确定退出？</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[4]">返回</mtv-foc-class>
          <mtv-foc-class class="layer-btn"  :index="1" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[4]">确定</mtv-foc-class>
        </div>
      </div>
      <div class="layer-content" id="error" v-show="layerShow.errorLayer">
        <div class="layer-title">网络连接错误，请稍后重试</div>
        <div class="layer-btn-box">
          <mtv-foc-class class="layer-btn"  :index="0" :pageId="pages.poplayer.id" :zoneId="pages.poplayer.zone_ids[5]">返回</mtv-foc-class>
        </div>
      </div>
    </div>
    <div class="page" id="loading" v-show="pageShow.loading">
      <p>玩命加载中...</p>
      <div class="loading-default">
        <div class="loading-highlighted" id="loading_percentage" :style="{'width':loadingPercentage+'%'}"></div>
      </div>
    </div>
    <div id="correct" style="position: absolute;z-index:999;color: #e40808;bottom: 20px;right:20px;">{{correct}}</div>
  </div>
</template>
<style>
  @import "./assets/css/style.css";
</style>
<script>
  import './assets/js/Interface'
  import common from './assets/js/Common'
  import MtvCore from './assets/js/MtvCore'
  export default {
    data () {
      return {
        $core:MtvCore,
        imgRes:[
          './static/img/home_bg.jpg',
          './static/img/home_footer_mask.png',
          './static/img/question_bg.jpg',
          './static/img/question_btn.png',
          './static/img/question_time_line.png',
          './static/img/confirm_btn.png',
          './static/img/confirm_btn_fail.png',
          './static/img/correct.png',
          './static/img/fail_bg.jpg',
          './static/img/fail_error.png',
          './static/img/fail_time.png',
          './static/img/home_start_btn.png',
          './static/img/home_start_btn_fail.png',
          './static/img/success_bg.jpg'
        ],
        loadingPercentage : 0,
        pageShow:{
          loading:true,
          home:false,
          question:false,
          success:false,
          fail:false,
          poplayer:false
        },
        layerShow:{
          cashLayer:false,
          endLayer:false,
          opportunityLayer:false,
          exitLayer:false,
          backLayer:false,
          errorLayer:false
        },
        /** pages 字段必选，数据结构固定模式，在MtvCore中使用到 **/
        pages: {
          loading: {
            id: 'loading',
            zone_ids: ['btn'],
            row: [1],
            column: [1],
            count: [1],
            Left: [''],
            Right: [''],
            Up: [''],
            Down: [''],
            default_class: ['']
          },
          home: {
            id: 'home',
            zone_ids: ['start'],
            row: [1],
            column: [1],
            count: [1],
            Left: [''],
            Right: [''],
            Up: [''],
            Down: [''],
            default_class: ['start-btn']
          },
          question: {
            id: 'question',
            zone_ids: ["btn"],
            row: [4],
            column: [1],
            count: [4],
            Left: [''],
            Right: [''],
            Up: [''],
            Down: [''],
            default_class: ['answer-box']
          },
          fail: {
            id: 'fail',
            zone_ids: ["btn"],
            row: [1],
            column: [1],
            count: [1],
            Left: [''],
            Right: [''],
            Up: [''],
            Down: [''],
            default_class: ['fail-btn']
          },
          success: {
            id: 'success',
            zone_ids: ["btn"],
            row: [1],
            column: [1],
            count: [1],
            Left: [''],
            Right: [''],
            Up: [''],
            Down: [''],
            default_class: ['btn']
          },
          poplayer: {
            id: 'poplayer',
            zone_ids: ["cash", "end", "opportunity", "exit", "back", "error"],
            row: [1, 1, 1, 1, 1, 1],
            column: [1, 1, 1, 2, 2, 1],
            count: [1, 1, 1, 2, 2, 1],
            Left: ['', '', '', '', '', ''],
            Right: ['', '', '', '', '', ''],
            Up: ['', '', '', '', '', ''],
            Down: ['', '', '', '', '', ''],
            default_class: ['layer-btn', 'layer-btn', 'layer-btn', 'layer-btn', 'layer-btn', 'layer-btn']
          }
        },
        apiConfig: {
          getTs: {url: '/api/get_timestamp', method: 'get', retry: true},
          getUid: {url: '/api/get_uid', method: 'get'},
          getActStatus: {url: '/api/answer_activities', method: 'get', retry: true},
          getQuestion: {url: '/api/get_question', method: 'get', retry: true},
          submitAnswers: {url: '/api/send_answer', method: 'post', retry: true},
        },
        fr:'other',
        appVersion:'',
        userId: '',
        uid: '',
        ts: '',
        initTimer:null,
        questionTimer: null,
        questionTimeout: 15000,
        questionObj:null,
        optionsMap:['A','B','C','D'],
        current: -1,
        currentQuestion: {},
        currentAnswers:[],
        todayCash:0,
        opportunity:0,
        tipMsg:'',
        winnerList:[],
        startDisabled:false,
        answerFocTop:0,
        questionTitle:'',
        timeProcess:0,
        correctPicShow:false,
        failTimeout:false,
        failError:false,
        failBtnText:'',
        failTipMsgShow:false,
        failTipMsg:'',
        qrcodeUrl:'',
        correctPicTimer:null,
        correctPicTimeout:1320,
        startQuestionTime:0,
        wxUrl:'',
        correct:''


      }
    },
    created(){
      this.$core = MtvCore;
      this.$core.keyController.boundVM(this);
    },
    methods:{
      onArrowItem(keyName){

      },
      onChangeItem(keyName){
        if(this.$core.CurrentPage.id === this.pages.question.id && this.$core.CurrentZone.id === this.pages.question.zone_ids[0]){
          this.answerFocTop =  74*this.$core.CurrentZone.index;
        }
      },
      onScrollItem(keyName){

      },
      onChangeZone(keyName){

      },
      onEvtEnter(){
        const currentItem = this.$core.CurrentZone.Items[this.$core.CurrentZone.index];
        if(currentItem && currentItem.value && currentItem.value.Action){
          const value = currentItem.value;
          switch(value.Action){
            case 'Function':
              value.Function(value.Value);
              break;
          }
        }
      },
      onEvtAlt(){
        const _page_id = this.$core.CurrentPage.id;
        const _zone_id = this.$core.CurrentZone.id;
        switch(_page_id){
          case this.pages.loading.id:
            clearTimeout(this.initTimer);
            this.initTimer = null;
            common.android.back();
            break;
          case this.pages.home.id:
            common.android.back();
            break;
          case this.pages.question.id:
            if(_zone_id === this.pages.question.zone_ids[0]){
              this.popExitLayer();
            }
            break;
          case this.pages.success.id:
            this.popBackLayer();
            break;
        }
      },
      onEvtHome(){

      },
      /**
       * 切换page显示与否
       * */
      setPageShowHide(pageId,flag){
        this.pageShow[pageId] = flag;
      },
      getUid() {
        let localUid = common.utils.getLocalItem(common.constants.uid_key);
        if(localUid){
          this.uid = localUid;
          common.utils.consoleLog('uid from local ' + this.uid);
        }else{
          let uid = this.userId;
          common.utils.consoleLog('get uid from android ' + uid);
          if (!uid) {
            this.uid = common.utils.hex_md5(common.utils.uuid(32) +common.utils.uuid(8)+ new Date().getTime());
          }else{
            this.uid = common.utils.hex_md5(uid+common.utils.uuid(8)+new Date().getTime());
          }
          common.utils.setLocalItem(common.constants.uid_key, this.uid);
          common.utils.consoleLog('uid from set ' + this.uid);
        }

      },
      getUserId (){
        this.userId =  common.android.getUserId();
      },
      getTimeStamp(cb) {
        var that = this;
        common.utils.request(this.apiConfig.getTs, null, res=> {
          if (res.status == 200) {
            common.utils.consoleLog('get server timestamp success');
            that.ts = res.timestamp;
            cb && cb();
          } else {
            that.ts = new Date().getTime();
            cb && cb();
          }
        }, ()=> {
          that.ts = new Date().getTime();
          cb && cb();
        },  ()=> {
          that.ts = new Date().getTime();
          cb && cb();
        })
      },
      enterLoading(){
        this.$core.CurrentPage = this.$core.Page[this.pages.loading.id];
        this.$core.CurrentZone = this.$core.CurrentPage.Zone[this.pages.loading.zone_ids[0]];
        this.$core.Loading = true;
        const startTime = new Date().getTime();
        setTimeout(()=>{
          common.utils.preLoadRes(this.imgRes,(count,size)=>{
            this.loadingPercentage = parseInt((count / size) * 100, 10);
          },()=>{
            this.loadingPercentage = 100;
            const endTime = new Date().getTime();
            const offsetTime = endTime-startTime;
            if(offsetTime < 4000){
              this.initTimer = setTimeout(()=>{
                clearTimeout(this.initTimer);
                this.enterHome();
              },4000-offsetTime);
            }else{
              this.enterHome();
            }

          });
        },1500);
      },
      enterHome(){
        this.$core.keyController.changePage(this.pages.home.id,this.pages.home.zone_ids[0],true);
        this.$core.Loading = true;
        const actEnded = ()=>{
          this.popEndedLayer();
          this.setStartBtnDisabled();
          this.$core.Loading = false;
        };
        this.getTimeStamp(()=>{
          const params = this.getCommonParams();
          common.utils.request(this.apiConfig.getActStatus,params,res=>{
            this.$core.Loading = false;
            if(res.status == 200){
              this.todayCash = res.gold_poll;
              this.opportunity = res.user_remainder_num;
              if(res.flag != 1){
                actEnded();
              }else{
                if(!res.user_remainder_num && res.nexttime){
                  this.tipMsg = res.nexttime+'后再来答题吧';
                  this.setStartBtnDisabled();
                }
              }
              this.winnerList = res.winner || [];
              if(this.winnerList.length>3){
                const time = this.winnerList.length*2;
                $(this.$refs.prizeContent).css({'-webkit-animation':'moveup '+time+'s linear  infinite','animation':'moveup '+time+'s linear  infinite'});
              }
            }else{
              actEnded();
            }
          },()=>{
            actEnded();
          },()=>{
            actEnded();
          })
        });
      },
      getCommonParams() {
        return {
          uid: this.uid,
          ts: this.ts,
          token: common.android.md5Encrypt(this.uid + this.ts)
        }
      },
      doNothing(){
        ;
      },
      exit() {
        common.android.back();
      },
      /**
       * 首页开始按钮置灰
       */
      setStartBtnDisabled() {
        this.startDisabled = true;
      },
      /**
       * 弹出今日奖金已用完弹窗
       */
      popCashLayer() {
        this.layerShow.cashLayer = true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[0]);
      },
      /**
       * 隐藏今日奖金已用完弹窗
       */
      hideCashLayer() {
        this.layerShow.cashLayer = false;
        this.$core.keyController.returnPage(true);
      },
      /**
       * 弹出活动已结束弹窗
       */
      popEndedLayer() {
        this.layerShow.endLayer=true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[1])
      },
      /**
       * 弹出当前时段机会已用完弹窗
       */
      popOpportunityLayer() {
        this.layerShow.opportunityLayer = true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[2]);
      },
      /**
       * 隐藏当前时段机会已用完弹窗
       */
      hideOpportunityLayer() {
        this.layerShow.opportunityLayer = false;
        this.$core.keyController.returnPage(true);
      },
      /**
       * 弹出退出答题弹窗
       */
      popExitLayer() {
        this.layerShow.exitLayer = true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[3],false,0);
      },
      /**
       * 隐藏退出答题弹窗
       */
      hideExitLayer() {
        this.layerShow.exitLayer = false;
        this.$core.keyController.returnPage(true);
      },
      /**
       * 确认退出答题
       */
      confirmExitQuestion(){
        clearInterval(this.questionTimer);
        this.questionTimer = null;
        this.layerShow.exitLayer = false;
        this.$core.keyController.returnPage(true);
        this.$core.keyController.changePage(this.pages.home.id,this.pages.home.zone_ids[0],true,0);
        this.refreshHome();
      },
      popBackLayer() {
        this.layerShow.backLayer = true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[4],false,0);
      },
      hideBackLayer(){
        this.layerShow.backLayer = false;
        this.$core.keyController.returnPage(true);
      },
      confirmBack(){
        this.layerShow.backLayer = false;
        this.$core.keyController.returnPage(true);
        this.$core.keyController.changePage(this.pages.home.id,this.pages.home.zone_ids[0],true,0);
        this.refreshHome();
      },
      /**
       * 弹出错误弹窗
       */
      popErrorLayer() {
        this.layerShow.errorLayer = true;
        this.$core.keyController.changePage(this.pages.poplayer.id,this.pages.poplayer.zone_ids[5],false,0);
      },
      /**
       * 隐藏错误弹窗
       */
      hideErrorLayer() {
        this.layerShow.errorLayer = false;
        this.$core.keyController.returnPage(true);
      },
      tryAgain(){
        this.$core.keyController.changePage(this.pages.home.id,this.pages.home.zone_ids[0],true);
        this.refreshHome();
      },
      refreshHome() {
        this.getTimeStamp(()=>{
          const params = this.getCommonParams();
          common.utils.request(this.apiConfig.getActStatus,params,res=>{
            this.$core.keyController.Loading = false;
            if(res.status == 200){
              this.opportunity = res.user_remainder_num;
              if(!res.user_remainder_num && res.nexttime){
                this.tipMsg = (res.nexttime+'后再来答题吧');
              }
            }
          },()=>{
          },()=>{
          })
        })

      },
      /**
       * 获取题目
       * @param cb
       */
      getQuestion(cb){
        this.$core.keyController.Loading = true;
        this.getTimeStamp(()=>{
          const params = this.getCommonParams();
          common.utils.request(this.apiConfig.getQuestion,params,res=>{
            this.$core.keyController.Loading = false;
            if(res.status == 200 && res.papers && res.papers.length){
              this.questionObj = res;
            }else{
              this.questionObj = null;
            }
            cb && cb();
          },()=>{
            this.$core.keyController.Loading = false;
            this.questionObj = null;
            cb && cb();
          },()=>{
            this.$core.keyController.Loading = false;
            this.questionObj = null;
            cb && cb();
          })
        })
      },
      /**
       * 进入答题页面
       */
      enterQuestion() {
        this.currentAnswers = [];
        this.$core.keyController.Loading = true;
        const actEnded = ()=>{
          this.popEndedLayer();
          this.$core.keyController.Loading = false;
        }
        this.getTimeStamp(()=>{
          const params = this.getCommonParams();
          common.utils.request(this.apiConfig.getActStatus,params,res=>{
            this.$core.keyController.Loading = false;
            if(res.status == 200){
              if(res.flag != 1){
                actEnded();
              }else{
                if(res.bonus_finish){
                  this.popCashLayer();
                }else{
                  if(!res.user_remainder_num){
                    this.popOpportunityLayer();
                    if(res.nexttime){
                      this.tipMsg = (res.nexttime+'后再来答题吧');
                    }
                  }else{
                    this.getQuestion(()=>{
                      if(this.questionObj){
                        this.$core.keyController.changePage(this.pages.question.id,this.pages.question.zone_ids[0],false,0);
                        this.current = -1;
                        this.answerFocTop = 0;
                        this.setQuestion();
                      }else{
                        this.popErrorLayer();
                      }
                    });
                  }
                }
              }
            }else{
              actEnded();
            }
          },()=>{
            actEnded();
          },()=>{
            actEnded();
          })
        })
      },
      /**
       * 设置题目
       */
      setQuestion() {
        this.startQuestionTime = new Date().getTime();
        this.current++;
        this.currentQuestion = this.questionObj.papers[this.current];
        const answerSize = this.currentQuestion.options.length;
        this.questionTitle = ('Q' + Number(this.current + 1) + '/' + this.questionObj.papers.length + ':' + this.currentQuestion.question);
        this.$core.CurrentZone = this.$core.Page[this.pages.question.id].Zone[this.pages.question.zone_ids[0]];
        this.$core.CurrentZone.index = 0;
        this.answerFocTop = 0;
        this.timeProcess=100;
        clearInterval(this.questionTimer);
        this.questionTimer = null;
        this.$core.CurrentZone.row = answerSize;
        this.$core.CurrentZone.count = answerSize;
        this.$core.Page[this.pages.question.id].Zone[this.pages.question.zone_ids[0]].Item= {};
        this.$core.Page[this.pages.question.id].Zone[this.pages.question.zone_ids[0]].Items= [];
        for (let j = 0; j < answerSize; j++) {
          this.$core.Page[this.pages.question.id].Zone[this.pages.question.zone_ids[0]].createItem({
            Action: 'Function',
            Function: this.answerQuestion
          })
        }
        this.startQuestion();
        for(var  i=0; i<this.currentQuestion.options.length;i++){
          var result = common.android.md5Encrypt(this.questionObj.uid+this.questionObj.timestamp+this.optionsMap[i]+this.questionObj.paper_id+this.currentQuestion.id);
          if(result === this.currentQuestion.answer){
            this.correct = this.optionsMap[i]
          }
        }

      },
      /**
       * 开始答题计时
       */
      startQuestion() {
        const _timeout = 100;
        const per = 100 / (this.questionTimeout / _timeout);
        let percentage = 100;
        this.questionTimer = setInterval(()=>{
          percentage -= per;
          this.timeProcess = percentage;
          if (percentage <= 0) {
            this.timeProcess = 0;
            console.log('time is over');
            clearInterval(this.questionTimer);
            this.questionTimer = null;
            if(this.currentAnswers.length<=this.current){
              this.enterFail(2);
            }
          }
        }, _timeout);
      },
      /**
       * 答题
       *
       */
      answerQuestion() {
        clearTimeout(this.correctPicTimer);
        this.correctPicTimer = null;
        clearInterval(this.questionTimer);
        this.questionTimer = null;
        const index = this.$core.CurrentZone.index;
        this.currentAnswers.push({"id":this.currentQuestion.id,"answer":this.optionsMap[index]});
        const timeDiff = new Date().getTime()-this.startQuestionTime;
        if(this.current === this.questionObj.papers.length-1){
          this.$core.keyController.Loading = true;
          this.getTimeStamp(()=>{
            let params = this.getCommonParams();
            params.paper_id = this.questionObj.paper_id;
            params.paper_answer = JSON.stringify(this.currentAnswers);
            common.utils.request(this.apiConfig.submitAnswers,params,res=>{
              this.$core.keyController.Loading = false;
              if(res && res.status == 200){
                if(!res.result){
                  this.enterFail(1);
                }else{
                  if(res.result == 1){
                    this.enterFail(2);
                  }else{
                    if(res.wx_url){
                      this.wxUrl = res.wx_url;
                      console.log('qrcode url: '+this.wxUrl);
                      this.enterSuccess();
                    }else{
                      this.enterFail(1);
                    }
                  }
                }
              }else{
                this.enterFail(1);
              }
            },()=>{
              this.enterFail(1);
            },()=>{
              this.enterFail(1);
            });
          })
        }else{
          const result = common.android.md5Encrypt(this.questionObj.uid+this.questionObj.timestamp+this.optionsMap[index]+this.questionObj.paper_id+this.currentQuestion.id);
          if(result === this.currentQuestion.answer){
            this.$core.keyController.Loading = true;
            console.log('answer correct');
            this.correctPicShow=true;
            this.correctPicTimer = setTimeout(()=>{
              this.correctPicShow=false;
              this.$core.keyController.Loading = false;
              this.setQuestion();
            },this.correctPicTimeout);
          }else{
            console.log('answer error');
            this.enterFail(1);
          }
        }

      },
      enterFail(type){
        this.$core.keyController.Loading = false;
        this.$core.keyController.changePage(this.pages.fail.id,this.pages.fail.zone_ids[0],true)
        clearInterval(this.questionTimer);
        this.questionTimer = null;
        clearInterval(this.correctPicTimer);
        this.correctPicTimer = null;
        if(type === 1){
          this.failError = true;
          this.failTimeout = false;
        }else{
          this.failError = false;
          this.failTimeout = true;
        }
        this.getTimeStamp(()=>{
          const params = this.getCommonParams();
          common.utils.request(this.apiConfig.getActStatus,params,res=>{
            if(res.status == 200){
              if(!res.user_remainder_num){
                if(res.nexttime){
                  this.failTipMsg = (res.nexttime+'后再来答题吧');
                }
                this.failBtnText = '返回';
                this.failTipMsgShow = true;
              }else{
                this.failBtnText = '再试一次';
                this.failTipMsgShow = false;
              }
            }else{
              this.failBtnText = '返回';
              this.failTipMsgShow = true;
            }
          },()=>{
            this.failBtnText = '返回';
            this.failTipMsgShow = true;
          },()=>{
            this.failBtnText = '返回';
            this.failTipMsgShow = true;
          })
        })
      },
      loadQrcode(){
        var img = new Image();
        img.onload=()=>{
          this.qrcodeUrl = this.wxUrl;
          this.$core.Page[this.pages.success.id].Zone[this.pages.success.zone_ids[0]].Items[0].value={
            Action: 'Function',
            Function: this.doNothing
          };
          img = img.onload = img.onerror = null;
          console.log('qrcode img load success')
        };
        img.onerror=()=>{
          this.$core.Page[this.pages.success.id].Zone[this.pages.success.zone_ids[0]].Items[0].value={
            Action: 'Function',
            Function: this.loadQrcode
          };
          console.log('qrcode img load fail');
          img = img.onload = img.onerror = null;
        }
        img.src=this.wxUrl;
      },
      enterSuccess(){
        this.qrcodeUrl = '';
        this.$core.keyController.changePage(this.pages.success.id,this.pages.success.zone_ids[0],true);
        clearInterval(this.questionTimer);
        this.questionTimer = null;
        clearInterval(this.correctPicTimer);
        this.correctPicTimer = null;
        this.loadQrcode();
      },
    },
    mounted(){
      this.getUserId();
      this.getUid();
      this.pageShow.loading = true;
      this.$core.initZone(this.pages);
      this.$core.Page[this.pages.home.id].Zone[this.pages.home.zone_ids[0]].Items[0].value = {
        Action: 'Function',
        Function: this.enterQuestion
      };
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[0]].Items[0].value = {
        Action: 'Function',
        Function: this.hideCashLayer
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[1]].Items[0].value = {
        Action: 'Function',
        Function: this.exit
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[2]].Items[0].value = {
        Action: 'Function',
        Function: this.hideOpportunityLayer
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[3]].Items[0].value = {
        Action: 'Function',
        Function: this.hideExitLayer
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[3]].Items[1].value = {
        Action: 'Function',
        Function: this.confirmExitQuestion
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[4]].Items[0].value = {
        Action: 'Function',
        Function: this.hideBackLayer
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[4]].Items[1].value = {
        Action: 'Function',
        Function: this.confirmBack
      }
      this.$core.Page[this.pages.poplayer.id].Zone[this.pages.poplayer.zone_ids[5]].Items[0].value = {
        Action: 'Function',
        Function: this.hideErrorLayer
      }
      this.$core.Page[this.pages.fail.id].Zone[this.pages.fail.zone_ids[0]].Items[0].value = {
        Action: 'Function',
        Function: this.tryAgain
      }
      this.$core.Page[this.pages.success.id].Zone[this.pages.success.zone_ids[0]].Items[0].value = {
        Action: 'Function',
        Function: this.doNothing
      }
      this.enterLoading();

    }
  }

</script>

