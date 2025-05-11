<template>
	<view class="over-hidden page1">
		<Head class="head" />
		<view class="mt-180 ml-50">
			<view class="bold size-40">注册账号</view>
			<view class="mt-30 size-28 gray-2">请使用手机号，快速注册</view>
		</view>
		<view class="mt-120">
			<view class="row flex_l">
				<image src="/static/phone.png" mode=""></image>
				<input type="number" v-model="mobile" placeholder="请输入您的手机号">
			</view>
			<view class="row flex_l">
				<image src="/static/code.png" mode=""></image>
				<input type="number" v-model="code" placeholder="请输入验证码">
				<view class="size-28" style="color: #1AC4D6;" @click="getCode">{{getCodeText}}</view>
			</view>
			<view class="row flex_l">
				<image src="/static/pass.png" mode=""></image>
				<input type="password" v-model="password" placeholder="请输入密码">
			</view>
			<view class="row flex_l">
				<!-- <image src="/static/code.png" mode=""></image> -->
				<input type="number" v-model="pid" placeholder="请输入邀请码">
			</view>
		</view>
		<view class="button" @click="btn">
			立即注册
		</view>
		<view class="footer center" @click="show = !show">
			<image v-if="!show" src="/static/s.png" mode=""></image>
			<image v-else src="/static/s_ed.png" mode=""></image>
			<view>
				我已阅读同意
				<text @click.stop="goxieyi('1')">《用户协议》</text>
				<text @click.stop="goxieyi('5')">《服务协议》</text>
				<text @click.stop="goxieyi('6')">《隐私协议》</text>
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
				getCodeText: '获取验证码',
				getCodeisWaiting: false,
				mobile:'',
				password:'',
				code:'',
				pid:'',
				show:false
			}
		},
		methods: {
			goxieyi(id){
				uni.navigateTo({
					url:'/pages/user/xieyi/xieyi?id='+id
				})
			},
      back() {
        uni.navigateBack()
      },
			btn(){
				if(!this.show) return this.$utils.showToast('请阅读并同意用户协议、服务协议、隐私协议')
				this.$api.register({
					mobile:this.mobile,
					password:this.password,
					captcha:this.code,
					pid:this.pid,
					event:''
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/login'
              })
            }, 500)
						// uni.setStorageSync('token',res.data.token)
						// this.$store.dispatch('updateUserInfo')
						// this.$store.dispatch('updateIndexInfo')
						// setTimeout(function(){
						// 	uni.reLaunch({
						// 		url:'/pages/index/index'
						// 	})
						// },1000)
					}
				})
			},
			Timer() {},
			getCode() {
				uni.hideKeyboard() //隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作。
				if (this.getCodeisWaiting) {
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) { //校验手机号码是否有误
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				this.getCodeText = "发送中..." //发送验证码
				this.getCodeisWaiting = true;
				//示例用定时器模拟请求效果
				//setTimeout(()用于在指定的毫秒数后调用函数或计算表达式
				this.$api.getCode({
					mobile: this.mobile,
					event: 'register'
				}).then(res => {
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						this.setTimer(); //调用定时器方法
					}else{
						this.getCodeText = "获取验证码" //发送验证码
						this.getCodeisWaiting = false;
					}
				})
			},
			setTimer() {
				let holdTime = 60; //定义变量并赋值
				this.getCodeText = "重新获取(60)"
				//setInterval（）是一个实现定时调用的函数，可按照指定的周期（以毫秒计）来调用函数或计算表达式。
				//setInterval方法会不停地调用函数，直到 clearInterval被调用或窗口被关闭。
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer); //清除该函数
						return; //返回前面
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
		}
	}
</script>

<style lang="scss">
// .page{
// 	width: 100vw;
// 	height: 100vh;
// 	background-image: url('/static/login_bg.png');
// 	background-size: 100% 100%;
// 	background-repeat: no-repeat;
// }

.back{
  position: fixed;
  left: 24rpx;
}
.button{
	margin: 110rpx auto 0;
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
	color: #666;
	font-size: 26rpx;
	image{
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}
  
  text{
    color: #0DC7DA;
  }
}
.row{
	width: 650rpx;
	height: 90rpx;
	background: #FFFFFF;
	border-radius: 100rpx 100rpx 100rpx 100rpx;
	opacity: 1;
	border: 2rpx solid #F8F8F8;
	padding: 0 40rpx;
	margin: 40rpx auto 0;
	image{
		width: 40rpx;
		height: 40rpx;
	}
	input{
		flex: 1;
		font-size: 28rpx;
		margin-left: 20rpx;
	}
}
</style>
