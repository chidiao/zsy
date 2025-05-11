<template>
  <view>
    <view class="sub-title">
      联系方式
    </view>
    <input type="tel" maxlength="20" v-model="mobile" class="mobile" placeholder="填写您的微信/QQ/手机号">
    <view class="sub-title">
      建议内容
    </view>
    <textarea class="desc" v-model="desc" placeholder="如果您对APP或带宽有更好的建议请填写详细信息 一经收录会有一定奖励"></textarea>
    
    <view class="button" @tap="feedback">
      提交建议
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        mobile: '',
        desc: ''
      }
    },
    methods: {
      
      feedback() {
        if(!this.mobile) {
          return this.$utils.showToast('请输入联系方式')
        }
        if(!this.desc) {
          return this.$utils.showToast('请输入建议内容')
        }
        this.$api.feedback({
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

</style>
