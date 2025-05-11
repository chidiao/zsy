<template>
	<view class="page">
		<view class="head">
			<Head title="消息中心" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}" @scrolltolower="scrolltolower">
			<view class="over-hidden">
				<view v-for="item in dataList" @click="navto(item.id)">
					<view class="text-center gray-2 mt-30 size-26">{{item.create_time}}</view>
					<view class="box over-hidden">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="title">{{item.title}}</view>
					</view>
				</view>
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
				page:1,
				dataList:[],
				more:true
			}
		},
		mounted() {
			this.getElInfo()
			this.init()
		},
		methods: {
			navto(id){
				uni.navigateTo({
					url:'./detail/detail?id='+id
				})
			},
			scrolltolower(){
				if(this.more){
					this.page ++
					this.init()
				}
			},
			init(){
				this.$api.getSystemNoticeList({
					page:this.page,
					size:10,
				}).then(res=>{
					if(res.data.data.length < 10){
						this.more = false
					}
					this.dataList = this.dataList.concat(res.data.data)
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

<style lang="scss">
.box{
	width: 690rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 6rpx 8rpx 2rpx rgba(230,230,230,0.16);
	border-radius:20rpx 20rpx;
	overflow: hidden;
	margin: 30rpx auto 0;
	image{
		width: 100%;
		height: 185rpx;
	}
	.title{
		padding: 20rpx 30rpx 30rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #000000;
	}
}
</style>
