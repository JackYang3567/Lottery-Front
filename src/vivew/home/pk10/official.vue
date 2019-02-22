<template>
  <div>

<main class="kd-body game game-p game-id-p game-official" v-if="Object.keys(list_data).length">
    <div class="clearfix lottery-wrapper lottery-wrapper-official pk10">
        <div class="kd-container prev-lottery pk10 prev-lottery-official">
            <div class="prev-lottery-issue prev-lottery-issue-official pk10">
                <a :href="'#/game-p/'+$route.params.id" class="change-to-classical active pk10">官方</a>第{{history.expect}}期</div>
            <!--开奖号码-->
            <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official pk10">
                <template v-if="history.content != 0 && history.content != ''">
                    <li v-for="(vo,key) in history.content" :key="key">
                        <span :class="['lottery-ball solid pk10', ( 'ball'+parseInt(vo) ),'lottery-ball-official']">{{vo}}</span>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <span class="lottery-ball solid pk10 ball3 lottery-ball-official">??</span>
                    </li>
                </template>
            </ul>
            <!--开奖历史-->
            

            <!--赛车排名 opened openning  podium-1st podium-2nd podium-3th-->
            <div :class="['podium',(history.content != 0 && history.content != '' ? 'opened' : 'openning')]">
                <div class="podium-item podium-1st"><span>{{history.content[0]}}</span></div>
                <div class="podium-item podium-2nd"><span>{{history.content[1]}}</span></div>
                <div class="podium-item podium-3th"><span>{{history.content[2]}}</span></div>
            </div>
        </div>
        
        <!--倒计时-->
        <div class="kd-container pk10 current-lottery-official">
            <div class="lottery-status-wrapper lottery-status-wrapper-official pk10">
                <div class="lottery-issue lottery-issue-official pk10">第{{now_expect}}期</div>
                <div class="lottery-status lottery-status-official pk10">
                    <span class="ls-status">{{time < 0 ?'距下期' : '距封盘'}}</span>
                    <i :class="['cd-num',(vo == ':' ? 'cd-num-p':'cd-num-'+vo),'pk10']" v-for="(vo,key) in timedate" :key="key">{{vo}}</i>
                </div>
            </div>
        </div>
        
    </div>

    <!--顶部切换选择菜单-->
    <ul class="nostyle playing-methods playing-methods-official clearfix pk10" v-if="$store.state.offopen">
        <li class="playing-methods__group" v-for="(vo1,k1,index1) in list_data" :key="index1">
            <div class="playing-methods__group-head pk10">{{vo1.name}}</div>
            <div class="clearfix playing-methods__group-body pk10">
                <div class="playing-methods__item playing-methods-official__item playing-methods__group-name pk10"><span class="item">{{vo1.name}}</span></div>
                <div data-id="p156" :class="['playing-methods__item playing-methods-official__item pk10',{active:(select[0] == k1 && select[1] == k2)}]" v-for="(vo2,k2,index2) in vo1.items" :key="index2" @click="nav(k1,k2)"><a class="item">{{vo2.name}}</a></div>
            </div>
        </li>
    </ul>
   
   <!--开奖历史-->
    <div class="promptbox-wrapper prompt-in-game-rule pk10 prompt-gamerecords-official" style="display:none">
        <section class="promptbox">
            <div class="prompt-head">今日开奖</div> 
            <div class="prompt-body prompt-body--gamerecords">
                <table class="account__table">
                    <thead>
                        <tr>
                            <th style="width: 16%;">期号</th> 
                            <th>开奖号</th> 
                            <th>和值</th> 
                            <th style="width: 20%;">形态</th>
                        </tr>
                    </thead> 
                    <tbody>
                        <tr>
                            <td>717483</td> 
                            <td class="primary-color">
                                <span class="lottery-ball solid pk10 ball09 lottery-ball-official">09</span>
                                <span class="lottery-ball solid pk10 ball02 lottery-ball-official">02</span>
                                <span class="lottery-ball solid pk10 ball04 lottery-ball-official">04</span>
                                <span class="lottery-ball solid pk10 ball10 lottery-ball-official">10</span>
                                <span class="lottery-ball solid pk10 ball06 lottery-ball-official">06</span>
                                <span class="lottery-ball solid pk10 ball07 lottery-ball-official">07</span>
                                <span class="lottery-ball solid pk10 ball08 lottery-ball-official">08</span>
                                <span class="lottery-ball solid pk10 ball03 lottery-ball-official">03</span>
                                <span class="lottery-ball solid pk10 ball01 lottery-ball-official">01</span>
                                <span class="lottery-ball solid pk10 ball05 lottery-ball-official">05</span>
                            </td> 
                            <td>11</td> 
                            <td><span class="sum-type sum-type--orange">小</span><span class="sum-type sum-type--blue">单</span></td>
                        </tr>
                    </tbody>
                </table> 
            </div> <a href="javascript:;" class="prompt-close kd-close">close</a>
        </section>
        <div class="promptbox-overlay"></div>
    </div>


    <!--下拉菜单-->
    <!-- <div class="game-record-switch-wrapper">
        <a href="javascript:;" class="game-record-switch pk10">
            <i class="icon"></i>
        </a>
    </div> -->

    <div class="current-category-caption">
        <!-- <div class="ccc-balance clearfix pk10">
            <img src="~@/assets/images/official/coin-package.png" alt="">0 
            <a href="javascript:;" class="ccc-sharking-link pk10" @click="betKX">摇一摇随机选<i class="icon icon-sharking"></i></a>
        </div> -->
        <div class="ccc-text pk10" @click="test()">
            <span class="ccc-name">{{list_data[select[0]]['name']}}-{{list_data[select[0]]['items'][select[1]]['name']}}</span>
            {{list_display[select[0]]['note']}}
            <i class="icon icon-question pk10"></i>
        </div>
    </div>

    <section class="playing-method-section__gf" id="category-p-gf-dw">


        <!--主界面显示 选择式-->
        <div class="betting-bar pk10">
            <div class="betting-bar-info pk10"  v-show="betNum>0"><p>共 <strong>{{betNum}}</strong> 注, 投注 <strong>{{moneyActual}}</strong> 元</p></div>

            <a href="javascript:;" class="cart-setting" @click="yjf = !yjf">{{mtype[pattern]}}</a> 
            <input type="text" v-model="money">倍
            <template v-if="betNum > 0">
                <div @click="clear()" type="button" class="kd-button kd-button--official kd-button--clear">清空
                    <button type="button">Button</button>
                </div> 
                <div @click="bet_ok = !bet_ok" type="button" class="kd-button kd-button--official btn-red kd-button--cart empty" data-number="0">
                    投注 <button type="button">Button</button>
                </div>
            </template>
            <template v-else>
                <div @click="randomSelect()" type="button" class="kd-button kd-button--official kd-button--random  kd-button--clear">机选 
                    <button type="button">Button</button>
                </div> 
                <div type="button" :class="['kd-button kd-button--official btn-red kd-button--cart',{empty:!bet_list.length}]" :data-number="bet_list.length" style="color:#f7ce47;" @click="all_list_bet = !all_list_bet">
                    注单 <button type="button">Button</button>
                </div>
            </template>
        </div>

        <template v-if="list_display[select[0]][select[1]]">
        <div class="playing-methods-box pk10" v-for="(vo1,key1,index1) in list_display[select[0]][select[1]]['text']" :key="index1">
            <div class="playing-methods__balls-title pk10"><span>{{vo1}}</span></div>
            <ul class="nostyle clearfix playing-methods__balls pk10">
                <li class="playing-methods__balls-item pk10"  v-for="(vo2,key2,index2) in list_display[select[0]][select[1]]['data']" :key="index2">
                    <span id="lottery-ball-x0y0" @click="checkIng(key1,key2)" :data-odds="list_data[select[0]]['items'][select[1]]['odds']" :class="['lottery-ball',{selected:(bet[key1] && bet[key1].indexOf(key2) > -1 )}]">
                        <span class="lottery-ball-inner">{{vo2 < 10 ? '0'+vo2 : vo2}}</span>
                    </span>
                </li>
            </ul>
            <div class="playing-methods__tool pk10" v-if="list_display[select[0]][select[1]]['kx']">
                <div class="playing-methods__tool-title pk10">快速选号</div>
                <div class="playing-methods__tool-items clearfix pk10">
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"all")'>全</span> 
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"big")'>大</span> 
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"small")'>小</span> 
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"single")'>单</span> 
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"double")'>双</span> 
                    <span class="playing-methods__tool-button pk10" @click='betKX(key1,"clear")'>清</span>
                </div>
            </div>
        </div>
        </template>
        <template v-else>
        <div class="playing-methods-box pk10">
            <div class="playing-methods__balls-title pk10">
                <span>手动输入</span>
            </div> 
            <ul class="nostyle clearfix playing-methods__balls pk10">
                <li class="playing-methods__ballsText">
                    <p class="playing-methods__tip pk10">
                        <strong>注意：</strong>手动输入号码，每个号码用逗号(",")隔开，每注号码用分号(";")或者换行或者空格(" ")隔开</p> 
                        <div class="kd-textinput textarea"><textarea id="playing-methods__input" v-model.trim="content"></textarea></div>
                </li>
            </ul> 
        </div>
        </template>


        <!--圆角分查看界面-->
        <div class="pcs-box-wrapper promptbox-cart-setting" v-show="yjf">
            <div class="pcs-box">
                <div class="pcs-row pcs-head">设置<a href="javascript:;" class="kd-close" @click="yjf = false">close</a></div>
                <div class="pcs-row">单位
                    <div :class="['kd-radio2',{checked:key == pattern}]" v-for="(vo,key) in mtype" :key="key" @click="pattern = key"><i class="icon"></i><span> {{vo}}</span></div>
                </div>
                <div class="pcs-row pcs-row--multiple">倍数
                    <input type="number" v-model="money">
                </div>
                <div class="pcs-row">单注单倍奖金：{{moneyOne}}元</div>
                <div class="pcs-row clearfix">
                    <div type="button" class="kd-button kd-button--official btn-orange kd-button--default" @click="money = 1;pattern = 0; yjf=false;">恢复默认
                        <button type="button">Button</button>
                    </div>
                    <div type="button" class="kd-button kd-button--official btn-red kd-button--confirm" @click="yjf=false">确 认
                        <button type="button">Button</button>
                    </div>
                </div>
            </div>
        </div>

        <!--选择注单确认界面-->
        <div class="pcs-box-wrapper promptbox-cart-tip" v-show="bet_ok">
            <div class="pcs-box">
                <div class="pcs-row pcs-head">下单提示</div>
                <div class="pcs-row">单注单倍奖金：{{moneyOne}}元</div>
                <div class="pcs-row pcs-row--multiple">
                    倍数
                    <input type="number" v-model="money"> 单位
                    <div class="kd-select"><span class="value">{{mtype[pattern]}}</span>
                        <select v-model="pattern">
                            <option value="0">元</option>
                            <option value="1">角</option>
                            <option value="2">分</option>
                        </select>
                    </div>
                </div>
                <div class="pcs-row pcs-row--info">
                    <p>共 <strong>{{betNum}}</strong> 注</p>
                    <p>投注 <strong>{{ moneyActual }} </strong> 元</p>
                </div>
                <div class="pcs-row clearfix">
                    <div type="button" class="kd-button kd-button--official btn-orange kd-button--cancel" @click="bet_ok=false">取 消
                        <button type="button">Button</button>
                    </div>
                    <div type="button" class="kd-button kd-button--official btn-red kd-button--submit" @click="betGO()">提 交
                        <button type="button">Button</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!--最终确认界面投注确认界面-->
        <div class="promptbox-cart-box pk10" v-show="all_list_bet">
            <div class="pcb-head pk10" :style="{'backgroundColor':$store.state.basic.main_color}">
                <a href="javascript:;" class="pcb-go-back" @click="all_list_bet = false" style="font-size:1rem;line-height:20px;">
                    <!-- <i class="icon icon-nav-arrow-left"></i> -->
                    关闭
                </a>
                注单列表
            </div>
            <div class="current-lottery-in-cart pk10">
                <span class="ls-status">当前期号</span><i class="cd-num">{{now_expect}}</i>
                <span class="ls-status">{{time < 0 ?'距下期' : '距封盘'}}</span>
                <i :class="['cd-num',(vo == ':' ? 'cd-num-p':'cd-num-'+vo),'pk10']" v-for="(vo,key) in timedate" :key="key">{{vo}}</i>
            </div>
            <div class="pcb-buttons clearfix pk10">
                <div @click="bet_list = []" type="button" :class="['kd-button kd-button--official kd-button--clear-cart btn-red',{disabled:!bet_list.length}]">
                    清空注单
                    <button type="button">Button</button>
                </div>
                <div @click="RSBG()" type="button" class="kd-button kd-button--official kd-button--random-one btn-red">
                    机选一注
                    <button type="button">Button</button>
                </div>
                <!-- <div class="pcb-balance pk10"><img src="~@/assets/images/official/coin-package.png" alt="">0</div> -->
            </div>
            <div class="pcb-list">
                <div class="pcb-list-item pcb-list-item__first">
                    <!--注单列表-->
                    <template v-if="bet_list.length">
                        <div class="pcb-list-item" v-for="(vo,key) in bet_list" :key="key">
                            <div class="pcb-list-item__product">{{list_data[vo.key1]['name']}}-{{list_data[vo.key1]['items'][vo.key2]['name']}}: 
                                <span class="im-color">
                                    <template v-for="(vo1,key1) in vo.content">
                                        <b v-for="(vo2,key2) in vo1" v-if="vo1.length" :key="key1+'-'+key2">({{ (select[1] == 'official_gyh_dxds' || select[0] == 'official_lhd')  ?  list_display[select[0]][select[1]]['data'][vo2] : vo2}})</b>;
                                    </template>
                                </span>
                            </div> 
                            <div>{{parseInt(vo.num)}}注 {{parseFloat(vo.num * vo.single).toFixed(2)}}元</div> 
                            <div>单注单倍奖金：<span class="im-color">{{parseFloat(vo.odds*vo.single).toFixed(2)}}</span>元</div> 
                            <a title="移除" class="pcb-list-item__remove" @click="removeLi(key)">
                                <i class="icon icon-times"></i>
                            </a>
                        </div>
                    </template>
                </div>
                <div class="pcb-list-item pcb-list-item__last"></div>
            </div>
            <div class="pcb-foot">
                <div class="pcb-info pk10">共 <strong>{{allBS['num']}}</strong> 注，投注 <strong>{{allBS['bet']}}</strong> 元</div>
                <div @click="betOn()" type="button" :class="['kd-button kd-button--official btn-red kd-button--do-bet',{disabled:time<=0}] ">
                    {{time<=0 ? '已封盘':'确认投注'}}
                    <button type="button">Button</button>
                </div>
            </div>
        </div>
        <!--花里胡哨 .动画效果页面-->             <!-- <div class="random-balls__content" style="height: 2328px;"></div>  -->  <!-- random-balls__anim-leave-active random-balls__anim-leave-to   style="left: 72.2656px; top: 2042.28px;"-->
        <!-- <div class="random-balls">
            <div class="random-balls__fake"></div> 
            <div class="random-balls__anim">
                <span data-index="0" data-id="lottery-ball-x9y1" data-last="true" class="lottery-ball solid pk10 random-balls__anim-enter-done" style="left: 0px; top: 0;">
                    02
                </span>
                <span data-index="0" data-id="lottery-ball-x9y1" data-last="true" class="lottery-ball solid pk10 random-balls__anim-enter-done" style="left: 20px; top: 0;">
                    02
                </span>
            </div>
        </div> -->
    </section>
    <form class="bet-form clearfix" style="display: none;">
        <div class="kd-field">
            <label for="count_in_bet_form" class="kd-field-title">已选 <span>{{betNum}}</span> 注, 单注金额：</label>
            <div class="kd-textinput number">
                <input type="number" id="count_in_bet_form" step="0.01">
            </div>
            <ul class="nostyle kd-chips" style="display: none;"></ul>
        </div>
        <div class="kd-buttons">
            <div type="button" class="kd-button main-button disabled"><span>投 注</span>
                <button type="button" disabled="disabled">Button</button>
            </div>
            <div type="button" class="kd-button"><span>清 空</span>
                <button type="button">Button</button>
            </div>
        </div>
    </form>
    
    <!-- <div class="promptbox-wrapper prompt-select-balls prompt-select-balls-p" style="display: none;">
        <section class="promptbox">
            <div class="prompt-head">标 题(0注)</div>
            <div class="prompt-body"></div>
            <div class="prompt-foot">
                <div type="button" class="kd-button main-button disabled">确 定
                    <button type="button" disabled="disabled">Button</button>
                </div>
                <div type="button" class="kd-button">取 消
                    <button type="button">Button</button>
                </div>
            </div> <a href="javascript:;" class="prompt-close kd-close">close</a>
        </section>
        <div class="promptbox-overlay"></div>
    </div> -->
    
    <!-- <div class="promptbox-wrapper prompt-cart-list" style="display: none;">
        <section class="promptbox">
            <div class="prompt-head">我的注单 (共 0 注)</div>
            <ul class="prompt-body nostyle">
                <li>您的注单是空的...<a>前往选号</a></li>
            </ul>
            <div class="prompt-foot">
                <div type="button" class="kd-button main-button disabled">确认下注
                    <button type="button" disabled="disabled">Button</button>
                </div>
                <div type="button" class="kd-button">取 消
                    <button type="button">Button</button>
                </div>
            </div> <a href="javascript:;" class="prompt-close kd-close">close</a>
            <div class="message-tip" style="display: none;">false</div>
        </section>
        <div class="promptbox-overlay"></div>
    </div> -->
</main>
  </div>
</template>

<script>
  export default{
    mounted(){
        // official:false, //是否是官方彩种
        // offopen:false,  //官方头部弹窗选择
        // offtxt:'无',      //官方头部选择文字
        //切换背景使用
        let id = parseInt(this.$route.params.id);
        if(id != 3 && id != 5){
            this.$router.push('/');
        }
        this.$store.state.offtype = 1;
        this.$store.state.official = true;
        this.getInfo('start');
    },
    destroyed () { 
        //组件销毁后调用
        this.$store.state.offtype = 0;
        this.$store.state.official = false;
        this.lunxun = false;
	},
    data () {
      return {
        //倒计时
        time:0,
        //封盘时间
        desct:30,
        //期号
        now_expect:'',
        //上一期数据
        history:{
            expect:'',
            content:0,
        },
        //轮询
        lunxun:true,
        //页面数据
        list_data:{},
        //各个玩法的显示样式
        list_display:{
            'official_dwd':{
                'note':'',
                'official_dwd_fs':{
                    'data':[1,2,3,4,5,6,7,8,9,10],
                    'text':['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
                    'kx':true
                }
            },
            'official_cqs':{
                'note':'请至少选择(输入)一个、冠、亚、季军号码',
                'official_cqs_fs':{
                    'data':[1,2,3,4,5,6,7,8,9,10],
                    'text':['冠军','亚军','季军'],
                    'kx':true
                },
                'official_cqs_ds':false,
            },
            'official_cqe':{
                'note':'请至少选择(输入)一个冠军、一个亚军号码',
                'official_cqe_fs':{
                    'data':[1,2,3,4,5,6,7,8,9,10],
                    'text':['冠军','亚军'],
                    'kx':true
                },
                'official_cqe_ds':false
            },
            'official_cgj':{
                'note':'',
                'official_cgj_fs':{
                    'data':[1,2,3,4,5,6,7,8,9,10],
                    'text':['冠军'],
                    'kx':true
                }
            },
            'official_gyh':{
                'note':'',
                'official_gyh_dxds':{
                    'data':['大','小','单','双'],
                    'text':['选号'],
                    'kx':false
                },
                'official_gyh_h':{
                    'data':[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                    'text':['选号'],
                    'kx':true,
                }
            },
            'official_lhd':{
                'note':'',
                'official_lhd_gj':{
                    'data':['龙','虎'],
                    'text':['选号'],
                    'kx':false,
                },
                'official_lhd_yj':{
                    'data':['龙','虎'],
                    'text':['选号'],
                    'kx':false,
                },
                'official_lhd_jj':{
                    'data':['龙','虎'],
                    'text':['选号'],
                    'kx':false,
                }
            }
        },
        //所选择的玩法
        select:['official_dwd','official_dwd_fs'],
        //选择注单
        bet:{},
        //选择注单
        content:'',
        mtype:['元','角','分'],
        //倍数 money
        money:1,
        //圆角分
        pattern:0,
        //圆角分界面开关
        yjf:false,
        //选择式注单查看
        bet_ok:false,
        //注单查看
        all_list_bet:false,
        //请求不要重复
        data_post:0,
        //注单 -> 选择投注时添加的投注内容 single单注金额 odds倍数 num 注数 
        bet_list:[
            // {key1:'official_dwd',key2:'official_dwd_fs',content:[[0,1,2,3],[0,1,2,3]],single:10,odds:1,num:1},
        ],
      }
    },
    computed:{
        //最终注单显示
        allBS(){
            let _this = this,arr= {'bet':0,'num':0};
            if( _this.bet_list.length != 0 ){
                for(let i  in _this.bet_list){
                    arr['bet'] += (parseFloat(_this.bet_list[i]['single']) * parseFloat(_this.bet_list[i]['num']));
                    arr['num'] += _this.bet_list[i]['num'];
                }
                arr['bet'] = parseFloat(arr['bet']).toFixed(2);
            }
            return arr;
        },
        //手动输入
        contentS(){
            let _this=this, rs = this.content,cfl=0;
            if( _this.select[1] =='official_cqs_ds'){
                cfl = 3;
            }else{
                cfl = 2;
            }  
            let regEn = /[`~!@#$%^&*()_+<>?:"{}.\/'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                //分隔 和 判断
            let sp = /\s|;/im;
                //判断是否是数字
            let nuc = /^\d{2}$/;
            if(regEn.test(rs) || regCn.test(rs)) {
                return '';
            }
            // if(!sp.test(rs)){
            //     return '';
            // }
            //分号和空格分开
            rs = rs.split(sp);
            // 最终生成的数据 重复判断变量
            let return_data = {},cf;
        
            for(let i in rs){
               rs[i] = rs[i].split(',');
               if(rs[i].length != cfl || _this.isRepeat(rs[i])){return ''};
               cf=0;
               for(let j in rs[i]){
                   if( !nuc.test(rs[i][j]) || rs[i][j].length != 2 || rs[i][j] > 10 || rs[i][j] < 1 ){
                       return '';
                   }else{
                       if((typeof return_data[j])!='object'){
                           return_data[j] = [];
                       }
                       //手动输入的内容需要转换一下
                       if(return_data[j].indexOf(parseInt(rs[i][j])-1) == -1){
                            return_data[j].push(parseInt(rs[i][j])-1);
                       }
                        if(_this.isRepeat(return_data[j])){
                            cf+=1;
                        }
                   }
               }
              if(cf == cfl){
                  //判断是否有一模一样的投注
                  return '';
              }
            }
            return return_data;
        },
        //实际投注金额
        moneyActual(){
            let _this = this;
            return parseFloat(_this.moneyBet*_this.betNum).toFixed(2);
        },
        //单注下注金额
        moneyBet(){
            let _this = this;
            let data = _this.money;
            if(_this.pattern == 1){
                data = data/10;
            }else if(_this.pattern == 2){
                data = data/100;
            }
            return parseFloat(data).toFixed(2);
            //return (_this.moneyOne * _this.betNum * _this.money).toFixed(2);
        },
        //单注单倍奖金计算
        moneyOne(){
            let _this = this,data = 0;
            if(Object.keys(_this.list_data).length){
                data = _this.list_data[_this.select[0]]['items'][_this.select[1]]['odds'];
                if(_this.pattern == 1){
                    data = data/10;
                }else if(_this.pattern == 2){
                    data = data/100;
                }
            }
            return parseFloat(data).toFixed(2);
        },
        //注数计算
        betNum(){
            let _this = this,num = 0,len = 1,bet = {};
            // if( !Object.keys(_this.bet).length || content == ''){ return 0;}
            if( Object.keys(_this.bet).length ){
                bet = JSON.parse(JSON.stringify(_this.bet));
            }else if(_this.select[1] == 'official_cqs_ds' || _this.select[1] == 'official_cqe_ds'){
                // console.log(123);
                bet = _this.contentS;
                
            }else{
                return 0;
            }
            if(_this.select[1] == 'official_gyh_h' ){
                // console.log(bet);
                for(let i in bet[0] )
                {
                    num += _this.gyhe( _this.list_display['official_gyh']['official_gyh_h']['data'][bet[0][i]] );
                }
                num *= 2;
            }else{
                if(_this.select[1] == 'official_cqe_fs' || _this.select[1] == 'official_cqs_fs'){
                    num = _this.combination(_this.bet);
                }else if((_this.select[1] == 'official_cqe_ds' || _this.select[1] == 'official_cqs_ds')&&_this.contentS!='' ){
                    num = _this.combination(_this.contentS);
                }else{
                    for(let i in bet ){
                        num += _this.count(bet[i]);
                    }
                }
            }
            return num;
        },
        // 时间显示
        timedate(){
            let _this = this,list = [0,0,0];
            if(_this.now_expect != ''){
                let bit = _this.time;
                if( bit <= 0){
                    bit += parseInt(_this.desct);
                }
                if( bit > 0 ){
                    list[0] = parseInt(bit/3600);
                    list[1] = parseInt(bit/60); 
                    list[2] = bit%60;
                }
            }
            for(let i in list){
                if(list[i]<10){
                    list[i] = '0' + list[i];
                }
            }
            return list[0]+':'+list[1]+':'+list[2];
        },
    },
    methods: {
        //数组排列组合注数算法 不重复
        combination(arr) {
          let _this = this,sarr = [[]];
          let result = [];

            if(_this.select[1] == 'official_cqe_fs' && Object.keys(arr).length != 2){
                return 0;
            }else if(_this.select[1] == 'official_cqs_fs' && Object.keys(arr).length != 3){
                return 0;
            }
          for(let i in arr) {
            var tarr = [];
            for (let j = 0; j < sarr.length; j++){
              for (let k = 0; k < arr[i].length; k++){
                if(sarr[j].indexOf(arr[i][k]) == -1){
                    tarr.push(sarr[j].concat(arr[i][k]));
                }
              }
            }
            sarr = tarr;
          }
          return sarr.length
        },
        test(){
            console.log(this.combination(this.bet));
        },
        //随机取出一个值
        randsi(arr = []){
            // console.log(arr);
            let index = Math.floor((Math.random()*arr.length)); 
            return [parseInt(arr[index])];
        },
        //清除注单
        removeLi(key){
            this.bet_list.splice(this.bet_list.indexOf(key), 1);
        },
        RSBG(){
            let _this = this;
            if(_this.bet_list.length >= 10){
                _this.$total({ message:'注单上限！',type: 2 });
                return false;
            }else if(!_this.$store.state.login){ 
                _this.$total({ message:'请先登录!',type: 2 }); 
                return false;
            }
            _this.randomSelect();
            _this.betGO();
        },
        //机选功能
        randomSelect(){
            let _this = this,add = {},arr = [],len=1;
            _this.bet = {};
            if(!_this.$store.state.login){ this.$total({ message:'请先登录!',type: 2 }); return false;}
            if(_this.select[0] == 'official_cqs'){
                len = 3;
            }else if(_this.select[0] == 'official_cqe'){
                len = 2;
            }
            //加入可选择内容
            if(_this.select[1] == 'official_cqs_ds' || _this.select[1] == 'official_cqe_ds'){
                arr = [0,1,2,3,4,5,6,7,8,9];
            }else{
                for(let i in _this.list_display[_this.select[0]][_this.select[1]]['data']){               
                    arr[i] = parseInt(i);
                }
            }
            // console.log(_this.select[1]);return;
            if( _this.select[0] == 'official_dwd' ){
                add[ _this.randsi([0,1,2,3,4,5,6,7,8,9]) ] = _this.randsi(arr);
            }else{
                for(let i = 0 ;i<len;i++){
                    add[i] = _this.randsi(arr);
                    arr.splice( arr.indexOf(add[i][0]), 1);
                }
            }
            if(_this.select[1] == 'official_cqs_ds' || _this.select[1] == 'official_cqe_ds'){
                let str = '',bit = _this.list_display['official_cqs']['official_cqs_fs']['data'],n=0;
                for(let i in add){
                    n = bit[add[i][0]];
                    str += (n < 10 ? ('0' + n) : n) + '';
                    str += ',';
                }
               str = str.substring(0,str.length-1);
                _this.content = str;
            }else{
                _this.$set(_this,'bet',add);
            }
        },
        //添加进订单
        betGO(){
            let _this = this;
            // console.log("每一注的金额：" +_this.moneyActual);
            // console.log(_this.betNum);
            // console.log(_this.allBS['bet']);
            // console.log(_this.$store.state.user['money']);
            if(!_this.$store.state.login){ 
                this.$total({ message:'请先登录!',type: 2 }); 
                return false;
            }else if(parseFloat(_this.allBS['bet']) + parseFloat(_this.moneyActual) > parseFloat(_this.$store.state.user['money'])){
                this.$total({ message:'金额不足!',type: 2 }); 
                return false;
            }
            _this.all_list_bet = true;
            _this.bet_ok = false;
            if(_this.betNum <= 0){
                _this.$total({ message:'请选择(输入)投注内容',type: 2 });
                return;
            }

//key1:'official_dwd',key2:'official_dwd_fs',content:[[0,1,2,3],[0,1,2,3]],single:10,odds:1,num:1
            _this.bet_list.unshift(
                {
                    'key1':_this.select[0],
                    'key2':_this.select[1],
                    'content':_this.changeCode(),
                    'single':_this.moneyBet,   //这里是每一注的金额
                    'odds':_this.list_data[_this.select[0]]['items'][_this.select[1]]['odds'],
                    'num':_this.betNum
                }
            );
         _this.nav(_this.select[0],_this.select[1]);
        },
        //注单发送
        betOn(){
            let _this = this;
            // console.log(123);
            // console.log( _this.bet_list );
            let form = {
                'data': JSON.stringify(_this.bet_list),
                'expect':_this.now_expect,
                'official':1,
                'type': _this.$route.params.id
            };
            if(_this.time<=0){
                _this.$total({ message:'已封盘！',type: 2 });
                return false;
            }else if(_this.bet_list.length == 0){
                _this.$total({ message:'没有投注数据！',type: 2 });
                return false;
            }
            _this.$getData({
                loading:true,
                url:'/api/home/lottery_pk10/officialBetting',
                data:form,
                callback:function(res){
                    _this.bet_list = [];
                    _this.all_list_bet = false;
                    if(res.code == 1){
                        _this.$total({ message:'投注成功！',type: 1 });
                    }else{
                        _this.$total({ message:res.msg,type: 2 });
                    }
                }
            });
        },
        //判断数组是否有重复
        isRepeat(arr){
            let  hash = {};
            for(let i in arr) {
                if(hash[arr[i]]) {
                    return true;
        　　     }
                hash[arr[i]] = true;
            }
            return false;
        }, 
        //注单code转换
        changeCode(){
            let _this = this,bet,k0 = _this.select[0],k1 = _this.select[1];
            if(_this.select[1] == 'official_cqs_ds' || _this.select[1] == 'official_cqe_ds'){
                //手写注单
                bet = JSON.parse(JSON.stringify(_this.contentS));
                k0 = 'official_cqs';
                k1 = 'official_cqs_fs';
            }else{
                //选择注单
                bet = JSON.parse(JSON.stringify(_this.bet));
            }
            // console.log(_this.bet);
            if(_this.select[1] == 'official_gyh_dxds' || _this.select[0] == 'official_lhd' ){
                return bet;
            }else{
                // console.log(bet);return;
                for(let i in bet ){
                    for(let j in bet[i]){
                        bet[i][j] = _this.list_display[k0][k1]['data'][bet[i][j]];
                    }
                }
                if(_this.select[0] == 'official_dwd'){
                    for(let i=0 ;i<10;i++){
                        if(!bet[i]){
                            bet[i] = [];
                        }
                    }
                }
                return bet;
            }
        },
        //清除按钮
        clear(){
            this.bet = {};
            this.money = 1;
            this.content = '';
        },
        //球冠亚和
        gyhe(type){
            let a = [1,2,3,4,5,6,7,8,9,10],num = 0;
            let rs = this.strand(a,2);
            for(let i in rs){
                if( type == (rs[i][0] + rs[i][1]) ){
                    num += 1;
                }
            }
            return num;
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
       //顶部选卡切换
       nav(k1,k2){
           let _this = this;
           _this.select[0] = k1;
           _this.select[1] = k2;
           _this.$store.state.offopen = false;
           _this.$store.state.offtxt = _this.list_data[k1]['name'];
           _this.bet_ok = false;
           _this.money = 1;
           _this.bet = {};
           _this.content = '';
       },
       //快选
       betKX(key1,type){
           let _this = this;
           let arr = _this.list_display[_this.select[0]][_this.select[1]]['data'],list = JSON.parse(JSON.stringify(_this.bet));

           list[key1] = [];
           _this.$set(_this,'bet',list);
           for( let i in arr){
               i = parseInt(i);
               if(type == 'all'){
                   _this.checkIng(key1,i);
               }else if(type == 'big' && arr[i] > 5){
                   _this.checkIng(key1,i);
               }else if(type == 'small' && arr[i] <= 5){
                   _this.checkIng(key1,i);
               }else if(type == 'single' && arr[i]%2 == 1){
                   _this.checkIng(key1,i);
               }else if(type == 'double' && arr[i]%2 == 0){
                   _this.checkIng(key1,i);
               }
           }
       },

       //选择投注 key1 
       checkIng(key1,key2){
           let _this = this;
           let list = JSON.parse(JSON.stringify(_this.bet));
        //    console.log(list[key1].indexOf([key2]));
           if(list[key1] && list[key1].indexOf(key2) > -1 ){
               list[key1].splice(list[key1].indexOf(key2), 1);
               if(!_this.count(list[key1])){
                   delete list[key1];
               }
           }else{
               if(!list[key1]){
                   list[key1] = [];
               }
               list[key1].push(key2);
            //    if(_this.select[1] == 'official_cqe_fs' || _this.select[1] == 'official_cqs_fs'){
            //        for(let j in list){
            //            if(key1 != j){
            //                if( list[j].indexOf(key2) > -1 ){
            //                     list[j].splice(list[j].indexOf(key2), 1);
            //                     if(!_this.count(list[j])){
            //                         delete list[j];
            //                     }
            //                }
            //            }
            //        }
            //    }
           }

        //    console.log(list);
           _this.$set(_this,'bet',list);
       },
       count(o){
            var t = typeof o;
            if(t == 'string'){
                return o.length;
            }else if(t == 'object'){
                var n = 0;
                for(var i in o){
                n++;
            }
                return n;
            }
            return false;
       },
       getInfo(got){
           let _this = this;
           if(_this.data_post == 1){return;}
           _this.data_post = 1;
           _this.$getData({
               url:'/api/home/lottery/getInfo',
               //gf:是否是官方  number:需要几期号码
               data:{type:_this.$route.params.id,official:1},
               callback:function(res){
                //  console.log(123);
                   _this.data_post = 0;
                   if(res.code == 1){
                    _this.desct = res.data.desc;
                    _this.time = res.data.number;
                    _this.now_expect = res.data.expect;
                    if(res.data.history['content'].length > 1){
                        res.data.history['content'] = res.data.history['content'].split(',');
                    }
                    // console.log(res.data.history['content']);
                    _this.$set(_this,'history',res.data.history); //查询最新十期
                    //初始化使用开始倒计时
                    if(got == 'start'){
                        _this.$store.state.title = '官方-'+res.data.name;
                        _this.$set(_this,'list_data',res.data.basic);
                        _this.descTime();
                        _this.$store.state.offtxt = _this.list_data[_this.select[0]]['name'];
                    }
                   }else{

                   }
               }
           });
       },
       descTime(){
           let _this = this;
           if(!_this.lunxun){return;}
           _this.time -= 1;
           setTimeout(function(){
               if(_this.time <= (_this.desct*-1)){ //倒计时结束 调用
                   _this.getInfo();
               }
               if((_this.history['content'] == 0 || _this.history['content'] == '') && _this.time%3 == 0 && _this.data_post == 0){
                   _this.getInfo();
               }
               _this.descTime();
           },1000);
       } 
    },
    watch: {
      $route(){
        this.getInfo('start');
      },
      money(){
        if(this.money <= 0){
            this.money = 0;
        }else if(this.money > 1000000){
            this.money = 1000000;
        }else{
            this.money = parseInt(this.money);
        }
      }
    }
  }
</script>

<style scoped>
.lottery-status-wrapper{
    border:none;
}
.current-lottery-official {
    float: left;
    width: 40%;
    text-align: center;
    position: relative;
    min-height: 4.5625rem;
}
.current-lottery-official.pk10 {
    float: none;
    position: absolute;
    right: 0;
    top: auto;
    bottom: 0;
}
.lottery-wrapper-official {
    background: #226d4b;
    border-bottom: none;
    color: #cae2d0;
    min-height: 4.5625rem;
}
.lottery-wrapper-official.pk10 {
    background: #113a70;
    background-size: auto 100%;
    color: #fff;
}
.game-record-switch .icon:before {
    transform: rotate(0deg);
}
.prev-lottery-balls .lottery-ball:last-child {
    margin-right: 0;
}
.playing-methods-box.pk10:before {
    background:none;
}
.is-hide-toolbar .betting-bar {
    bottom: .8125rem;
}
.betting-bar {
    position: fixed;
    bottom: 4.3125rem;
    /* left: 0; */
    z-index: 5;
    width: 100%;
    min-width: 320px;
    background: #fff;
    color: #d10027;
    padding: .5rem .625rem;
    font-size: .875rem;
    text-align: center;
    transition: bottom .2s ease;
}
.kd-button--official {
    width: auto;
    font-size: .875rem;
    padding: .4rem .75rem;
    background: #01727b;
    color: inherit;
    box-shadow: none;
    -webkit-box-shadow: none;
    border: none;
}
.betting-bar.cqssc .kd-button--random, .betting-bar.pk10 .kd-button--random, .betting-bar.sd115 .kd-button--random {
    background: #2394fb;
}
.betting-bar .kd-button--clear, .betting-bar .kd-button--random {
    color: #fff;
}
.betting-bar .kd-button--add-to-cart, .betting-bar .kd-button--cart {
    color: #f7ce47;
    left: auto;
    right: .625rem;
}
.kd-button--official.btn-red {
    background: #db1233;
}
.prev-lottery-balls-official>li {
       margin-left: 0.1rem;
}
.playing-methods-official.cqssc, .playing-methods-official.pk10, .playing-methods-official.sd115 {
    background: #f6f5df;
    color: #000;
}
.playing-methods-official {
    position: fixed;
    top: 3.0625rem;
    left: 0;
    width: 100%;
    min-width: 320px;
    bottom: 0;
    background: #2c7e58;
    z-index: 6;
    list-style: none;
    padding: .5rem 0 0;
    color: #cae2d0;
    height: auto;
}
.playing-methods {
    overflow: auto;
    height: 100%;
}
.playing-methods__group {
    margin-bottom: .3125rem;
}
.playing-methods-official li:first-child .item {
    border-top-width: 1px;
}
.playing-methods-official__item .item {
    padding: .5rem .25rem;
}
.playing-methods__group-name .item {
    border: none;
    text-align: left;
}
.playing-methods .item:before{
    content:normal;
}
.promptbox-wrapper{
    position: inherit;
}
.pcs-row {
    border-top: .125rem solid #eee;
    padding: .625rem;
}
.kd-button--official {
    width: auto;
    font-size: .875rem;
    padding: .4rem .75rem;
    background: #01727b;
    color: inherit;
    box-shadow: none;
    -webkit-box-shadow: none;
    border: none;
}
.kd-button--official.btn-orange {
    color: #fff;
    background: orange;
}
.pcs-box .kd-button {
    width: 36%;
}
.kd-button>button, .kd-button>input, .kd-cover-hidden, .kd-select>select {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border: none;
    background: #fff;
    opacity: 0;
}
.pcs-box .kd-button--confirm, .pcs-box .kd-button--submit {
    float: right;
}
.pcs-box .kd-button {
    width: 36%;
}
.kd-button--official.btn-red {
    color: #fff;
    background: #db1233;
}
.betting-bar .kd-button--add-to-cart:before, .betting-bar .kd-button--cart:before {
    content: attr(data-number);
    position: absolute;
    right: 0;
    top: 0;
    background: #fff;
    height: 16px;
    height: 1rem;
    min-width: 16px;
    min-width: 1rem;
    font-size: 8px;
    font-size: .5rem;
    text-align: center;
    line-height: 14px;
    line-height: .875rem;
    color: #000;
    border-radius: 50%;
    margin: -5px -5px 0 0;
    margin: -.3125rem -.3125rem 0 0;
    box-shadow: 1px -1px 0 rgba(0,0,0,.15);
}

.pcb-list-item {
    background: #fff;
    padding: .25rem .625rem .25rem 3rem;
    position: relative;
    font-size: .875rem;
    line-height: 1.5;
    border-top: 1px dashed #e5e5e5;
}
.pcb-list-item__product {
    word-wrap: break-word;
    word-break: break-all;
}
.pcb-list-item__first {
    border-top: none;
    border-radius: .25rem .25rem 0 0;
    padding: .25rem .625rem .25rem 0rem;
}
.pcb-head.pk10{
    background: none;
}
</style>
