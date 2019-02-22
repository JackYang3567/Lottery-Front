import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import mixins from './mixins';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

// 表单字段验证
import './util/validator';

// 手势事件
import './assets/js/touch';

// 请求拦截，并模拟接口数据返回
//import './util/mock';

// 设置为 false 以阻止 vue 在生产环境中提示(console.log提示)。
Vue.config.productionTip = false;

// 移除移动端页面点击延迟 300ms,这里因为在mete标签设置了 width=device-width 自适应,已经解决了300ms延迟问题
//require('fastclick').attach(document.body);

Vue.mixin(mixins);
Vue.use(Mint);

// router.beforeEach((to, from, next) => {
//   console.log(store.state.basic.web_state);
//   if (store.state.basic.web_state == 0) {
//     router.replace("/error");
//   } else if (
//     !store.state.login &&
//     store.state.basic.web_login == 1 &&
//     route.path.indexOf("/in") == -1
//   ) {
//     router.push("/in");
//   }
//   next();
// })

new Vue({
  el: '#vivew',
  router,
  store,
  components: { App },
  template: '<App/>'
});
