<template>
  <div id="app">
    <transition name="bounce2">
      <section class="game-list-wrapper pcdd-game-rule-wrapper" style="" v-if="$store.state.game_rule > 0 ? game = $store.state.game_rule : game = 0">
        <h2 class="page-title">规则说明<a href="javascript:;" class="close-button">
          <i class="icon icon-times" @click="$store.state.game_rule = 0"></i></a>
        </h2>
        <div class="pcdd-game-rule-body kd-scrollable">
          <div>&nbsp;</div>
            <div v-html="data_sel">
            </div>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>
  export default{
    name: 'rule',
    mounted(){

    },
    destroyed(){

    },
    data () {
      return {
        game:0,
        data_sel:'',
      }
    },
    watch:{
      game(){
        if(this.game > 0){
          this.getData();
        }
      }
    },
    computed:{

    },
    methods:{
      getData(){
        let _this = this;
        _this.data_sel = '';
        if(!_this.$store.state.game_rule){return;}
        _this.$getData({
          url:"/api/home/home/gameRule",
          data:{type:_this.$store.state.game_rule},
          callback:function(res){
            if(res){
              _this.$set(_this,'data_sel',res);
            }
          }
        });
      }
    }
  }
</script>
<style scoped>
.chart-grid-item{
  border:1px solid #efefef;
}
</style>
