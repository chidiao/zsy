<template>
	<view class="page2">
		<Head class="head" title="提现" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
      <view class="ktx">
        <view class="title">可提现金额</view>
        <view class="money">{{info.money}}</view>
      </view>
			<view class="over-hidden plr-30 pt-40 content-box">
				<view class="size-28 bold">提现金额</view>
				<view class="input flex_l">
					<view class="size-60 bold">￥</view>
					<input type="number" v-model="num" placeholder="请输入提现金额">
				</view>
				<view class="size-28 tx-type mt-40 mb-10">提现方式</view>
				<view class="pt-36 pb-36 radius-20 bg-white flex border-b" @click="type = 0">
					<view class="flex">
						<image src="../../../static/zfb.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
						<view class="size-26 bold ml-20">支付宝</view>
					</view>
					<image src="../../../static/c_ed.png" v-if="type == 0" style="width: 50rpx;height: 50rpx;" mode=""></image>
					<image src="../../../static/c.png" v-else style="width: 50rpx;height: 50rpx;" mode=""></image>
				</view>
				<view class="pt-36 pb-36 radius-20 bg-white flex border-b" @click="type = 1">
					<view class="flex">
						<image src="../../../static/yhk.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
						<view class="size-26 bold ml-20">银行卡</view>
					</view>
					<image src="../../../static/c_ed.png" v-if="type == 1"  style="width: 50rpx;height: 50rpx;" mode=""></image>
					<image src="../../../static/c.png" v-else style="width: 50rpx;height: 50rpx;" mode=""></image>
				</view>
				<view class="forgot">
				  <view @click="goxieyi">提现规则</view>
				</view>
			</view>
		</scroll-view>
		<view class="button" @click="confirm">
			立即提现
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import Head from '@/components/head/head.vue'
	export default {
		components: {
			Head
		},
		computed:{
			...mapState(['info'])
		},
		data() {
			return {
				top: 0,
				num:'',
				type:0
			}
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
			confirm(){
				this.$api.applyWithdraw({
					type:this.type,
					money:this.num
				}).then(res=>{
					this.$utils.showToast(res.msg || '申请成功，1-3工作日提现完成')
					if(res.code == 1){
						this.$store.dispatch('updateUserInfo')
						this.$store.dispatch('updateIndexInfo')
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					}
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			goxieyi(){
				uni.navigateTo({
					url:'/pages/user/xieyi/xieyi?id=11'
				})
			},
		}
	}
</script>

<style lang="scss">
.ktx{
  padding: 50rpx 28rpx 0;
  .title{
    font-size: 24rpx;
    color: #A6A6A6;
  }
  .money{
    font-size: 68rpx;
    font-weight: bold;
    color: #333333;
    margin-top: 20rpx;
  }
}
.content-box{
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50rpx 50rpx 0 0;
  margin-top: 30rpx;
  min-height: calc(100vh - 300rpx);
  padding-top: 24rpx;
}
.button{
  width: 604rpx;
  height: 116rpx;
  background: #0DC7DA;
  border-radius: 58rpx;
  line-height: 116rpx;
	position: fixed;
	bottom: 80rpx;
	left: 50%;
	transform: translateX(-50%);
  box-shadow: none;
}
.input{
	width: 100%;
	height: 140rpx;
	background: #F9F9F9;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding: 0 30rpx;
	margin-top: 20rpx;
	input{
		font-size: 28rpx;
		margin-left: 20rpx;
	}
}
.tx-type{
  font-size: 28rpx;
  color: #C1C1C1;
}
.border-b{
  border-bottom: 1px solid #f3f3f3;
}
.forgot{
  display: flex;
  justify-content: center;
  font-size: 28rpx;
  color: #0DC7DA;
  margin-top: 50rpx;
}
</style>
