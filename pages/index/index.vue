<template>
	<view class="page flex-col">
		<view class="group_1 flex-col">

			<text class="text_2">卓思云</text>
			<!-- #ifdef MP-WEIXIN -->
			<view class="box_2 flex-row">
				<view class="image-text_1 flex-row justify-between">
					<view class="box_3 flex-col"></view>

					<swiper circular="true" vertical="true" autoplay="true" interval="3000" duration="1000"
						class="margin-right30 swiperBox">
						<swiper-item v-for="(item,index) in adList" :key="index" class="row-me row-center swiperItem" @click="onNavs(item.id)">
							<text class="text-group_1" >
								{{ item.title }}

							</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="box_33 flex-row">
				<view class="image-text_1 flex-row justify-between">
					<view class="box_3 flex-col"></view>
			
					<swiper circular="true" vertical="true" autoplay="true" interval="3000" duration="1000"
						class="margin-right30 swiperBox">
						<swiper-item v-for="(item,index) in adList" :key="index" class="row-me row-center swiperItem">
							<text class="text-group_1">
								{{ item.title }}
			
							</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- #endif -->
			
			<view class="box_4 flex-col">
				<view class="box_5 flex-row justify-between">
					<view class="text-group_2 flex-col" @click="goWallet">
						<text class="text_3">可提现金额（元）</text>
						<text class="text_4">{{ info.money || "0" }}</text>
					</view>
					<view class="box_6 flex-col">
						<text class="text_5">冻结金额</text>
						<view class="text-wrapper_1">
							<text class="text_6">¥</text>
							<text class="text_7">{{ info.freeze_money || "0" }}</text>
						</view>
					</view>
					<view class="box_7 flex-row justify-between">
						<view class="text-group_3 flex-col">
							<text class="text_8">总收益(元)</text>
							<text class="text_9">{{ info.total_money || "0" }}</text>
						</view>
						<view class="text-group_4 flex-col">
							<text class="text_10">昨日收益</text>
							<view class="text-wrapper_2">
								<text class="text_11">¥</text>
								<text class="text_12">{{ info.yesterday_money || "0" }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box_8 flex-row justify-between">
					<view class="box_9 flex-row" @click="selectChannel('bindDevice')">
						<view class="image-text_2 flex-row justify-between">
							<image class="thumbnail_3" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/49608f4f223c33369ef7e91da8637229.png" />
							<text class="text-group_5">绑定设备</text>
						</view>
					</view>
					<view class="box_10 flex-row" @click="selectChannel('scan')">
						<view class="image-text_3 flex-row justify-between">
							<image class="thumbnail_4" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/0b5f120e2f3f36bc6d822b20d204a906.png" />
							<text class="text-group_6">扫一扫</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="group_2 flex-col">
			<view class="group_3 flex-col">
				<view class="group_4 flex-col">
					<view class="block_1 flex-row">
						<view class="text-group_7 flex-col">
							<text class="text_13">大量业务火热招募中</text>
							<text class="text_14">总有一款适合你，快来上机！</text>
						</view>
					</view>
					<view class="block_2 flex-row">
						<!-- <view class="block_3 flex-col"></view> -->
					</view>
					<view class="text-wrapper_3 flex-row" @click="onNav">
						<text class="text_16">立即查看</text>
					</view>
				</view>
			</view>
			<view class="group_5 flex-row justify-between">
				<view class="group_6 flex-col" @click="goJiedian('state', 'waitingForConfigNetwork')">
					<view class="image-text_4 flex-row justify-between">
						<image class="label_1" referrerpolicy="no-referrer"
							src="https://zs.weishangfeng.com/uploads/20241007/734bf9bb59f31a438144c839524fe027.png" />
						<text class="text-group_8">待配置网络</text>
					</view>
					<text class="text_17">{{ info.waiting_for_config_network_num || "0" }}</text>
					<view class="image-text_5 flex-row justify-between">
						<text class="text-group_9">了解详情</text>
						
					</view>
				</view>
				<view class="group_7 flex-col" >
					<view class="box_12 flex-row justify-between" @click="goJiedian('state', 'waitingForTest')">
						<image class="label_3" referrerpolicy="no-referrer"
							src="https://zs.weishangfeng.com/uploads/20241007/f7023fbcb9ad2b2fc45d4feb9cc11758.png" />
						<view class="text-group_11 flex-col">
							<text class="text_20">{{ info.waiting_for_test_num || "0" }}</text>
							<text class="text_21">待测试</text>
						</view>
					</view>
					<view class="box_12 flex-row justify-between" @click="goJiedian('state', 'testedFailed')" style="margin-top: 16px;">
						<image class="label_3" referrerpolicy="no-referrer"
							src="https://zs.weishangfeng.com/uploads/20241007/e46c95dd38361ccbb0c06487b9fe154e.png" />
						<view class="text-group_11 flex-col">
							<text class="text_20">{{ info.tested_failed_num || "0" }}</text>
							<text class="text_21">未通过</text>
						</view>
					</view>
				</view>
			</view>
			<view class="group_8 flex-col">
				<view class="box_13 flex-row justify-between">
					<view class="box_14 flex-col"></view>
					<text class="text_22">大节点</text>
				</view>
				<view class="section_2 flex-row">
					<view class="group_10 flex-row" @click="goJiedian('reset','',0)">
						<view class="image-text_7 flex-col">
							<image class="thumbnail_7" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/c39e22afa8f11ddee33b1ae73390b9ea.png" />
							<view class="text-group_13 flex-col">
								<text class="text_26">{{ info.total }}</text>
								<text class="text_27">节点总数</text>
							</view>
						</view>
					</view>
					<view class="group_11 flex-row" @click="goJiedian('onlineStatus','online',0)">
						<view class="image-text_8 flex-col">
							<image class="thumbnail_8" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/cd8223dae9a00ca2adfe04a033beafa7.png" />
							<view class="text-group_14 flex-col">
								<text class="text_28">{{ info.online_num }}</text>
								<text class="text_29">在线节点</text>
							</view>
						</view>
					</view>
					<view class="group_12 flex-row" @click="goJiedian('onlineStatus','offline',0)">
						<view class="image-text_9 flex-col">
							<image class="thumbnail_9" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/c355a2deeda2821dc63e88658aa4f8ad.png" />
							<view class="text-group_15 flex-col">
								<text class="text_30">{{ info.offline_num }}</text>
								<text class="text_31">离线节点</text>
							</view>
						</view>
					</view>
					<view class="group_13 flex-row" @click="goJiedian('state', 'testedFailed',0)">
						<view class="image-text_10 flex-col">
							<image class="thumbnail_10" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/325caca5f4793c9a4e68b40f81f4b09f.png" />
							<view class="text-group_16 flex-col">
								<text class="text_32">{{ info.abnormal_num }}</text>
								<text class="text_33">线路异常</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="group_9 flex-col">
				<view class="section_1 flex-row justify-between">
					<view class="box_15 flex-col"></view>
					<text class="text_25">小节点</text>
				</view>
				<view class="section_2 flex-row">
					<view class="group_10 flex-row" @click="goJiedian('reset','',1)">
						<view class="image-text_7 flex-col">
							<image class="thumbnail_7" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/c39e22afa8f11ddee33b1ae73390b9ea.png" />
							<view class="text-group_13 flex-col">
								<text class="text_26">{{ info.small_total }}</text>
								<text class="text_27">节点总数</text>
							</view>
						</view>
					</view>
					<view class="group_11 flex-row" @click="goJiedian('onlineStatus','online',1)">
						<view class="image-text_8 flex-col">
							<image class="thumbnail_8" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/cd8223dae9a00ca2adfe04a033beafa7.png" />
							<view class="text-group_14 flex-col">
								<text class="text_28">{{ info.small_online_num }}</text>
								<text class="text_29">在线节点</text>
							</view>
						</view>
					</view>
					<view class="group_12 flex-row" @click="goJiedian('onlineStatus','offline',1)">
						<view class="image-text_9 flex-col">
							<image class="thumbnail_9" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/c355a2deeda2821dc63e88658aa4f8ad.png" />
							<view class="text-group_15 flex-col">
								<text class="text_30">{{ info.small_offline_num }}</text>
								<text class="text_31">离线节点</text>
							</view>
						</view>
					</view>
					<view class="group_13 flex-row" @click="goJiedian('state', 'testedFailed',1)">
						<view class="image-text_10 flex-col">
							<image class="thumbnail_10" referrerpolicy="no-referrer"
								src="https://zs.weishangfeng.com/uploads/20241007/325caca5f4793c9a4e68b40f81f4b09f.png" />
							<view class="text-group_16 flex-col">
								<text class="text_32">{{ info.small_abnormal_num }}</text>
								<text class="text_33">线路异常</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text-wrapper_4 flex-col" @click="copyText">
			</view>
		</view>
		<u-picker :show="showSelect" mode="single-column" :columns="channelList" @confirm="confirm"
			@cancel="showSelect = false" @close="showSelect = false" confirmColor="#0DC7DA" title="选择渠道" keyName="name"
			immediateChange :closeOnClickOverlay="true"></u-picker>
	</view>

	</view>
</template>
<script>
	  import {url} from "@/config/config.js"
	import {
		mapState
	} from "vuex";
	import Head from "@/components/head/head.vue";
	export default {
		data() {
			return {
				top: 0,

				title: "Hello",
				bgColor: "rgba(0,0,0,0)",
				showSelect: false,
				type: "",
				isGetChannelList: true,
				adList: [

				],
				channelList: [],
				channelId: "",
				
				constants: {},
			};
		},
		computed: {
			...mapState(["userInfo", "info", "token"]),
		},

		onShow() {
			this.$store.dispatch('updateUserInfo')
			this.$store.dispatch('updateIndexInfo')
			this.$api.getSystemNoticeList({
				page: this.page,
				size: 999999,
			}).then(res => {

				this.adList = this.adList.concat(res.data.data)
			})
			
		},

		onLoad() {
			this.getChannelList(1);
		},
		methods: {
			copyText() {
				if (!this.userInfo) {
					uni.showToast({
						title: '请先登录',
						icon: 'success',
						duration: 2000
					});
					return;
				}
				uni.setClipboardData({
					data: 'https://zs.weishangfeng.com/h5/#/?pid=' + this.userInfo.id,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					}
				});
			},
			onNav() {
				uni.navigateTo({
					url: '/pages/index/demand/demand'
				})
			},
			onNavs(id) {
				uni.navigateTo({
					url:'/pages/user/news/detail/detail?id='+id
				})
			},
			// 选择渠道
			confirm(e) {
				this.channelId = e.value[0].id;
				this.showSelect = false;
				if (this.type === "scan") {
					this.scanCode();
				} else {
					this.navto('./bindDevice/bindDevice?channel_id=' + this.channelId)
				}
			},
			getChannelList(showError) {
				this.$api
					.getDeviceChannel()
					.then((res) => {
						this.channelList = [res.data];
					})
					.catch((err) => {
						if (showError)
							this.$utils.showToast(err.msg || "获取渠道失败,请稍后重试");
					});
			},
			// 点击选择渠道
			async selectChannel(type) {
				this.type = type;
				if (!this.isGetChannelList) {
					await this.getChannelList();
				}
				this.showSelect = true;
			},
			goJiedian(type, value,countes = 0) {
				uni.setStorageSync("jiedain-filter", {
					type,
					value,
					countes
				});
				if(countes == 1){
					uni.switchTab({
						url: `/pages/jiedian/smalljiedian`,
					});
				}else{
					uni.switchTab({
						url: `/pages/jiedian/jiedian`,
					});
				}
			},
			goWallet(url) {
				uni.switchTab({
					url: "/pages/wallet/wallet",
				});
			},
			showModel() {
				return new Promise((resolve, reject) => {
					plus.android.checkPermission("android.permission.CAMERA", (e) => {
						if (e.checkResult === -1) {
							uni.showModal({
								title: "提示",
								content: "应用将需要您授权相机权限，来打开扫一扫？",
								confirmText: "同意",
								success(res) {
									if (res.confirm) {
										resolve();
									} else {
										reject();
									}
								},
							});
						} else {
							resolve();
						}
					});
				});
			},
			async scanCode() {
				// #ifdef APP
				if (uni.getSystemInfoSync().osName === "android") {
					await this.showModel();
				}
				// #endif
				uni.scanCode({
					onlyFromCamera: true,
					scanType: ["qrCode"],
					success: (res) => {
						console.log(res); // 打印扫描结果
						var param = res.result;
						if (param.includes("?")) {
							param = param.split("?")[1].slice(10);
						}
						uni.navigateTo({
							url: "./bindDevice/bindDevice?device_id=" +
								param +
								"&channel_id=" +
								this.channelId,
						});
					},
					fail: (res) => {
						console.log(res);
						this.$utils.showToast(res.errMsg);
					},
				});
			},
			navto(url) {
				console.log(url,'---------')
				uni.navigateTo({
					url,
				});
			}
		},
	};
</script>
<style>
	body *,
	page view {
		box-sizing: border-box;
		flex-shrink: 0;
	}

	body {
		font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
			Arial, PingFang SC-Light, Microsoft YaHei;
		margin: 0;
	}

	button {
		margin: 0;
		padding: 0;
		border: 1px solid transparent;
		outline: none;
		background-color: transparent;
	}

	button:active {
		opacity: 0.6;
	}

	.swiperBox {
		padding-left: 10rpx;
		width: 100%;
		height: 50rpx;

	}
	.horn {
		width: 40rpx;
		height: 40rpx;
	}
	.txt1 {
		color: #4E9D77;
	}
	.txt2 {
		color: #F29A38;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.justify-start {
		display: flex;
		justify-content: flex-start;
	}

	.justify-center {
		display: flex;
		justify-content: center;
	}

	.justify-end {
		display: flex;
		justify-content: flex-end;
	}

	.justify-evenly {
		display: flex;
		justify-content: space-evenly;
	}

	.justify-around {
		display: flex;
		justify-content: space-around;
	}

	.justify-between {
		display: flex;
		justify-content: space-between;
	}

	.align-start {
		display: flex;
		align-items: flex-start;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.align-end {
		display: flex;
		align-items: flex-end;
	}

	.page {

		background: #F5F9FF;
		position: relative;
		width: 750rpx;
		height: 2002rpx;
		overflow: hidden;
	}

	.group_1 {
		background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/30aa967f7e8b40919e76b0e407c27df8_mergeImage.png);
		padding: 22rpx 24rpx 32rpx 38rpx;
	}

	.box_1 {
		margin: 0 6rpx 0 4rpx;
	}

	.text_1 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 30rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 42rpx;
	}

	.thumbnail_1 {
		width: 34rpx;
		height: 22rpx;
		margin: 14rpx 0 6rpx 438rpx;
	}

	.thumbnail_2 {
		width: 30rpx;
		height: 22rpx;
		margin: 12rpx 0 8rpx 10rpx;
	}

	.image_1 {
		width: 48rpx;
		height: 22rpx;
		margin: 12rpx 0 8rpx 10rpx;
	}

	.text_2 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		line-height: 44rpx;
		margin: 44rpx 302rpx 0 290rpx;
	}
	.box_33 {
		
		width: 344px;
		
		height: 32px;
		background: linear-gradient( 270deg, #F3F7FB 0%, #E4EBF4 100%);
		border-radius: 16px;
		border: 1px solid #EEF6FF;
		margin-top: 18rpx;
		padding: 8rpx 30rpx 8rpx 8rpx;
	}
	.box_2 {
		
		width: 290px;
		
		height: 32px;
		background: linear-gradient( 270deg, #F3F7FB 0%, #E4EBF4 100%);
		border-radius: 16px;
		border: 1px solid #EEF6FF;
		margin-top: 18rpx;
		padding: 8rpx 30rpx 8rpx 8rpx;
	}
	.image-text_1 {
		width: 650rpx;
	}

	.box_3 {
		width: 48rpx;
		height: 48rpx;
		background: url(https://zs.weishangfeng.com/uploads/20241007/2d1ec8739ec413f7284f0cc4042969e3.png) -2rpx 0rpx no-repeat;
		background-size: 52rpx 52rpx;
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 28rpx;
		margin-top: 10rpx;
	}

	.box_4 {
		background-image: url('https://zs.weishangfeng.com/uploads/20241007/163650556c17deab1decd32c715d1f5f.png');
		background-repeat: no-repeat;
		/* 设置背景不重复 */
		background-size: cover;
		/* 背景图片覆盖整个容器 */
		border-radius: 16px;
		margin-top: 32rpx;
		padding: 48rpx 32rpx 54rpx 32rpx;
	}

	.box_5 {
		position: relative;
		width: 624rpx;
		background: url('https://zs.weishangfeng.com/uploads/20241007/870cd904541b9d8c1765361abd448b73.png') 100% no-repeat;
		background-size: 100% 100%;
		padding: 44rpx 32rpx 186rpx 28rpx;
	}

	.text-group_2 {}

	.text_3 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text_4 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 52rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 52rpx;
		margin: 18rpx 54rpx 0 0;
	}

	.box_6 {
		margin-bottom: 12rpx;
	}

	.text_5 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
	}

	.text-wrapper_1 {
		width: 66rpx;
		height: 40rpx;
		overflow-wrap: break-word;
		font-size: 0;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin: 22rpx 0 0 30rpx;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 28rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.box_7 {
		position: absolute;
		left: 0;
		top: 156rpx;
		width: 624rpx;
		/* height: 156rpx; */

		padding: 34rpx 32rpx 34rpx 28rpx;
	}

	.text-group_3 {}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 28rpx;
		margin-right: 14rpx;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 40rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-top: 20rpx;
	}

	.text-group_4 {
		margin: 2rpx 0 2rpx 0;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
	}

	.text-wrapper_2 {
		width: 66rpx;
		height: 40rpx;
		overflow-wrap: break-word;
		font-size: 0;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-top:25rpx;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.box_8 {
		width: 624rpx;
		margin-top: 30rpx;
	}

	.box_9 {
		background-color: rgba(255, 255, 255, 0.67);
		border-radius: 8px;
		padding: 26rpx 62rpx 24rpx 62rpx;
	}

	.image-text_2 {
		width: 172rpx;
	}

	.thumbnail_3 {
		width: 40rpx;
		height: 40rpx;
	}

	.text-group_5 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.box_10 {
		background-color: rgba(255, 255, 255, 0.67);
		border-radius: 8px;
		padding: 26rpx 76rpx 24rpx 76rpx;
	}

	.image-text_3 {
		width: 144rpx;
	}

	.thumbnail_4 {
		width: 40rpx;
		height: 40rpx;
	}

	.text-group_6 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.group_2 {
		position: relative;
		padding: 20rpx 24rpx 48rpx 38rpx;
	}

	.group_3 {
		background: url(https://zs.weishangfeng.com/uploads/20241007/e62323509fc95ed340c9fdb25e3ae72b.png) 100% no-repeat;
		background-size: 100% 100%;
	}

	.group_4 {

		background-repeat: no-repeat;
		/* 设置背景不重复 */
		background-size: cover;
		/* 背景图片覆盖整个容器 */
		border-radius: 10px;
		position: relative;
		padding: 32rpx 72rpx 26rpx 32rpx;
	}

	.block_1 {
		margin-right: 272rpx;
	}

	.text-group_7 {}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(39, 167, 186, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		margin-right: 60rpx;
	}

	.text_14 {
		overflow-wrap: break-word;
		color: rgba(39, 167, 186, 0.65);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.block_2 {
		margin: 16rpx 0 0 392rpx;
	}

	

	.text-wrapper_3 {
		width: 106px;
		height: 27px;
		background: linear-gradient( 102deg, #FE5879 0%, #FFA1B7 100%);
		border-radius: 14px;
		position: absolute;
		left: 416rpx;
		top: 84rpx;
		width: 212rpx;
		height: 54rpx;
		padding: 12rpx 58rpx 8rpx 58rpx;
	}

	.text_15 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 34rpx;
	}

	.text_16 {
		position: absolute;
		left: 58rpx;
		top: 10rpx;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 34rpx;
	}

	.group_5 {
		width: 670rpx;
		
		margin: 32rpx 16rpx 32rpx 2rpx;
	}

	.group_6 {
		width: 320rpx;
		background: linear-gradient( 180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
		border-radius: 16px;
		padding: 32rpx 36rpx 32rpx 24rpx;
	}

	.image-text_4 {
		width: 216rpx;
		margin-right: 44rpx;
	}

	.label_1 {
		width: 56rpx;
		height: 56rpx;
	}

	.text-group_8 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-top: 8rpx;
	}

	.text_17 {
		height: 92rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 92rpx;
		font-family: DINCondensed-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 110rpx;
		margin: 64rpx 220rpx 0 4rpx;
	}

	.image-text_5 {
		width: 116rpx;
		margin-left: 144rpx;
	}

	.text-group_9 {
		overflow-wrap: break-word;
		color: rgba(76, 229, 246, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
	}

	.thumbnail_5 {
		width: 12rpx;
		height: 12rpx;
		margin: 6rpx 0 6rpx 0;
	}

	.group_7 {
		width: 320rpx;
		/* width: 320rpx;
		background: linear-gradient( 180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
		border-radius: 16px;
		padding: 32rpx 36rpx 32rpx 24rpx; */
	}

	.box_11 {
		
		background: linear-gradient( 180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
		border-radius: 16px;
		padding: 30rpx 48rpx 28rpx 30rpx;
	}

	.label_2 {
		width: 60rpx;
		height: 60rpx;
		margin: 8rpx 0 8rpx 0;
	}

	.text-group_10 {}

	.text_18 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
	}

	.text_19 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 20rpx;
	}

	.box_12 {
		width: 300rpx;
		margin-left: -20rpx;
		background: linear-gradient( 180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
		border-radius: 32rpx;
		/* margin-top: 32rpx; */
		padding: 30rpx 58rpx 28rpx 30rpx;
	}

	.label_3 {
		width: 60rpx;
		height: 60rpx;
		margin: 8rpx 0 8rpx 0;
	}

	.text-group_11 {
		margin-left: 30rpx;
	}

	.text_20 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
	}

	.text_21 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 20rpx;
	}

	.group_8 {
		width: 688rpx;
		background: linear-gradient( 180deg, #D6FBFF 0%, #FFFFFF 100%);
		border-radius: 16px;
		border: 1px solid #FFFFFF;
		padding: 32rpx 32rpx 30rpx 32rpx;
	}

	.box_13 {
		width: 110rpx;
		margin-right: 514rpx;
	}

	.box_14 {
		background-color: rgba(76, 229, 246, 1);
		width: 6rpx;
		height: 32rpx;
	}

	.text_22 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 28rpx;
		margin-top: 2rpx;
	}

	.list_1 {
		width: 624rpx;
		height: 160rpx;
		margin-top: 20rpx;
	}

	.image-text_6 {
		border-radius: 8px;
		margin-right: 22rpx;
		padding: 16rpx 22rpx 16rpx 22rpx;
	}

	.thumbnail_6 {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.text-group_12 {
		margin-top: 16rpx;
	}

	.text_23 {
		overflow-wrap: break-word;
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		align-self: center;
	}

	.text_24 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.group_9 {
		width: 688rpx;
		height: 274rpx;
		background: linear-gradient( 180deg, #D6FBFF 0%, #FFFFFF 100%);
		border-radius: 32rpx;
		border: 2rpx solid #FFFFFF;
		margin-top: 32rpx;
		padding: 32rpx 32rpx 30rpx 32rpx;
	}

	.section_1 {
		width: 110rpx;
		margin-right: 514rpx;
	}

	.box_15 {
		background-color: rgba(76, 229, 246, 1);
		width: 6rpx;
		height: 32rpx;
	}

	.text_25 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 28rpx;
		margin-top: 2rpx;
	}

	.section_2 {
		margin-top: 20rpx;
	}

	.group_10 {
		background-color: rgba(245, 249, 255, 0.39);
		border-radius: 8px;
		padding: 16rpx 22rpx 16rpx 22rpx;
	}

	.image-text_7 {}

	.thumbnail_7 {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.text-group_13 {
		margin-top: 16rpx;
	}

	.text_26 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		align-self: center;
	}

	.text_27 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.group_11 {
		background-color: rgba(245, 249, 255, 0.39);
		border-radius: 8px;
		margin-left: 22rpx;
		padding: 16rpx 22rpx 16rpx 22rpx;
	}

	.image-text_8 {}

	.thumbnail_8 {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.text-group_14 {
		margin-top: 16rpx;
	}

	.text_28 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		align-self: center;
	}

	.text_29 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.group_12 {
		background-color: rgba(245, 249, 255, 0.39);
		border-radius: 8px;
		margin-left: 20rpx;
		padding: 16rpx 22rpx 16rpx 22rpx;
	}

	.image-text_9 {}

	.thumbnail_9 {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.text-group_15 {
		margin-top: 16rpx;
	}

	.text_30 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		align-self: center;
	}

	.text_31 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.group_13 {
		background-color: rgba(253, 142, 173, 0.11);
		border-radius: 8px;
		margin-left: 22rpx;
		padding: 16rpx 22rpx 16rpx 22rpx;
	}

	.image-text_10 {}

	.thumbnail_10 {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.text-group_16 {
		margin-top: 16rpx;
	}

	.text_32 {
		overflow-wrap: break-word;
		color: rgba(252, 92, 125, 1);
		font-size: 32rpx;
		font-family: DINAlternate-Bold;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 32rpx;
		align-self: center;
	}

	.text_33 {
		overflow-wrap: break-word;
		color: rgba(162, 171, 193, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 24rpx;
	}

	.text-wrapper_4 {
		box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 1);
		border-radius: 23px 0px 0px 23px;
		background-image: url(https://zs.weishangfeng.com/uploads/20241007/e2d299e27773d129808e3c4615a27889.png);
		background-repeat: no-repeat;
		/* 设置背景不重复 */
		background-size: cover;
		/* 背景图片覆盖整个容器 */
		height: 92rpx;
		width: 284rpx;
		position: fixed;
		left: 466rpx;
		bottom: 80rpx;
		padding: 22rpx 22rpx 20rpx 94rpx;
	}

	.text_34 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 42rpx;
		font-family: DingTalk-JinBuTi;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 50rpx;
	}


</style>