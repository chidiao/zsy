<template>
	<view class="over-hidden page2">
    <view class="head">
    	<u-navbar leftIcon="" title="卓思云" :fixed="false" bgColor="rgba(0,0,0,0)">
        <view slot="left">
          <image src="/static/logo3.png" class="logo" mode=""></image>
        </view>
    	</u-navbar>
    </view>
		<!-- <view class="login center">
			<image src="../../static/logo.png" mode=""></image>
		</view> -->
    <view class="white-box">
      <view class="h1">
        <view class="title">欢迎登录卓思云</view>
        <view class="desc">未注册手机号登录后将自动创建账号</view>
      </view>
      <view class="mt-80">
        <view class="row flex_l">
          <!-- <image src="/static/phone.png" mode=""></image> -->
          <view>
            +86
            <image src="/static/down1.png" mode=""></image>
          </view>
          <input type="number" v-model="phone" placeholder="请输入您的手机号">
        </view>
        <view class="row flex_l">
          <!-- <image src="/static/pass.png" mode=""></image> -->
          <view>密码</view>
          <input type="password" v-model="pass" placeholder="请输入密码">
        </view>
      </view>
      <view class="forgot">
        <view @click="navto('/pages/login/forgotPass/forgotPass')">忘记密码？</view>
      </view>
      <view class="button" @click="btn">
        登录
      </view>
      <view class="button line" @click="navto('/pages/login/register/register')">没有账号？立即注册</view>
      <!-- <view class="flex plr-60 mt-30 size-26 gray-1">
      </view> -->
      <view class="footer center" @click="show = !show">
        <image v-if="!show" src="../../static/s.png" mode=""></image>
        <image v-else src="../../static/s_ed.png" mode=""></image>
        <view>我已阅读同意
          <text @click.stop="goxieyi('1')">《用户协议》</text>
          <text @click.stop="goxieyi('10')">《服务协议》</text>
          <text @click.stop="goxieyi('6')">《隐私协议》</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	import Head from '@/components/head/head.vue'
	export default {
    components: {
      Head
    },
		data() {
			return {
				phone:'',
				pass:'',
				show:false
			}
		},
		methods: {
			navto(url){
				uni.navigateTo({
					url
				})
			},
			goxieyi(id){
				uni.navigateTo({
					url:'/pages/user/xieyi/xieyi?id='+id
				})
			},
			btn(){
				if(!this.show) return this.$utils.showToast('请阅读并同意用户协议')
				this.$api.login({
					mobile:this.phone,
					password:this.pass
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						uni.setStorageSync('token',res.data.userinfo.token)
						this.$store.dispatch('updateUserInfo')
						this.$store.dispatch('updateIndexInfo')
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},1000)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

.logo{
  width: 75rpx;
  height: 75rpx;
}
.button{
  width: 604rpx;
  height: 116rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0DC7DA;
  border-radius: 58rpx;
  margin: 64rpx auto 0;
  box-shadow: none;
  box-sizing: border-box;
  &.line{
    background-color: transparent;
    border: 1px solid #0DC7DA;
    color: #0DC7DA;
  }
}
.login{
	width: 200rpx;
	height: 200rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 220rpx auto 0;
	image{
		width: 132rpx;
		height: 152rpx;
	}
}
.footer{
	width: 100%;
	position: fixed;
	bottom: 70rpx;
	left: 0;
	color: #ADADAD;
	font-size: 24rpx;
	image{
		width: 28rpx;
		height: 28rpx;
		margin-right: 20rpx;
	}
  text{
    color: #0DC7DA;
  }
}
.row{
	width: 684rpx;
	height: 90rpx;
  background-color: #F9F9F9;
	border-radius: 100rpx 100rpx 100rpx 100rpx;
	opacity: 1;
	margin: 60rpx auto 0;
  view{
    width: 136rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
  }
	image{
		width: 14rpx;
		height: 14rpx;
    margin-left: 6rpx;
	}
	input{
		flex: 1;
		font-size: 28rpx;
		margin-left: 20rpx;
	}
}


.white-box{
  padding: 50rpx 32rpx 0;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50rpx 50rpx 0 0;
  margin-top: 50rpx;
  height: 100%;
  
}
.h1{
  margin-bottom: 20rpx;
  .title{
    font-size: 52rpx;
    font-weight: 600;
    color: #333333;
  }
  .desc{
    font-size: 24rpx;
    color: #ADADAD;
    margin-top: 20rpx;
  }
}
.forgot{
  display: flex;
  justify-content: flex-end;
  font-size: 28rpx;
  color: #0DC7DA;
  margin-top: 34rpx;
}
</style>
