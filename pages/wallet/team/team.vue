<template>
	<view class="page">
		<view class="head">
			<Head title="团队" />
			<view>
				<u-tabs :list="list" lineColor="#1AC4D6" :activeStyle="activeStyle" :scrollable="false" @click="click"></u-tabs>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}" @scrolltolower="scrolltolower">
			<view class="over-hidden">
				<view class="flex plr-30 ptb-40 box" v-for="item in dataList">
					<view>
						<!--  -->
						<view class="size-28">{{item.nickname}}</view>
					</view>
					<view>
						<view class="size-28">{{item.mobile}}</view>
					</view>
					<view class="text-right">
						<view class="size-28 bold">{{item.createtime}}</view>
						
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
				list: [{
					name: '一级代理',
				}, {
					name: '二级代理',
				}, {
					name: '三级代理',
				}],
				count:0,
				page:1,
				activeStyle: {
					'font-weight': 700,
					'font-size': '30rpx',
					'color': '#333'
				},
				dataList:[],
				more:true
			}
		},
		mounted() {
			this.getElInfo()
			this.init()
		},
		methods: {
			click(e){
				this.count = e.index
				this.page = 1
				this.more = true
				this.dataList = []
				this.init()
			},
			scrolltolower(){
				if(this.more){
					this.page ++
					this.init()
				}
			},
			init(){
				this.$api.getTeamList({
					type:this.count,
					page:this.page,
					size:10
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

<style >
.box{
	width: 710rpx;
	height: 140rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 30rpx auto 0;
}
</style>
