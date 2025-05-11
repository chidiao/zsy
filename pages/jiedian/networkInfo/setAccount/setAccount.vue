<template>
	<view class="page">
		<Head class="head" title="修改账号" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="flex_l ml-30 mt-20" @click="navto('./batchUp/batchUp?device_id='+device_id+'&name='+name)">
					<image src="/static/down.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
					<view class="ml-10 size-28">批量编辑</view>
				</view>
				<view class="box">
					<view class="item flex_l size-28 bold ptb-20" style="background: #E4FCFF;">
						<view>账号</view>
						<view>密码</view>
						<!-- <view>上行</view> -->
						<view>vlan</view>
						<view>更多</view>
					</view>
					<view class="item flex_l size-28 ptb-40" style="border-bottom: 1rpx solid #f8f8f8;"
						v-for="item in list">
						<view class="danhang pl-15">{{item.account}}</view>
						<view>{{item.password}}</view>
						<!-- <view>20</view> -->
						<view>{{item.vlanId}}</view>
						<view class="center">
							<!-- <text class="size-26 mr-20">e748</text> -->
							<image @click="navto('./set/set?item='+JSON.stringify(item)+'&device_id='+device_id+'&name='+name+'&cid='+cid)" src="../../../../static/set.png" style="width: 30rpx;height: 30rpx;" mode="">
							</image>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="footer flex">
				<view @click="navto('./set/set?title=添加&type=1')">添加</view>
				<view class="btn">删除</view>
			</view> -->
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
				device_id:'',
        name: '',
				list:[],
        cid: 1
			}
		},
		mounted() {
			this.getElInfo()
		},
		onLoad(e) {
			this.device_id = e.device_id
      this.cid = e.cid
			this.name = e.name
		},
		onShow() {
			this.init()
		},
		methods: {
			init(){
				this.$api.getNewNetInfo({
					device_id:this.device_id,
          name: this.name
				}).then(res=>{
					this.list = res.data.dialingInfo || res.data.dialStatusInfo
				})
			},
			handleTouchMove(event) {
				if (!this.allowSwipe) {
					event.stopPropagation();
				}
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			navto(url) {
				uni.navigateTo({
					url
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
				width: 33%;
				text-align: center;
        &:last-child{
          width: 100rpx;
          flex-shrink: 0;
        }
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