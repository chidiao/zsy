<template>
	<view class="page">
		<Head title="带宽压测详情" />
		<view v-if="info.duration || info.rttArg">
			<view class="box pb-30 plr-35">
				<view class="flex size-28 pt-30">
					<view>压测类型</view>
					<view>丢包测试</view>
				</view>
				<view class="flex size-28 pt-30">
					<view>压测最大</view>
					<view v-if="cid==1">{{info.maxTestBandwidth}}Mbps</view>
					<view v-else>{{info.actualBwArg}}</view>
				</view>
				<view class="flex size-28 pt-30">
					<view>压测平均</view>
					<view v-if="cid==1">{{info.avgTestBandwidth}}Mbps</view>
					<view v-else>{{info.expectedBwArg}}</view>
				</view>
				<view class="flex size-28 pt-30">
					<view>TCP重传率</view>
					<view v-if="cid==1">{{info.tcpRetransmissionRatio.toFixed(2)}}%</view>
					<view v-else>{{info.limitBwArg}}</view>
				</view>
				<view class="flex size-28 pt-30">
					<view>测试时间</view>
					<view v-if="cid==1">{{$u.timeFormat(info.upBandwidthTestTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
					<view v-else>{{time}}</view>
				</view>
				<view class="flex size-28 pt-30">
					<view>测试用时（秒）</view>
					<view v-if="cid==1">{{info.duration}}</view>
					<view v-else>{{info.rttArg}}</view>
				</view>
			</view>
			<view class="box" v-if="cid == 1">
				<view class="flex bold size-28 item" style="background-color: #E4FCFF;">
					<view>线路</view>
					<view>平均速率（bps）</view>
					<view>公网IP</view>
					<view>账号</view>
				</view>
				<scroll-view scroll-y="true" class="scroll1">
					<view class="flex size-26 item" v-for="item,index in info.lineQuality">
						<view>{{index+1}}</view>
						<view>{{item.avgUpBandwidth}}</view>
						<view>{{item.ip}}</view>
						<view>{{item.name}}</view>
					</view>
				</scroll-view>
				
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import Head from '@/components/head/head.vue'
	export default {
		components: {
			Head,
		},
		data() {
			return {
				device_id:'',
				info:{},
        time: '',
        cid: 1
			}
		},
		onLoad(e) {
			this.device_id = e.device_id
      this.cid = e.cid
      this.time = e.time
			this.init()
		},
		methods: {
			init(){
				uni.showLoading({
					title:'加载中...'
				})
				this.$api.getBandwidth({
					device_id:this.device_id
				}).then(res=>{
					uni.hideLoading()
					this.info = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.scroll1{
		width: 100%;
		height: 600rpx;
	}
	.item{
		height: 84rpx;
		view{
			width: 25%;
			text-align: center;
		}
	}
	.box {
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin: 20rpx auto 0;
	}
</style>