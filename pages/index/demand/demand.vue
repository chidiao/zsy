<template>
	<view class="page flex-col">
		<view class="section_1 flex-col">
			<view class="section_2 flex-row">
				<text class="text_1" style="height: 40rpx;"></text>


			</view>
			<view class="section_3 flex-row justify-between" @click="back">
				<image class="thumbnail_3" referrerpolicy="no-referrer"
					src="https://zs.weishangfeng.com/uploads/20241007/172e869e4bfec4223ec483c112653e3b.png" />
				<text class="text_2">业务要求速查</text>
			</view>
			<view class="section_4 flex-row">
				<view class="image-text_1 flex-row justify-between">
					<view class="block_1 flex-col">


					</view>
					<view class="block_2 flex-col" v-if="show" @click="shows">
						<view class="group_1 flex-row">
							<view class="image-text_2 flex-row justify-between">
								<text class="text-group_2">展开</text>
								<image class="thumbnail_4" referrerpolicy="no-referrer"
									src="https://zs.weishangfeng.com/uploads/20241007/5c656aa66ae76a033b87ef24d8c9f3e7.png" />
							</view>
						</view>
					</view>
					<view class="block_2 flex-col" v-else @click="shows">
						<view class="group_1 flex-row">
							<view class="image-text_2 flex-row justify-between">
								<text class="text-group_2">收起</text>
								<image class="thumbnail_4" referrerpolicy="no-referrer"
									src="https://zs.weishangfeng.com/uploads/20241007/4320910f735ea2f61282fd4c92668e54.png" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="section_5  flex-row" v-if="show">

			<view class="section_6 flex-col">
				<view class="list_1  flex-row">
					<view class="image-text_5 flex-col " :style="{ background: item.lanhuBg0 }"
						v-for="(item, index) in loopData1" :key="index" @click="changeTab(item,index)">
						<image class="image_4" referrerpolicy="no-referrer" :src="item.image" />
						<text class="text-group_4">{{item.name}}</text>
					</view>
				</view>
				<view id="sv-box" style="margin: 56rpx 59rpx 0 0;">
					<text class="text_3">{{ pname }}</text>
					<view class="text-wrapper_1 flex-row">
						<text class="text_4">序号</text>
						<text class="text_5">省份</text>
						<text class="paragraph_1">
							电信
							<br />
							缺口
						</text>
						<text class="paragraph_2">
							联通
							<br />
							缺口
						</text>
						<text class="paragraph_3">
							移动
							<br />
							缺口
						</text>
					</view>

						<view class="text-wrapper_2 flex-row" style="" v-for="(item, index) in list" :key="index">
							<text class="text_6">{{ index+1 }}</text>
							<text class="text_7">{{ item.province }}</text>
							<text class="text_8">{{ item.telecom_num }}</text>
							<text class="text_9">{{ item.unicom_num }}</text>
							<text class="text_10">{{ item.movement_num }}</text>
						</view>
				</view>
				<view class="block_3 flex-row" @click="uniLookFile">
					<view class="image-text_6 flex-row justify-between">
						<text class="text-group_5">上机指南</text>
						<image class="thumbnail_5" referrerpolicy="no-referrer"
							src="https://zs.weishangfeng.com/uploads/20241007/298b196c471436f6248041e026c38087.png" />
					</view>
				</view>
			</view>

		</view>
		<view class="section_21 flex-col" v-else>
			<scroll-view class="scroll-view" style="height: 100%;" scroll-y="true" @scrolltolower="scrolltolowerFnc">
				<view class="grid_11 flex-row" style="padding-bottom: 240px;">

					<view class="list-items_11 flex-col" :style="{ background: item.lanhuBg0 }"
						v-for="(item, index) in loopData1" :key="index" @click="changeTab(item,index)">
						<text v-if="item.slot1 === 1" class="text_31">{{item.specialSlot1.lanhutext0}}</text>
						<image class="label_11" referrerpolicy="no-referrer" :src="item.image" />
						<text class="text_41">{{ item.name }}</text>
					</view>

				</view>
			</scroll-view>
		</view>

	</view>
</template>
<script>
	import {
		url
	} from '@/config/config.js'
	import {
		getBusinessList,
		getBusinessInfo
	} from '@/config/api.js'
	export default {
		data() {
			return {
				show: true,
				default_image: "url(https://zs.weishangfeng.com/uploads/20241007/420c6931d47712fce24b5a768cd75975.png) -1px 0px no-repeat",
				default_no_image: "url(https://zs.weishangfeng.com/uploads/20241007/1a83c7b7ffd6098a8e5b0aa01ac96656.png) 0px 0px no-repeat",
				loopData1: [],
				pname: '',
				list: [],
				constants: {},
				file: '',
				page: 1,
				top: 0,
				id: 0,
				triggered: false,
				_triggered: false,
				more: true,
			};
		},

		onLoad() {},
		onShow() {
			const that = this
			that.$api.getBusinessList().then(res => {
				that.loopData1 = [];
				var new_data = res.data;

				that.loopData1 = that.loopData1.concat(res.data)
				that.loopData1.forEach((item, index) => {
					this.id = item.id;
					if (index == 0) {
						item.lanhuBg0 = that.default_image
						this.pname = item.name
						this.file = item.file
						this.init()
					} else {
						item.lanhuBg0 = that.default_no_image
					}
				});
			})
		},
		methods: {
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
				this.list.length = 0
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
				uni.showLoading({
					title: '加载中...'
				})
				this.$api.getBusinessInfo({
					id: this.id,
					page: this.page
				}).then(datas => {
					uni.hideLoading()
					this.triggered = false;
					this._triggered = false;
					if (datas.data.length < 999) {
						this.more = false
					}
					if (page === 1) {
						this.list = datas.data
					} else {
						this.list = this.list.concat(datas.data)
					}
				})
			},
			uniLookFile() {
				console.log(this.file)
				const arr = this.file.split('.');
				const type = arr[arr.length - 1];
				uni.downloadFile({
					url: this.file,
					success: ({
						tempFilePath
					}) => {
						console.log('tempFilePath', tempFilePath);
						uni.saveFile({
							tempFilePath: tempFilePath,
							success: ({
								savedFilePath
							}) => {
								uni.showModal({
									title: '提示',
									content: '文档已保存',
									cancelText: '我知道了',
									confirmText: '打开文档',
									success: function(res) {
										if (res.confirm) {
											uni.openDocument({
												filePath: savedFilePath,
												fileType: type,
												showMenu: true,
												success: () => {
													uni.showToast({
														title: '打开文档成功',
														icon: 'success',
														mask: true,
													});
												},
												fail: (error) => {
													console.log('error',
														error);
												},
											});
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									},
								});
							},
							fail: (error) => {
								console.log('error', error);
							},
						});
					},
					fail: (error) => {
						console.log('error', error);
					},
				});
			},
			changeTab(item, index) {
				console.log('索引++++++', index)
				console.log('数据++++++', item)
				for (let i = 0; i < this.loopData1.length; i++) {
					if (index != i) {
						this.loopData1[i].lanhuBg0 = this.default_no_image
					} else {
						this.loopData1[i].lanhuBg0 = this.default_image
					}
				}
				this.pname = item.name
				this.file = item.file
				this.list = []
				this.init()
				this.show = true
			},

			back() {
				uni.navigateBack();
			},
			shows() {
				if (this.show) {
					this.show = false
				} else {
					this.show = true
				}
				return;
			},
			scrolltolowerFnc() {
				console.log("触底了")
				if (this.goodScroll) return
			}
		},
	};
</script>
<style>
	body{
		height: 4912rpx;
	}
	.page {
		background-color: rgba(245, 249, 255, 1);
		/* position: fixed; */
		width: 750rpx;
		/* height: 100vh; */
		/* height: 4912rpx; */
		/* overflow: hidden; */
		/* left: 0;
		top: 0;
		right: 0; */
		
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;
	}

	.section_21 {
		position: absolute;
		left: 0;
		top: 33%;
		width: 750rpx;
		/* height: 2570rpx; */

	}

	.grid_11 {
		width: 688rpx;
		/* height: 1520rpx; */
		flex-wrap: wrap;
		margin: 0 24rpx 138rpx 40rpx;
	}

	.list-items_11 {
		position: relative;
		width: 160rpx;
		height: 200rpx;
		background-size: 100% 100%;
		margin: 0 16rpx 20rpx 0;
		padding: 20rpx 52rpx 38rpx 20rpx;
	}

	.list-items_11:nth-child(4n) {
		margin-right: 0;
	}

	.list-items_11:nth-last-child(-n + 4) {
		margin-bottom: 0;
	}

	.text_31 {
		position: absolute;
		left: 28rpx;
		top: 18rpx;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.label_11 {
		width: 64rpx;
		height: 66rpx;
		margin-right: 24rpx;
	}

	.text_41 {
		width: 86rpx;
		overflow-wrap: break-word;
		color: rgba(9, 4, 54, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin: 52rpx 0 0 2rpx;
	}

	.section_1 {
		background: url('https://zs.weishangfeng.com/uploads/20241007/4470720e53c571f3ad9299a400ab7a56.png') 100% no-repeat;
		background-size: 100% 100%;
		padding-bottom: 108rpx;
	}

	.section_2 {
		background-color: rgba(0, 0, 0, 0);
		padding: 22rpx 30rpx 24rpx 42rpx;
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

	.section_3 {
		width: 236rpx;
		margin: 20rpx 474rpx 0 40rpx;
	}

	.thumbnail_3 {
		width: 40rpx;
		height: 40rpx;
		margin: 4rpx 0 0 0;
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
	}

	.section_4 {
		position: relative;
		margin: 44rpx 32rpx 0 40rpx;
		padding: 0 0 138rpx 30rpx;
	}

	.image-text_1 {
		width: 648rpx;
	}

	.block_1 {
		margin: 52rpx 0 172rpx 0;
	}

	.image_2 {
		width: 318rpx;
		height: 32rpx;
		margin: 0 18rpx 0 2rpx;
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 0.65);
		font-size: 26rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin-top: 28rpx;
	}

	.block_2 {}

	.group_1 {
		background-color: rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		position: relative;
		width: 148rpx;
		margin: 158rpx -8rpx 94rpx 132rpx;
		padding: 12rpx 22rpx 10rpx 28rpx;
	}

	.image-text_2 {
		width: 98rpx;
	}

	.text-group_2 {
		overflow-wrap: break-word;
		color: rgba(128, 243, 251, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 34rpx;
	}

	.thumbnail_4 {
		width: 32rpx;
		height: 32rpx;
		margin: 0 0 8rpx 0;
	}

	.image-text_3 {
		position: absolute;
		left: 28rpx;
		top: 12rpx;
		width: 98rpx;
		height: 34rpx;
	}



	.image-text_4 {}

	.image_3 {
		width: 100rpx;
		height: 100rpx;
		margin-right: 6rpx;
	}

	.text-group_3 {
		overflow-wrap: break-word;
		color: rgba(9, 4, 54, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin: 38rpx 0 0 22rpx;
	}

	.section_5 {
		position: absolute;
		left: 0;
		top: 674rpx;
		width: 750rpx;
		/* height: 4238rpx; */
		background: url(https://zs.weishangfeng.com/uploads/20241007/5fc81eed5ac7a43d0353eee04a75cd0f.png) 100% no-repeat;
		background-size: 100% 100%;
		padding: 0 24rpx 32rpx 0;
	}

	.section_6 {
		position: relative;
		/* height: 4100rpx; */
		margin-bottom: 106rpx;
		padding: 0 24rpx 36rpx 38rpx;
	}

	.list_1 {
		width: 675rpx;
		height: 200rpx;
		overflow: hidden;
		margin: -232rpx 0 0 0;
	}

	.image-text_5 {
		background-size: 162rpx 200rpx;
		margin-right: 14rpx;
		padding: 0 56rpx 38rpx 0;
	}

	.image_4 {
		width: 100rpx;
		height: 100rpx;
		margin-right: 4rpx;
	}

	.text-group_4 {
		width: 84rpx;
		overflow-wrap: break-word;
		color: rgba(9, 4, 54, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 24rpx;
		margin: 38rpx 0 0 22rpx;
	}

	.text_3 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 44rpx;
		/* margin: 56rpx 592rpx 0 0; */
	}

	.text-wrapper_1 {
		width: 624rpx;
		align-self: center;
		margin-top: 60rpx;
	}

	.text_4 {
		width: 50rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		/* margin-top: 14rpx; */
		margin: 14rpx 0 0 24rpx;
	}

	.text_5 {
		width: 50rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin: 14rpx 0 0 58rpx;
	}

	.paragraph_1 {
		width: 52rpx;
		height: 68rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: center;
		line-height: 34rpx;
		margin-left: 118rpx;
	}

	.paragraph_2 {
		width: 52rpx;
		height: 68rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: center;
		line-height: 34rpx;
		margin-left: 84rpx;
	}

	.paragraph_3 {
		width: 52rpx;
		height: 68rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: center;
		line-height: 34rpx;
		margin-left: 92rpx;
	}

	.text-wrapper_2 {
		background-color: rgba(245, 249, 255, 0.39);
		margin-top: 28rpx;

		padding: 34rpx 46rpx 34rpx 32rpx;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(56, 70, 97, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(56, 70, 97, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-left: 92rpx;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(56, 70, 97, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-left: 92rpx;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(56, 70, 97, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-left: 116rpx;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(56, 70, 97, 1);
		font-size: 28rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin-left: 100rpx;
	}

	.text-wrapper_3 {
		margin: 34rpx 46rpx 0 32rpx;
	}


	.block_3 {
		background-image: url('https://zs.weishangfeng.com/uploads/20241007/298b196c471436f6248041e026c38087.png');
		background-size: contain;
		background-repeat: no-repeat;
		border-radius: 8px;
		position: absolute;
		left: 426rpx;
		top: -4rpx;
		width: 300rpx;
		height: 72rpx;
		padding: 20rpx 62rpx 18rpx 102rpx;
	}

	.image-text_6 {
		width: 136rpx;
	}

	.text-group_5 {
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
		line-height: 34rpx;
	}

	.thumbnail_5 {
		width: 20rpx;
		height: 20rpx;
		margin: 6rpx 0 8rpx 0;
	}


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
</style>