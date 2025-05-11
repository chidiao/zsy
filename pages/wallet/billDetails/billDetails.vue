<template>
	<view class="page2">
		<!-- <view class="head">
			<u-navbar :fixed="false" :autoBack="true" bgColor='rgba(0,0,0,0)' >
				<view slot="right" class="input plr-30 flex_l">
					<image src="../../../static/search.png" mode=""></image>
					<input type="text" placeholder="请输入搜索关键词">
				</view>
			</u-navbar>
		</view> -->
    <view class="head">
    	<u-navbar :fixed="false" :autoBack="false" bgColor='rgba(0,0,0,0)'>
        <view class="flex" slot="left" @click.stop>
          <image class="back" src="/static/next.png" mode="" @click.stop="back"></image>
          <view class="flex_l input ml-15" :style="{width: inputWidth + 'px'}">
            <image src="/static/search.png" mode=""></image>
            <input v-model="keyword" confirm-type="search" @confirm="search" type="text" placeholder="请输入搜索关键词">
          </view>
        </view>
    	</u-navbar>
    </view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}":lower-threshold="100"
			:refresher-enabled="true" :refresher-triggered="triggered" :scroll-top='0' refresher-background="#f8f8f8"
			@scrolltolower="scrolltolower" @refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view class="over-hidden">
				<!-- <view class="mt-10">
					<u-tabs :list="list" lineColor="#1AC4D6" :activeStyle="activeStyle" @click="click"></u-tabs>
				</view> -->
				<view class="box" v-for="item in dataList">
					<view class="flex_l size-28 gray-1 pt-30">
						<view style="width: 156rpx;">账期：</view>
						<view>{{item.date}}</view>
					</view>
					<view class="flex_l size-28 gray-1 pt-30">
						<view style="width: 156rpx;">机器ID：</view>
						<view class="flex-1 danhang">{{item.device_id}}</view>
					</view>
					<view class="flex_l size-28 gray-1 pt-30">
						<view style="width: 156rpx;">计费方式：</view>
						<view>{{item.device_charging}}</view>
					</view>
					<!-- <view class="flex_l size-28 gray-1 pt-30">
						<view style="width: 156rpx;">定价：</view>
						<view>{{item.price}}元/Gb/月</view>
					</view> -->
					<view class="flex_l size-28 gray-1 pt-30">
						<view style="width: 156rpx;">总带宽：</view>
						<view>{{item.upBandwidth}}</view>
					</view>
					<view class="mt-30 pt-30" style="border-top: 1rpx solid #f1f1f1;">
						<view class="flex_l flex-around text-center">
							<view>
								<view class="size-26">收益</view>
								<view class="size-28 bold mt-20">{{item.income || 0}}元</view>
							</view>
							<!-- <view>
								<view class="size-26">奖金</view>
								<view class="size-28 bold mt-20">{{item.price}}元</view>
							</view> -->
							<view>
								<view class="size-26">罚没金额</view>
								<view class="size-28 bold mt-20">{{item.sla || 0}}元</view>
							</view>
						</view>
						<!-- <view class="button">
							确认
						</view> -->
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
        keyword: '',
				list: [{
					name: '待确认',
				}, {
					name: '待结算',
				}],
				activeStyle: {
					'font-weight': 700,
					'font-size': '30rpx',
					'color': '#333'
				},
				dataList: [],
				page: 1,
				more: true,
				triggered: false,
				_triggered: false,
        
        inputWidth: uni.upx2px(624)
			}
		},
		mounted() {
			this.getElInfo()
		},
		onLoad() {
			this.init()
      // #ifdef MP-WEIXIN
      const menuRect = uni.getMenuButtonBoundingClientRect()
      this.inputWidth = uni.upx2px(624) - menuRect.width
      // #endif
		},
		methods: {
      back() {
        uni.navigateBack()
      },
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
				this.dataList.length = 0
				this.init();
			},
      
      search() {
        this.page = 1
        this.more = true
        this.dataList.length = 0
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
			init(){
        const page = this.page
				this.$api.getMyIncomeList({
					page,
					size:15,
          keyword: this.keyword
				}).then(res=>{
					this.triggered = false;
					this._triggered = false;
					if (res.data.length == 0) {
						this.more = false
					}
          if(page == 1) {
            this.dataList = res.data
          } else {
            this.dataList = this.dataList.concat(res.data)
          }
				})
			},
			click(e){
				console.log(e)
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

<style lang="scss" scoped>
  ::v-deep .u-navbar__content__left--hover{
    opacity: 1 !important;
  }
	.wrap {
		width: 100vw;
		height: 100vh;
		background: linear-gradient(180deg, #93E6ED 0%, #F8F8F8 30%);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
	}
  .back{
    transform: rotate(180deg);
    width: 36rpx;
    height: 36rpx;
  }
	.box{
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 0rpx 40rpx 30rpx;
		margin: 30rpx auto 0;
	}

	.button {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	
	.input {
		width: 604rpx;
		height: 70rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 0rpx 2rpx rgba(217, 217, 217, 0.16);
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		padding: 0 30rpx;
    margin-left: 20rpx;
		image {
			width: 40rpx;
			height: 40rpx;
		}
	
		input {
			font-size: 26rpx;
			color: #666666;
			flex: 1;
			margin-left: 20rpx;
		}
	}
</style>