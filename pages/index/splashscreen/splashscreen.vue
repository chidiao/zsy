<template>
  <view class="">
    <image class="splashscreen" src="https://qiniu.zhuosiyun.com/1080x1882.png" mode="aspectFill"></image>
  </view>
</template>

<script>
  export default {
    onLoad() {
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 2000)
    }
  }
</script>

<style lang="scss" scoped>
  .splashscreen{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>