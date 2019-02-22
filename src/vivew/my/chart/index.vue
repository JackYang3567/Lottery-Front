<template>
  <div>
    <div class="coins" v-if="hb_set.expect">
      <div v-for="(item,key) in hb_set.hb_data" class="red-package" :style="{left: hbLeft(key) + 'px',top:hbTop+'px',transition: 5 + (Math.random() * 10) + 's linear'}" @click="problem(item)">
        {{ item.title }}
      </div>
    </div>
  <div ref="change_chart" style="height:100%;width:100%; overflow-y:auto; position:absolute">
    <main  :class="[($store.state.chart_chg ? 'kb-body-w' :'kd-body chat-room')]" style="background-color: #f8f8f8;" >

        <div class="chat-more"><a href="javascript:;" @click="getHistory">历史消息...</a></div>
          <!--系统消息-->
          <template v-for="(item,key) in data">
            <dl class="kd-container chat-messages" style="text-align:center;" v-if="item.type==0" :key="key" >
              <div class="chat-messages-gk">
                <span class="chat-messages-ms" :style="{ color: $store.state.basic.main_color }">{{item.content}}</span>
              </div>
            </dl>
            <!--普通用户 和 管理员内容-->
            <dl :class="['kd-container chat-messages',{'chat-service':item.type==2}]" v-else  :key="key">
              <dt class="chat-author">

                <i class="icon" v-if="item.photo == 0"></i>
                <img style="width:30px;border-radius:50%;"  :src="require('@/assets/images/photo/'+ item.photo +'.png')" v-else />

                <span class="name">{{ item.user_name }}</span>
                <time class="time">{{ item.create_time }}</time>
              </dt>
              <dd class="chat-message">
                  <div class="inner" v-html="item.content" style="word-break: break-all; word-wrap:break-word;">{{ item.content }}</div>
              </dd>
            </dl>
          </template>
            <!-- <dl class="kd-container chat-messages" style="text-align:center;" >
              <div class="chat-messages-gk">
                <span class="chat-messages-ms" :style="{ color: $store.state.basic.main_color }">2233322222222222222222222222222222222222223</span>
              </div>
            </dl> -->
        <div class="chat-textinput">
          <div class="kd-textinput textarea">
            <!-- <textarea :placeholder="set['is_open'] == 1 ? '请输入消息内容':'禁止文字聊天'" :readonly="set['is_open'] == 1 ? false:true" @focus="show_emoji=false" v-model="form.content" id="content" @click="contentTip"></textarea> -->
            <div style="min-height:2.875rem;max-height:10rem;overflow-y:scroll; text-align: left;" @focus="show_emoji=false" :contenteditable="checkIn()" id="content" @click="contentTip">
            </div>
          </div>
          <!-- <div title="4" :class="['kd-marquee chat-notice']"> 
              <div :class="['inner']"> 
                <marquee direction="left" align="bottom" width="100%" scrollamount="3">
                  注意：{{ set.explain }}
                </marquee>
              </div>
          </div> -->
          <a id="send-face-button" class="icon send-face-button" @click="show_emoji=!show_emoji"></a>
          <div type="button" class="kd-button send" @click="send" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
              <span>发 送</span>
              <button type="button">Button</button>
          </div>
          <!-- <div class="countdown-tip wobble" v-if="hb_set.expect">
            <span>距下轮红包:{{ hb_set.display_time }}</span>
          </div> -->
        </div>

        <!--信息和倒计时-->
        <div class="chat-head">
          <div class="kd-marquee chat-notice" :style="{width:!hb_set.expect ? '100%':''}">
            <marquee direction="left" align="bottom" width="100%" scrollamount="3">
              注意：{{ set.explain }}
            </marquee>
            <!-- <div class="inner">
              友情提醒：在线客服已经转换到聊天室，欢迎广大会员在聊天室咨询客服问题。聊天室抢红包五分钟一次红包雨，欢迎大家来拼手气，更多优惠活动请关注优惠活动列表。谢谢！ 
              <i class="icon icon-system0">系统消息：</i>
              <span class="system-msg">恭喜罗*抢到了“高”字，获得了0.58红包</span>
            </div>  -->

            <!-- <div class="inner">
              友情提醒：在线客服已经转换到聊天室，欢迎广大会员在聊天室咨询客服问题。聊天室抢红包五分钟一次红包雨，欢迎大家来拼手气，更多优惠活动请关注优惠活动列表。谢谢！ 
              <i class="icon icon-system0">系统消息：</i>
              <span class="system-msg">恭喜罗*抢到了“高”字，获得了0.58红包</span>
            </div> -->
          </div> 
          <div class="countdown-tip" v-if="hb_set.expect">
            <span>红包倒计时:<br>{{ hb_set.display_time }}</span>
          </div>
        </div>


        <div class="coins"></div>

        <transition name="bounce3">
          <div class=" face-selector" v-show="show_emoji">
            <div style="width:100%;height:150px;">
              <mt-swipe :auto="0">
                <div is="mt-swipe-item" v-for="(item,key) in emoji">
                  <ul class="nostyle face-selector-group clearfix" style="width:100%;">
                      <li :title="value" class="item" v-for="(value,key2) in item"><img :src="'//'+ ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + '/static/images/faces/' + (value == '删除' ? 'delete' : ('00' + (key ? emoji[key-1].length + key2 : key2 + 1)).substr(-3)) + '.gif'" :alt="'[' + value + ']'" @click="emojiAction(value,('00' + (key ? emoji[key-1].length + key2 : key2 + 1)).substr(-3))"></li>
                  </ul>
                </div>
              </mt-swipe>
            </div>
          </div>
        </transition>

      <transition name="bounce2">
        <div class="promptbox-wrapper" v-if="alert">
          <section class="promptbox prompt-chat-history" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
            <div class="prompt-head" :style="{background: $store.state.basic.main_color }">历史消息({{ ('total' in history_data ? history_data.total : 0) }})</div>
            <div class="prompt-body" style="max-height: 426px;" v-if="Object.keys(history_data).length">
              <ul class="nostyle history-list">
                <li v-for="item in history_data.data">
                  <div class="history-title">{{ item.user_name }} {{ item.create_time }}</div>
                  <div class="history-message" style="word-break: break-all; word-wrap:break-word;" v-html="item.content">{{ item.content }}</div>
                </li>
              </ul>
              <div class="kd-pager chat-history-pager">
                <a class="kd-pager-item first disabled" @click="getHistory(1)">&lt;&lt;</a>
                <a class="kd-pager-item prev disabled" @click="getHistory((history_data.current_page - 1 < 1 ? 1 : history_data.current_page - 1))">&lt;</a>
                <span class="kd-pager-item current">{{ history_data.current_page }} / {{ history_data.last_page }}</span>
                <a class="kd-pager-item next" @click="getHistory(parseInt(history_data.current_page) + 1)">&gt;</a>
                <a class="kd-pager-item last" @click="getHistory(history_data.last_page)">&gt;&gt;</a>
              </div>
            </div>
            <div class="empty_class" v-else>没有更多数据了</div>
            <a class="prompt-close kd-close" @click="alert=false;">close</a>
            </section>
            <div class="promptbox-overlay"></div>
        </div>
      </transition>

    </main>
  </div>
</div>
</template>
<script>
  export default{
    mounted(){
      let _this = this;
      _this.lunxun = true;
      _this.getChat();
      _this.getConfig();
      // setTimeout(()=>{
      //   _this.smooth();
      // },1000);
    },
    destroyed () { //组件销毁后调用
      this.lunxun = false;
	  },
    data () {
      return {
        emoji: [
          ['微笑','撇嘴','色','发呆','得意','流泪','害羞','闭嘴','睡','大哭','尴尬','发怒','调皮','呲牙','惊讶','难过','酷','冷汗','发狂','吐','偷笑','愉快','白眼','删除'],
          ['傲慢','饥饿','困','惊恐','流汗','憨笑','悠闲','奋斗','咒骂','疑问','嘘','晕','疯了','衰','骷髅','敲打','再见','擦汗','抠鼻','鼓掌','糗大了','坏笑','删除'],
          ['右哼哼','哈欠','鄙视','委屈','快哭了','阴险','亲亲','吓','可怜','菜刀','西瓜','啤酒','篮球','乒乓','咖啡','饭','猪头','玫瑰','凋谢','嘴唇','爱心','删除'],
          ['闪电','炸弹','刀','足球','瓢虫','便便','月亮','太阳','礼物','拥抱','强','弱','握手','胜利','抱拳','勾引','拳头','差劲','爱你','NO','删除'],
          ['爱情','飞吻','跳跳','发抖','怄火','转圈','磕头','回头','跳绳','投降','笑脸','生病','哭笑','吐舌','晕菜','脸红红','呐喊','可失落','删除']
        ],
        lunxun:false,
        show_emoji: false,
        alert: false,
        data: [],
        set: { is_open: 0,explain: '加载中...',say_id:'' },
        history_data: {},
        form: { content: '' },
        loading: false,
        hb_set: {
          end_time: 0,
          display_time: '',
          hb_data: [],
          expect: 0
        },
        setTimeout_ids: [],
        hbTop: -50,
        hb_state: false
      }
    },
    methods: {
      hbLeft(item){
        if(item){
          return item * (document.body.clientWidth / this.hb_set.hb_data.length);
        }else{
          return 10;
        }
      },
      problem(item){
        let _this = this;
        this.$messagebox.prompt(item.problem,'').then(({ value }) => {
          if(value){
            _this.$getData({
              url:'/api/Home/Discount/hongBaoAction',
              data: { value: value,id: item.id,expect: this.hb_set.expect },
              callback(res){
                if(res.code == -1){
                  _this.$set(_this.hb_set,'hb_data',[]);
                }
                _this.$messagebox('', res.msg);
              }
            });
          }
        },()=>{});
      },
      clearTimeout(){
        for (let i = 0,j = this.setTimeout_ids.length; i < j; i++) {
          clearTimeout(this.setTimeout_ids[i]);
          clearInterval(this.setTimeout_ids[i]);
        }
        this.setTimeout_ids = [];
      },
      getHistory(is_page){
        this.alert = true;
        let _this = this;
        is_page = (is_page && /^\d+$/.test(is_page) ? is_page : 1);
        if(Object.keys(this.history_data).length && (is_page == this.history_data.current_page || is_page > this.history_data.last_page)){
          return;
        }
        _this.$getData({
          loading: true,
          url:'/api/Home/Discount/getChatHistory',
          data: { page: is_page },
          callback(res){
            if(res.code){
              _this.history_data = res.data;
            }else{
              _this.$total({ message: '没有更多历史数据了',type: 2 })
            }
          }
        });
      },
      getConfig(){
        let _this = this;
        if(!_this.lunxun){return;}
        _this.hb_state = true;
        _this.$set(_this.hb_set,'hb_data',[]);
        _this.hbTop = -50;
        _this.$getData({
          url: '/api/Home/Discount/getHongBaoConfig',
          callback(res){
            _this.$set(_this.hb_set,'end_time',parseInt((new Date()).getTime())  + parseInt(res.time) * 1000);
            if(_this.hb_set.expect){
              _this.$set(_this.hb_set,'hb_data',res.hb_data);
              _this.$nextTick(() => {
                _this.hbTop = document.body.offsetHeight;
              });
            }
            _this.$set(_this.hb_set,'expect',res.expect);
            _this.timeTool();
          }
        });
      },
      timeTool(){
        let _this = this
        ,cha = Math.round((_this.hb_set.end_time - new Date().getTime()) / 1000); //秒
        if(!_this.lunxun){return;}
        if(cha < 0){
          setTimeout(() => {
            _this.getConfig();
          },(this.hb_set.expect ? 2000 : 60000));
          return;
        }
        let day = parseInt(cha / 86400)
          ,h = parseInt(cha % 86400 / 3600)
          ,m = parseInt(cha % 86400 % 3600 / 60)
          ,s = Math.round(cha % 86400 % 3600 % 60);
          (h < 10) && (h = "0" + h);
          (m < 10) && (m = "0" + m);
          (s < 10) && (s = "0" + s);
        _this.$set(_this.hb_set,'display_time',((day > 0 ? day + '天 ' : '') + h + ':' + m + ':' + s));
        setTimeout(() => {
            _this.timeTool();
        },1000);
      },
      getChat(){
        this.clearTimeout();
        if(this.loading || this.setTimeout_ids.length || !this.lunxun) return; //this.$route.path != '/My/chart' ||
        this.loading = true;
        let _this = this,
        _id = (_this.data.length ? _this.data[_this.data.length-1].id : 0);
        _this.$getData({
          url:'/api/Home/Discount/getChatRoom',
          data: { id: _id },
          callback(res){
            _this.clearTimeout();
            if(res.code){
              _this.data = _this.data.concat(res.data['list']);
              _this.$nextTick(()=>{
                _this.smooth();
              });
              if(res.data['set']){
                _this.set = res.data['set'];
              }
            }else{
              _id == 0 && (_this.$total({ message:res.msg,type: 2 }));
            }
            _this.setTimeout_ids.push(setTimeout(()=>{
              _this.getChat();
            },3000));
            _this.loading = false;
          },
          errorCallback(){
            let _this = this;
            _this.setTimeout_ids.push(setTimeout(()=>{
              _this.loading = false;
              _this.getChat();
            },3000));
          }
        });
      },
      emojiAction(val,key){
        let _obj = document.getElementById('content');
        if(val == '删除'){
          _obj.innerHTML = _obj.innerHTML.replace(/<img.+\/>$|.{1}$/,'');
        }else{
          _obj.innerHTML += ('<img alt="[' + val + ']" src="//' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/static/images/faces/' + key + '.gif"/>');
        }
      },
      smooth(){//滚动条平滑动作
        if(!this.lunxun){return;}
        let dom = this.$refs.change_chart;
        // if(!dom.scrollTop){return;}

        let scrollTop = dom.scrollTop;
        //公式 总滚动距离 - 滚动条长度 = 可滚动距离
        let range = dom.scrollHeight - dom.offsetHeight;
        //如果 可滚动距离 - 滚动条位置 > 500
        if(range - dom.scrollTop > 500){
          dom.scrollTop += 100;
        }else{
          dom.scrollTop += 10;
        }
        // console.log(233);
        if(dom.scrollTop < range){
          setTimeout(this.smooth,10);
        }
        //如果无效 使用第二种方式下拉
        // if(scrollTop == dom.scrollTop && dom.scrollTop == 0){
        //   range = document.body.scrollHeight - document.body.offsetHeight;
        //   if(range - document.body.scrollTop > 500){
        //     document.body.scrollTop += 300;
        //   }else{
        //     document.body.scrollTop += 10;
        //   }
        //   if(document.body.scrollTop < range){
        //     setTimeout(this.smooth,10);
        //   }
        // }else if(dom.scrollTop < range){
        //   setTimeout(this.smooth,10);
        // }
      },
      // smooth(){ // 滚动条平滑动作
      //   // console.log(1);
      //   let range = document.body.scrollHeight - document.body.offsetHeight;
      //   if(range - document.body.scrollTop > 500){
      //     document.body.scrollTop += 300;
      //     document.documentElement.scrollTop += 300;
      //   }else{
      //     document.body.scrollTop += 5;
      //     document.documentElement.scrollTop += 5;
      //   }
      //   if(document.body.scrollTop < range){
      //     setTimeout(this.smooth,10);
      //   }
      // },
      contentTip(){
        if(!this.$store.state.login){
          this.$toast('请先登录!');
        }else if(this.set.is_open == 0 && this.set['say_id'].indexOf( this.$store.state.user['id'].toString()) == -1 ){
          this.$toast('当前禁止文字发言,可表情聊天!');
        }
      },
      //判断可以输入人员
      checkIn(){
        // console.log(this.$store.state.user);
        if(this.set.is_open == 1){
          return true;
        }
        // console.log(this.set.say_id != '');
        if(this.set.say_id != '' && this.$store.state.login && this.set['say_id'].indexOf( this.$store.state.user['id'].toString()) > -1 ){
          return true;
        }
        return false;
        // set['is_open'] == 1 ? true:false
      },
      send(){
        let _this = this;
        _this.form.content = document.getElementById('content').innerHTML;
        if(_this.form.content == ''){
          _this.$total({ message: '请输入您要发送的信息',type: 2 });
          return;
        }
        _this.$getData({
          url:'/api/Home/My/sendChat',
          data: _this.form,
          callback: function(res){
            // console.log(res);
            // _this.$total({ message:res.msg,type: 0 });
            if(res.code > 0){
              _this.$total({ message:res.msg,type: 1 });
              document.getElementById('content').innerHTML = '';
              _this.form.content = '';
              _this.show_emoji = false;
            }else{
              _this.$total({ message:res.msg,type: 0 });
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  /*聊天室*/
  .chat-messages-gk{
    display: inline-block;
    margin:0 auto;
    margin-top:1rem;
    max-width:70vw;
    background-color:#d4d0c9;
    border-radius:.7rem;
    padding:.5rem;
    word-wrap:break-word ;
    text-align:left;
  }
  .chat-messages-ms{
    font-size:.875rem;
    color:#0075a9;
  }
  .chat-textinput .textarea {
      display: inline-block;
      vertical-align: bottom;
      width: calc(100% - 130px);
      border: none;
  }
  .chat-textinput .kd-button.send {
      width: 5rem;
      margin: 0 .5rem;
  }
  .kd-body.chat-room {
      padding-top: 5.5rem;
      padding-bottom: 9rem;
  }
  .chat-head {
      position: fixed;
      width: 100%;
      top: 3rem;
      padding: 4px;
      background: #fff;
      box-shadow: 0px 1px 5px #888888;
  }


  .kd-marquee {
      overflow: hidden;
      white-space: nowrap;
  }
  .chat-notice {
      width: calc(100% - 5.375rem);
      height: 1.25rem;
      line-height: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      color: #999;
      margin: 0;
      vertical-align: middle;
  }
  .chat-notice, .chat-textinput .kd-button.send {
      display: inline-block;
      vertical-align: middle;
      font-size: .875rem;
      margin: 0;
  }
  .countdown-tip, .countdown-tip a {
      color: red;
  }
  .countdown-tip {
      display: inline-block;
      padding: .25rem .5rem;
      border: 1px solid red;
      background-color: #fff;
      line-height: 1;
      font-size: .75rem;
      border-radius: 4px;
      -webkit-border-radius: 4px;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
      animation-duration: 10s;
      -webkit-animation-duration: 10s;
      transform-origin: 500% -800%;
      -webkit-transform-origin: 500% -800%;
      vertical-align: middle;
  }
  .chat-textinput{
    border-top: 1px solid #c0c3c3;
  }
  .chat-textinput .kd-button.send {
      width: 5rem;
      margin: 0 .5rem;
  }
  .mint-swipe-indicator.is-active {
    background: #777777;
    opacity: 1;
  }
  .mint-swipe-indicators {
    bottom: 3px;
  }
  .empty_class {
    text-align: center;
    color: #999;
    line-height: 100px;
  }
  .de{
    width: 100%;
    display: block;
  }
@media (min-width: 960px){
  .chat-head {
      width: 640px;
      margin: 0 auto;
  }
}
.chat-service .icon{
  background-color: #ff7272;
}
.chat-service .name{
  color:#ff7272;
}
.kb-body-w{
    padding-top: 3rem;
    padding-bottom: 12rem;
}
  /* .kd-marquee .inner {
    display: inline;
  } */
</style>
