<template>
  <view class="">
    <view class="entry">
      <view class="" @click="navto('/pages/user/xieyi/xieyi?id=8')">
        公司资质
        <image src="/static/next.png"></image>
      </view>
      <view class="" @click="navto('/pages/user/xieyi/xieyi?id=9')">
        第三方SDK信息说明
        <image src="/static/next.png"></image>
      </view>
      <view class="">
        当前版本
        <view class="right">
          <text>{{ version }}</text>
          <image src="/static/next.png"></image>
        </view>
      </view>
    </view>
    
    <view class="button" @tap="showModal = true">
      注销账户
    </view>
    
    <u-modal :show="showModal" width="680rpx" @close="showModal = false" :closeOnClickOverlay="true" title="提示" content="如您选择注销APP所有信息不在保留,平台将无法 恢复信息,请确认是否注销?">
      <view slot="confirmButton" class="modal">
        <view class="btn" @click="cancelAccount">
          确认
        </view>
        <view class="btn cancel" @click="showModal = false">
          取消
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        version: '',
        showModal: false
      }
    },
    onLoad() {
      const systemInfo = uni.getSystemInfoSync();
      this.version = systemInfo.version;
      console.log(this.version)
    },
    methods: {
      navto(url){
      	uni.navigateTo({
      		url
      	})
      },
      // 销户
      cancelAccount() {
        this.$api.logoff().then(res => {
          uni.removeStorageSync('token')
          uni.removeStorageSync('userInfo')
          this.$utils.showToast('注销成功！')
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/login'
            })
          })
        }).catch(err => {
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.entry{
  padding: 0 30rpx;
  view{
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F1F1F1;
    color: #444;
  }
  image{
    width: 28rpx;
    height: 28rpx;
  }
  .right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28rpx;
    color: #555;
    text{
      margin-right: 8rpx;
    }
  }
}

.button{
  position: fixed;
  bottom: 88rpx;
  left: 0;
  right: 0;
  margin: auto;
  background: #FF2E2E;
  box-shadow: none;
}

.modal{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60rpx 0 26rpx;
  .btn{
    width: 279rpx;
    height: 92rpx;
    background: #0DC7DA;
    border-radius: 43rpx;
    font-size: 28rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    &.cancel{
      background: #E3E3E3;
      color: #999999;
    }
  }
}
</style>
