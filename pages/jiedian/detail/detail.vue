<template>
	<view class="page2">
		<Head class="head" title="节点详情" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}" v-if="info.channel_id">
			<view class="over-hidden">
				<view class="box flex size-28 plr-30 ptb-28">
					<view class="bold danhang" style="width: 500rpx;">ID：{{info.device_id}}</view>
					<view style="color: #1AC4D6;" @click="$utils.copy(info.device_id)">复制</view>
				</view>
				<view class="month-money">
					<text class="size-24">本月收益</text>
					<view class="size-68">{{info.month_price}}</view>
				</view>
				<view class="plr-28">
					<view class="flex_l flex-around pt-20 pb-34"
						style="border-bottom: 1rpx solid #f8f8f8;color: #A6A6A6;">
						<view class="text-center" style="width: 33%;">
							<view class="size-24">绑定时间</view>
							<view class="mt-4 bold size-36" style="color: #333;">
								{{$u.timeFormat(info.create_time, 'yyyy-mm-dd')}}</view>
						</view>
						<view class="text-center" style="width: 33%;" @click="toMonitor">
							<view class="size-24">网络(在线)</view>
							<view class="mt-4 bold size-36" style="color: #FF4242;">监控</view>
						</view>
						<view class="text-center" style="width: 33%;">
							<view class="size-24">当前阶段</view>
							<view class="mt-4 bold size-36" style="color: #00C891;">{{info.state_text}}</view>
						</view>
					</view>
					<view class="box flex size-26 plr-20 ptb-36" style="width: 694rpx;margin-top: 0;">
						<view>备注：{{info.remark || '暂无备注'}}</view>
						<view style="color: #1AC4D6;" @click="setIp = true">修改</view>
					</view>
				</view>
				<view class="tab-box">
					<view class="mt-20">
						<u-tabs :list="list" :lineColor="`url(${lineBg}) 100% 100%`" :activeStyle="activeStyle"
							:scrollable="false" @click="click"></u-tabs>
					</view>
					<template v-if="count == 1">
						<view class="shouyi plr-30">
							<!-- <view class="bold size-28 pb-30" style="border-bottom: 1rpx solid #f8f8f8;">节点收益详情</view>
              <view class="flex_l text-center bold size-28 mt-30 li">
                <view class="l">日期</view>
                <view class="l">95带宽（Gbps）</view>
                <view class="l">收益</view>
              </view> -->
							<view class="li" v-for="item in info.yesterday_income">
								<view class="left">
									<view class="date">{{item.date}}</view>
									<view class="kd95" v-if="info.channel_id != 4">峰值带宽 (Gbps)：{{item.bandwidth95}}</view>
								</view>
								<view class="right">
									<text class="type">{{ item.name }}</text>
									<view class="center">
										<view class="money">￥{{item.income}}</view>
										<image @click="slaReason=item.slaReason,sla=item.sla,show=true"
											src="../../../static/jg.png" v-if="item.slaReason != '' || item.sla != 0"
											style="width: 26rpx;height: 26rpx; margin-left: 10rpx;" mode=""></image>
										<!-- <image v-else style="width: 26rpx;height: 26rpx; margin-left: 10rpx;" src="" mode=""></image> -->
									</view>
								</view>
							</view>
						</view>
					</template>
					<template v-if="count == 2">
						<view class="box pb-30 plr-35">
							<view class="flex size-28 pt-30">
								<view>报告时间</view>
								<view>{{info.test_time || '无'}}</view>
							</view>
							<view class="flex size-28 pt-30" v-if="info.channel_id == 1">
								<view>收益</view>
								<view v-if="info.yesterday_quality.income">{{info.yesterday_quality.income}}</view>
								<view v-else>无</view>
							</view>
							<view class="flex size-28 pt-30" v-if="info.channel_id == 1">
								<view>设备诊断</view>
								<view>{{info.yesterday_quality.result || '无'}}</view>
							</view>
							<!-- <view class="flex size-28 pt-30">
                <view>硬件质量</view>
                <view></view>
              </view> -->
						</view>
						<view class="bold mt-24 ml-40 size-28 bold">硬盘信息</view>
						<template v-if="info.channel_id == 1">
							<view class="box plr-32 table">
								<view class="flex bold size-28 item">
									<view>磁盘名</view>
									<view>类型</view>
									<view>IOPS</view>
									<view>读延迟</view>
									<view>写延迟</view>
								</view>
								<view class="flex size-26 item" v-for="item in info.yesterday_quality.disk">
									<view>{{item.diskName}}</view>
									<view>{{item.diskType}}</view>
									<view>{{item.diskIops.value}} | {{item.diskIops.result}}</view>
									<view>{{item.diskReadDelay.value.toFixed(2)}} | {{item.diskReadDelay.result}}</view>
									<view>{{item.diskWriteDelay.value.toFixed(2)}} | {{item.diskWriteDelay.result}}
									</view>
								</view>
							</view>
							<view class="box pb-30 plr-35">
								<view class="flex size-28 pt-30">
									<view>CPU利用率</view>
									<view v-if="info.yesterday_quality.cpuUsage">
										{{info.yesterday_quality.cpuUsage.value.toFixed(2)}}%丨{{info.yesterday_quality.cpuUsage.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>内存利用率</view>
									<view v-if="info.yesterday_quality.memUsage">
										{{info.yesterday_quality.memUsage.value.toFixed(2)}}%丨{{info.yesterday_quality.memUsage.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30 bold">
									<view>网络质量</view>
									<view></view>
								</view>
								<view class="flex size-28 pt-30">
									<view>在线率</view>
									<view v-if="info.yesterday_quality.onlineRate">
										{{info.yesterday_quality.onlineRate.value.toFixed(2)}}%丨{{info.yesterday_quality.onlineRate.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>NAT类型</view>
									<view v-if="info.yesterday_quality.nat">
										{{info.yesterday_quality.nat.value}}丨{{info.yesterday_quality.nat.result}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>最大丢包率</view>
									<view v-if="info.yesterday_quality.maxLoss">
										{{info.yesterday_quality.maxLoss.value.toFixed(2)}}丨{{info.yesterday_quality.maxLoss.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>最大时延</view>
									<view v-if="info.yesterday_quality.maxDelay">
										{{info.yesterday_quality.maxDelay.value.toFixed(2)}}ms丨{{info.yesterday_quality.maxDelay.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>压测满意度</view>
									<view v-if="info.yesterday_quality.testSat">
										{{info.yesterday_quality.testSat.value.toFixed(2)}}丨{{info.yesterday_quality.testSat.result || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="box plr-32 table">
								<view class="flex bold size-28 item">
									<view>磁盘名</view>
									<view>类型</view>
									<view>大小</view>
									<view>IOPS</view>
								</view>
								<view class="flex size-26 item" v-for="item in info.yesterday_quality.diskIOPS">
									<view>{{item.name}}</view>
									<view>{{item.type}}</view>
									<view>{{item.size}}</view>
									<view>{{item.iops}}</view>
								</view>
							</view>
							<view class="box pb-30 plr-35">
								<view class="flex size-28 pt-30">
									<view>CPU 线程数</view>
									<view v-if="info.yesterday_quality.CPUThreads">
										{{info.yesterday_quality.CPUThreads || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>CPU 主频</view>
									<view v-if="info.yesterday_quality.CPUFreq">{{info.yesterday_quality.CPUFreq || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>内存大小</view>
									<view v-if="info.yesterday_quality.mem">{{info.yesterday_quality.mem || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>磁盘平均IOPS</view>
									<view v-if="info.yesterday_quality.averageIOPS">
										{{info.yesterday_quality.averageIOPS || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30 bold">
									<view>网络质量</view>
									<view></view>
								</view>
								<view class="flex size-28 pt-30">
									<view>极限带宽</view>
									<view v-if="info.yesterday_quality.actualBwArg">
										{{info.yesterday_quality.actualBwArg || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>极限压测满意度</view>
									<view v-if="info.yesterday_quality.satisfaction">
										{{info.yesterday_quality.satisfaction || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>极限带宽时 RTT</view>
									<view v-if="info.yesterday_quality.rttArg">{{info.yesterday_quality.rttArg || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>极限带宽 TCP 重传率</view>
									<view v-if="info.yesterday_quality.limitBwArg">
										{{info.yesterday_quality.limitBwArg || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>丢包压测带宽平均</view>
									<view v-if="info.yesterday_quality.outArg">{{info.yesterday_quality.outArg || ''}}
									</view>
									<view v-else>暂无数据</view>
								</view>
								<view class="flex size-28 pt-30">
									<view>丢包压测满意度</view>
									<view v-if="info.yesterday_quality.outSatisfaction">
										{{info.yesterday_quality.outSatisfaction || ''}}</view>
									<view v-else>暂无数据</view>
								</view>
							</view>
						</template>
					</template>
					<template v-if="count == 3">
						<view class="box pb-30 plr-35 wl-info">
							<view class="flex size-28 pt-30">
								<view>IP</view>
								<view>{{info.device_net_info.ip}}</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>IP协议栈</view>
								<view style="color: #000;">{{info.ipProtocol}}</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>运营商</view>
								<view>{{info.device_net_info.isp}}</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>省市</view>
								<view>{{info.device_net_info.province}}{{info.device_net_info.city}}</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>管理线路</view>
								<view style="width: 440rpx;" v-if="info.device_net_info.manager_name">
									网卡：{{info.device_net_info.manager_name || ''}}丨速率：{{info.device_net_info.manager_speed || ''}}M丨IP：{{info.device_net_info.ip || ''}}

									<text style="color: #1AC4D6;padding-left: 16rpx" @tap="toSetManager">管理</text>
								</view>
								<view v-else style="color: #1AC4D6" @tap="toSetManager">去设置网卡</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>网络类型</view>
								<view>{{info.device_net_info.diallingTypeText}}</view>
							</view>
							<view class="flex size-28 pt-30" v-if="info.channel_id == 4">
								
								<view>上网线路</view>
								<view>
									上网{{info.device_net_info.net_num}}条
								</view>
							</view>
							<view class="flex size-28 pt-30" v-else
								@click="navto('/pages/jiedian/networkInfo/networkInfo?device_id='+device_id)">
								<view>上网线路</view>
								<view>
									上网{{info.device_net_info.net_num}}条丨拨通{{info.device_net_info.networking_num}}条丨联网{{info.device_net_info.dial_num}}条
								</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>上报宽带</view>
								<view>{{info.device_net_info.upBandwidth}}</view>
							</view>
							<view class="flex size-28 pt-30">
								<view>测试日期</view>
								<view>{{info.test_time}}</view>
							</view>
							<view class="flex size-28 pt-30"
								@click="navto('/pages/jiedian/testResult/testResult?device_id='+device_id)">
								<view>测试带宽</view>
								<view class="flex">
									<view style="color: #1AC4D6;">详情</view>
									<!-- <image src="../../../static/next.png" style="width: 22rpx;height: 22rpx;" mode=""></image> -->
								</view>
							</view>
						</view>
					</template>
					<view v-if="count == 4" class="yj-info">
						<view class="yj-info-box">
							<view class="type">
								设备类型：{{info.hardware_information.deviceType}}
							</view>
							<view class="version">
								镜像版本：{{info.hardware_information.imageVersion}}
							</view>
							<view class="grid">
								<view>
									<view>{{info.hardware_information.cpu.cpuNum}}</view>
									<text>核数</text>
								</view>
								<view>
									<view>{{info.hardware_information.cpu.cpuFrequency}}</view>
									<text>主频</text>
								</view>
								<view>
									<view>{{info.hardware_information.memory.memorySize}}</view>
									<text>容量</text>
								</view>
							</view>
							<view class="xinghao">CPU：{{info.hardware_information.cpu.cpuType}}</view>
							<view class="xinghao">内存：{{info.hardware_information.memory.memoryType}}</view>
						</view>
						<view class="yp-title">硬盘信息</view>
						<view class="yp-info">
							<view class="flex size-26 item" v-for="item in info.hardware_information.diskInfo">
								<template v-if="info.channel_id == 1">
									<view class="left">
										名称：{{item.diskId}}
										<text>{{item.diskMedia}}</text>
									</view>
									<view class="size">{{item.diskSize}}T</view>
								</template>
								<template v-else>
									<view class="left">
										名称：{{item.name}}
										<text>{{item.type}}</text>
									</view>
									<view class="size">{{item.size}}</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view style="height: 60rpx;"></view> -->
		</scroll-view>
		<u-popup :show="show" round="20" mode="center" @close="show = false">
			<view class="div text-center">
				<view class="mt-50 size-32">违规扣费通知</view>
				<view class="mt-76 size-28">扣款原因：{{slaReason}}￥{{sla}}</view>
			</view>
		</u-popup>
		<u-modal :show="setIp" title="修改备注" confirmColor="#1AC4D6" :showCancelButton="true" @cancel="setIp = false"
			@confirm="confirm">
			<view class="" slots="default">
				<view class="flex">
					<input class="input" v-model="value" type="text">
					<!-- <view class="flex">
						<image src="../../../static/s.png" style="width:30rpx;height:30rpx" mode=""></image>
						<view class="size-28 ml-10">双栈</view>
					</view>
					<view class="flex ml-70">
						<image src="../../../static/s.png" style="width:30rpx;height:30rpx" mode=""></image>
						<view class="size-28 ml-10">IPV4</view>
					</view>
					<view class="flex ml-70">
						<image src="../../../static/s.png" style="width:30rpx;height:30rpx" mode=""></image>
						<view class="size-28 ml-10">IPV6</view>
					</view>	 -->
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import lineBg from './lineBg.js'
	import Head from '@/components/head/head.vue'
	export default {
		components: {
			Head
		},
		data() {
			return {
				lineBg,
				top: 0,
				count: 1,
				show: false,
				activeStyle: {
					'font-weight': 700,
					'font-size': '32rpx',
					'color': '#333'
				},
				list: [{
					name: '收益',
					id: '1'
				}, {
					name: '昨日质量',
					id: '1'
				}, {
					name: '网络信息',
					id: '1'
				}, {
					name: '硬件信息',
					id: '1'
				}],
				setIp: false,
				device_id: '',
				info: {},
				slaReason: '',
				sla: '',
				value: ''
			}
		},
		mounted() {
			this.getElInfo()
		},
		onLoad(e) {
			this.device_id = e.device_id
			this.init()
			uni.$on('updateDetailInfo', this.init)
		},
		onUnload() {
			uni.$off('updateDetailInfo', this.init)
		},
		methods: {
			confirm() {
				this.$api.editDevice({
					device_id: this.device_id,
					remark: this.value
				}).then(res => {
					this.$utils.showToast(res.msg)
					if (res.code == 1) {
						this.setIp = false
						this.info.remark = this.value
						// this.init()
					}
				})
			},
			// 去管理网卡
			toSetManager() {
				this.navto(`/pages/jiedian/detail/setManager/setManager?device_id=${this.device_id}`)
			},
			toMonitor() {
				const diskInfo = this.info.hardware_information?.diskInfo || []
				const cpuNum = this.info.hardware_information?.cpu?.cpuNum || 0
				const memorySize = this.info.hardware_information?.memory?.memorySize || 0
				let diskSize = 0;
				for (let i = 0; i < diskInfo.length; i++) {
					if (this.info.channel_id == 1) {
						diskSize += Number(diskInfo[i].diskSize)
					} else {
						diskSize += parseFloat(diskInfo[i].size)
					}
				}
				this.navto(
					`/pages/jiedian/detail/monitor/monitor?device_id=${this.device_id}&diskSize=${diskSize.toFixed(2)}&cpuNum=${cpuNum}&memorySize=${memorySize}&cid=` +
					this.info.channel_id)
			},
			init() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$api.getDeviceInfo({
					device_id: this.device_id
				}).then(res => {
					uni.hideLoading()
					// const cid = res.data.channel_id
					this.info = res.data || {}
				})
			},
			click(e) {
				this.count = e.index + 1
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
			}
		}
	}
</script>

<style lang="scss">
	.div {
		width: 610rpx;
		height: 288rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}

	// .item{
	// 	height: 76rpx;
	// 	border-bottom: 1rpx solid #f8f8f8;
	// 	view{
	// 		width: 20%;
	// 		text-align: center;
	// 	}
	// }
	.input {
		width: 480rpx;
		height: 92rpx;
		background: #F7F7F7;
		font-size: 28rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
		// text-align: center;
	}

	.box {
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin: 20rpx auto 0;
	}

	.month-money {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 24rpx;

		text {
			color: #A6A6A6;
		}

		view {
			margin-top: 10rpx;
		}
	}

	.tab-box {
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 50rpx 50rpx 0 0;
		min-height: calc(100vh - 634rpx);
		padding-bottom: 30rpx;
		margin-top: 30rpx;
	}

	.shouyi {
		.li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 26rpx 0;
			border-bottom: 1px solid #F3f3f3;
		}

		.left {
			display: flex;
			flex-direction: column;

		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.type {
				color: #9F9F9F;
				font-size: 24rpx;
				margin-bottom: 10rpx;
			}
		}

		.date {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
		}

		.kd95 {
			font-size: 24rpx;
			color: #9F9F9F;
			margin-top: 14rpx;
		}

		.money {
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}
	}

	.wl-info {
		.flex {
			view {
				text-align: right;

				&:last-child {
					color: #666666;
				}
			}
		}
	}

	.yj-info {
		padding: 28rpx;
	}

	.yp-title {
		padding: 36rpx 0 20rpx;
		font-size: 28rpx;
		color: #C1C1C1;
	}

	.yj-info-box {
		padding: 24rpx 20rpx 30rpx;
		box-sizing: border-box;
		background: #F3FEFF;
		border-radius: 24rpx;

		.type {
			font-size: 32rpx;
			color: #333333;
		}

		.version {
			font-size: 24rpx;
			color: #666666;
			margin: 20rpx 0 26rpx;
		}

		.grid {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 122rpx;
			background: #D7F4F7;
			border-radius: 12rpx;

			&>view {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-right: 1px solid #E2E2E2;

				&:last-child {
					border: 0;
				}

				view {
					font-size: 24rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 20rpx;
					color: #8D8D8D;
				}
			}
		}

		.xinghao {
			font-size: 24rpx;
			color: #666666;
			margin-top: 26rpx;
		}
	}

	.yp-info {
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1px solid #F3f3f3;
		}

		.left {
			display: flex;
			align-items: center;
			white-space: nowrap;
			font-size: 32rpx;
			color: #333333;
		}

		.size {
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}

		text {
			display: block;
			height: 36rpx;
			padding: 0 10rpx;
			text-align: center;
			line-height: 36rpx;
			border: 1px solid #0DC7DA;
			border-radius: 6rpx;
			font-size: 24rpx;
			color: #0DC7DA;
			margin-left: 10rpx;
		}
	}

	.table {
		.item {
			&>view {
				width: 25%;
				text-align: center;

				&:first-child {
					text-align: left;
				}

				&:nth-child(2) {
					width: 15%;
				}

				&:last-child {
					text-align: right;
				}
			}
		}
	}
</style>