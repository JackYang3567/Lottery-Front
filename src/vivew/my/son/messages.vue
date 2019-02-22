<template>
<div id="app" style="height:0;">
  <main class="kd-body" >
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" >

  <div slot="top" class="mint-loadmore-top">
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
        <img src="../../../assets/images/svg/more.svg">
    </span>
  </div>

    <ul class="nostyle kd-container kd-row messages-nav">
      <li class="" v-bind:class="{'active':change==0}" :style="styleTool(change==0)" v-on:click="submit(0)">
        <a href="javascript:;">未读消息</a>
      </li>
      <li class="" v-bind:class="{'active':change==1}" v-on:click="submit(1)" :style="styleTool(change==1)">
        <a href="javascript:;">已读消息</a>
      </li>
    </ul>

    <div class="kd-container message-actions" :style="{ borderBottom: '1px solid ' + $store.state.basic.main_color,borderTop: '1px solid ' + $store.state.basic.main_color }">
      <a href="javascript:;" @click="selTotal()">选择所有</a>
      <a href="javascript:;" @click="sel={}">取消选择</a>
      <a href="javascript:;" @click="msgdel(2,sel)">删除选择</a>
    </div>
  <div class="kd-container" >
      <template v-if="msg.length > 0">
      <ul class="nostyle messages-list" v-for="(item,k) in msg" > <!---->
        <li  :class="red[k] ? 'red':''">
          <div :class="['kd-checkbox',{'checked':sel[k]}]" @click="selMuch(k)">
            <i class="icon"></i>
            <span></span>
          </div>
          <a @click="reading(k)">{{item.title}}-{{item.create_time}}</a> <a class="delete" @click="msgdel(1,k)">删除</a>
        </li>
     </ul>
     <div class="overmsg" v-show="allLoaded">—数据加载完了—</div>
   </template>
   <template v-else>
      <ul class="nostyle messages-list"><li>没有消息</li></ul>
   </template>
  </div>
</mt-loadmore>
  </main>
</div>
</template>


<script>
  export default{
    name: 'messages',
    mounted(){
      this.submit(0);
      this.$store.state.title = '消息中心';
    },
    data () {
      return {
        sel:[],//选择框
        red:[],//读取信息
        change:0,
        msg:[],//全部信息
        page:1,
        allLoaded:false,   //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        topStatus:'',
      }
    },
    computed:{
    },
    methods:{
      styleTool(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
        }
        return _data;
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(id) { //下拉执行
        var _this = this;
        _this.page = 1;
        _this.allLoaded=false;
        _this.submit(this.change);
        document.body.scrollTop = 0;
        _this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(id) { //上拉执行
        var _this = this;
        _this.submit(this.change,2);
        document.body.scrollTop = document.body.scrollHeight - document.body.offsetHeight;
        _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      submit(_state,_type=1){//切换已读未读type1 刷新 type2 加载更多 current_page
        let _this=this;
        if(_this.change != _state){//是否切换
          _this.change = _state;
          _this.page = 1;
        }
        if(_type != 1){          //类型是加载还是刷新
          _this.page = parseInt(_this.page)+1;
        }
        _this.$getData({
          loading:true,
          url:'/api/home/my/messages',
          data:{state:_state,page:_this.page,type:_type},
          type:'post',
          callback:function(res){
            if(res){
              if(_type == 1){
                _this.$set(_this,'msg',res.data);
              }else{
                _this.page = res.current_page;
                if(res.data!=''){
                  for(let k in res.data){
                    _this.msg.push(res.data[k]);
                  }
                }else{
                  _this.allLoaded=true;
                }
              }
              _this.sel=[];//选择
              _this.red=[];//阅读
            }
          }
        });
      },
      reading(k){//阅读
        let _this = this;
        _this.$messagebox({
          title:_this.msg[k].title,
          message:_this.msg[k].content,
        });
        _this.$set(_this.red,k,true);
        if(_this.change==0 && _this.red[k]){
          _this.$getData({
            url:'/api/home/my/msgRead',
            data:{id:_this.msg[k]['id']},
            type:'post',
            callback:function(res){
            }
          });
        }
      },
      msgdel(type,k){//删除
        let _this = this,
            data=[], //删除id
            data_k=[]; //删除页面key
        // console.log(type);return;
        if(type == 2 && !k.length){
          _this.$total({ message: '请选择删除选项',type: 2 });
          return false;
        }

        if(type == 1){
          data[0] = _this.msg[k]['id'];
          data_k[0] = k;
        }else{
          for(let key in k){
            data.push(k[key]);
            data_k.push(key);
          }
        }
        _this.$messagebox.confirm('确认删除?', '提示').then(()=>{
            for(let del in data_k){
              delete _this.msg[data_k[del]];
            }
            let cc=[];
            for(let i in _this.msg){
              cc.push(_this.msg[i]);
            }
            _this.$set(_this,'msg',cc);
            _this.$getData({
              url:'/api/home/my/msgDel',
              type:'post',
              data:data,
              callback:function(res){
              }
            });
         },()=>{
            //alert(1);
         });


        // _this.$messagebox({
        //   title:'提示',
        //   message:'确认删除？',
        //   showConfirmButton:true,
        //   showCancelButton:true,
        // }).then((e)=>{
        //           alert(2);
        // });

        // if(e == 'confirm'){
        //   for(let del in data_k){
        //     delete _this.msg[data_k[del]];
        //   }
        //   let cc=[];
        //   for(let i in _this.msg){
        //     cc.push(_this.msg[i]);
        //   }
        //   _this.$set(_this,'msg',cc);
        //   _this.$getData({
        //     url:'/api/home/my/msgDel',
        //     type:'post',
        //     data:data,
        //     callback:function(res){
        //     }
        //   });
        // }
      },
      selMuch(k){//多个选择
        let _this = this;
        // console.log(_this.sel);
        if(_this.sel[k]){
          _this.$set(_this.sel,k,null);
          delete _this.sel[k];
        }else{
          _this.$set(_this.sel,k,_this.msg[k]['id']);
        }
      },
      selTotal(){
        let _this = this,key=[];
        for(let k in _this.msg){
          key[k] = _this.msg[k]['id'];
        }
        _this.$set(_this,'sel',key);
      }
    }
  }
</script>
<style scoped>
.overmsg{
  padding-top:0.5rem;
  color:#ccc;
  text-align: center;
  font-size:1rem;
}
</style>
