<template>
	<view class="page2">
		<view class="head">
			<u-navbar leftIcon=" " :fixed="false" :bgColor='bgColor'>
				<view class="flex" slot="left">
					<view class="sx center" @click="show = true">
						<image src="/static/screen.png" mode=""></image>
					</view>
					<view class="flex_l input ml-15" :style="{width: inputWidth + 'px'}">
						<image src="/static/search.png" mode=""></image>
						<input v-model="keyword" confirm-type="search" @confirm="search" type="text"
							placeholder="请输入搜索关键词">
					</view>
				</view>
			</u-navbar>
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}" :lower-threshold="100"
			:refresher-enabled="true" :refresher-triggered="triggered" :scroll-top='0' refresher-background="#f8f8f8"
			@scrolltolower="scrolltolower" @refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view style="height: 20rpx;"></view>
			<view class="box" @click="onCell(item)" v-for="(item,index) in dataList" :key="index">
				<view class="flex">
					<view class="flex">
						<view class="radius" v-if="item.onlineStatus == 'online'" style="background-color: #42DE00;">
						</view>
						<view class="radius" v-else style="background-color: #FF0000;"></view>
						<view class="size-26 danhang" style="width: 320rpx;" @click.stop="copy(item)">ID：{{item.device_id}}</view>
					</view>
					<view class="size-26" v-if="item.state_text == '服务中'" style="color: #42DE00;">{{ item.state_text }}
					</view>
					<view class="size-26" v-else-if="item.state_text == '待配置网络'" style="color: #333;">
						{{ item.state_text }}
					</view>
					<view class="size-26" v-else-if="item.state_text == '测试不通过'" style="color: #FF2C00;">
						{{ item.state_text }}
					</view>
					<view class="size-26" v-else-if="item.state_text == '审核中'" style="color: #D19200;">
						{{ item.state_text }}
					</view>
					<view class="size-26" v-else-if="item.state_text == '离线'" style="color: #999;">{{ item.state_text }}
					</view>
					<view class="size-26" v-else-if="item.state_text == '待测试'" style="color: #FF0000;">
						{{ item.state_text }}
					</view>
					<view class="size-26" v-else style="color: #333;">{{ item.state_text }}</view>
				</view>
				<view class="flex mt-28">
					<view class="size-26">备注：{{item.remark || '暂无备注'}}</view>
					<view class="bold">
						<text class="size-26">￥</text>
						<text class="size-40">{{item.yesterday_price}}</text>
					</view>
				</view>
				<view class="flex mt-10 size-26">
					<view>绑定时间：{{$u.timeFormat(item.create_time, 'yyyy-mm-dd')}}</view>
					<view>昨日收益</view>
				</view>
				<view style="height: 36rpx;border-bottom: 1rpx solid #F1F1F1;"></view>
				<view class="flex">
					<view class="flex pt-20"
						@click.stop="navto('/pages/jiedian/testResult/testResult?device_id='+item.device_id)">
						<view class="size-26 mr-10">测试结果</view>
						<image src="../../static/next.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
					</view>
					<view class="flex pt-20"
						@click.stop="wagnluonavto(item)">
						<view class="size-26 mr-10">网络信息</view>
						<image src="../../static/next.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-popup :show="show" @close="show = false" round="30" :safeAreaInsetBottom="false">
			<view class="div">
				<view class="mt-26 size-28 bold">当前阶段</view>
				<view class="ul flex flex-wrap">
					<view class="li" v-for="item in list" :key="item.id" :class="{avtive:state==item.id}" @click="state = item.id">
						{{item.name}}
					</view>
				</view>
				<view class="mt-26 size-28 bold">网络状态</view>
				<view class="ul flex flex-wrap">
					<view class="li" v-for="item in onlineStatusList" :class="{avtive: onlineStatus==item.id}"
						:key="item.id" @click="onlineStatus = item.id">{{ item.name }}</view>
					<view class="li opacity"></view>
				</view>
				<view class="flex mt-50">
					<view class="btns" @click="resetting(-1)">重置</view>
					<view class="button" style="width: 468rpx;height: 80rpx;line-height: 80rpx;" @click="search">确定
					</view>
				</view>
				<view style="height: 30rpx;"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import Head from '@/components/head/head.vue'
	export default {
		data() {
			return {
				bgColor: "rgba(0,0,0,0)",
				top: 0,
				show: false,
				list: [{
					name: '待配置网络',
					id: 'waitingForConfigNetwork'
				}, {
					name: '审核中	',
					id: 'auditing'
				}, {
					name: '服务中',
					id: 'serving'
				}, {
					name: '测试不通过',
					id: 'testedFailed'
				}, {
					name: '待测试',
					id: 'waitingForTest'
				}, {
					name: '已下机',
					id: 'abandoned'
				}],
				onlineStatusList: [{
					id: 'online',
					name: '在线'
				}, {
					id: 'offline',
					name: '离线'
				}],
				dataList: [],
				countes:1,
				page: 1,
				more: true,
				triggered: false,
				_triggered: false,
				keyword: '',
				state: '',
				onlineStatus: '',
				inputWidth: uni.upx2px(604)
			}
		},
		components: {
			Head
		},
		computed: {
			...mapState(['userInfo']),
		},
		mounted() {
			this.getElInfo()
		},
		onLoad() {
			// this.init()
			// #ifdef MP-WEIXIN
			const menuRect = uni.getMenuButtonBoundingClientRect()
			this.inputWidth = uni.upx2px(604) - menuRect.width
			// #endif
		},
		onShow() {
			console.log('+++++++++')
			const filter = uni.getStorageSync('jiedain-filter')
			if (filter) {
				uni.removeStorageSync('jiedain-filter')
				const {
					type,
					value,
					countes
				} = filter
				if (type === 'reset') {
					this.resetting(countes)
				} else {
					this.keyword = ''
					this.countes = countes
					this.state = ''
					this.onlineStatus = ''
					this[type] = value
					this.search()
				}
				
			} else {
				this.init()
			}
		},
		methods: {
			copy(item){
				uni.setClipboardData({
					data:item.device_id,
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					}
				})
			},
			wagnluonavto(item){
				if(item.device_channel_id == 3){
					uni.navigateTo({
						url:'/pages/node_details/pressurePostInfo/pressurePostInfo?channel_id='+item.device_id
					})
				}else{
					uni.navigateTo({
						url:'/pages/jiedian/networkInfo/networkInfo?device_id='+item.device_id
					})
				}
			},
			onCell(item) {
				if (item.device_channel_id == 3) {
					this.navto('/pages/node_details/details/details?channel_id=' + item.device_id)
				} else {
					this.navto('./detail/detail?device_id=' + item.device_id)
				}
			},
			resetting(countes) {
				this.countes = countes
				this.keyword = ''
				this.state = ''
				this.onlineStatus = ''
				this.page = 1
				this.more = true
				this.dataList.length = 0
				this.show = false
				this.init()
			},
			search() {
				this.countes = -1
				this.page = 1
				this.more = true
				this.dataList.length = 0
				this.show = false
				this.init()
			},
			onRefresh() {
				let that = this;
				if (that._triggered) {
					return;
				}
				that._triggered = true;
				if (!that.triggered) {
					that.triggered = true;
				}
				this.page = 1
				this.more = true
				this.dataList.length = 0
				this.init();
			},

			onRestore() {
				this.triggered = false;
				this._triggered = false;
			},
			scrolltolower() {
				if (this.more) {
					this.page++
					this.init()
				}
			},
			init() {
				const page = this.page
				const d = {
					page: page,
					size: 10,
					state: this.state,
					countes:this.countes,
					keyword: this.keyword
				}
				if (this.onlineStatus) {
					d.onlineStatus = this.onlineStatus
				}
				uni.showLoading({
					title: '加载中...'
				})
				let api = 'getMyDeviceList'
				if (d.onlineStatus || d.keyword || d.state) {
					api = 'searchMyDeviceList'
				}
				this.$api[api](d).then(res => {
					uni.hideLoading()
					this.triggered = false;
					this._triggered = false;
					if (res.data.length < 10) {
						this.more = false
					}
					if (page === 1) {
						this.dataList = res.data
					} else {
						this.dataList = this.dataList.concat(res.data)
					}
				}).catch(err => {
					uni.hideLoading()
				})
			},
			navto(url) {
				uni.navigateTo({
					url
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height + 20
				}).exec();
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-navbar__content__left--hover {
		opacity: 1 !important;
	}

	.avtive {
		background: #1AC4D6 !important;
		color: #fff !important;
	}

	.ul {
		.li {
			width: 200rpx;
			height: 60rpx;
			background: #F8F8F8;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			text-align: center;
			line-height: 60rpx;
			color: #333;
			font-size: 24rpx;
			margin-top: 20rpx;
		}

		.opacity {
			opacity: 0;
			pointer-events: none;
		}
	}

	.btns {
		width: 168rpx;
		height: 80rpx;
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		border: 2rpx solid #999999;
		text-align: center;
		line-height: 80rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.div {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		padding: 0 40rpx;
	}

	.box {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 34rpx 28rpx;
		margin: 0rpx auto 20rpx;

		.radius {
			width: 24rpx;
			height: 24rpx;
			margin-right: 12rpx;
		}
	}

	.input {
		width: 604rpx;
		height: 70rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 0rpx 2rpx rgba(217, 217, 217, 0.16);
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		padding: 0 30rpx;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		input {
			font-size: 26rpx;
			color: #666666;
			flex: 1;
			margin-left: 20rpx;
		}
	}

	.sx {
		width: 76rpx;
		height: 76rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 0rpx 2rpx rgba(217, 217, 217, 0.16);
		border-radius: 100rpx 100rpx 100rpx 100rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>