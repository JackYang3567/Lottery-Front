import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    /************* 初始化数据 *****************/

    basic: {
      static_path: '', // 静态资源地址
      web_name: '', // 网站名称
      logo_path: '', // 网站logo地址
      main_color: '#ff0606', // 网站主题颜色
      web_state: 1, // 网站开关
      web_login: 0, // 未登录时是否定向登录页面
      demo_user: 1, // 是否开启试玩用户
      login_verify: 1, // 是否开启验证码
      home_window: false, // 首页弹窗
      chat_id: false // session_id
    },

    // config 配置文件的api地址
    api_path: (typeof(basic_config) == 'undefined' ? false : basic_config.api_path),

    /************* 缓存数据 *****************/

    // 所有页面缓存
    all_chat: {},

    // 热门彩票列表缓存
    lottery_list: {},

    // 滚动条缓存
    scroll_top: {},

    //棋牌缓存
    chess_home: {},

    /************* 状态数据 *****************/

    title: '', // Head标题
    login: false, // 登陆状态
    loading: false, // 全屏 '加载中'
    user: false, // 用户信息
    trade: false, // 游戏选择弹窗
    trend_pc: false, // pc28走势图弹窗
    game_rule: false, // 游戏规则弹窗
    service: false, // 客服开启关闭
    error_num: false, // 关闭上下导航
    chart_chg: false, //聊天室滑动开关
    chart_open: false, //聊天室按钮显示
    offtype:0,      //全局背景选择 0 无 1 pk10科技背景
    official:false, //是否是官方彩种
    offopen:false,  //官方头部弹窗选择
    offtxt:'none',      //官方头部选择文字
    up: false,    
    // 提示弹窗配置
    total: { type: 0, show: 0, content: '' }
  },
  // 数据增删改 this.$store.commit('setUserName', 'abc');
  // 数据增删改 this.$store.dispatch('userinfo', 1);
  // this.$store.state.userinfo
  mutations: {
    setData(state, obj) {
      state[obj.key] = obj.value;
    }
  },
  //异步请求数据
  actions,
  getters: {
  }
});
