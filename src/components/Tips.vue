<template>
  <transition name="bounce1">
    <div :class="thisClass" v-show="show">
      <i class="icon"></i>
      <div class="message-tip-body">
        <slot></slot>
      </div>
      <a href="javascript:;" class="kd-close" @click="close"></a>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      // show: true
      timer: 0
    };
  },
  props: {
    show: true,
    duration: {
      default: 3000
    },
    type: 0
  },
  computed: {
    thisClass() {
      return [
        "message-tip",
        { error: this.type == 0 },
        { success: this.type == 1 },
        { normal: this.type == 2 }
      ];
    }
  },
  methods: {
    open() {
      this.$emit("on-open");
    },
    close() {
      this.$emit("on-close");
    }
  },
  watch: {
    show() {
      // console.log(this.show);
      if (this.show) {
        this.timer = setTimeout(this.close, this.duration);
      } else {
        clearTimeout(this.timer);
      }
    }
  }
};
</script>

<style scoped>
/* .prompt-service ~ .promptbox-overlay {
  height: 100%;
}
.promptbox-wrapper {
  z-index: 9999;
} */
</style>
