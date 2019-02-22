<template>
   <div id="app" :class="headClass" style="position: relative;">

    <header-nav/>
    <transition :name="transitionName">
      <router-view/>
    </transition>
    
    <foot/>

    <loding v-show="$store.state.loading"/>
    <!--聊天窗口-->
    <tips :type="$store.state.total.type" :show="$store.state.total.show" @on-close="$store.state.total.show = false">
      {{ $store.state.total.content }}
    </tips>

    <!-- <transition name="bounce1">
      <div :class="['message-tip',{'error':$store.state.total.type==0},{'success':$store.state.total.type==1},{'normal':$store.state.total.type==2}]" v-show="$store.state.total.show">
        <i class="icon"></i>
        <div class="message-tip-body">{{ $store.state.total.content }}</div>
        <a href="javascript:;" class="kd-close" @click="$store.state.total.show = false"></a>
      </div>
    </transition> -->
  </div>
</template>

<script>
import HeaderNav from "./vivew/common/head";
import Foot from "./vivew/common/foot";
import Loding from "./components/loding";
import Tips from "./components/Tips";

export default {
  mounted() {
    let _this = this;
    this.$getData({
      url: "/api/Home/home/getBasic",
      callback: function(data) {
        if (data["web_state"] == 0) {
          _this.$router.push("/error");
        } else if (
          data["web_login"] == 1 &&
          !_this.$store.state.login &&
          _this.$route.path.indexOf("/in") == -1
        ) {
          _this.$router.push("/in");
        }
        localStorage.setItem(
          "userConfig",
          data["user_config"] ? JSON.stringify(data["user_config"]) : ""
        );
        //设定系统颜色
        let bit = data["user_config"]["config"]["color"];
        if (bit && bit["op"] == "ON") {
          data.main_color =
            "rgb(" + bit["r"] + "," + bit["g"] + "," + bit["b"] + ")";
        }
        //设定系统颜色完
        delete data.user_config;
        document.title = data.web_name;
        _this.$store.commit("setData", { key: "basic", value: data });
      }
    });
  },
  data() {
    return {
      transitionName: "",
      push: 0,
      down: 0
    };
  },
  components: { HeaderNav, Foot, Loding, Tips },
  computed: {
    //.push_chart_menu
    headClass() {
      let bg_type = 'page-game-pk10 kd-page-official';

      return [
        "kd-page page-home",
        {
          "push-menu menu-is-visible": this.push,
          "is-hide-toolbar": this.down
        },
        {
          'push_chart_menu':this.$store.state.chart_chg,
        },
        {
          "page-game-pk10 kd-page-official": (this.$store.state.offtype == 1)
        },
        {
          "page-game-pcdd-room": this.$route.path.indexOf("/betting") > -1
        },
        {
          "page-lucky page-luck-mycolor": this.$store.state.error_num
        },
        {
          "page-lucky": this.$route.path.indexOf("/lucky") > -1
        }
      ];
    }
  },
  watch: {
    $route(to, from) {
      // let a = '123in456';
      // console.log(a.includes('/in'));
      this.transitionName = to.meta.index > from.meta.index ? "slide-left" : "slide-right";
      if (this.$store.state.basic.web_state == 0) {
        this.$router.push("/error");
      } else if (!this.$store.state.login && this.$store.state.basic.web_login == 1 && this.$route.path.indexOf("/in") == -1) {
          this.$router.push("/in");
      }
    }
  },
  methods: {
    changeUp: function() {
      this.push = !this.push;
    },
    changeDonw: function() {
      this.down = !this.down;
    }
  }
};
</script>

<style>
@import "./assets/css/basic_new.css";
@import "./assets/css/basic.css";
/*样式*/
/* css3 less */
/*page-luck 颜色*/
.page-luck-mycolor {
  background: #f3f3f4;
}
/*路由切换动画*/
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 350ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  float: left;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
