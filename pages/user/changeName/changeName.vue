<template>
  <view class="page">
    <view class="head">
    	<Head title="修改昵称" />
    </view>
    
    <view>
      <input type="text" maxlength="10" v-model="nickname" placeholder="请输入昵称">
    </view>
    
    <view class="button" @click="btn">
    	确认
    </view>
  </view>
</template>

<script>
	import Head from '@/components/head/head.vue'
	import {mapState} from 'vuex'
	export default {
		components: {
			Head
		},
		data() {
			return {
        nickname: '',
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
    created() {
      this.nickname = this.userInfo.nickname
    },
    methods: {
      btn() {
        this.$api.changeUserInfo({
          nickname: this.nickname
        }).then(res => {
          this.$utils.showToast(res.msg)
          if(res.code == 1){
            this.$store.commit('getUserInfo', { ...this.userInfo, nickname: this.nickname })
            setTimeout(() => {
              uni.navigateBack()
            }, 300)
          }
        })
      }
    }
  }
</script>

<style scoped>
input{
  background: #fff;
  height: 90rpx;
  margin-top: 24rpx;
  padding-left: 50rpx;
  font-size: 28rpx;
}
.button{
	margin: 110rpx auto 0;
}
</style>
