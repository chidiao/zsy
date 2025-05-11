<template>
	<view class="page">
		<Head class="head" title="测试结果" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="box flex ptb-16 plr-35">
					<view class="size-28 bold flex-1 danhang mr-30">ID：{{device_id}}</view>
					<view class="bor" @click="show = true">压测/带宽</view>
				</view>
				<view class="box pb-30 plr-35 size-28 ">
					<view class="flex pt-30">
						<view>地域</view>
						<view>{{deviceInfo.device_net_info.province}}{{deviceInfo.device_net_info.city}}</view>
					</view>
					<view class="flex pt-30">
						<view>运营商</view>
						<view>{{deviceInfo.device_net_info.isp}}</view>
					</view>
					<!-- <view class="flex pt-30">
						<view>城域网节点/接入网节点</view>
						<view>接入网节点</view>
					</view> -->
					<view class="flex pt-30" v-if="deviceInfo.yesterday_quality.nat">
						<view>NAT类型</view>
						<view>{{deviceInfo.yesterday_quality.nat.value}}</view>
					</view>
					<view class="flex pt-30">
						<view>网络类型</view>
						<view>{{deviceInfo.device_net_info.diallingTypeText}}</view>
					</view>
				</view>
				<view class="flex plr-30 mt-30">
					<view class="size-32 bold">带宽压测</view>
					<view class="flex size-28" @click="navto">
						<view class="mr-20" v-if="deviceInfo.channel_id == 1">{{$u.timeFormat(info.upBandwidthTestTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
						<view class="mr-20" v-else>{{deviceInfo.test_time}}</view>
						<view class="mr-10" style="color: #1AC4D6;">测试结果</view>
						<image src="../../../static/next.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
					</view>
				</view>
				<view class="box pb-30 plr-35 size-28">
					<view class="flex pt-30">
						<view>上报带宽</view>
						<view>{{ deviceInfo.device_net_info.upBandwidth }}</view>
					</view>
					<view class="flex pt-30">
						<view>极限压测平均</view>
						<view v-if="deviceInfo.channel_id == 1">{{ info.avgTestBandwidth }}Mbps</view>
						<view v-else>{{ info.expectedBwArg }}</view>
					</view>
					<view class="flex pt-30">
						<view>极限压测满意度</view>
            <view v-if="deviceInfo.channel_id == 1">{{ info.bandwidth_satisfaction }}%</view>
            <view v-else>{{ info.satisfaction }}</view>
					</view>
					<view class="flex pt-30">
						<view>丢包压测平均</view>
            <view v-if="deviceInfo.channel_id == 1">{{ info.avg_packetLossRate }}</view>
            <view v-else>{{ info.outArg }}</view>
					</view>
					<view class="flex pt-30">
						<view>丢包压测满意度</view>
            <view v-if="deviceInfo.channel_id == 1">{{ info.packetLossRate_satisfaction }}%</view>
            <view v-else>{{ info.outSatisfaction }}</view>
					</view>
				</view>
				<!-- <view class="flex plr-30 mt-30">
					<view class="size-32 bold">硬件压测</view>
				</view>
				<view class="box pb-30 plr-35 size-28">
					<view class="flex pt-30">
						<view>CPU线程数</view>
						<view>48</view>
					</view>
					<view class="flex pt-30">
						<view>内存大小</view>
						<view>128G</view>
					</view>
					<view class="flex pt-30">
						<view>CPU主频</view>
						<view>3G</view>
					</view>
					<view class="flex pt-30">
						<view>带宽磁盘比</view>
						<view>1.55</view>
					</view>
					<view class="flex pt-30">
						<view>单线路平均IOPS</view>
						<view>10000</view>
					</view>
				</view>
				<view class="flex plr-30 mt-30">
					<view class="size-32 bold">数据盘</view>
					<view class="size-28">总：5.70TB  总数3</view>
				</view> -->
			</view>
			<!-- <view class="box">
				<view class="item flex_l size-28 bold" style="background: #E4FCFF;">
					<view>磁盘名</view>
					<view>类型</view>
					<view>大小</view>
					<view>IOPS</view>
					<view>压测用时</view>
				</view>
				<view class="item flex_l size-28" style="border-bottom: 1rpx solid #f8f8f8;">
					<view>n1</view>
					<view>ssd</view>
					<view>1.90t</view>
					<view>0</view>
					<view>0秒</view>
				</view>
				<view class="item flex_l size-28" style="border-bottom: 1rpx solid #f8f8f8;">
					<view>n1</view>
					<view>ssd</view>
					<view>1.90t</view>
					<view>0</view>
					<view>0秒</view>
				</view>
				<view class="item flex_l size-28" style="border-bottom: 1rpx solid #f8f8f8;">
					<view>n1</view>
					<view>ssd</view>
					<view>1.90t</view>
					<view>0</view>
					<view>0秒</view>
				</view>
				<view class="item flex_l size-28" style="border-bottom: 1rpx solid #f8f8f8;">
					<view>n1</view>
					<view>ssd</view>
					<view>1.90t</view>
					<view>0</view>
					<view>0秒</view>
				</view>
			</view> -->
			<view style="height: 80rpx;"></view>
		</scroll-view>
		<u-modal :show="show" title="开始带宽测试" confirmColor="#1AC4D6" :showCancelButton="true" @cancel="cancel" @confirm="cesu">
			<view style="width: 530rpx;" slots="default" v-if="type == 1">
				<view class="size-28">请确认单条上行带宽（Mbps）：</view>
				<input type="text" class="inp">
			</view>
			<view slots="default" v-if="type == 2">
				<view class="size-28 pt-30 pb-10">测速将进行1-3分钟时间</view>
			</view>
		</u-modal>
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
				top:0,
				show:false,
				type:2,
				device_id:"",
				info:{},
				deviceInfo:{
          device_net_info: {},
          yesterday_quality: {}
        }
			}
		},
		mounted() {
			this.getElInfo()
		},
		onLoad(e) {
			this.device_id = e.device_id
			this.init()
			this.getDeviceInfo()
		},
		methods: {
			getDeviceInfo(){
				uni.showLoading({
					title:'加载中...'
				})
				this.$api.getDeviceInfo({
					device_id:this.device_id
				}).then(res=>{
					uni.hideLoading()
					this.deviceInfo = res.data
				})
			},
			init(){
				this.$api.getBandwidth({
					device_id:this.device_id
				}).then(res=>{
					this.$u.toast(res.msg)
					this.info = res.data
				})
			},
			cesu(){
				this.show = false
				uni.showLoading({
					title:'测压中...'
				})
				this.$api.bandwidth({
					device_id:this.device_id
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						// setTimeout(()=>{
						// 	this.navto('/pages/jiedian/testResult/testResult?device_id='+device_id)
						// },1000)
					}
				})
			},
			cancel(){
				this.show = false
				return
				uni.navigateBack()
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			navto(){
				uni.navigateTo({
					url:'/pages/index/bindDevice/line/line?device_id='+this.device_id+'&cid='+ this.deviceInfo.channel_id+'&time='+this.deviceInfo.test_time
				})
			}
		}
	}
</script>

<style lang="scss">
.inp{
	width: 530rpx;
	height: 76rpx;
	background: #F8F8F8;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
	padding: 0 15rpx;
	box-sizing: border-box;
	margin-top: 20rpx;
	font-size: 28rpx;
}
.box{
	width: 710rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 30rpx auto 0;
	.item{
		height: 84rpx;
		line-height: 84rpx;
		view{
			width: 20%;
			text-align: center;
		}
	}
	.bor{
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
