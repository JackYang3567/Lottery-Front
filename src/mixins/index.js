import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '../store';
import route from '../router';
import { Toast, MessageBox } from 'mint-ui';

export default {
  methods: {
    $total(config) {
      store.commit('setData', {
        key: 'total',
        value: {
          type: config.type,
          show: true,
          content: config.message
        }
      });
      // setTimeout(() => {
      //   store.state.total.show = 0;
      // }, (('duration' in config) ? config.duration : 3000));
    },
    $music(val = 'music_ball') {
      let rs = localStorage.userConfig;
      if (rs && store.state.login) {
        rs = JSON.parse(rs);
        if (rs['config']['all_music'] == 0) {
          return false;
        }
      }
      let arr = {
        'music_ball': 'click-ball.mp3', //选择注单
        'music_bet': 'click-bet.mp3', //成功发送注单
        'music_chip': 'click-chip.mp3', //筹码
        'music_start': 'start-bet.mp3', //开始投注
        'music_close': 'close-bet.mp3', //封盘
        'music_show': 'show-result.mp3', //开出新的一期
      };
      if (arr[val]) {
        let audio = document.createElement('audio');
        audio.src = '//' + ('api_path' in store.state && store.state.api_path ? store.state.api_path : store.state.basic.static_path) + '/static/audios/' + arr[val];
        audio.play();
      }
    },
    $getData(config) {
  
      // 这里是加载动画设置
      if ('loading' in config && config.loading) {
        store.commit('setData', { key: 'loading', value: true });
      }
      if (!('data' in config) || config.data == '') {
        config.data = {};
      }
      if (store.state.basic.chat_id != '') {
        config.data['_chat_id'] = store.state.basic.chat_id;
      }
      config.data = qs.stringify(config.data);
      axios({
        headers: { Accept: (localStorage.getItem('pragma') ? localStorage.getItem('pragma') : '') },
        method: ('type' in config ? config.type : 'POST'),
        url: ('api_path' in store.state && store.state.api_path ? config.url.replace('/api', '//' + store.state.api_path) : config.url),
        data: config.data,
      }).then(function(res) {
        if (res.status == '200') {
          try {
            if (res.headers.pragma == 'drop') {
              location.hash = '/in';
              MessageBox({
                title: '警告',
                message: '另一用户已登陆此号,如果您不知情的话,请您修改您密码'
              });
              throw '';
            } else if (res.headers.pragma == 'autoOut') {
              location.hash = '/in';
              MessageBox({
                title: '提示',
                message: '由于您长时间的没有操作,系统已自动为您退出登陆'
              });
              throw '';
            } else if (res.headers.pragma == 'frozen') {
              location.hash = '/in';
              MessageBox({
                title: '提示',
                message: '帐号已被冻结！'
              });
              throw '';
            }
            if (res.headers.pragma.indexOf('||') > -1) {
              let _value = res.headers.pragma.split('||'),bit = JSON.parse(_value[1]);
              localStorage.setItem('pragma', _value[0]);
              store.commit('setData', { key: 'login', value: true });
              store.commit('setData', { key: 'user', value: bit });
              store.state.basic.web_state = bit['web_state'];
              store.state.basic.web_login = bit['web_login'];
            }
          } catch (e) {
            // console.log(e);
            // Toast({ message: e });
            // 清除 token
            localStorage.removeItem('pragma');
            // 清除 登陆状态
            store.commit('setData', { key: 'login', value: false });
            // 清除 用户信息
            store.commit('setData', { key: 'user', value: false });
            // 清除所有 cookie
            let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
              for (let i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
          }
          if ('callback' in config) {
            config.callback(res.data);
          }
        } else {
          location.reload();
          //Toast({message:'请求接口状态异常'});
        }
        store.commit('setData', { key: 'loading', value: false });
      }).catch(function(e) {
        // setTimeout(() => { location.reload(); }, 5000);
        // Toast({message:e});
        store.commit('setData', { key: 'loading', value: false });
        if ('errorCallback' in config) {
          config.errorCallback(e);
        }
      });
    }
  }
}
