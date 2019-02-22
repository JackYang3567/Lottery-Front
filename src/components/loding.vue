<template>
  <div id="loading" class="kd-loading">
      <div class="kd-spinner">
      <span class="bounce b1" :style="{ background: $store.state.basic.main_color }"></span>
      <span class="bounce b2" :style="{ background: $store.state.basic.main_color }"></span>
      <span class="bounce b3" :style="{ background: $store.state.basic.main_color }"></span></div>
  </div>
</template>
