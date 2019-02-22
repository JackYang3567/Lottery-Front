<template>
    <div class="brnn">
        <!--拖拽-->
        <div
                @mousedown="down($event)" @touchstart="down($event)"
                @mousemove="move($event)" @touchmove="move($event)"
                @mouseup="end($event)" @touchend="end($event)"
                id='move_div'
                :style="{'left':position['x'],'top':position['y'],'backgroundColor':$store.state.basic.main_color}"
                draggable="true" >
            投注
        </div>
        <div class="roomHead">
            <div class="roomHead1">
                <ul>
                    <li class="roomLi">
                        <p>距离 <em id="issue">{{ desc['code'] }}</em> 期{{ desc['msg'] }}</p>
                        <p><span class="icoTime">{{ desc['num'] }}</span></p>
                        <div class="line"></div>
                    </li>
                    <li>
                        <p>第 <em id="issue" >{{ open_msg['code'] }}</em> 期</p>
                        <p><span class="icoTime" style="font-size:.9rem;">{{ open_msg['msg'] }}</span></p>
                        <div class="line"></div>
                    </li>
                </ul>
            </div>
            <!--扑克牌喜显示-->
            <div data-v-4cc9221d="" id="lotHistory" style="height: 44px;background-color: #f1f1f1">
                <div data-v-4cc9221d="" class="lottRstPanel1 lottRstPanelShaiBao" style="height: 35px;">
                    <div data-v-4cc9221d="" class="lottRstBox  vux-1px-b sbRstBox" style="height: 57px;">
                        <div data-v-4cc9221d="" style="margin-top: 15px;">
                            第
                            <span data-v-4cc9221d="" class="blueText">{{ open_msg['code'] }}</span>
                            期
                        </div>
                        <div v-if="lottery.length && kj == 0" data-v-4cc9221d="" id="lottRst" class="diceList" style="height: 30px;margin-top: 5px;margin-left: 4%;">
                            <span data-v-4cc9221d="" :class="'dice dice'+vo" v-for="vo in lottery[0]['num']['haoma']"></span>
                        </div>
                        <div v-else data-v-4cc9221d="" id="lottRst" class="diceList" style="height: 30px;margin-top: 5px;margin-left: 4%;">
                            <span data-v-4cc9221d="" :class="'dice dice'+vo" v-for="vo in arrtai"></span>
                        </div>
                        <span v-if="lottery.length && kj != 0" class="blueText blueTextSsc" style="margin-top: 15px;margin-right: 5%;">（??,??,??）</span>
                        <span v-if="lottery.length && kj == 0" class="blueText blueTextSsc" style="margin-top: 15px;margin-right: 5%;">({{lottery[0]['num']['tai']}})</span>
                        <div @click="lottery_num = !lottery_num" :class="['dropDown ', (lottery_num ? 'dropDowns': 'dropDown')]"  style="margin-top: 10px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--开奖结果-->
        <div data-v-65abdad2="" :class="'lottery lottery_lhc '+(lottery_num ? 'block':'none')" >
            <dl data-v-65abdad2="" :class="'lottery-show '+(lottery_num ? 'block':'none')" style="overflow: hidden; ">
                <dt data-v-65abdad2=""></dt>
                <dd data-v-65abdad2="">
                    <ul data-v-65abdad2="" style="max-height: 400px; overflow-x: scroll;">
                        <li data-v-65abdad2="" v-for="item in lottery">
                            <div data-v-65abdad2="">第
                                <span data-v-65abdad2="" class="issueStyle">{{item.expect}}</span>期
                            </div>
                            <div data-v-65abdad2="" class="rstPanel">
                                <span :class="'dice dice' + vo" v-for="vo in item['num']['haoma']"></span>
                            </div>
                            <div data-v-65abdad2="" style="width: 80px;">({{item['num']['tai']}})</div>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
        <!--<div class="lottery lottery_lhc" style="display: block;" v-show="lottery_num && lottery.length">
            <dl class="lottery-show" style="overflow: hidden; display: block;">
                <dd>
                    <ul style="max-height: 400px;overflow-x: scroll;">
                        <li v-for="item in lottery">
                            <div>第<span class="issueStyle">{{item.expect}}</span>期</div>
                            <div class="rstPanel">
                                <div :class="'poker'+vo[0]+'_'+(parseInt(vo[1])+1)" v-for="vo in (item['num'][0]['win'] == 1? item['num'][0]['code'] : item['num'][1]['code'] )"></div>
                                &lt;!&ndash; <div class="poker8_4"></div>
                                <div class="poker7_1"></div>
                                <div class="poker2_4"></div>
                                <div class="poker11_4"></div> &ndash;&gt;
                            </div>
                            <div>({{item['num'][0]['win'] == 1? ('蓝方胜,'+item['num'][0]['type']) :('红方胜,'+item['num'][1]['type']) }})</div>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>-->
        <!--开奖结果完-->
        <!--桌面-->
        <div :class="['room','room_drop1',{'room_drop2':!$store.state.up}]" 	id="wrapper" style="top:156px">
            <template v-for="(item,key) in desktop" v-if="desktop.length">
                <!--消息提示-->
                <div class="roomContent" id="scroller" v-if="item.type==3">
                    <div class="userBetting2">
                        <ul class="welcome">
                            <li style="font-size: 12px;">
                                <pre>{{item.msg1}} <i class="level-1"></i>{{item.msg2}}{{item.msg3}}</pre>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--用户投注显示-->
                <div class="userBetting" v-else-if="item.type==1">
                    <dl class="left">
                        <dt>
                            <!-- <img class="pcdd-avatar" src=""> -->
                            <span class="pcdd-avatar pcdd-avatar-span" v-if="item.photo == 0"></span>
                            <img style="border-radius:50%;"  :src="require('@/assets/images/photo/'+ item.photo +'.png')" v-else />
                        </dt>
                        <dd @click="bet_gen = true;sel_gen=key"><h3 style="text-align: left"><b>{{item.name}}</b><i class="level-7"></i></h3>
                            <div class="bet-con">
                                <div class="issueCon"><em></em><span>{{item.expect}}期</span></div>
                                <p order-no="undefined"><label>投注类型:</label>
                                    <span class="oddWayTitle">{{item.code}}</span>
                                    <label class="r">&nbsp;金额:<em>{{item.money}}</em><i class="iconMoney"></i></label>
                                </p>
                                <i class="mask"></i>
                            </div>
                            <span class="timeRecord">{{item.time}}</span>
                        </dd>
                    </dl>
                </div>
                <!--个人投注显示-->
                <div class="userBetting" v-else>
                    <dl class="right">
                        <dt>
                            <!-- <img src="/up_files/room/avatar.png"> -->
                            <span class="pcdd-avatar pcdd-avatar-span" v-if="item.photo == 0"></span>
                            <img style="border-radius:50%;"  :src="require('@/assets/images/photo/'+ item.photo +'.png')" v-else />
                        </dt>
                        <dd @click="bet_gen = true;sel_gen = key">
                            <h3 style="text-align: right"><b>{{item.name}}</b>
                                <!-- <i class="level-1"></i> -->
                            </h3>
                            <div class="bet-con-self" >
                                <div class="issueCon"><em></em><span>{{item.expect}}期</span></div>
                                <p>
                                    <label>投注类型:</label>
                                    <span class="oddWayTitle">{{item.code}}</span>
                                    <label class="r">&nbsp;金额:<em>{{item.money}}</em><i class="iconMoney"></i></label>
                                </p><i class="mask"></i>
                            </div>
                            <span class="timeRecord">{{item.time}}</span>
                        </dd>
                    </dl>
                </div>
            </template>
        </div>
        <!--桌面完-->
        <!--底部投注-->
        <!-- <div :class="['customNews','roomNews',{'room_up':!$store.state.up}]"> -->
        <!-- <em class="bgCol" id="bettingBtu" style="" @click="show_bet = true">点击投注</em> -->
        <!-- <em class="bgCol keyboard" style="display: none">取消</em>
        <em id="chaseNumber_pkxy" class="bgCol2">追号</em> -->
        <!-- <div class="textArea">
					<div>
				  </div>
				</div> -->
        <!-- <button id="speak">发送</button> -->
        <!-- </div> -->
        <!--底部投注完-->
        <!--弹出注单-->
        <div class="betWarp betting" style="display: block;"  v-if="show_bet && Object.keys(bet_list).length">

            <div class="close_bet_class" @click="show_bet = false"></div>
            <!-- <img src=""/> -->
            <div class="betCon" style="top: 197px;">
                <div class="betLeftNav" style="padding-bottom: 40px;">
                    <ul>
                        <li @click="sel1 = key"  :class="[sel1 == key ? 'active' : '']" v-for="(item,key) in arr1">{{item}}</li>
                    </ul>
                </div>
                <div class="betRight" style="padding-bottom: 40px;">
                    <h4 id="betTitle">{{arr1[sel1]}}</h4>
                    <select id="selectPanel1" v-model="sel2" v-if="sel1 == 'sz' || sel1 == 'sm'">
                        <option value="yi">第一骰</option>
                        <option value="er">第二骰</option>
                        <option value="san">第三骰</option>
                    </select>
                    <p class="desc"></p>
                    <div class="data-con" v-if="sel1 == 'sz'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">
                                <!--<span>{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                <span class="peilv1">{{item.odds}}</span>-->
                                <span class="dice" :class="'dice'+ item.name">
									<span v-if="sel1 == 'dz'">{{arr3[item.name]?arr3[item.name]:item.name}}</span>
							</span>
                                <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span class="dice" :class="'dice'+ item.name">
                                        <span v-if="sel1 == 'dz'">{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->
                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'sm'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">
                            <span  class="dice" :class="'dice'+ item.name">
								<span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
							</span>
                                <span class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span  class="dice" :class="'dice'+ item.name">
                                        <span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->
                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'zh'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">
                                <span>{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                <span class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" style="width: 47%" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span class="dice">
                                        <span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->
                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'dz'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">

							<span class="dice-wrap" v-if="key == key1" v-for=" (is,key1) in {'code_1':1,'code_2':2,'code_3':3,'code_4':4,'code_5':5,'code_6':6,}">
								<!--{{arr3[item.name]?arr3[item.name]:item.name}}-->

								<i class="dice" :class="'dice'+is" style="float: left"></i>
								<i class="dice" :class="'dice'+is" style="float: left"></i>
							</span>
                                <span class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" style="width: 47%" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span class="dice">
                                        <span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->

                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'ws'">
                        <div class="checkPanel1" style="width: 100%">
                            <div  @click="betData(key)" v-if="key != 'code_7' && zelist == 'ws'"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]"  v-for="(item,key) in bet_list[zelist]['items']">
							<span class="dice-wrap" v-if="key == key1"   v-for=" (is,key1) in {'code_1':1,'code_2':2,'code_3':3,'code_4':4,'code_5':5,'code_6':6,}" style="height: 82px;display: block;width: 89px;">
								<!--{{arr3[item.name]?arr3[item.name]:item.name}}-->
								<i class="dice" :class="'dice'+is" style="float: left;margin-left: 20px"></i>
								<i class="dice" :class="'dice'+is" style="float: left"></i>
								<i class="dice" :class="'dice'+is" style="float: left"></i>
							</span>
                                <span class="peilv1" style="margin-top: -50px;">{{item.odds}}</span>
                            </div>
                            <div  style="width: 97%;height: 100%;" @click="betData(key)" v-if="key == 'code_7' && zelist == 'ws'"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])},]"  v-for="(item,key) in bet_list[zelist]['items']">
							<span class="dice-wrap" v-if="key == key1"  v-for=" (is,key1) in {'code_7':[1,2,3,4,5,6],}">
								<div style="width: 90%;height: 41%;">
									<div class="lli">
										<i class="dice" :class="'dice'+is[0]" style="float: left;margin-left: 20px;"></i>
										<i class="dice" :class="'dice'+is[0]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[0]" style="float: left"></i>
									</div>
									<div class="lli">
										<i class="dice" :class="'dice'+is[1]" style="float: left;margin-left: 20px; "></i>
										<i class="dice" :class="'dice'+is[1]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[1]" style="float: left"></i>
									</div>
									<div class="lli">
										<i class="dice" :class="'dice'+is[2]" style="float: left;margin-left: 20px;"></i>
										<i class="dice" :class="'dice'+is[2]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[2]" style="float: left"></i>
									</div>
									<div class="lli">
										<i class="dice" :class="'dice'+is[3]" style="float: left;margin-left: 20px;"></i>
										<i class="dice" :class="'dice'+is[3]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[3]" style="float: left"></i>
									</div>
									<div class="lli">
										<i class="dice" :class="'dice'+is[4]" style="float: left;margin-left: 20px;"></i>
										<i class="dice" :class="'dice'+is[4]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[4]" style="float: left"></i>
									</div>
									<div class="lli">
										<i class="dice" :class="'dice'+is[5]" style="float: left;margin-left: 20px;"></i>
										<i class="dice" :class="'dice'+is[5]" style="float: left"></i>
										<i class="dice" :class="'dice'+is[5]" style="float: left"></i>
									</div>
								</div>
							</span>
                                <span class="peilv1" style="margin-top: -50px;">{{item.odds}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'ds'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">
                            <span  class="dice" :class="'dice'+ item.name">
								<span v-if="sel1 == 'dz'">{{arr3[item.name]?arr3[item.name]:item.name}}</span>
							</span>
                                <span class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span  class="dice" :class="'dice'+ item.name">
                                        <span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->
                        </div>
                    </div>
                    <div class="data-con" v-if="sel1 == 'ss'">
                        <div class="checkPanel1" style="width: 100%">
                            <div @click="betData(key)"  :class="['tai',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']">
                            <span class="dice-wrap" v-if="key1==key"   v-for=" (is,key1) in {'code_1':[1,2],'code_2':[1,3],'code_3':[1,4],'code_4':[1,5],'code_5':[1,6],'code_6':[2,3],'code_7':[2,4],'code_8':[2,5],'code_9':[2,6],'code_10':[3,4],'code_11':[3,5],'code_12':[3,6],'code_13':[4,5],'code_14':[4,6],'code_15':[5,6],}">
								<!--{{arr3[item.name]?arr3[item.name]:item.name}}-->
								<i class="dice" :class="'dice'+is[0]" style="float: left"></i>
								<i class="dice" :class="'dice'+is[1]" style="float: left"></i>


							</span>

                                <span class="peilv1">{{item.odds}}</span>
                            </div>
                            <!--<div class="choosePanel" @click="betData(key)"  :class="['ckOdds1',{ckedOdds1:(zelist in betting) && (key in betting[zelist])}]" v-for="(item,key) in bet_list[zelist]['items']" >
                                <div class="vux-1px oddsBoxStyle1">
                                    <span  class="dice" :class="'dice'+ item.name">
                                        <span >{{arr3[item.name]?arr3[item.name]:item.name}}</span>
                                    </span>
                                    <span data-v-46c234fc="" data-v-aea93b82="" class="peilv1">{{item.odds}}</span>
                                </div>
                            </div>-->
                        </div>
                    </div>
                    <!-- <div class="odds-info oddsExplain"><span><i class="ico_peilv"></i>赔率说明</span></div> -->
                </div>
                <!--注单-->
            </div>
        </div>
        <!--弹出注单完-->
        <!--注单计算-->
        <div class="bettPanel" style="display: block;" v-show="show_bet && Object.keys(betting).length">
            <div class="bpTop">
                <button class="bet-min" @click="money = 10">最小投注</button>
                <p>已选<span class="zhuMany">{{betNum}}</span>注，共计<span class="moneyMany">{{betNum * money}}</span>元宝</p>
            </div>
            <div class="bpBottom">
                <div class="moneyInput"><input type="number" v-model="money" id="moneyInput1"></div>
                <div class="bpBtnPanel">
                    <button class="bettBtn" id="bettingBtn1" @click="betOn" >确认投注</button>
                    <button class="bettCancel" @click="betting={}">取消选择</button>
                </div>
            </div>
        </div>
        <!--注单结束完-->
        <!--筹码-->
        <div class="cmPanel" style="display: block;" v-show="show_bet && Object.keys(betting).length">
            <div :class="['ybBg'+key,{ckedYuanbao:money==item.value}]" @click="money=item.value" v-for="(item,key) in arr2">{{item.text}}</div>
            <div class="ybBg5" @click="money= ($store.state.user == false ? 0:$store.state.user.money) ">梭哈</div>
        </div>
        <!--筹码完-->
        <!--跟投-->
        <transition name="bounce2">
            <div class="popup" style="" v-if="bet_gen">
                <div class="config-confirm">
                    <h3>跟投</h3>
                    <div class="gentouCon">
                        <div class="gentou_player">
                            <label>玩家:</label>
                            <span>{{desktop[sel_gen]['name']}}</span>
                        </div>
                        <div class="gentou_issue">
                            <label>期数:</label>
                            <span>{{desktop[sel_gen]['expect']}}</span>
                        </div>
                        <div class="con">
                            <div class="con-l">类别:</div>
                            <div class="con-r">
                                <p>
                                    <span style="color: #d22727">{{desktop[sel_gen]['code']}}</span>
                                    <label class="configAcer" style="text-align: right;">
                                        <em>{{desktop[sel_gen]['money']}}</em>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="cigBtn" style="width: 97%;height: 40px;">
                        <button id="genTou" @click="betGen">确定</button>
                        <button class="cancel" @click="bet_gen = false">取消</button>
                    </div>
                </div>
            </div>
        </transition>
        <!--跟投完-->
    </div>
</template>

<script>
    // this.$parent.changeDonw();
    export default {
        name:'hlsb',
        mounted(){
            this.$store.state.title = "欢乐骰子";
            this.lunxun = 1;
            this.bet();
            this.postData();
            this.timeDesc();        //开启倒计时
            //是否是手机登录
            this.judgePhone();
            //悬浮球初始值
            this.qiuIn();

            // console.log(this.$store.state.user);
        },
        destroyed () { //组件销毁后调用
            this.lunxun = 0;
        },
        data(){
            return {
                styleObject: {
                    width: '97%',
                    height: '170px'
                },
                //页面拖动属性
                flags: 0,
                position: { x: 0, y: 0 },  //当前位置300 500
                nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
                //页面基础数据
                arr1:{
                    'sz':'猜数字',
                    'sm':'猜双面',
                    'zh':'猜总和',
                    'dz':'猜对子',
                    'ws':'猜围骰',
                    'ds':'猜单骰',
                    'ss':'猜双骰',
                },

                arr2:[
                    {text:'50',value:50},
                    {text:'100',value:100},
                    {text:'500',value:500},
                    {text:'1k',value:1000},
                    {text:'5k',value:5000},
                ],
                arr4:{
                    '1':'1',
                    '2':'2',
                    '3':'3',
                    '4':'4',
                    '5':'5',
                    '6':'6',
                },
                arr9:{
                    '1':'1',
                    '2':'2',
                    '3':'3',
                    '4':'4',
                    '5':'5',
                    '6':'6',
                },
                arr3:{
                    /*'1':'大',
                    '2':'小',
                    '3':'单',
                    '4':'双',
                    '5':'4',
                    '6':'5',*/
                },
                arrtai :['1','2','3'],
                arr12:{
                    /*'code_1':'1',
                    'code_2':'2',
                    'code_3':'3',
                    'code_4':'4',
                    'code_5':'5',
                    'code_6':'6',*/

                    '1':'1',
                    '2':'2',
                    '3':'3',
                    '4':'4',
                    '5':'5',
                    '6':'6',
                    '7':'code_7',

                },

                //判断是否是手机登录
                phone:false,
                //提示信息参数
                tip:{
                    expect_start:true,
                    expect_center:true,
                    expect_end:true,
                },
                //跟投窗口开关
                bet_gen:false,
                //选择跟投id
                sel_gen:0,
                //轮询
                lunxun:0,
                //投注赔率数据
                bet_list:{},
                //弹出注单
                show_bet:false,
                //查看历史开奖数据
                lottery_num:false,
                //投注数据
                betting:{},
                //选择类型
                sel1:'sz',
                //选择哪一张
                sel2:'yi',
                //每一注金额,
                money:0,
                //开奖数据(期号和时间)
                lottery:[],

                lottery_new:{expect:0,time:0},
                //封盘时间
                desc_time:0,
                //当前数据最大Id
                user_list:0,
                //开奖特效
                kj:0,
                //桌面显示数据
                desktop:[
                    /*{type:0,name:'张**',expect:'265489',code:'大',money:'500',time:'2018-03-17 14:04:01'},//其他用户信息
                    {type:2,name:'张**',expect:'265489',code:'小',money:'600',time:'2018-03-17 14:04:01'},//本人用户信息
                    {type:3,name:'李**'},//用户进入房间信息
                    {type:4,expect:'265490'},//截至封盘,开启信息*/
                ],
            }
        },
        computed:{
            open_msg(){//右侧开奖
                var msg = {};
                if(this.lottery_new['expect'] == 0){
                    msg['code'] = 0;
                    msg['msg'] = '暂停开奖';
                }else{
                    msg['code'] = String(this.lottery_new['expect'] - 1);
                    //msg['code'] = String(msg['code']);
                    if(msg['code'].length > 7){
                        msg['code'] = msg['code'].substr(msg['code'].length - 7);
                    }
                    if(!this.lottery.length || (this.lottery_new['expect'] - 1) !=  this.lottery[0]['expect']){
                        msg['msg'] = '正在开奖中....';

                    }else{
                        msg['msg'] = '已开奖';
                        // var code = this.lottery[0]['num'].split(',');
                        // var plus = parseInt(code[0])+parseInt(code[1])+parseInt(code[2]);
                        // msg['msg'] = code[0] + '+' +code[1]+ '+' +code[2] + '=' + plus + '(' + (plus < 14 ? '小' : '大') + ',' + (plus%2 ? '单' : '双') + ')';
                    }
                }
                return msg;
            },
            desc(){//左侧倒计时
                let msg = {};
                if(this.lottery_new['expect'] == 0){
                    msg['code'] = 0;
                    msg['msg'] = '开奖';
                    msg['num'] = '00分00秒';
                }else{
                    msg['code'] = String(this.lottery_new['expect']);
                    if(msg['code'].length > 7){
                        msg['code'] = msg['code'].substr(msg['code'].length - 7);
                    }
                    msg['num'] = this.lottery_new['time'];
                    if(msg['num'] < 0){
                        msg['num'] = parseInt(this.desc_time) + parseInt(msg['num']);
                        msg['msg'] = '开奖';
                    }else{
                        msg['msg'] = '截止';
                    }
                    if(msg['num'] <= 0){
                        msg['num'] = '00分00秒';
                    }else{
                        let i = parseInt(msg['num']/60),
                            s = parseInt(msg['num']%60);
                        msg['num'] = (i < 10 ? '0'+i : i) + '分'+(s < 10? '0'+s:s) + '秒';
                    }
                }
                return msg;
            },
            //注数计算
            betNum(){
                let _this = this,data = 0;
                if( Object.keys(_this.betting).length ){
                    for(let i in _this.betting){
                        for(let j in _this.betting[i]){
                            data += 1;
                        }
                    }
                }
                return data;
            },
            //计算key1
            zelist(){
                let _this = this,data;
                if(_this.sel1 == ''){
                    data = 'nn';
                }else if(_this.sel1 == 'sz' || _this.sel1 == 'sm'){
                    data = _this.sel1 + _this.sel2;
                }else{
                    data = _this.sel1;
                }
                return data;
            },
        },
        watch:{
            money(){
                if(this.money < 0){
                    this.money = 0;
                }else if(this.money > 1000000){
                    this.money = 1000000;
                }
            },
            desktop(){
                let _this = this;
                _this.$nextTick(()=>{//当dom发生变化，更新后执行的回调
                    _this.smooth();
            });
            }
        },
        methods:{
            //写个方法，不停的调用自身，改变一个值，
            kaijian(){//开奖特效\
                // return;
                //console.log(this.kj);
                if(this.kj == 0 || !this.lottery.length ){return};
                if(this.lottery[0]['expect'].toString().substr(4) == this.open_msg['code']){this.kj = 0;return;};
                let list = [],bit;
                for(let i=0;i<=2;i++){
                    bit = Math.round(Math.random()*6);
                    list[i] = (bit == 0 ? 1 : bit);
                }
                this.$set(this,'arrtai',list);
                setTimeout(() => {
                    this.kaijian();
            },200);
            },
            betGen(){//跟投
                let _this = this;
                if(_this.desktop[_this.sel_gen]['expect'] != _this.lottery_new['expect']){
                    _this.$total({ message:'只能跟投本期',type: 0 });
                    return false;
                }else if(_this.tip.expect_end == false){
                    _this.$total({ message:'本期已封盘，请期待下一期',type: 0 });
                    return false;
                }
                let data = _this.desktop[_this.sel_gen]['menu'];
                //console.log(_this.desktop[_this.sel_gen]);
                if(!data){return false;}
                data = data.split(',');
                let _money = _this.desktop[_this.sel_gen]['money'];
                //console.log(_this.desktop[_this.sel_gen]);
                let _betting = {};
                _betting[data[0]] = {};
                _betting[data[0]][data[1]] =  {"code":"","num":1};
                let _basic={
                    'zh':{
                        'expect_s':[_this.lottery_new['expect']],
                        'stop':false,
                    },
                    'hm':{
                        'open':'完全公开', //公开类型
                        'explain':'',     //合买宣言
                        'buy_money':0,    //自购
                        'bd':0,           //保底
                        'tc':'',          //中奖提成
                    },
                    'money':_money
                }
                // return;
                _this.$getData({
                    loading:true,
                    url:'/api/Home/Lottery_Brnn/betting',
                    type:'post',
                    data:{betting:JSON.stringify(_betting),basic:JSON.stringify(_basic),type:59},
                    callback:function(res){
                        if(res.code > 0){
                            _this.playMusic(1);
                            _this.$total({ type: 1,message:res.msg});
                            _this.bet_gen = false;
                            // _this.betting = {};
                            // _this.show_bet = false;
                        }else{
                            _this.$total({ type: 3,message:res.msg});
                        }
                    }
                });
            },
            qiuIn(){//球设置初始值方法
                this.position['y'] = (document.body.clientHeight - 120) + 'px';
                this.position['x'] = '80%'
            },
            judgePhone(){//判断是否手机登录
                let ua = navigator.userAgent;
                let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                    isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                    isMobile = isIphone || isAndroid;
                if(isMobile){
                    this.phone = true;
                }
            },
            down(val){//拖拽测试
                val.preventDefault();
                this.flags = 1;
            },
            move(val){
                if(this.phone == false || this.flags == 0){
                    return false;
                }else if(this.flags == 1){
                    this.flags = 2;
                }
                if(this.flags == 2){
                    var touch ;
                    if(event.touches){
                        touch = event.touches[0];
                    }else {
                        touch = event;
                    }

                    let wx = (touch.clientX - 25);
                    let hx = (touch.clientY - 25);

                    if(wx > (document.body.clientWidth - 25)){
                        wx = (document.body.clientWidth - 25);
                    }else if(wx < -25){
                        wx = -25;
                    }

                    if( hx > (document.body.clientHeight - 25) ){
                        hx = (document.body.clientHeight - 25);
                    }else if(hx < -25){
                        hx = -25;
                    }
                    this.position['x'] = wx +'px';
                    this.position['y'] = hx +'px';
                    // this.nx = touch.clientX - this.position.x - 25;
                    // this.ny = touch.clientY - this.position.y - 25;
                    // this.xPum = this.dx+this.nx;
                    // this.yPum = this.dy+this.ny;
                    // }
                    //   // 阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
                    //   document.addEventListener("touchmove",function(){
                    //       event.preventDefault();
                    //   },false);
                }
            },
            end(val){
                let _this = this;
                if(_this.flags == 1){
                    _this.show_bet = true;
                }else{
                    _this.flags = 0;
                }

            },
            playMusic(type){//声音预留
                let arr = [
                    'music_ball' , //选择注单
                    'music_bet'  ,  //成功发送注单
                    'music_chip' , //筹码
                    'music_start',  //开始投注
                    'music_close',  //封盘
                    'music_show' ,//开出新的一期
                ];
                this.$music(arr[type]);
            },
            smooth(){//滚动条平滑动作
                //总滚动距离
                // let a = document.getElementById("wrapper").scrollTop;
                let scrollTop = document.getElementById("wrapper").scrollTop;

                //公式 总滚动距离 - 滚动条长度 = 可滚动距离
                let range = document.getElementById("wrapper").scrollHeight - document.getElementById("wrapper").offsetHeight;
                // console.log(range);return;
                //如果 可滚动距离 - 滚动条位置 > 500
                if(range - document.getElementById("wrapper").scrollTop > 500){
                    document.getElementById("wrapper").scrollTop += 300;
                }else{
                    document.getElementById("wrapper").scrollTop += 10;
                }
                //如果无效 使用第二种方式下拉
                // if(scrollTop == document.getElementById("wrapper").scrollTop){
                //   range = document.body.scrollHeight - document.body.offsetHeight;
                //   if(range - document.body.scrollTop > 500){
                //     document.body.scrollTop += 300;
                //   }else{
                //     document.body.scrollTop += 10;
                //   }
                //   if(document.body.scrollTop < range){
                //     setTimeout(this.smooth,10);
                //   }
                // }else
                if(document.getElementById("wrapper").scrollTop < range){
                    setTimeout(this.smooth,10);
                }
            },
            timeDesc(){//这里是倒计时----------------
                let _this = this;
                _this.lottery_new.time--;
                if(_this.lottery_new.time > 60 && _this.tip.expect_start){//提示信息
                    _this.playMusic(3);
                    _this.desktop.push({
                        type:3,
                        msg1:'',
                        msg2:'【'+_this.lottery_new['expect']+'】期',
                        msg3:',请开始投注'});
                    _this.tip.expect_start = false;
                    _this.tip.expect_center = true;
                    _this.tip.expect_end = true;
                }else if(_this.lottery_new.time <= 60 && _this.lottery_new.time > 40 && _this.tip.expect_center){
                    _this.desktop.push({
                        type:3,
                        msg1:'',
                        msg2:'【'+_this.lottery_new['expect']+'】期',
                        msg3:',距封盘还有'+_this.lottery_new.time+'秒,请尽快下注'});
                    _this.tip.expect_center = false;
                }else if(_this.lottery_new.time < -1 && _this.tip.expect_end && _this.lottery_new['expect']!=0){
                    _this.playMusic(4);
                    _this.desktop.push({
                        type:3,
                        msg1:'',
                        msg2:'【'+_this.lottery_new['expect']+'】期',
                        msg3:'已封盘'});
                    _this.tip.expect_end = false;
                    _this.tip.expect_start = true;
                    if(_this.kj == 0){
                        _this.kj = 1;
                        //console.log(_this.kj);
                        _this.kaijian();
                    }
                }
                if(_this.lunxun == 1){
                    setTimeout(_this.timeDesc,1000); //倒计时
                }
            },
            betOn(){//注单发送
                let _this = this;
                if(!Object.keys(_this.betting).length){
                    _this.$total({ message:'请选择注单',type: 2 });
                    return false;
                }else if(_this.money <= 0){
                    _this.$total({ message:'请输入金额',type: 2 });
                    return false;
                }else if(_this.money < 10){
                    _this.$total({ message:'每注金额最低10元',type: 2 });
                    return false;
                }else if(_this.tip.expect_end == false){
                    _this.$total({ message:'已封盘',type: 2 });
                    return false;
                }
                let _basic={
                    'zh':{
                        'expect_s':[_this.lottery_new['expect']],
                        'stop':false,
                    },
                    'hm':{
                        'open':'完全公开', //公开类型
                        'explain':'',     //合买宣言
                        'buy_money':0,    //自购
                        'bd':0,           //保底
                        'tc':'',          //中奖提成
                    },
                    'money':_this.money
                }

                _this.$getData({
                    loading:true,
                    url:'/api/Home/Lottery_Brnn/betting',
                    type:'post',
                    data:{betting:JSON.stringify(_this.betting),basic:JSON.stringify(_basic),type:59},
                    callback:function(res){
                        //console.log(res);
                        if(res.code > 0){
                            _this.playMusic(1);
                            _this.$total({ type: 1,message:res.msg});
                            _this.betting = {};
                            _this.show_bet = false;
                        }else{
                            _this.$total({ type: 3,message:res.msg});
                        }
                    }
                });
                // console.log(123);
            },
            postData(){//轮询请求数据

                let _this = this;
                let _data = {
                    type: 59,
                    // level:0 //房间属性，暂时备用备用
                    number: _this.lottery.length ? _this.lottery[0]['expect'] : 0,                        //期号最后一个id
                    people: _this.user_list > 0 ? _this.user_list : 0,                                    //用户最后一个id
                    peoplet:_this.user_time > 0 ?  _this.user_time : 0,                                   //最后投注的时间
                    time: _this.lottery_new['time'] < -(_this.desc_time) ? 1 : 0,
                };
                _this.$getData({
                    url:'/api/home/Lottery28/getDatas',
                    data:_data,
                    type:'post',
                    callback:function(res){
                        if(res){
                            _this.lottery_new['expect'] = res.expect;
                            _this.lottery_new['time'] = res.time;
                            //console.log(res.time);
                            var codes = [];
                            if(res.number == ''){
                                _this.kj = 1;
                                //console.log(_this.kj);
                                _this.kaijian();
                            }
                            if(res.number != ''){ //开奖期号
                                if(_this.lottery.length){
                                    _this.playMusic(3);
                                }

//----------------------------------------------
                                _this.$set(_this,'lottery',res.number.concat(_this.lottery));
                                if(_this.kj == 0){
                                    _this.kj = 1;
                                    //console.log(_this.kj);
                                    _this.kaijian();
                                }
                                //console.log(res.number[0]['num']);
                            }
                            if(res.people != '' && res.expect!=0){//用户页面投注内容
                                _this.user_list = res.people[0]['list'];
                                //console.log(_this.user_list);
                                codes = res.people.reverse();
                                _this.$set(_this,'desktop',_this.desktop.concat(codes));
                                //alert(1);
                            }
                        }
                        if(_this.lunxun == 1){
                            setTimeout(_this.postData,4000);
                        }
                    },
                    errorCallback:function(){
                        if(_this.lunxun == 1){
                            setTimeout(_this.postData,8000);
                        }
                    }
                });

            },
            /*this.$route.params.id*/
            bet(){//页面数据  是否开启彩票
                var _this = this;
                _this.$getData({
                    loading:true,
                    url:'/api/Home/Lottery28/bet',
                    type: 'POST',
                    data: {type:this.$route.params.id},
                    callback: function(res){
                        //console.log(res);
                        if(res.code < 0){
                            _this.$total({ message:res.msg,type: 2 });
                            _this.$router.push('/');
                        }else{
                            _this.$set(_this,'bet_list',res.data);

                            _this.desc_time = res.desc;
                        }
                    },
                    errorCallback:function(){
                        _this.$total({ message:'彩票暂时关闭!请选择其他游戏',type: 2 });
                        _this.$router.push('/');
                    }
                });
            },
            betData(key2){//选择投注内容
                let _this = this;
                let key1 = _this.zelist,demo = JSON.parse(JSON.stringify(_this.betting));

               // console.log(_this.betting[key1]);
                //console.log(key2);
                if(key1 in demo){
                    if(key2 in demo[key1]){ //如果有就删除
                        delete demo[key1][key2];
                        if(!Object.keys(demo[key1]).length){
                            delete demo[key1];
                        }
                    }else{   //如果没有就添加
                        demo[key1][key2] = {"code":"","num":1};
                    }
                }else{
                    demo[key1] = {};
                    demo[key1][key2] = {"code":"","num":1};
                }
                _this.$set(_this,'betting',demo);
                _this.playMusic(0);
            },
        }
    }
</script>

<style scoped>
    /**/
    .lottRstPanel1[data-v-4cc9221d] {
        height: 1rem;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
    }
    .sbRstBox[data-v-4cc9221d] {
        padding: 0 .6rem;
    }
    .lottRstBox[data-v-4cc9221d] {
        display: -ms-flexbox;
        display: flex;
        padding: 0 1rem;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        font-size: .32rem;
        height: 100%;
        width: 100%;
    }
    .lottRstBox>div[data-v-4cc9221d] {
        font-size: .346667rem;
    }
    .dice[data-v-4cc9221d] {
        display: inline-block;
        width: 2.0rem;
        height: 2.0rem;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    }

    .diceList .dice[data-v-4cc9221d], .rstBox .dice[data-v-4cc9221d] {
        margin: 0 .08rem;
    }

    .blueTextSsc[data-v-4cc9221d] {
        font-size: .3rem;
    }
    .lottRstBox>div[data-v-4cc9221d] {
        font-size: .346667rem;
    }
    .dropDown {
        background: url(../../../../src/assets/images/hlsz/8.png)no-repeat;
        background-size: 100% 100%;
        width: 0.8rem;
        height: 0.8rem;
        transition: all 1s;
    }
    .code1{
        background: url(../../../../src/assets/images/hlsz/1.png)no-repeat;
    }
    .dropDowns {
        transform: rotate(180deg);
    }
    /**/
    .lli{
        width: 85px;
        height:80px;
        float: left;
        margin-right: 5px;
        margin-top: 5px;
    }
    .kki{
        width: 47%;
        margin-right: 3%;
        margin-top: 10px;
        height:90px;
        line-height: 30px;
        float: left;
        background: rgb(244, 244, 246);
        border-width: 1px;
        border-style: solid;
        border-color: rgb(202, 202, 202);
        border-image: initial;
        border-radius: 5px;
        padding: 2px 4px;
    }
    .checkPanel1 > ckOdds1[data-v-19aac9c6] {
        width: 47%;
        margin-right: 3%;
        margin-top: 10px;
        height:48px;
        line-height: 30px;
        float: left;
        background: rgb(244, 244, 246);
        border-width: 1px;
        border-style: solid;
        border-color: rgb(202, 202, 202);
        border-image: initial;
        border-radius: 5px;
        padding: 2px 4px;
    }

    /*投注样式*/
    i {
        font-style: normal;
    }

    .vux-1px:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        border: 1px solid #c7c7c7;
        color: #c7c7c7;
        height: 200%;
        transform-origin: left top;
        transform: scale(.5);
    }
    .oddsBoxStyle-dice-two .dice-wrap i[data-v-46c234fc]:first-child {
        margin: 0 auto;
        display: block;
    }
    .oddsBoxStyle-dice-two .dice-wrap[data-v-46c234fc] {
        height: 1.6rem;
        line-height: .8rem;
    }
    .oddsBoxStyle-dice-two.oddsBoxStyle-dice-three[data-v-46c234fc] {
        width: 100%;
        height: 4rem;
    }
    .oddsBoxStyle-dice-three>div[data-v-46c234fc] {
        width: 5.6rem;
        height: 3.6rem;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .oddsBoxStyle-dice-three .dice-wrap[data-v-46c234fc] {
        margin: .106667rem 0;
    }
    .oddsBoxStyle1 span[data-v-46c234fc]:first-child {
        font-size: .4rem;
    }
    .oddsBoxStyle1 .dice-wrap[data-v-46c234fc] {
        display: inline-block;
        width: 1.76rem;
        height: .8rem;
        line-height: .8rem;
    }
    .choosePanel {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        width: 90%;
    }
    .oddsBoxStyle1[data-v-46c234fc], .oddsBoxStyle2[data-v-46c234fc] {
        display: -ms-flexbox;
        display: flex;
        margin-top: .266667rem;
        background: #f4f4f6;
        -ms-flex-align: center;
        align-items: center;
    }
    .vux-1px, .vux-1px-b, .vux-1px-l, .vux-1px-r, .vux-1px-t, .vux-1px-tb {
        position: relative;
    }
    .oddsBoxStyle1[data-v-46c234fc] {
        padding: 0 .3467rem;
        width: 3.44rem;
        height: 1.066667rem;
        -ms-flex-pack: justify;
        justify-content: space-between;
        line-height: 1.066667rem;
    }
    .vux-1px, .vux-1px-b, .vux-1px-l, .vux-1px-r, .vux-1px-t, .vux-1px-tb {
        position: relative;
    }
    .choosePanel[data-v-46c234fc] {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .tai{
        width: 97%;
        height: 168px;
        background: #F4F4F6;
        border: 1px solid #CACACA;
        margin-right: 3%;
        margin-top: 10px;
        border-radius: 5px;
        line-height: 30px;
        padding: 2px 4px;
        float: left;
    }
    .dice {
        display: inline-block;
        width: 2.6rem;
        height: 2.6rem;
        line-height: .8rem;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    }
    .oddsBoxStyle1[data-v-46c234fc]:before, .oddsBoxStyle2[data-v-46c234fc]:before {
        border-radius: .2133rem;
    }
    .vux-1px:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        /*border: 1px solid #c7c7c7;*/
        color: #c7c7c7;
        height: 100%;
        transform-origin: left top;
        transform: scale(.5);
    }
    .oddsBoxStyle1 span[data-v-46c234fc]:first-child {
        font-size: .4rem;
        margin-top: 4px;
    }

    .oddsBoxStyle1[data-v-46c234fc] {
        padding: 0 .3467rem;
        width: 3.44rem;
        height: 1.066667rem;
        -ms-flex-pack: justify;
        justify-content: space-between;
        line-height: 1.066667rem;
    }
    /*投注样式*/
    .choosePanel {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .dice1{
        background-image: url(../../../../src/assets/images/hlsz/1.png);
    }
    .dice2{
        background-image: url(../../../../src/assets/images/hlsz/2.png);
    }
    .dice3{
        background-image: url(../../../../src/assets/images/hlsz/3.png);
    }
    .dice4{
        background-image: url(../../../../src/assets/images/hlsz/4.png);
    }
    .dice5{
        background-image: url(../../../../src/assets/images/hlsz/5.png);
    }
    .dice6{
        background-image: url(../../../../src/assets/images/hlsz/6.png);
    }
    #move_div{
        z-index:6;
        position:absolute;
        height:50px;
        width:50px;
        text-align:center;
        line-height: 50px;
        font-weight:bold ;
        font-size:16px;
        background-color:black;
        border-radius:50%;
        color:#fff;
        border:1px solid #fff;
        /* top:60%;
        left:90%; */
    }
    .brnn {
        font-size: 12px;
    }

    body, div, ol, dl, dt, dd, ul, li, table, tr, td, h1, h2, h3, h4, h5, h6, p, form, input, button, img, strong, em {
        padding: 0px;
        margin: 0px;
        border: 0px;
        font-style: normal;
        box-sizing: border-box;
    }
    .roomHead {
        background: #fff;
        height: 108px;
        position: absolute;
        top: 42px;
        left: 0;
        z-index: 3;
        width: 100%;
    }
    .roomHead1 {
        overflow: hidden;
        /* border-bottom: 1px solid #cfcfcf; */
    }
    ol, ul, dl {
        list-style: none;
    }
    /*投注显示部分*/
    .room {
        transition: bottom 0.3s;
        overflow: auto;
        position: absolute;
        top: 151px;
        bottom: 14px;
        left: 0;
        right: 0;
        padding: 15px;
        z-index: 3;
        background: #F2F2F2;
    }

    .userBetting{
        margin-bottom: 15px;
        overflow: hidden;
    }
    .userBetting2 {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }
    .userBetting2 ul.system {
        display: inline-block;
        width: 220px;
        min-height: 25px;
        line-height: 25px;
        font-size: 12px;
        color: #48484c;
        border-radius: 6px;
        background-color: #d6d6d6;
    }
    .userBetting dt {
        margin-top: 10px;
    }
    .userBetting dd {
        background: #f2f2f2;
    }
    .userBetting dd {
        min-width: 225px;
        min-height: 50px;
        padding-bottom: 10px;
        float: left;
        margin-left: 9px;
        border-radius: 4px;
        text-align: center;
        padding-top: 4px;
        line-height: 22px;
        position: relative;
    }
    .userBetting h3 {
        text-align: center;
        padding: 5px 0;
        line-height: 22px;
        font-size: 12px;
        font-weight: normal;
        overflow: hidden;
    }
    .userBetting h3 b {
        vertical-align: middle;
        font-weight: normal;
    }
    h3 i.level-2 {
        background: url(/up_files/honor/slevel02.png) no-repeat center;
    }
    .userBetting dd .bet-con div.issueCon {
        position: relative;
        color: #6e6e6e;
        line-height: 30px;
        width: 100%;
        padding: 0 9px;
        text-align: left;
    }
    .userBetting dd .bet-con div.issueCon em {
        display: inline-block;
        margin-right: 7px;
        width: 16px;
        height: 16px;
        background: url(~@/assets/images/brnn/clock_icon_black@2x.png) no-repeat center;
        background-size: 16px 16px;
    }
    .userBetting .left dd .bet-con:after {
        position: absolute;
        width: 0;
        height: 0;
        content: "";
        border: 5px solid transparent;
        top: 15px;
        margin-top: -5px;
        left: -10px;
        border-right: 5px solid #fff;
    }
    .userBetting dd .bet-con p:nth-of-type(1) {
        border-top: none;
    }
    .userBetting dd .bet-con p {
        padding-left: 9px;
        font-size: 12px;
        color: #6e6e6e;
        line-height: 30px;
        text-align: left;
        border-top: 1px solid #cacaca;
    }
    .userBetting dd .bet-con p span {
        color: #d22727;
    }
    .userBetting dd .bet-con {
        position: relative;
        padding: 0 8px;
        background-image: linear-gradient(150deg, #ffffff, #e8e8e8 95%);
        border-radius: 3px;
        box-shadow: 0.5px 0.9px 4px 0 rgba(35, 24, 21, 0.27), inset 0px -2px 0 0 #e2e2e2, inset 0px 2px 0 0 #ffffff;
    }
    .userBetting .timeRecord {
        display: inline-block;
        margin-top: 10px;
        width: 138px;
        height: 19px;
        line-height: 19px;
        font-family: monospace;
        font-size: 12px;
        color: #fff;
        border-radius: 4px;
        background-color: #d6d6d6;
        text-align: center;
    }
    h3 i {
        display: inline-block;
        margin-left: 2px;
        vertical-align: top;
        width: 50px;
        height: 18px;
        background-size: 50px 18px!important;
    }
    .userBetting dt, .userBetting li:first-child {
        width: 50px;
        float: left;
        overflow: hidden;
    }
    .userBetting2 ul.welcome {
        display: inline-block;
        /* margin-left: 80px; */
        min-width: 280px;
        font-size: 12px;
        color: #48484c;
        border-radius: 6px;
        background-color: #d6d6d6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .welcome li pre {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        padding: 6px;
        margin: 0;
        font-size: 12px;
    }
    .right {
        float: right;
    }
    .userBetting dl.right dt {
        float: right;
        margin-top: 10px;
    }
    .userBetting dt {
        margin-top: 10px;
    }
    .userBetting dt, .userBetting li:first-child {
        width: 50px;
        float: left;
        overflow: hidden;
    }
    .userBetting dt img, .userBetting li:first-child img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    img {
        vertical-align: top;
    }
    .userBetting dl.right dd {
        margin-left: 0;
        margin-right: 15px;
    }
    .userBetting dd {
        background: #f2f2f2;
    }
    .userBetting dd .bet-con-self {
        position: relative;
        padding: 0 8px;
        background-color: #61b7ff;
        border-radius: 3px;
        box-shadow: 1.5px 2.6px 4px 0 rgba(0, 0, 0, 0.26);
    }
    .userBetting dd .bet-con-self div.issueCon {
        position: relative;
        color: #fff;
        line-height: 30px;
        width: 100%;
        padding: 0 9px;
        text-align: left;
    }
    .userBetting dd .bet-con-self div.issueCon em {
        display: inline-block;
        margin-right: 7px;
        width: 16px;
        height: 16px;
        background: url(~@/assets/images/brnn/clock_icon_black@2x.png) no-repeat center;
        background-size: 16px 16px;
    }

    .issueCon em, .issueCon span {
        vertical-align: middle;
    }
    .userBetting dd .bet-con-self p:nth-of-type(1) {
        border-top: none;
    }

    .userBetting dd .bet-con-self p {
        padding-left: 9px;
        font-size: 12px;
        color: #fff;
        line-height: 30px;
        text-align: left;
        border-top: 1px solid #fff;
    }
    .userBetting .bet-con i.mask, .userBetting .bet-con-self i.mask {
        width: 100%;
        height: 100%;
        display: none;
        /* background: url(../images/close.png) no-repeat center rgba(0,0,0,0.7); */
        position: absolute;
        left: 0;
        top: 0;
        background-size: 20px auto;
        border-radius: 3px;
    }
    .userBetting .right dd .bet-con-self:after {
        position: absolute;
        width: 0;
        height: 0;
        content: "";
        border: 5px solid transparent;
        top: 15px;
        margin-top: -5px;
        right: -10px;
        border-left: 5px solid #61b7ff;
    }
    .userBetting dd .bet-con p .r {
        float: right;
        color: #48484c;
    }
    .userBetting dd .bet-con-self p .r {
        float: right;
    }
    .customNews {
        min-height: 50px;
        width: 100%;
        background: #f7f6f8;
        padding: 8px 6px;
        position: fixed;
        left: 0;
        bottom: 14px;
        z-index: 3;
    }
    .roomNews em {
        width: 65.5px;
        height: 36px;
        border-radius: 2px;
        float: left;
        text-align: center;
        line-height: 36px;
        display: block;
        font-size: 14px;
        color: #fff;
        margin-right: 10px;
        z-index: 2;
    }
    .bgCol {
        background: #ff6179;
    }
    .roomNews em {
        width: 65.5px;
        height: 36px;
        border-radius: 2px;
        float: left;
        text-align: center;
        line-height: 36px;
        display: block;
        font-size: 14px;
        color: #fff;
        margin-right: 10px;
        z-index: 2;
    }
    .roomNews em {
        width: 65.5px;
        height: 36px;
        border-radius: 2px;
        float: left;
        text-align: center;
        line-height: 36px;
        display: block;
        font-size: 14px;
        color: #fff;
        margin-right: 10px;
        z-index: 2;
    }

    .bgCol2 {
        background: #61b7ff;
    }
    .customNews.roomNews .textArea {
        width: calc(100% - 225px);
    }

    .customNews .textArea {
        width: calc(100% - 75px);
        min-height: 35px;
        max-height: 105px;
        overflow: hidden;
        overflow-y: auto;
        border: 1px solid #cfcfcf;
        float: left;
        border-radius: 2px;
        line-height: 35px;
        font-size: 14px;
        padding: 0 5px;
    }
    .customNews button {
        width: 65.5px;
        height: 36px;
        border-radius: 2px;
        float: right;
        background: #ff6179;
    }
    button {
        /* width: 200px; */
        /* height: 31px; */
        display: inline-block;
        /* background-image: linear-gradient(to top, #f04a49, #f36d5c); */
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
    }
    .betWarp {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.1);
        z-index: 9;
        display: none;
    }
    .betCon {
        position: absolute;
        /* top: 100%; */
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        transition: top .5s;
        -moz-transition: top .5s;
        -webkit-transition: top .5s;
        -o-transition: top .5s;
    }
    .betLeftNav {
        overflow: auto;
    }
    .betLeftNav {
        width: 100px;
        background-color: #f1f1f1;
        height: 100%;
        float: left;
    }
    .betLeftNav li.active {
        background-color: #fff;
    }
    .betLeftNav li {
        padding: 7px 0;
        height: 50px;
        font-size: 15px;
        font-weight: normal;
        text-align: center;
        line-height: 36px;
        position: relative;
    }
    .betLeftNav li.active:before {
        content: "";
        position: absolute;
        height: 36px;
        width: 3px;
        background: #d22727;
        left: 0;
        top: 7px;
    }
    .betRight {
        padding: 0 12px 0 12px;
        height: 100%;
        overflow-y: auto;
    }
    .betRight h4 {
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        font-weight: normal;
    }
    .desc {
        color: #D22727;
        text-align: center;
        line-height: 30px;
    }
    .checkPanel1 {
        overflow: auto;
        width: 80%;
    }
    .data-con{
        display: block;
    }
    .checkPanel1>div {
        width: 47%;
        background: #F4F4F6;
        border: 1px solid #CACACA;
        margin-right: 3%;
        margin-top: 10px;
        border-radius: 5px;
        height: 92px;
        line-height: 30px;
        padding: 2px 4px;
        float: left;
    }
    .checkPanel1 .tai {
        width: 47%;
        background: #F4F4F6;
        border: 1px solid #CACACA;
        margin-right: 3%;
        margin-top: 10px;
        border-radius: 5px;
        height: 48px;
        line-height: 30px;
        padding: 2px 4px;
        float: left;
    }
    .checkPanel1 .peilv1 {
        float: right;
        color: #D91D37;
        font-size: 10px;
    }
    .oddsExplain {
        line-height: 40px;
        display: block;
    }
    .oddsExplain {
        line-height: 24px;
        text-align: right;
        padding: 0 5px;
    }
    .oddsExplain {
        display: inline-block;
        line-height: 50px;
        padding-right: 22px;
    }
    .odds-info {
        margin-top: 3px;
        margin-left: 22px;
        font-size: 12px;
        background: none;
    }
    .oddsExplain i {
        display: inline-block;
        margin-right: 5px;
        width: 14px;
        height: 14px;
        background: url(~@/assets/images/brnn/peilv_icon@2x.png) no-repeat center;
        background-size: 14px 14px;
        vertical-align: middle;
        margin-top: -2px;
    }
    .bettPanel {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        z-index: 999;
        background: #F2F2F2;
        padding: 2px 4px;
        box-shadow: -1px -2px 3px #ccc;
        display: none;
    }
    .bpTop {
        overflow: auto;
        padding-top: 5px;
    }
    .bet-min {
        float: right;
        width: 20%;
        height: 28px;
        margin-top: 4px;
        background: #0090DB;
        font-size: 12px;
    }
    button {
        /* width: 200px; */
        /* height: 31px; */
        display: inline-block;
        /* background-image: linear-gradient(to top, #f04a49, #f36d5c); */
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
    }
    .bpTop p {
        clear: both;
        font-size: 12px;
        color: #999;
        margin: 2px;
    }
    .bpTop p span {
        color: #D91D37;
    }
    .bpBottom {
        overflow: auto;
        margin-bottom: 4px;
    }
    .moneyInput {
        float: left;
        width: 40%;
    }
    .moneyInput {
        font-size: 14px;
    }
    .moneyInput input {
        height: 24px;
        border-radius: 5px;
        width: 100%;
    }
    input, select, option, button, textarea {
        font-size: 100%;
        vertical-align: middle;
        outline: 0 none;
        border-radius: 0px;
        border: none;
    }
    .bpBtnPanel {
        float: right;
        display: flex;
        justify-content: space-between;
        width: 58%;
        margin-left: 2%;
    }

    .bettBtn {
        background: #FF8624;
    }

    .add-list {
        background: #D22727;
    }
    .bpBtnPanel button {
        height: 24px;
        /* width: 30%; */
        font-size: 12px;
    }
    .bettCancel {
        background: #666;
    }
    .cmPanel {
        position: absolute;
        bottom: 50px;
        z-index: 1000;
        display: none;
    }
    .cmPanel>div {
        float: left;
        background-size: 100% 100%;
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 10px;
    }
    .ckedYuanbao {
        position: relative;
        bottom: 6px;
    }
    .ckedOdds1 {
        border: 1px solid #D22727 !important;
    }
    .ybBg0 {
        background: url(~@/assets/images/brnn/chip-0.png)no-repeat;
    }
    .ybBg1 {
        background: url(~@/assets/images/brnn/chip-1.png)no-repeat;
    }
    .ybBg2 {
        background: url(~@/assets/images/brnn/chip-2.png)no-repeat;
    }
    .ybBg3 {
        background: url(~@/assets/images/brnn/chip-3.png)no-repeat;
    }
    .ybBg4 {
        background: url(~@/assets/images/brnn/chip-4.png)no-repeat;
    }
    .ybBg5 {
        background: url(~@/assets/images/brnn/chip-5.png)no-repeat;
    }
    #selectPanel1 {
        text-align: center;
        margin-bottom: 10px;
        width: 100%;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    /*投注显示部分完*/

    .roomHead1 li:first-child {
        position: relative;
        /* border-right: 1px solid #cfcfcf; */
    }
    .roomHead1 li {
        width: 50%;
        text-align: center;
        float: left;
        height: 67.5px;
        padding: 10px;
    }
    .roomHead1 li p:nth-child(1) {
        font-size: 14px;
        color: #909090;
        line-height: 22.5px;
    }
    .roomHead1 li p:nth-child(2) {
        font-size: 18px;
        color: #48484c;
    }
    .roomHead1 #issue {
        color: #2aa7f6;
    }
    .roomHead1 li p.money {
        color: #2aa7f6;
    }
    i.iconMoney {
        display: inline-block;
        width: 15px;
        height: 15px;
        padding-right: 0;
        background: url(~@/assets/images/brnn/balance_icon@2x.png) no-repeat center center;
        background-size: 15px 15px;
        margin: 0 10px;
    }
    .roomHead1 li .line {
        position: absolute;
        right: -1px;
        top: 19px;
        width: 1px;
        height: 24px;
        background-color: #e4e4e4;
    }
    .roomHead1 .icoAcer {
        font-size: 18px;
        font-family: Arial;
        color: #48484c;
        padding-right: 0px;
    }
    .roomHead1 li p span {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 15px 15px;
    }
    .lottRstPanel {
        position: relative;
        overflow: auto;
    }

    .boxShadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .5;
        display: none;
    }
    .rstIssue {
        position: absolute;
        top: 5px;
        text-align: center;
        width: 100%;
        color: white;
        z-index: 1;
    }
    .vsBox {
        position: absolute;
        top: 40px;
        z-index: 1;
        width: 100%;
    }
    .pageTriangle {
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: url(../../../../src/assets/images/hlsz/9.png)no-repeat;
        background-size: 100% 100%;
        width: 16px;
        z-index: 1;
        height: 12px;
    }
    .pageTriangle_up {
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: url(../../../../src/assets/images/hlsz/8.png)no-repeat;
        background-size: 100% 100%;
        width: 16px;
        z-index: 1;
        height: 12px;
    }
    .redRight, .blueLeft {
        position: relative;
        padding-top: 25px;
    }
    .blueLeft {
        float: left;
        background: #2E4167;
        position: relative;
        width: 50%;
    }


    .lottery {

        background: #fff;
        position: absolute;
        left: 42%;
        top: 156.5px;
        right: 0;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 83.6%;
        /* height: 0; */
        overflow: visible!important;
        box-shadow: -4.2px 4.2px 5px 0 rgba(0, 0, 0, 0.05);
        z-index: 5;
    }
    .lottery {
        top: 156px;
    }
    .lottery:before {
        content: "";

        position: absolute;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff;
        right: 5px;
        top: -16px;
        /* border-top: 5px solid #000; */
    }
    .lottery dl {
        padding: 0 10px;
        overflow: hidden;
    }
    .lottery dt {
        font-size: 14px;
        color: #242424;
        line-height: 38px;
    }
    .lottery dd {
        /* color: #b3b2b2; */
        font-size: 14px;
        line-height: 34px;
    }
    .lottery li {
        overflow: auto;
        display: flex;
        justify-content: space-between;
        padding: 5px 0px;
        font-size: 12px;
    }
    .lottery li {
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .rstPanel {
        overflow: auto;
        display: flex;
        justify-content: space-between;
        width: 100px;
    }
    .rstPanel>div {
        width: 30%;
        height: 34px;
        background-size: 100% 100%;
    }
    .vsBox img {
        display: block;
        margin: 0 auto;
        width: 36px;
    }
    img {
        vertical-align: top;
    }
    .popup, .popupAlert {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.4);
        z-index: 50;
    }
    .config-confirm {
        width: 300px;
        padding-bottom: 15px;
        max-height: 374px;
        position: absolute;
        margin: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 4px;
        text-align: center;
    }
    .config-confirm h3 {
        line-height: 40px;
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #d22727;
    }
    .gentouCon {
        width: 100%;
        padding: 10px 24px 0;
        font-size: 14px;
        color: #909090;
    }
    .gentou_player, .gentou_issue {
        line-height: 30px;
        text-align: left;
        border-bottom: solid 1px #959595;
    }
    .gentou_player label, .gentou_issue label {
        display: inline-block;
        width: 20%;
    }
    .gentou_player span, .gentou_issue span {
        display: inline-block;
        width: 78%;
        color: #2aa7f6;
    }
    .configAcer {
        color: #d22727;
        font-size: 14px;
        padding-right: 25px;
        background: url(~@/assets/images/brnn/balance_icon@2x.png) no-repeat right center;
        background-size: 17px 14px;
    }

    .gentou_player, .gentou_issue {
        line-height: 30px;
        text-align: left;
        border-bottom: solid 1px #959595;
    }
    .config-confirm .con {
        padding: 20px 0;
    }
    .gentouCon {
        width: 100%;
        padding: 10px 24px 0;
        font-size: 14px;
        color: #909090;
    }
    .gentouCon .con {
        padding: 0!important;
    }
    .gentouCon .con .con-l {
        vertical-align: top;
        display: inline-block;
        width: 20%;
        line-height: 30px;
        text-align: left;
    }
    .gentouCon .con .con-r {
        display: inline-block;
        width: 78%;
        max-height: 180px;
        overflow: auto;
        text-align: left;
    }
    .gentouCon .con .con-r p {
        padding: 0;
        font-size: 14px;
        text-align: left;
    }
    .config-confirm p {
        padding: 20px;
        line-height: 30px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #2e2e30;
        text-align: left;
    }
    .gentouCon .con .con-r p span {
        display: inline-block;
        width: 70%;
        text-align: left;
    }
    .cigBtn {
        margin-top: 25px;
        text-align: center;
    }
    #keepName, #genTou {
        background-image: -moz-linear-gradient(to top, #f04a49, #f36d5c);
        background-image: -webkit-linear-gradient(to top, #f04a49, #f36d5c);
        background-image: linear-gradient(to top, #f04a49, #f36d5c);
    }
    .cigBtn button:first-child {
        margin-left: 0;
    }
    .cigBtn button {
        width: 125px;
        height: 40px;
        margin-left: 12px;
        border-radius: 2px;
    }

    button {
        /* width: 200px; */
        /* height: 31px; */
        display: inline-block;
        /* background-image: linear-gradient(to top, #f04a49, #f36d5c); */
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
    }
    .leftWinImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
    }
    .bluePoke {
        width: 80%;
        margin: 0 auto;
        overflow: auto;
        padding: 3px;
        border-radius: 5px;
        background: #202d48;
        margin-bottom: 5px;
    }
    .bluePoke>div {
        float: left;
        width: 20%;
        height: 50px;
        background-size: 100% 100%;
    }
    .lottRstTip {
        position: absolute;
        width: 40%;
        left: 30%;
        bottom: 5px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: url(~@/assets/images/brnn/niuniu_lab_icon@2x.png)no-repeat;
        background-size: 100% 100%;
        z-index: 999;
    }
    .redRight {
        float: left;
        background: #D22727;
        width: 50%;
        position: relative;
    }
    .rightWinImg {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
    }
    .redPoke {
        width: 80%;
        margin: 0 auto;
        overflow: auto;
        padding: 3px;
        border-radius: 5px;
        background: #202d48;
        margin-bottom: 5px;
    }
    .redPoke>div {
        height: 50px;
        float: left;
        width: 20%;
        background-size: 100% 100%;
    }

    /* 扑克url 1->S 2->H 3->C 4->D*/
    .poker1_1{
        background: url('~@/assets/images/brnn/poker/poker1_1@2x.png')no-repeat;
    }
    .poker1_2{
        background: url('~@/assets/images/brnn/poker/poker1_2@2x.png')no-repeat;
    }
    .poker1_3{
        background: url('~@/assets/images/brnn/poker/poker1_3@2x.png')no-repeat;
    }
    .poker1_4{
        background: url('~@/assets/images/brnn/poker/poker1_4@2x.png')no-repeat;
    }
    .poker2_1{
        background: url('~@/assets/images/brnn/poker/poker2_1@2x.png')no-repeat;
    }
    .poker2_2{
        background: url('~@/assets/images/brnn/poker/poker2_2@2x.png')no-repeat;
    }
    .poker2_3{
        background: url('~@/assets/images/brnn/poker/poker2_3@2x.png')no-repeat;
    }
    .poker2_4{
        background: url('~@/assets/images/brnn/poker/poker2_4@2x.png')no-repeat;
    }
    .poker3_1{
        background: url('~@/assets/images/brnn/poker/poker3_1@2x.png')no-repeat;
    }
    .poker3_2{
        background: url('~@/assets/images/brnn/poker/poker3_2@2x.png')no-repeat;
    }
    .poker3_3{
        background: url('~@/assets/images/brnn/poker/poker3_3@2x.png')no-repeat;
    }
    .poker3_4{
        background: url('~@/assets/images/brnn/poker/poker3_4@2x.png')no-repeat;
    }
    .poker4_1{
        background: url('~@/assets/images/brnn/poker/poker4_1@2x.png')no-repeat;
    }
    .poker4_2{
        background: url('~@/assets/images/brnn/poker/poker4_2@2x.png')no-repeat;
    }
    .poker4_3{
        background: url('~@/assets/images/brnn/poker/poker4_3@2x.png')no-repeat;
    }
    .poker4_4{
        background: url('~@/assets/images/brnn/poker/poker4_4@2x.png')no-repeat;
    }
    .poker5_1{
        background: url('~@/assets/images/brnn/poker/poker5_1@2x.png')no-repeat;
    }
    .poker5_2{
        background: url('~@/assets/images/brnn/poker/poker5_2@2x.png')no-repeat;
    }
    .poker5_3{
        background: url('~@/assets/images/brnn/poker/poker5_3@2x.png')no-repeat;
    }
    .poker5_4{
        background: url('~@/assets/images/brnn/poker/poker5_4@2x.png')no-repeat;
    }
    .poker6_1{
        background: url('~@/assets/images/brnn/poker/poker6_1@2x.png')no-repeat;
    }
    .poker6_2{
        background: url('~@/assets/images/brnn/poker/poker6_2@2x.png')no-repeat;
    }
    .poker6_3{
        background: url('~@/assets/images/brnn/poker/poker6_3@2x.png')no-repeat;
    }
    .poker6_4{
        background: url('~@/assets/images/brnn/poker/poker6_4@2x.png')no-repeat;
    }
    .poker7_1{
        background: url('~@/assets/images/brnn/poker/poker7_1@2x.png')no-repeat;
    }
    .poker7_2{
        background: url('~@/assets/images/brnn/poker/poker7_2@2x.png')no-repeat;
    }
    .poker7_3{
        background: url('~@/assets/images/brnn/poker/poker7_3@2x.png')no-repeat;
    }
    .poker7_4{
        background: url('~@/assets/images/brnn/poker/poker7_4@2x.png')no-repeat;
    }
    .poker8_1{
        background: url('~@/assets/images/brnn/poker/poker8_1@2x.png')no-repeat;
    }
    .poker8_2{
        background: url('~@/assets/images/brnn/poker/poker8_2@2x.png')no-repeat;
    }
    .poker8_3{
        background: url('~@/assets/images/brnn/poker/poker8_3@2x.png')no-repeat;
    }
    .poker8_4{
        background: url('~@/assets/images/brnn/poker/poker8_4@2x.png')no-repeat;
    }
    .poker9_1{
        background: url('~@/assets/images/brnn/poker/poker9_1@2x.png')no-repeat;
    }
    .poker9_2{
        background: url('~@/assets/images/brnn/poker/poker9_2@2x.png')no-repeat;
    }
    .poker9_3{
        background: url('~@/assets/images/brnn/poker/poker9_3@2x.png')no-repeat;
    }
    .poker9_4{
        background: url('~@/assets/images/brnn/poker/poker9_4@2x.png')no-repeat;
    }
    .poker10_1{
        background: url('~@/assets/images/brnn/poker/poker10_1@2x.png')no-repeat;
    }
    .poker10_2{
        background: url('~@/assets/images/brnn/poker/poker10_2@2x.png')no-repeat;
    }
    .poker10_3{
        background: url('~@/assets/images/brnn/poker/poker10_3@2x.png')no-repeat;
    }
    .poker10_4{
        background: url('~@/assets/images/brnn/poker/poker10_4@2x.png')no-repeat;
    }
    .poker11_1{
        background: url('~@/assets/images/brnn/poker/poker11_1@2x.png')no-repeat;
    }
    .poker11_2{
        background: url('~@/assets/images/brnn/poker/poker11_2@2x.png')no-repeat;
    }
    .poker11_3{
        background: url('~@/assets/images/brnn/poker/poker11_3@2x.png')no-repeat;
    }
    .poker11_4{
        background: url('~@/assets/images/brnn/poker/poker11_4@2x.png')no-repeat;
    }
    .poker12_1{
        background: url('~@/assets/images/brnn/poker/poker12_1@2x.png')no-repeat;
    }
    .poker12_2{
        background: url('~@/assets/images/brnn/poker/poker12_2@2x.png')no-repeat;
    }
    .poker12_3{
        background: url('~@/assets/images/brnn/poker/poker12_3@2x.png')no-repeat;
    }
    .poker12_4{
        background: url('~@/assets/images/brnn/poker/poker12_4@2x.png')no-repeat;
    }
    .poker13_1{
        background: url('~@/assets/images/brnn/poker/poker13_1@2x.png')no-repeat;
    }
    .poker13_2{
        background: url('~@/assets/images/brnn/poker/poker13_2@2x.png')no-repeat;
    }
    .poker13_3{
        background: url('~@/assets/images/brnn/poker/poker13_3@2x.png')no-repeat;
    }
    .poker13_4{
        background: url('~@/assets/images/brnn/poker/poker13_4@2x.png')no-repeat;
    }
    .waitRstPoke{
        background: url('~@/assets/images/brnn/poker/poker_default@2x.png')no-repeat;
    }
    .room_drop1 {
        bottom:14px;
        /* bottom:80px; */
    }
    .room_drop2{
        bottom:65px;
    }
    .room_up {
        bottom:65px;
    }
    .pcdd-avatar-span{
        width: 45px;
        height:45px;
    }
    .roomNews em{
        float:none;
        width:50%;
        margin:0 auto;
    }
    .close_bet_class{
        height:100%;
        width:100%;
    }
</style>
