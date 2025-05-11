<template>
	<view class="page">
		<Head class="head" title="调整路线" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<!-- <swiper :duration="100" class="swiper" @touchstart.stop @touchmove="handleTouchMove">
				<swiper-item> -->
			<template v-if="type==1">
				<view class="over-hidden">
					<view class="box">
						<view class="item flex_l size-28 bold ptb-20" style="background: #E4FCFF;">
							<view>账号</view>
							<view>密码</view>
							<view>上行</view>
							<view>vlan</view>
							<view>更多</view>
						</view>
						<view class="item flex_l plr-15 size-28 ptb-40" style="border-bottom: 1rpx solid #f8f8f8;"
							v-for="item in list">
							<view class="danhang">{{item.account}}</view>
							<view>{{item.password}}</view>
							<view></view>
							<view>{{item.vlanId}}</view>
							<view class="center" @click="navto(item)" >
								<image src="../../../../static/set.png"style="width: 30rpx;height: 30rpx;" mode="">
								</image>
								<!-- <image src="../../../../static/del.png" style="width: 30rpx;height: 30rpx;"
									class="ml-40" mode=""></image> -->
							</view>
						</view>
					</view>
					<!-- <view class="box ptb-20 flex_l">
						<input type="text" placeholder="填写账号">
						<input type="text" placeholder="填写密码">
						<input type="text" placeholder="填写vlan">
						<image src="../../../../static/add.png" style="width: 50rpx;height: 50rpx;margin-left: 30rpx;"
							mode=""></image>
					</view> -->
				</view>
				<view class="footer flex">
					<!-- <view @click="syncNetcard">同步网卡信息</view> -->
					<view class="btn" style="width: 100%;" @click="syncNetcard">同步网卡信息</view>
				</view>
				<view style="height: 280rpx;"></view>
			</template>

			<template v-if="type==2">
				<view class="over-hidden">
					<view class="box">
						<view class="item flex_l size-28 bold ptb-20" style="background: #E4FCFF;">
							<view>序号</view>
							<view>账号</view>
							<view>密码</view>
							<view>vlan</view>
							<view>启用IPV6</view>
						</view>
						<view class="item flex_l size-28 ptb-40" style="border-bottom: 1rpx solid #f8f8f8;"
							v-for="item,index in list">
							<view>{{item.number+1}}</view>
							<view class="danhang">{{item.account}}</view>
							<view>{{item.password}}</view>
							<view>{{item.vlanId}}</view>
							<view class="center">
								<u-switch size="15" activeColor="#1AC4D6" @change="change($event,item,index)" :value="item.enableV6 == 0 ? false : true"></u-switch>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="footer flex">
					<view @click="type = 1">返回</view>
					<view class="btn">提交</view>
				</view> -->
			</template>
			<view style="height: 280rpx;"></view>
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
				value: true,
				type:1,
				device_id:'',
				list:[]
			}
		},
		mounted() {
			this.getElInfo()
		},
		onLoad(e) {
			this.type = e.type || 1
			this.device_id = e.device_id
		},
		onShow() {
			this.init()
		},
		methods: {
			change(e,item,index){
				var enableV6 = e ? 1 : 0
				this.$api.editDialInfo({
					enableV6,
					device_id:this.device_id,
					account:item.account,
					password:item.password,
					vlanId:item.vlanId
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						this.list[index].enableV6 = enableV6
					}
				})
			},
			init(){
				this.$api.getDialingInfo({
					device_id:this.device_id
				}).then(res=>{
					this.list = res.data.dialingInfo
				})
			},
			syncNetcard(){
				uni.showLoading({
					title:'同步中...'
				})
				this.$api.syncNetcard({
					device_id:this.device_id
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						this.init()
					}
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			navto(item) {
				uni.navigateTo({
					url: '/pages/jiedian/networkInfo/setAccount/set/set?item='+JSON.stringify(item)+'&device_id='+this.device_id
				})
			},
			stopTouchMove() {
				return false
			},
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
		height: 100%;
	}

	.footer {
		width: 100%;
		height: 110rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 100;
		view {
			width: 50%;
			text-align: center;
			line-height: 110rpx;
			font-size: 28rpx;
		}

		.btn {
			background: #1AC4D6;
			color: #fff;
		}
	}

	input {
		height: 60rpx;
		width: 200rpx;
		border-right: 1rpx solid #F1F1F1;
		text-align: center;
		font-size: 26rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.box {
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin: 30rpx auto 0;

		.item {
			view {
				width: 20%;
				text-align: center;
			}
		}

		.bor {
			width: 220rpx;
			height: 64rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border: 2rpx solid #1AC4D6;
			font-size: 28rpx;
			color: #1AC4D6;
			text-align: center;
			line-height: 64rpx;
		}
	}
</style>