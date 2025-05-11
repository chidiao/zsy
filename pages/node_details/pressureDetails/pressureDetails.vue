<template>
	<view>
		<view class="TitleId">
			<view class="title_id_name" v-if="deviceInfo.device_id">机器ID:{{deviceInfo.device_id || ''}}</view>
			<view class="title_id_Num">共{{Info.length}}条数据</view>
		</view>
		<view class="TitleId" v-for="(item,index) in Info" :key="index">
			<view class="title_id_name">
				<view class="">网卡名：{{item.netcard_name}}</view>
				<u-tag :text="item.status" type="warning"></u-tag>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">账号</view>
				<view class="title_info">{{item.account}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">Vlan_ID</view>
				<view class="title_info">{{item.vlan_id}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">IP</view>
				<view class="title_info">{{item.ip}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">数据包丢失率</view>
				<view class="title_info">{{item.out_packet_loss_rate}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">TCP_IN</view>
				<view class="title_info">{{item.tcp_in_max_bw}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">TCP_OUT</view>
				<view class="title_info">{{item.tcp_out_max_bw}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">带宽比例</view>
				<view class="title_info">{{item.bandwidth_scale}}</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">原因</view>
				<view class="title_info">{{item.reason}}</view>
			</view>
			<!-- <view class="title_id_phone">
				<view class="title_fu">TCP_IN</view>
				<view class="title_info">--</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">压测上限（M）</view>
				<view class="title_info">1233467890</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">TCP_OUT</view>
				<view class="title_info">1233467890</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">是否通过</view>
				<view class="title_info">1233467890</view>
			</view>
			<view class="title_id_phone">
				<view class="title_fu">原因</view>
				<view class="title_info">--</view>
			</view> -->
			<!-- <view class="BiaoBox">
				<view class="BiaoBox_left">
					<view class="BiaoBox_left_lie">
						<view class="">网络服务</view>
					</view>
					<view class="BiaoBox_left_lie">
						<view class="">标称宽带</view>
					</view>
				</view>
				<view class="BiaoBox_right">
					{{item.bandwidth_scale}}
				</view>
			</view> -->
			<!-- <view class="BiaoBox">
				<view class="BiaoBox_left">
					<view class="BiaoBox_left_lie">
						<view class="">质量</view>
					</view>
					<view class="BiaoBox_left_lie">
						<view class="">百分比</view>
						<view class="">IN丢包率</view>
						<view class="">OUT丢包率</view>
					</view>
				</view>
				<view class="BiaoBox_right">
					<view class="">--</view>
					<view class="">--%</view>
					<view class="">0.06%</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				channel_id:'',
				Info:[],
				deviceInfo:{}
			}
		},
		onLoad(data) {
			this.channel_id = data.channel_id
			this.getInfo()
			this.getDeviceInfo()
		},
		methods: {
			getDeviceInfo() {
			  uni.showLoading({
			  	title:'加载中'
			  })
			  this.$api
			    .getDeviceInfo({
			      device_id: this.channel_id,
			    })
			    .then((res) => {
			      console.log('设备信息',res);
			      this.deviceInfo = res.data;
				  uni.hideLoading()
			    });
			},
			getInfo() {
			  this.$api
			    .externalPressTestDetail({
			      device_id: this.channel_id,
			    })
			    .then((res) => {
			      console.log('信息',res);
				  this.Info = res.data
			    });
			},
		}
	}
</script>

<style scoped lang="scss">
.TitleId{
	padding: 20rpx 20rpx;
	overflow: hidden;
	border-bottom: 1rpx solid #f8f8f8;
	.title_id_name{
		font-size: 30rpx;
		padding: 10rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
	.title_id_Num{
		float: right;
		font-size: 28rpx;
		color: #6a6a6a;
		padding: 10rpx 0rpx;
	}
	.title_id_phone{
		padding: 10rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title_fu{
			width: 150rpx;
			font-size: 28rpx;
			color: #6a6a6a;
		}
		.title_info{
			font-size: 28rpx;
		}
	}
}
.BiaoBox{
	padding: 10rpx 0rpx;
	// border-bottom: 1rpx solid #f8f8f8;
	display: flex;
	color: #6a6a6a;
	justify-content: space-between;
	.BiaoBox_left{
		display: flex;
		.BiaoBox_left_lie{
			width: 150rpx;
			margin-right: 20rpx;
		}
	}
	
}
</style>
