import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';


Vue.use(VueRouter);

const Router = new VueRouter({
  routes: [{
      path: '*', // 404 页面
      component: resolve => require(['../vivew/common/error'], resolve),
    },
    {
      path: '/',
      component: resolve => require(['../vivew/home/index'], resolve),
      meta: { index: 0 /*,scroll_top: true*/ }
    },
    {
      path: '/gpark',
      component: resolve => require(['../vivew/gpark/index'], resolve),
      meta: { index: 0 }
    },
    {
      path: '/trend/:id',
      component: resolve => require(['../vivew/home/common/trend'], resolve),
      meta: { index: 11 },
      children: []
    },
    {
      path: '/bjl/:id',
      component: resolve => require(['../vivew/home/bjl'], resolve),
      meta: { index: 11 },
    },
    {
      path: '/lhd/:id',
      component: resolve => require(['../vivew/home/lhd'], resolve),
      meta: { index: 11 },
    },
    { //pc28
      path: '/game-pc/:id',
      component: resolve => require(['../vivew/home/pc28/room'], resolve),
      meta: { index: 11 },
      children: []
    },
    {
      path: '/game-pc/betting/:id/:level',
      component: resolve => require(['../vivew/home/pc28/betting'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-c/:id',
      component: resolve => require(['../vivew/home/common/Lottery'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-s/:id',
      component: resolve => require(['../vivew/home/ssc/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-x/:id',
      component: resolve => require(['../vivew/home/syxw/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-l/:id',
      component: resolve => require(['../vivew/home/lhc/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-nc/:id',
      component: resolve => require(['../vivew/home/nc/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-p/:id',
      component: resolve => require(['../vivew/home/pk10/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-p-gf/:id',
      component: resolve => require(['../vivew/home/pk10/official'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-klsf/:id',
      component: resolve => require(['../vivew/home/klsf/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-p3d/:id',
      component: resolve => require(['../vivew/home/p3d/'], resolve),
      meta: { index: 12 },
      children: []
    },
    //七星彩
    {
      path: '/game-qxc/:id',
      component: resolve => require(['../vivew/home/qxc/'], resolve),
      meta: { index: 12 },
      children: []
    },
    {
      path: '/game-brnn/:id',
      component: resolve => require(['../vivew/home/brnn/index'], resolve),
      meta: { index: 12,  },
      children: []
    },
    {  //hlsb
      path: '/game-hlsb/:id',
      component: resolve => require(['../vivew/home/hlsb/index'], resolve),
      meta: { index: 12,  },
      children: []
    },
    {
      path: '/pay_return/:type/:num',
      component: resolve => require(['../vivew/capital/payReturn'], resolve),
      meta: { index: 12,  },
      children: []
    },
    {
      path: '/game-lhj/:id',
      component: resolve => require(['../vivew/home/lhj/index'], resolve),
      meta: { index: 12, title: '水果机', auth: true }
    },
    {
      path: '/game-lhj-play/:level',
      meta: { index: 12, title: '水果拉霸', auth: true },
      component: resolve => require(['../vivew/home/lhj/indexPlay'], resolve),
    },
    {
      path: '/game-lhj-play-2/:level',
      meta: { index: 12, title: '沉鱼落雁', auth: true },
      component: resolve => require(['../vivew/home/lhj/indexPlay2'], resolve),
    },
    {
      path: '/game-lhj-play-3/:level',
      meta: { index: 12, title: '忍者神龟', auth: true },
      component: resolve => require(['../vivew/home/lhj/indexPlay3'], resolve),
    },
    {
      path: '/game-troom/:id',
      meta: { index: 12, title: '老虎机', auth: true },
      component: resolve => require(['../vivew/home/tiger/room'], resolve),
    },
    {
      path: '/game-tiger/:level',
      meta: { index: 13, auth: true },
      component: resolve => require(['../vivew/home/tiger/index'], resolve),
    },
    { //充值、提现
      path: '/Capital',
      component: resolve => require(['../vivew/capital/index'], resolve),
      meta: { index: 12, auth: true },
      children: [{
          path: '',
          component: resolve => require(['../vivew/capital/money/moneyCompany'], resolve),
          meta: { index: 5, index1: 0, title: '快速入款' }
        },
        {
          path: 'moneyOut',
          component: resolve => require(['../vivew/capital/money/moneyOut'], resolve),
          meta: { index: 5, index1: 2, title: '立即提款' }
        },
        {
          path: 'moneyIn',
          component: resolve => require(['../vivew/capital/money/moneyIn'], resolve),
          meta: { index: 5, index1: 1 }
        }
      ]
    },
    {
      path: '/order/:id',
      component: resolve => require(['../vivew/capital/money/order'], resolve),
      meta: { index: 20 },
      children: []
    },
    {
      path: '/Capital/record',
      component: resolve => require(['../vivew/capital/indexRecord'], resolve),
      children: [{
          path: '',
          component: resolve => require(['../vivew/capital/moenyRecord/moneyRecordIn'], resolve),
          meta: { index: 151, title: '快速充值记录' }
        },
        {
          path: 'line',
          component: resolve => require(['../vivew/capital/moenyRecord/moneyRecordLine'], resolve),
          meta: { index: 152, title: '在线充值记录' }
        },
        {
          path: 'out',
          component: resolve => require(['../vivew/capital/moenyRecord/moneyRecordOut'], resolve),
          meta: { index: 153, title: '账户提款记录' }
        }
      ]
    },
    {
      path: '/Discount',
      component: resolve => require(['../vivew/discount/index'], resolve),
      meta: { index: 3 },
      children: []
    },
    {
      path: '/Discount-son/:id',
      component: resolve => require(['../vivew/discount/son'], resolve),
      meta: { index: 11, title: '详情' },
      children: []
    },
    {
      path: '/With',
      component: resolve => require(['../vivew/with/index'], resolve),
      meta: { index: 2, title: '合买大厅' },
      children: []
    },
    {
      path: '/Jczq',
      component: resolve => require(['../vivew/home/jczq/index'], resolve),
      meta: { index: 20, title: '' },
      children: [{
        path: '',
        component: resolve => require(['../vivew/home/jczq/hh'], resolve),
        meta: { index: 151, title: '竞彩足球' }
      }]
    },
    {
      path: '/Trade/:index',
      component: resolve => require(['../vivew/trade/index'], resolve),
      meta: { index: 1, title: '购彩大厅' },
      children: []
    },
    {
      path: '/With-son/:id',
      component: resolve => require(['../vivew/with/son'], resolve),
      meta: { index: 11, title: '合买详情' },
      children: []
    },
    {
      //棋牌记录
      path: '/My/chess_record',
      component: resolve => require(['../vivew/my/son/chess_record'], resolve),
      meta: { index: 5 ,title: '棋牌记录'}
    },
    {
      path: '/My',
      component: resolve => require(['../vivew/my/index'], resolve),
      meta: { index: 4, auth: true },
      children: []
    },
    {
      path: '/My/promotion',
      component: resolve => require(['../vivew/my/son/promotion'], resolve),
      meta: { index: 11 },
      children: [{
          path: '',
          component: resolve => require(['../vivew/my/son/promotion/number'], resolve),
          meta: { index: 111 }
        },
        {
          path: 'details',
          component: resolve => require(['../vivew/my/son/promotion/details'], resolve),
          meta: { index: 112 }
        },
      ]
    },
    {
      path: '/My/bank',
      component: resolve => require(['../vivew/my/son/bank'], resolve),
      meta: { index: 16 },
      children: [{
          path: '',
          component: resolve => require(['../vivew/my/son/bank/info'], resolve),
          meta: { index: 151, title: '设置银行卡' }
        },
        {
          path: 'chasing_password',
          component: resolve => require(['../vivew/my/son/bank/chasing'], resolve),
          meta: { index: 152, title: '设置提款密码' }
        }
      ]
    },
    {
      path: '/My/chart',
      component: resolve => require(['../vivew/my/chart/index'], resolve),
      meta: { index: 19, title: '聊天室' },
      children: []
    },
    {
      path: '/My/edit',
      component: resolve => require(['../vivew/my/son/edit'], resolve),
      meta: { index: 15 },
      children: [{
          path: '',
          component: resolve => require(['../vivew/my/son/edit/profile'], resolve),
          meta: { index: 151, title: '基本资料设置' }
        },
        {
          path: 'password',
          component: resolve => require(['../vivew/my/son/edit/password'], resolve),
          meta: { index: 152, title: '修改登陆密码' }
        },
        {
          path: 'question',
          component: resolve => require(['../vivew/my/son/edit/question'], resolve),
          meta: { index: 153, title: '设置安全问题' }
        }
      ]
    },
    {
      path: '/My/liquidity',
      component: resolve => require(['../vivew/my/son/liquidity'], resolve),
      meta: { index: 5 }
    },
    {
      path: '/My/lucky',
      component: resolve => require(['../vivew/my/lucky/index'], resolve),
      meta: { index: 4 },
      children: []
    },
    {
      path: '/My/lu_record',
      component: resolve => require(['../vivew/my/lucky/record'], resolve),
      meta: { index: 5 },
      children: []
    },
    {
      path: '/My/open/:id',
      component: resolve => require(['../vivew/my/son/open_record'], resolve),
      meta: { index: 20 },
      children: []
    },
    {
      path: '/My/record',
      component: resolve => require(['../vivew/my/son/record_playing'], resolve),
      meta: { index: 5 },
      children: []
    },
    {
      path: '/My/setting',
      component: resolve => require(['../vivew/my/son/setting'], resolve),
      meta: { index: 5 },
      children: []
    },
    {
      path: '/My/messages',
      component: resolve => require(['../vivew/my/son/messages'], resolve),
      meta: { index: 5 },
      children: []
    },
    { // 用户自选头像
      path: '/My/photo',
      component: resolve => require(['../vivew/my/photo/index'], resolve),
      meta: { index: 12, title: '自选头像', auth: true },
      children: []
    },
    {
      path: '/Service',
      component: resolve => require(['../vivew/service/index'], resolve),
      meta: { index: 4 },
      children: []
    },
    {
      // 登陆
      path: '/in',
      component: resolve => require(['../vivew/in/index'], resolve),
      meta: { index: 5, title: '会员登陆' }
    },
    {
      // 注册
      path: '/in/register/:u',
      component: resolve => require(['../vivew/in/register'], resolve),
      meta: { index: 6, title: '会员注册' }
    },
    {
      // 前台代理会员注册
      path: '/in/ReAgent/:u',
      component: resolve => require(['../vivew/in/agent'], resolve),
      meta: { index: 6, title: '注册通道' }
    },
    {
      // 密码找回
      path: '/in/back-password',
      component: resolve => require(['../vivew/in/backpwd'], resolve),
      meta: { index: 7 }
    },
  ]
});

Router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.title)) {
    store.commit('setData', { key: 'title', value: to.meta.title });
  } else {
    store.commit('setData', { key: 'title', value: '' });
  }
  if (to.matched.some(m => m.meta.scroll_top)) {
    store.state.scroll_top[from.path] = document.documentElement.scrollTop || document.body.scrollTop;
  }
  if (to.matched.some(m => m.meta.auth) && (!localStorage.getItem('pragma'))) {
    next({ path: '/in', query: { url: to.fullPath } });
  } else {
    next();
  }
});
export default Router;
