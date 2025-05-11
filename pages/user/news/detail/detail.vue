<template>
	<view class="page">
		<view class="head">
			<Head title="消息详情" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden html">
        <rich-text :nodes="content"></rich-text>
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
				id:'',
				content:'',
				top:0
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		mounted() {
			this.getElInfo()
			this.init()
		},
		methods: {
			init(){
				this.$api.getSystemNoticeInfo({
					notice_id:this.id
				}).then(res=>{
					this.content = this.$utils.handleRichText(res.data.content)
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
		background-color: pink;
	}
	.title{
		padding: 20rpx 30rpx 30rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #000000;
	}
}
.html{
  padding: 30rpx;
  
}
</style>
