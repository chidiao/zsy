<template>
  <view>
    <view class="sub-title">
      联系方式
    </view>
    <input type="tel" maxlength="20" v-model="mobile" class="mobile" placeholder="填写您的微信/QQ/手机号">
    <view class="sub-title">
      问题描述
    </view>
    <textarea class="desc" v-model="desc" placeholder="详细描述您资源区域,总量等节点信息"></textarea>
    
    <!-- #ifdef APP -->
    <view class="phone" v-if="isShow">直接拨打客服电话：<text @tap="call">{{ phone }}</text></view>
    <!-- #endif -->
    
    <view class="button" @tap="serveLog">
      提交工单
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        mobile: '',
        desc: '',
        phone: '18767870077',
        isShow: !uni.getStorageSync('isHideAppStore')
      }
    },
    methods: {
      // #ifdef APP
      call() {
        uni.showModal({
          title: '提示',
          content: '应用需要您授权拨打电话权限，来联系客服？',
          confirmText: "同意",
          success: (res) => {
            if(res.confirm) {
              uni.makePhoneCall({
                phoneNumber: this.phone
              })
            }
          }
        })
      },
      // #endif
      serveLog() {
        if(!this.mobile) {
          return this.$utils.showToast('请输入联系方式')
        }
        if(!this.desc) {
          return this.$utils.showToast('请输入问题描述')
        }
        this.$api.serveLog({
          phone: this.mobile,
          content: this.desc
        }).then(res => {
          this.$utils.showToast('提交成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 300)
        }).catch(err => {
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.sub-title{
  padding: 30rpx 34rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #100F0D;
}
.mobile{
  width: 680rpx;
  height: 100rpx;
  background: #F8F8F8;
  border-radius: 20rpx;
  margin: 0 auto;
  padding: 0 26rpx;
  box-sizing: border-box;
}
.desc{
  width: 680rpx;
  height: 354rpx;
  background: #F8F8F8;
  border-radius: 20rpx;
  padding: 26rpx;
  box-sizing: border-box;
  margin: 0 auto;
}

.button{
  position: fixed;
  bottom: 88rpx;
  left: 0;
  right: 0;
  margin: auto;
}

.phone{
  margin-top: 30rpx;
  margin-left: 34rpx;
  color: #999;
  font-size: 30rpx;
  text{
    color: #1AC4D6;
    font-weight: bold;
  }
}
</style>
