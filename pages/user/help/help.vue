<template>
	<view class="page">
		<view class="head">
			<Head title="帮助中心" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="flex row" v-for="(item, index) in data" :key="index" @click="goxieyi(item.id)">
					<view>{{ item.title }}</view>
					<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<!-- <view class="flex row" @click="goxieyi('3')">
					<view>如何设置收款账户</view>
					<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view> -->
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
        data: []
			}
		},
		mounted() {
      this.getList()
			this.getElInfo()
		},
		methods: {
      getList() {
        this.$api.getHelpList().then(res => {
          if(res.code === 1) {
            this.data = res.data
          }
        })
      },
			goxieyi(id){
				uni.navigateTo({
					url:'/pages/user/xieyi/xieyi?id='+id
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
		}
	}
</script>

<style >
.row{
	width: 710rpx;
	height: 90rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 20rpx auto 0;
	padding: 0 34rpx;
	font-size: 28rpx;
}
</style>
