<template>
	<view class="page">
		<view class="head">
			<Head title="收款信息" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="flex row" @click="navto('./set/set?type=1&title=银行卡收款账户')">
					<view>银行卡</view>
					<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view class="flex row" @click="navto('./set/set?type=0&title=支付宝收款账户')">
					<view>支付宝</view>
					<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
			</view>
		</scroll-view>
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
				top: 0,
			}
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			navto(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style >
.row{
	width: 710rpx;
	height: 90rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 30rpx auto 0;
	padding: 0 34rpx;
	font-size: 28rpx;
}
</style>
