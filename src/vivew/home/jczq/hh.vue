<template>
  <div id="app" style="height:0;">
    <main :class="['kd-body game-jczq',{'cart-not-empty':betNum[0] > 0}]">
      <mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" :auto-fill="true" ref="loadmore" >
      <div slot="top" class="mint-loadmore-top">
        <!-- rotate-180 -->
        <span v-show="topStatus !== 'loading'" style="height:30px;width:30px;" :class="{ 'drop_jczq': topStatus === 'drop' }">
            <img style="height:100%;width:100%;" src="../../../assets/images/svg/zuqiu.png">
        </span>
      </div>
        <div class="lottery-wrapper">
        <section class="match-table">
            <div class="data-body">
                <div class="data-body-scroller" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                    <div class="content" v-if="data_sel" >

                      <!--class="dgSelect"-->
                        <div  style="display: block; padding:3px 5px 5px 5px; overflow:hidden;">
                          <mt-button style="position:ababsolute;width:20%;color:#000;float:right;" type="default" @click="test()">
                            <img src="../../../assets/images/svg/sx.svg" height="20" width="20" style="margin:0;padding:0;">
                            筛选
                          </mt-button>
                          <!-- <mt-switch v-model="val" ><span style="color:#ff850e;">显示单关固定</span></mt-switch> -->
                        </div>

                        <!--比赛栏目-->
                        <dl class="match-list" v-for="(item,key) in data_sel">
                          <!--每天的场次-->
                          <dt class="match-divider"  @click="detail(1,key)">{{item.time[0]}} 星期{{date[item.time[1]]}} <em class="date-num">{{item.content.length}}</em>场比赛可投<i :class="'activity-box trans-tf '+[detail_top.indexOf(key) == -1 ?'' :'ad-check']"></i></dt>
                          <!--投注内容-->
                          <dd :class="['match-item ',{'rqspf':menu == 3},{'match-item-01':(menu == 4 || menu==6)}]" v-for="(vo,key1) in item.content" v-show="detail_top.indexOf(key) == -1 ">
                              <div class="league-nd-time">
                                <span class="row game-league">{{vo.leagueName}}</span>
                                <span class="row game-num">033</span>
                                <span class="row game-time">{{vo.over_time}}截止</span>
                                <span class="showAnalysis" @click="detail(2,[key,key1])"><i :class="'activity-box activity-box-top '+[(detail_data[key]) && (detail_data[key].indexOf(key1) > -1) ? '' : 'ad-check']"></i></span>
                              </div>
                              <!--混合 单关固定-->
                              <div :class="['options-block mixall-block',{ 'single-block':(menu != 0)}]" v-if="[0,1].indexOf(menu) > -1">
                                  <div class="game-title">
                                    <span class="col rqTit">让球</span>
                                      <span class="col hostteam"><i class="rank">[{{vo.rankInfo[0]}}]</i><i>{{vo.hostName}}</i></span>
                                    <span class="col vs">VS</span>
                                    <span class="col guestteam"><i>{{vo.guestName}}</i><i class="rank">[{{vo.rankInfo[1]}}]</i></span>
                                  </div>
                                  <div class="game-area">
                                    <span class="row ">
                                      <!-- {{vo['odds']['spf'][3]}} -->
                                      <span class="col game-type">0</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',0)}" @click="betChg(key,key1,'spf',0)">主胜{{vo['odds']['spf'][0]}}</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',1)}" @click="betChg(key,key1,'spf',1)">平{{vo['odds']['spf'][1]}}</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',2)}" @click="betChg(key,key1,'spf',2)">主负{{vo['odds']['spf'][2]}}</span>
                                    </span>
                                    <span class="row" v-if="menu == 0">
                                      <span :class="'col game-type '+[vo['odds']['rqspf'][3] < 0 ?'fuRq':'plusRq']">{{vo['odds']['rqspf'][3]}}</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',0)}" @click="betChg(key,key1,'rqspf',0)">主胜{{vo['odds']['rqspf'][0]}}</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',1)}" @click="betChg(key,key1,'rqspf',1)">平{{vo['odds']['rqspf'][1]}}</span>
                                      <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',2)}" @click="betChg(key,key1,'rqspf',2)">主负{{vo['odds']['rqspf'][2]}}</span>
                                    </span>
                                  </div>
                                  <div class="game-more betbtn" @click="gameSel(key,key1)">
                                    <span :class="['row more-option ellipsis ',{'active':( bet[key] && bet[key][key1] && (bet[key][key1]['bf'] || bet[key][key1]['bqc'] ||bet[key][key1]['zjq']) )   }]">
                                      <template v-if="bet[key] && bet[key][key1] && (bet[key][key1]['bf'] || bet[key][key1]['bqc'] || bet[key][key1]['zjq'])">
                                        已选<br> {{(bet[key][key1]['bf'] ? bet[key][key1]['bf'].length:0) + (bet[key][key1]['bqc'] ? bet[key][key1]['bqc'].length:0) + (bet[key][key1]['zjq'] ? bet[key][key1]['zjq'].length:0)}}项
                                      </template>
                                      <template v-else>
                                        展开<br>全部
                                      </template>

                                    </span>
                                  </div>
                              </div>
                              <!--胜平负 让球胜平负-->
                              <div class="options-block spf-options markHL-row-yellow" v-else-if="[2,3].indexOf(menu) > -1">
                                <span :class="'col rqCol '+[vo['odds']['rqspf'][3] < 0 ? 'fuRq':'plusRq']" v-if="menu==3">让<br>球<br>{{vo['odds']['rqspf'][3]}}</span>
                                <template v-if="menu == 2">
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',0)}" @click="betChg(key,key1,'spf',0)">
                                    <span class="row hostteam"><i class="rank">[{{vo.rankInfo[0]}}]</i>{{vo.hostName}}</span>
                                    <span class="row betinfo" >主胜 {{vo['odds']['spf'][0]}}</span>
                                  </span>
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',1)}" @click="betChg(key,key1,'spf',1)">
                                    <span class="row vs">VS</span>
                                    <span class="row betinfo"  >平 {{vo['odds']['spf'][1]}}</span>
                                  </span>
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'spf',2)}"  @click="betChg(key,key1,'spf',2)">
                                    <span class="row guestteam">{{vo.guestName}}<i class="rank">[{{vo.rankInfo[1]}}]</i></span>
                                    <span class="row betinfo" >客胜 {{vo['odds']['rqspf'][2]}}</span>
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',0)}">
                                    <span class="row hostteam"><i class="rank">[{{vo.rankInfo[0]}}]</i>{{vo.hostName}}</span>
                                    <span class="row betinfo" @click="betChg(key,key1,'rqspf',0)">主胜 {{vo['odds']['rqspf'][0]}}</span>
                                  </span>
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',1)}" @click="betChg(key,key1,'rqspf',1)">
                                    <span class="row vs">VS</span>
                                    <span class="row betinfo" >平 {{vo['odds']['rqspf'][1]}}</span>
                                  </span>
                                  <span class="col betbtn" :class="{'active' :seek(key,key1,'rqspf',2)}" @click="betChg(key,key1,'rqspf',2)">
                                    <span class="row guestteam">{{vo.guestName}}<i class="rank">[{{vo.rankInfo[1]}}]</i></span>
                                    <span class="row betinfo" >客胜 {{vo['odds']['rqspf'][2]}}</span>
                                  </span>
                                </template>
                               </div>
                                  <!--比分 总进球-->
                               <div :class="['options-block',{'bf-options':menu==4},{'zjq-options':menu==5},{'bqc-options':menu == 6}]" v-else>
                                 <span class="game-title row">
                                   <span class="col hostteam"><i class="rank">[{{vo.rankInfo[0]}}]</i><i>{{vo.hostName}}</i></span>
                                   <span class="col vs">VS</span>
                                   <span class="col guestteam"><i>{{vo.guestName}}</i><i class="rank">[{{vo.rankInfo[1]}}]</i></span>
                                 </span>
                                 <span class="col betbtn more-option ellipsis" :class="[( bet[key] && bet[key][key1] && (bet[key][key1]['bf'] || bet[key][key1]['bqc']) ) ? 'active' : '']" @click="gameSel(key,key1)" v-if="menu==4 || menu==6">

                                   <template v-if="(bet[key] && bet[key][key1] && (bet[key][key1]['bf'] || bet[key][key1]['bqc']) )">
                                     <i v-if="menu == 4" v-for="bit_f in bet[key][key1]['bf']">{{menu_list['bf']['data'][bit_f]}} </i>
                                     <i v-if="menu == 6" v-for="bit_f in bet[key][key1]['bqc']" >{{menu_list['bqc']['data'][bit_f]}} </i>
                                   </template>
                                   <template v-else>
                                      {{menu == 4?'点击选择比分':'点击选择上半场和全场结果的组合'}}
                                   </template>

                                 </span>

                                 <template v-else>
                                   <div class="game-area">
                                     <span class="row" v-for="zjq in menu_list.zjq.struc">
                                       <span class="col betbtn" v-for="zjq1 in zjq" :class="{'active' :seek(key,key1,'zjq',zjq1)}" @click="betChg(key,key1,'zjq',zjq1)"><span class="fen">{{zjq1}}</span><span class="betinfo">{{vo['odds']['zjq'][zjq1]}}</span></span>
                                     </span>
                                     </div>
                                   </template>
                               </div>
                              <!--详情-->
                            <a class="analyBoxLink" href="#" v-show="(detail_data[key]) && (detail_data[key].indexOf(key1) > -1)">
                              <ul class="analyBox" style="display: block;">
                                <li>
                                  <h2>历史交锋</h2><span>近{{vo['history']['num']}}次交战，{{vo.hostName}}<em class="c_red">&nbsp;{{vo['history']['score'][0]}}胜</em><em class="c_blue">&nbsp;{{vo['history']['score'][1]}}平</em><em class="c_green1">&nbsp;{{vo['history']['score'][2]}}负</em></span>
                                </li>
                                <li>
                                  <h2>近期战绩</h2><span>主队{{vo['history']['host'][0]}}胜{{vo['history']['host'][1]}}平{{vo['history']['host'][2]}}负<b>|</b>客队{{vo['history']['guest'][0]}}胜{{vo['history']['guest'][1]}}平{{vo['history']['guest'][2]}}负</span>
                                </li>
                                <li class="betRate col3">
                                  <h2>平均赔率</h2><span class="c_red">{{vo['avgOdds']['f']}}</span><span class="c_blue">{{vo['avgOdds']['p']}}</span><span class="c_green1">{{vo['avgOdds']['s']}}</span>
                                </li>

                                <li class="betRate col3" v-if="menu == 2 || menu == 3">
                                  <h2>投注比例</h2>
                                  <span class="c_red">{{menu == 2 ? vo.bid['spf'][0]:vo.bid['rqspf'][0]}}</span>
                                  <span class="c_blue">{{menu == 2 ? vo.bid['spf'][1]:vo.bid['rqspf'][1]}}</span>
                                  <span class="c_green1">{{menu == 2 ? vo.bid['spf'][2]:vo.bid['rqspf'][2]}}</span>
                                </li>

                                <li class="more"><i class="analy-icon"></i><em>详细赛事分析&nbsp;&gt;</em></li>
                              </ul>
                            </a>

                          </dd>
                        </dl>

                        <!---->
                    </div>
                    <div v-else>没有数据</div>
                </div>
            </div>
        </section>

    </div>
      </mt-loadmore>
    <!--确认选择-->
    <form class="bet-form bet-form-jczq clearfix"  v-show="betNum[0] > 0">

      <div class="kd-field">
        <div class="bet-text-jczq">已选择 <span style="color:red;">{{betNum[0]}}</span> 场比赛</div>
      </div>

      <div class="kd-buttons">
        <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
          <span>自购</span>
          <button @click="gmNext(0)" type="button">Button</button>
        </div>
        <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
          <span>合买</span>
          <button @click="gmNext(1)" type="button">Button</button>
        </div>
        <div  type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
          <span>清空</span>
          <button @click="clearAll()" type="button">Button</button>
        </div>
      </div>
    </form>

    <!--投注弹窗选择-->
    <div v-if="game_sel_ok && game_sel.length && data_sel != ''">
      <div :class="'iDialog iDialogNoTitle select-dialog mixall-dialog '+[menu > 1 ? 'mixall-dialog-mtop' : '']"  id="iDialog3">
          <div class="iDialogContent">
              <div class="iDialogBody">
                  <div class="iDialogMain" style="height: auto;">
                    <span class="game-title row">
                      <span class="col hostteam">[3]{{data_sel[game_sel[0]]['content'][game_sel[1]]['hostName']}}</span>
                      <span class="col vs">VS</span>
                      <span class="col guestteam">{{data_sel[game_sel[0]]['content'][game_sel[1]]['guestName']}}[4]</span>
                    </span>
                      <div class="bet-list-body">
                          <div class="bet-list-scroller">
                            <dl :class="item.class" v-for="(item,key) in menu_list" v-if="menu_list_type(key)">
                                <dt class="data-inf">{{item.name}}</dt>
                                <dd class="options-block">
                                    <span class="row" v-for="vo in item.struc">
                                      <template v-for="(vo1,key1) in vo">
                                        <span class="col betbtn" :class="{'active' :seek(game_sel[0],game_sel[1],key,vo1)}" @click="betChg(game_sel[0],game_sel[1],key,vo1)">
                                          <span class="row fen">{{item.data[vo1]}}</span>
                                          <span class="row betinfo">{{data_sel[game_sel[0]]['content'][game_sel[1]]['odds'][key][vo1]}}</span>
                                        </span>
                                      </template>
                                    </span>
                                </dd>
                            </dl>
                          </div>
                      </div>
                      <div class="confirmBox"> <em class="cancel" @click="game_sel_ok = false">关闭</em>  </div>
                      <!-- <em class="confirm">确定</em> -->
                  </div>
              </div>
          </div>
      </div>
      <div class="iDialogLayout" style="z-index: 1002;"></div>
    </div>

    <!--赛事筛选弹窗-->
  <!-- <div>
    <div class="iDialog iDialogNoTitle select-dialog mixall-dialog"  id="iDialog3">
      <mt-switch v-model="val" style="color:#000;">显示单关固定</mt-switch>
    </div>
    <div class="iDialogLayout" style="z-index: 1002;"></div>
  </div> -->
    <!--弹窗确认-->
<transition name="bounce2">
  <div class="promptbox-wrapper" v-show="check_ok">
    <section class="promptbox prompt-service">
      <div class="prompt-head" :style="{ background: $store.state.basic.main_color}">请您确认</div>
      <div class="prompt-body">

        <a class="mint-cell">
          <mt-checklist
            title="玩法选择"
            align="right"
            v-model="checkval"
            :options="checklist">
          </mt-checklist>
          <!-- <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">下注期号</span>
            </div>
            <div class="mint-cell-value"><span>20180702057</span></div>
          </div>
          <div class="mint-cell-right"></div> -->
        </a>
        <a class="mint-cell">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">比赛场次</span>
            </div>
            <div class="mint-cell-value">
              <span class="blue">{{betNum[0]}}</span>场
            </div>
          </div>
          <div class="mint-cell-right"></div>
        </a>

        <a class="mint-cell" >
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text" style="white-space:nowrap; ">每注金额(￥)</span>
            </div>
            <div class="mint-cell-value odds_m_cell">
            <a href="javascript:;" @click="moneyIn--" class="a_svg_ud"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></a>
              <input class="odds_input red" type="number" v-model="moneyIn">
            <a href="javascript:;" @click="moneyIn++" class="a_svg_ud"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
            </div>
          </div>
          <div class="mint-cell-right"></div>
        </a>

        <a class="mint-cell">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">总注数</span>
            </div>
            <div class="mint-cell-value">
              <span class='blue'>{{addPlay[1]}}</span> 注
            </div>
          </div>
          <div class="mint-cell-right"></div>
        </a>

        <template v-if="alert == 1">
          <a class="mint-cell" >
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">合买订单金额</span>
              </div>
              <div class="mint-cell-value">
                  <countup :end-val="addPlay[0]" :duration="1"  class="red"></countup>￥
              </div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
          <label class="mint-checklist-title" style="text-align:center;">- - - - - - -{{(addPlay[0] >= hm_zh.total) ? '以下为合买设置' : '要发起合买,订单金额至少需要'+hm_zh.total+'￥'}}- - - - - - -</label>
            <template v-if="addPlay[0] >= hm_zh.total">

              <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">自 购：</span>
                  </div>
                  <div class="mint-cell-value" >
                    <input :placeholder="'自购为总金额'+hm_zh.zg+'%'" v-model.trim="hm_data.buy_money" class="red" style=" border:1px solid #efefef;" type="numbrt"> ￥
                  </div>
                </div>
                <div class="mint-cell-right"></div>
              </a>
              <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">保 底：</span>
                  </div>
                  <div class="mint-cell-value">
                    <input :placeholder="'保底为剩余'+hm_zh.bd+'%'" v-model.trim="hm_data.bd" class="red" v-if="'bd_switch' in hm_zh && hm_zh.bd_switch" style="width:100%; border:1px solid #efefef;" type="numbrt"> ￥
                  </div>
                </div>
                <div class="mint-cell-right"></div>
              </a>
              <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">中奖提成：</span>
                  </div>
                  <div class="mint-cell-value">
                    <input :placeholder="'提成不能超过'+hm_zh.tc_num+'%'" v-model.trim="hm_data.tc" v-if="'tc_switch' in hm_zh && hm_zh.tc_switch" style="width:100%; border:1px solid #efefef;" type="numbrt"> %
                  </div>
                </div>
                <div class="mint-cell-right"></div>
              </a>


              <!-- <textarea rows="3" cols="20">
                在w3school，你可以找到你所需要的所有的网站建设教程。
              </textarea> -->
              <!-- <mt-field label="自 购：" :placeholder="'自购为总金额'+hm_zh.zg+'%'" v-model.trim="hm_data.buy_money"></mt-field>
              <mt-field label="保 底：" :placeholder="'保底为剩余'+hm_zh.bd+'%'" v-model.trim="hm_data.bd" v-if="'bd_switch' in hm_zh && hm_zh.bd_switch"></mt-field>
              <mt-field label="中奖提成(%)：" :placeholder="'提成不能超过'+hm_zh.tc_num+'%'" v-model.trim="hm_data.tc" v-if="'tc_switch' in hm_zh && hm_zh.tc_switch"></mt-field>-->
              <mt-field label="宣传：" placeholder="写下您的合买宣言,200个字符" type="textarea" rows="4" v-model="hm_data.explain"></mt-field>
              <a class="mint-cell">
                <mt-radio
                  title="投注内容是否公开"
                  align="right"
                  v-model="hm_data.open"
                  :options="opens">
                </mt-radio>
              </a>

              <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">需要支付</span>
                  </div>
                  <div class="mint-cell-value">
                    <span class="red">
                      {{hm_data.bd + hm_data.buy_money}}
                    </span> ￥
                  </div>
                </div>
                <div class="mint-cell-right"></div>
              </a>
            </template>
        </template>
        <a class="mint-cell" v-else>
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">需要支付</span>
            </div>
            <div class="mint-cell-value">
              <!-- <span class="red"> -->
                <countup :end-val="addPlay[0]" :duration="1"  class="red"></countup>￥
              <!-- </span>  -->
            </div>
          </div>
          <div class="mint-cell-right"></div>
        </a>

        <br>
        <div align="center" class="data-item">
          <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
            <span>确认无误,提交</span>
            <button type="button" @click="betOn()">Button</button>
          </div>
        </div>
      </div>
      <a href="javascript:;" class="prompt-close kd-close" @click="check_ok = false;clearAll(1)">close</a>
    </section>
    <div class="promptbox-overlay"></div>
  </div>
</transition>
  </main>
  </div>
</template>

<script>
import { Countup } from 'vux'
export default {
  name:'football',
  mounted(){
    //请求数据
    this.getData();
    //合买数据
    this.getHm();
  },
  components:{
    Countup
  },
  props:['menu'],
  data () {
    return {
      //合买系统配置
      hm_zh:{},
      //合买数据结构
      hm_data: {
        open: '完全公开',    //是否公开
        explain: '',        //宣言
        buy_money: 0,       //自购
        bd: 0,              //保底
        tc: '',             //提成
      },
      alert: 0,
      opens: ['完全公开', '仅跟单人可见', '截止后公开','完全保密'],
      expect_s: [],
      //下拉
      topStatus:'',
      //玩家输入每一注的金额,目前默认2元
      moneyIn:1,
      //添加玩法后,实际每注金额
      // money:0,
      //确认选择投注方法 与 选择内容 默认无选择
      check_ok:false,
      checklist:[],
      checkval:[],
      //导航条切换类型的class
      list_class:{
        0:'',
        1:'',
        2:'',
        3:'rpsqf',
        4:'match-item-01',
        5:'zjq-options',
        6:'match-item-01'
      },
      //展开菜单
      menu_list:{
        bf:{
          name:'比分',
          class:'bf-block bf-block-all',
          struc:[
            [0,1,2,3,4,5,6],
            [7,8,9,10,11,12],
            [13,14,15,16,17],
            [18,19,20,21,22,23,24],
            [25,26,27,28,29,30]
          ],
          data:[
            '1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','5:0','5:1','5:2','胜其它',
            '0:0','1:1','2:2','3:3','平其它',
            '0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','0:5','1:5','2:5','负其他'
            ]
          },
        zjq:{
          name:'总进球',
          class:'zjq-block',
          struc:[
            [0,1,2,3],
            [4,5,6,7]
          ],
          data:['0球','1球','2球','3球','4球','5球','6球','7+球']
        },
        bqc:{
          name:'半全场',
          class:'bqc-block',
          struc:[
            [0,1,2],
            [3,4,5],
            [6,7,8]
          ],
          data:[
            '胜胜','胜平','胜负',
            '平胜','平平','平负',
            '负胜','负平','负负'
          ]
        }
      },
      //存放请求数据
      data_sel:'',
      //收起数据 和 详情的开启关闭
      detail_top:[],
      detail_data:[],
      //详细弹窗选择页面 key1,key2
      game_sel_ok:false,
      game_sel:[],
      //日期
      date:['日','一','二','三','四','五','六'],
      //金额
      money:0,
      //投注样式变化
      bet:{
        // 0:{
        //   0:{
        //     spf:[0,1]
        //   }
        // }
      },
      //投注转换后台使用数据
      type_arr:['ht','dg','spf','rqspf','bf','zjq','bqc'],
      spf_arr:['s','p','f'],
      m_all:{
        'bf':[
          [1,0],[2,0],[2,1],[3,0],[3,1],[3,2],[4,0],
          [4,1],[4,2],[5,0],[5,1],[5,2],[0,-1],
          [0,0],[1,1],[2,2],[3,3],[-1,-1],
          [0,1],[0,2],[1,2],[0,3],[1,3],[2,3],[0,4],
          [1,4],[2,4],[0,5],[1,5],[2,5],[-1,0],
        ],
        'zjq':[0,1,2,3,4,5,6,7],
        'bqc':[
                [1,1],[1,0],[1,-1],
                [0,1],[0,0],[0,-1],
                [-1,1],[-1,0],[-1,-1]
              ]
      },
    }
  },
  computed:{
    //场次与每场投注方案
    betNum(){
      let _this = this;
      if(!Object.keys(_this.bet).length){
        return 0;
      }
      let num = 0,bet = 0,mean = [],mean1 = 0,mean2 = 0;
      for(let i in _this.bet){
        num += Object.keys(_this.bet[i]).length;
        for(let j in _this.bet[i]){
          for(let s in _this.bet[i][j]){
            bet += _this.bet[i][j][s].length;
            mean1 += _this.bet[i][j][s].length;
          }
          mean[mean2] = mean1;
          mean2++;
          mean1 = 0;
        }
      }
      // console.log(mean);
      //场次  全部总注数  每场比赛注数
      return [num,bet,mean];
    },
    //添加玩法后实际金额与注数计算
    addPlay(){
      let _this = this,num = [0,0];
      if(_this.checkval.length >= 1 && Object.keys(_this.bet).length > 0){
        for(let i in _this.checkval){
          if(_this.checkval[i] == 1){ //如果有单关时的金额
            num[1] += _this.betNum[1];
          }else{
            let n=_this.betNum[2],m=_this.checkval[i],fn,get=0;
            //计算场次相互间的组合个数,与组合内容n是几个相组合 m是数组个数
            fn = _this.strand(n,m);
            //场次组合中 场间投注次组合相乘 = 为此串最终投注注数
            for(let j=0,len=fn.length;j<len;j++){
              get += _this.product(fn[j]);
            }
            num[1] += get;
          }
        }
        num[0] = num[1] * _this.moneyIn;
      }else{
        num = [0,0];
      }
      return num;
    }
  },
  watch:{
    addPlay(){
      this.hmNum();
    },
    //自购
    'hm_data.buy_money'(){
      let rs = this.hmNum(1);
      if(!rs[0]){
        this.hm_data['buy_money'] = rs[1];
      }
      this.hm_data['buy_money'] = Math.round(this.hm_data['buy_money']);
    },
    //保底
    'hm_data.bd'(){
      let rs = this.hmNum(2);
      if(!rs[0]){
        this.hm_data['bd'] = rs[1];
      }
      this.hm_data['bd'] = Math.round(this.hm_data['bd']);
    },
    //提成
    'hm_data.tc'(){
      let rs = this.hmNum(3);
      if(!rs[0]){
        this.hm_data['tc'] = rs[1];
      }
      this.hm_data['tc'] = Math.round(this.hm_data['tc']);
    },
    moneyIn(){
      if(this.moneyIn > 9999999){
        this.moneyIn = 9999999;
      }else if(this.moneyIn <= 0){
        this.moneyIn = 0;
      }
      this.moneyIn = Math.round(this.moneyIn);
    },
    menu(){
      // console.log(1123);
      this.clearAll();
    }
  },
  methods: {
    //合买各项金额计算0 选择资金时  1为判断自购 2判断保底 3判断提成
    hmNum(val){
      let num = {'zg':0,'bd':0},_this = this;
      if(Object.keys(_this.hm_zh) && _this.addPlay[0] >= _this.hm_zh['total'] && _this.alert==1){
        num['zg'] = Math.round(_this.addPlay[0] / 100 * parseInt(_this.hm_zh['zg']));
        num['bd'] = Math.round( (_this.addPlay[0] - num['zg'])/100*parseInt(_this.hm_zh['bd']) );
        if(!val){
          _this.hm_data['buy_money'] = num['zg'];
          _this.hm_data['bd'] = num['bd'];
        }else{
            let bit = [true,0];
            if(val == 1){ //判断自购最低
            if(_this.hm_data['buy_money'] < num['zg']){
              _this.$total({ message:'自购不得小于'+_this.hm_zh['zg']+'%',duration:2000,type: 2 });
              bit = [false,num['zg']];
            }else if(_this.hm_data['buy_money'] >= _this.addPlay[0]){
              _this.$total({ message:'自购不得大于订单金额',duration:2000,type: 3 });
              bit = [false,(_this.addPlay[0]-1)];
            }
            }else if(val == 2){  //保底判断
            if(_this.hm_data['bd'] < num['bd']){
              _this.$total({ message:'保底不得小于剩余'+_this.hm_zh['bd']+'%',duration:2000,type: 2 });
              bit = [false,num['bd']];
            }else if(_this.hm_data['bd'] >= (_this.addPlay[0]-num['zg'])){
              _this.$total({ message:'保底不得大于订单剩余金额',duration:2000,type: 3 });
              bit = [false,(_this.addPlay[0]-num['zg'])];
            }
          }else if(val == 3){ //提成判断
            if(_this.hm_data['tc'] > _this.hm_zh['tc_num']){
              _this.$total({ message:'提成不得大于'+_this.hm_zh['tc_num']+'%',duration:2000,type: 2 });
              bit = [false,(_this.hm_zh['tc_num'])];
            }
          }
          return bit;
        }
      }
    },
    getHm(){ //合买方案获取
      let _this = this;
      _this.$getData({
        url:'/api/home/In/setUp',
        type:'post',
        data:{'type':'hm_zh'},
        callback:function(res){
          if(res){
            _this.$set(_this,'hm_zh',res.value);
          }
        }
      });
    },
    loadTop(id) { //下拉执行
       this.getData();
       this.$total({ type: 1,message:'刷新成功'});
       // document.body.scrollTop = 0;
       this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    getData(){     //初始化数据
      let _this = this;
      _this.$getData({
        loading:true,
        url:'/api/home/Home/footBall',
        type:'post',
        data:'',
        callback:function(res){
          if(res){
            _this.$set(_this,'data_sel',res);
          }
          // _this.$total({ message:res,duration:2000,type: 1 });
        }
      });
    },
    //测试使用test
    test(){
      // this.$toast('敬请期待');

       // let a = [1,4,2,'3'];
       // console.log(Math.max(...a));
      // console.log(a.length);
      // this.getHm();
     // console.log(JSON.stringify(this.bet));
     //  let val = ['iphone','moto','nogia'];
     //  let [a, ...b] = val;
     //  // console.log(this.bet);
     // // var rs = this.strand([0,1,2,3,4,5],3);
     //  // console.log(this.data_sel);
     //  console.log(a);
     //  console.log(b);

    },
    //获取数组乘积
    product(val){
        let a = 1
        for(let i=0,len=val.length;i<len;i++){
          a*=val[i];
        }
        return a;
    },
    //获取组合
    strand(val,num){
        //算法二
        let rs = [];
        for (var i=0;i<Math.pow(2, val.length);i++){
            var a = 0;
            var b = [];
            for (var j=0;j<val.length;j++){
                if (i>>j&1){
                    a++;
                    b.push(val[j]);
                }
            }
            if (a==num){
    			      rs.push(b);
            }
        }
        return rs;
    },
    //阶乘公式
    mC(num){
      let a = 0;
      if (num < 0) {
          return -1;
      } else if (num === 0 || num === 1) {
          return 1;
      } else {
          return (num * this.mC(num - 1));
      }
    },
    //清空所有注单
    clearAll(key){
      if(!key){
        this.bet={}
      }
      this.checkval=[];
    },
    //确认发送投注数据方法
    betOn(){
      let _this = this;
      // _this.$total({ type: 1,message:'下注成功'});
      if(!_this.checkval.length){
        _this.$total({ type: 2,message:'请选择至少一种游戏玩法'});
        return false;
      }else if(_this.moneyIn < 1){
        _this.$total({ type: 3,message:'金额错误'});
        return false;
      }else if(_this.alert == 1){
        if(!Object.keys(_this.hm_zh).length){
          _this.$total({ type: 3,message:'合买信息错误'});
          return false;
        }else if(_this.addPlay[0] < _this.hm_zh['total']){
          _this.$total({ type: 2,message:'订单金额过低,无法发起合买'});
          return false;
        }else if(_this.hm_data.explain.length > 20){
          _this.$total({ type: 2,message:'宣言过长,请适当精简'});
          return false;
        }
      }
      // 类型
      let send={};
      send[_this.type_arr[_this.menu]] = {'data':[],'play':_this.checkval};
      // send[_this.typearr[_this.menu]]['data'] = [];
      // send[_this.typearr[_this.menu]]['play'] = _this.checkval;
      //定义场次num0
      let num0=0;
      for(let vo in _this.bet){
        for(let vo1 in _this.bet[vo]){     //每一场球赛获取id
          send[_this.type_arr[_this.menu]]['data'][num0] = {};
          send[_this.type_arr[_this.menu]]['data'][num0]['id'] =  _this.data_sel[vo]['content'][vo1]['id'];
          send[_this.type_arr[_this.menu]]['data'][num0]['startTime'] = _this.data_sel[vo]['content'][vo1]['startTime'];
          send[_this.type_arr[_this.menu]]['data'][num0]['data'] = {};
          send[_this.type_arr[_this.menu]]['data'][num0]['state'] = 0;
          for(let vo2 in _this.bet[vo][vo1]){ //在此处获取玩法类容
            if(vo2 == 'spf'){
              send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'] = {0:{
                lost:0,
                data:{},
              }};
            }else if(vo2 == 'rqspf'){
              if(send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf']){
                send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'][1] = {
                  lost:_this.data_sel[vo]['content'][vo1]['odds']['rqspf'][3],
                  data:{},
                }
              }else{
                send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'] = {1:{
                  lost:_this.data_sel[vo]['content'][vo1]['odds']['rqspf'][3],
                  data:{},
                }};
              }
            }else{
              send[_this.type_arr[_this.menu]]['data'][num0]['data'][vo2] = [];
            }
            for(let vo3 in _this.bet[vo][vo1][vo2]){//在此处处理投注玩法
              if(vo2 == 'spf'){
                //send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'][0]['data'].push(_this.spf_arr[_this.bet[vo][vo1][vo2][vo3]]+':'+_this.data_sel[vo]['content'][vo1]['odds']['spf'][_this.bet[vo][vo1][vo2][vo3]]);
                send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'][0]['data'][_this.spf_arr[_this.bet[vo][vo1][vo2][vo3]]] = _this.data_sel[vo]['content'][vo1]['odds']['spf'][_this.bet[vo][vo1][vo2][vo3]];
              }else if(vo2 == 'rqspf'){
                //send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'][1]['data'].push(_this.spf_arr[_this.bet[vo][vo1][vo2][vo3]]+':'+_this.data_sel[vo]['content'][vo1]['odds']['rqspf'][_this.bet[vo][vo1][vo2][vo3]]);
                send[_this.type_arr[_this.menu]]['data'][num0]['data']['spf'][1]['data'][_this.spf_arr[_this.bet[vo][vo1][vo2][vo3]]] = _this.data_sel[vo]['content'][vo1]['odds']['rqspf'][_this.bet[vo][vo1][vo2][vo3]];
              }else{
                send[_this.type_arr[_this.menu]]['data'][num0]['data'][vo2].push( [_this.m_all[vo2][_this.bet[vo][vo1][vo2][vo3]],_this.data_sel[vo]['content'][vo1]['odds'][vo2][_this.bet[vo][vo1][vo2][vo3]]]);
              }
            }
          }
          num0++;
        }
      }
      // _this.$getData({
      //   url:'/api/'
      // });
      // console.log(send);
      let _basic={
        'hm':{
            'open':'完全公开', //公开类型
            'explain':'',     //合买宣言
            'buy_money':0,    //自购
            'bd':0,           //保底
            'tc':'',          //中奖提成
        },
        'money':_this.addPlay[0]
      }
      if(_this.alert == 1){
        _basic['hm'] = _this.hm_data;
      }
      // console.log(send);return;
      _this.$getData({
        loading:true,
        url:'/api/home/jczq/betting',
        data:{betting:JSON.stringify(send),basic:JSON.stringify(_basic)},
        callback:function(res){

          if(res.code > 0){
            _this.$total({ type: 1,message:res.msg});
            _this.check_ok = false;
            _this.clearAll();
          }else{
            _this.$total({ type: 3,message:res.msg});
          }
        }
      });
    },
    //自购玩法显示 type = 0 自购  type = 1 合买
    gmNext(type){
      let _this = this,rs = [],len=0;
      //默认添加单关玩法
      rs[0] = {
        label:'单关',
        value:1,
      };
      //最高串关判断
      if(_this.betNum[0] > 1){
        len = _this.betNum[0];
        let rule = 8;
        if(len > 4){
          //如果比赛场次大于4场 则进行串关的限制
          for(let j in _this.bet){
            for(let k in _this.bet[j]){
              if(_this.bet[j][k].hasOwnProperty('bf') || _this.bet[j][k].hasOwnProperty('bqc') ){
                rule = 4;break;
              }else if(_this.bet[j][k].hasOwnProperty('zjq')){
                rule = 6;break;
              }
            }
            if(rule != 8){
              break;
            }
          }
        }
        if(len > rule){
          len = rule;
        }
        //插入玩法
        for(let i=1;i<len;i++){
          rs[i] = {
            label:(i+1) +'串1',
            value:(i+1),
          };
        }
      }

      //判断是否有让球胜平负 如果有 取消单关选项
      let check=1;
      for(let j in _this.bet){
        for(let k in _this.bet[j]){
          if(_this.bet[j][k].hasOwnProperty('rqspf')){
            check = 0;
            break;
          }
        }
        if(check == 0 ){
          rs.splice(0,1);
          if(!rs.length){
            _this.$total({ message:'请至少选择两场比赛',type: 2 });
            return;
          }
          break;
        }
      }
      // console.log(rs);
      _this.$set(_this,'checklist',rs);
      _this.checkval = [];
      _this.checkval.push(rs[0]['value']);
      if(type == 1){
        _this.alert = 1;
      }else{
        _this.alert = 0;
      }
      _this.check_ok = true;
    },
    //dom判断bet中是否有值,样式变化
    seek(day,num,play,key){
      let _this = this.bet;
      if(_this[day] && _this[day][num] && _this[day][num][play] && _this[day][num][play].indexOf(key) > -1){
        return true;
      }else{
        return false;
      }
    },
    //bet临时投注存储,参数分别是 第N天 第几场  哪种玩法(bf,zjq,bqc,rqspf,spf) 玩法的key值
    betChg(day,num,play,key){
        let _this = this,rs = JSON.stringify(_this.bet);
        rs = JSON.parse(rs);
        // 一级day
        if( Object.keys(rs).length && Object.keys(rs).indexOf(day.toString()) > -1 ){
          // 二级num
          if(Object.keys(rs[day]).indexOf(num.toString()) > -1){
            // 三级play
            if(Object.keys(rs[day][num]).indexOf(play.toString())>-1){
              // 最后查看数组是否有该值选择值
              let bit = rs[day][num][play].indexOf(key);
              if(bit > -1){
                //如果有实行删除操作
                rs[day][num][play].splice(bit,1);
                // return;
                //删除后判断是否还有值进行逐步删除
                if(!rs[day][num][play].length){
                  delete rs[day][num][play];
                  if(!Object.keys(rs[day][num]).length){
                    delete rs[day][num];
                    if(!Object.keys(rs[day]).length){
                      delete rs[day];
                    }
                  }
                }
              }else{
                //如果没有实行添加操作
                rs[day][num][play].push(key);
              }
            }else{
              rs[day][num][play] = [key];
            }
          }else{
            //二级num
            rs[day][num] = {};
            rs[day][num][play] = [key];
          }
        }else{
          // 一级day
          rs[day] = {};
          rs[day][num] = {};
          rs[day][num][play] = [key];
        }
        _this.$set(_this,'bet',rs);
    },
    //选择bf zjq bqc菜单显示
    menu_list_type(val){
      if(!val) {return;}
      let menu = this.menu, re = true;
      if(val == 'bf'){
        if(menu != 0 && menu != 1 && menu != 4){
          re = false;
        }
      }else if(val == 'zjq'){
        if(menu !=0 && menu != 1 ){
          re = false;
        }
      }else{
        if(menu !=0 && menu != 1 && menu !=6){
          re = false;
        }
      }
      return re;
    },
    //页面收放详细特效
    detail(type,key){
      let _this = this;
      if(type == 1){
        //每天选择收放
        let rs = _this.detail_top.indexOf(key);
        if(rs > -1){
          _this.detail_top.splice(rs, 1);
        }else{
          _this.detail_top.push(key);
        }
      }else{
        //每场详细信息选择收放
        let rs = _this.detail_data;//JSON.parse(JSON.stringify(_this.detail_data));
        if(rs[key[0]]){
          let rs1 = rs[key[0]].indexOf(key[1]);
          if(rs1 > -1){
            rs[key[0]].splice(rs1, 1);
          }else{
            rs[key[0]].push(key[1]);
          }
        }else{
          rs[key[0]] = [key[1]];
        }
        _this.detail_data = [];
        _this.$set(_this,'detail_data',rs);
      }
    },
    //选项展开
    gameSel(key1,key2){
      let _this = this;
      _this.$set(_this,'game_sel',[key1,key2]);
      _this.game_sel_ok = true;
    },
    //删除方法执行的对象,删除的对象
    // delData(obj,date = ''){
    //   if(date == ''){
    //     obj = {};
    //   }else{
    //     delete obj[date];
    //     let new_data = {};
    //     for(var a in obj){
    //       new_data[a] = obj[a];
    //     }
    //     obj = new_data;
    //   }
    //   return obj
    // },
  }
}
</script>

<style scoped>

  @import "../../../assets/css/jczq/style.css";
  @import "../../../assets/css/jczq/basic.css";
  @import "../../../assets/css/jczq/index.css";
  /*足球动画*/
  @keyframes zjcqA
  {
    form{margin-top: 0;}
    15% {margin-top: 30px;}
    39% {transform: rotate(355deg);}
    40% {transform: rotate(0deg);margin-top:100px;height:30px;width: 30px;}
    45% {margin-top:100px;height:15px;width: 45px;}
    50% {margin-top:100px;height:30px;width: 30px;}
    51% {transform: rotate(0deg);}
    70% {margin-top:40px;}
    to  {transform: rotate(360deg);margin-top:0;}
  }
  .drop_jczq{
    /* border:1px solid red; */
    animation-name:zjcqA;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  /*下拉样式*/
.mint-loadmore-top{
  margin-top: -50px;
}

  .promptbox-wrapper{
    margin:0 auto;
  }
  .mint-cell-wrapper{
    padding:0 10px ;
  }
  .red{
    color:red;
  }
  .bf-block .options-block .col:last-child{
    padding: 0;
  }
  .kd-button{
    padding:.625rem;
  }
  .odds_input{
     width: 40%;
    /*margin:0 auto; */
    /*margin-left:50%; */
    border:1px solid #eee;
  }
  .a_svg_ud{
    /* border:solid 1px red;
    padding:0.2rem 0;*/
    fill:rgb(255, 6, 6);
    font-size: 0;
  }
  .a_svg_ud svg{
        position: relative;
    /* margin-top: 20px; */
    border:solid 1px red;
    border-radius: 5px;
    height:25px;
    top:5px;
  }
  .odds_m_cell{

    display:-webkit-box;
    text-align: right;
  }
  /* .weui-cell {
    border:1px solid red;
    padding: 10px 15px;
    height:100%;
  } */
  /*投注菜单*/
  .kd-body.game-jczq.cart-not-empty {
      padding-bottom: 8.0625rem
  }
  .mixall-dialog{
    visibility: visible;
    z-index: 1003;
    width: 95%;
    top: 1%;
    left: 2.5%;
  }
  .mixall-dialog-mtop{
    top:20%;
  }
  .bet-form-jczq {
    padding:.5rem .5rem 0;
  }
  .bet-text-jczq {
    /* float: right;
    width: 40%; */
    font-size: 1rem;
    text-align: left;
    line-height: 52px;
    height: 52px;
    z-index: 500;
  }
  .bet-form{
    margin: 0 auto;
  }
  .bet-form .kd-button{
    margin: 2%;
  }
  .bet-form .kd-button{
    width: 24%
  }
  .bet-form .kd-buttons, .bet-form .kd-field{
    width: 40%;
  }
  .bet-form .kd-buttons{
    width: 60%;
  }
  .match-divider{
    font-family:"仿宋";
  }
  .game-title:after{
    content: "";
  }
  .rqspf .spf-options .col:nth-child(1) {
    width: 6%;
    border-right: 0;
  }
  .iDialog{
    position:fixed;
  }
  .lottery-wrapper{
    padding:2rem 0 0 0 ;
  }
  .dgSelect .chelp:before{
    line-height: 1rem;
  }
  .activity-box{
    border:none;
    padding: 0;
    /* transform:rotate(50deg); */
    /* transform: translateY(-180%);
    -webkit-transform: translateY(-180%); */
  }

  .activity-box:after{
    transition: transform 0.3s;
    transform:rotate(-90deg);
    top:0;
    /* transform: translateY(-180%);
    -webkit-transform: translateY(-180%); */
  }
  .ad-check:after{
    transform:rotate(90deg);
  }
  .activity-box-top:after{
    top:50%;
  }
  .lottery-wrapper{
    position: static;
    background-color:#f8f7f2;
    font-size: 14px;
  }
</style>
