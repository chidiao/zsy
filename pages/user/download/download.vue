<template>
  <view class="page2">
    <view class="qrcode-box">
      <image src="https://zs.weishangfeng.com/uploads/20241007/423bf42b15e47d9016d65846ecb1b0e8.png" show-menu-by-longpress mode="" class="qrcode"></image>
    </view>
    <view class="tip">请长按保存二维码，使用微信扫码下载</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.qrcode-box{
  width: 400rpx;
  height: 400rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-top: -200rpx;
  .qrcode{
    width: 100%;
    height: 100%;
  }
}
.page2{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tip{
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #0DC7DA;
}
</style>
