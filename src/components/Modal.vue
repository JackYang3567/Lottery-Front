<template>
  <transition name="bounce2">
    <div class="promptbox-wrapper" v-show="show">
      <section class="promptbox prompt-service">
        <div class="prompt-head">{{title}}</div>

        <div class="prompt-body">
          <slot></slot>
          <div class="data-item" align="center">
            <div @click="close" type="button" class="kd-button main-button">
              <span>{{btnStr}}</span>
            </div>
          </div>
        </div>

        <a href="javascript:;" class="prompt-close kd-close" @click="close">close</a>
      </section>
      <div class="promptbox-overlay" @click="close"></div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      // show: true
    }
  },
  props: {
    show: true,
    title: '',
    btnStr: ''
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
}
</script>

<style scoped>
.prompt-service~.promptbox-overlay {
    height: 100%;
}
.promptbox-wrapper {
    z-index: 9999;
}
</style>
