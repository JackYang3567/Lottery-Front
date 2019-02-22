<template>
  <div id="app">
    <main class="kd-body article-detail">
        <h1 class="page-title article-title">{{ data.title }}</h1>
        <article class="kd-container article" v-html="data.content">
            {{ data.content }}
        </article>
    </main>
  </div>
</template>

<script>
export default{
  mounted(){
    let _id = this.$route.params.id;
    if(_id){
      let _this = this;
      _this.$getData({
        loading: false,
        url:'/api/home/Discount/details',
        data:{id:_id},
        callback: function(res){
          if(res.code){
            _this.data = res.data;
          }else{
            _this.$total({ message:res.msg,duration:1000,type: 0 });
            setTimeout(()=>{_this.$router.back();},1300);
          }
        }
      });
    } else {
      this.$route.back();
    }
  },
  data () {
    return {
      data: {content: '加载中...',title: '加载中...'}
    }
  }
}
</script>

<style>
</style>
