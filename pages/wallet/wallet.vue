<template>
	<view class="page2">
    <view class="head">
    	<u-navbar leftIcon="" title="卓思云" :fixed="false" bgColor="rgba(0,0,0,0)">
        <view slot="left">
          <image src="/static/logo3.png" class="logo" mode=""></image>
        </view>
    	</u-navbar>
    </view>
    <scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
      <view class="">
        <view class="tixian">
          <view class="left">
            <view class="size-24">可提现余额</view>
            <view class="size-68 bold">{{info.money}}</view>
          </view>
          <view class="btn" @click="navto('./tixian/tixian')">提现</view>
        </view>
        <view class="flex text-center shouyi">
          <view>
            <view class="size-24">昨日收益</view>
            <view class="size-36 bold">{{info.yesterday_money}}</view>
          </view>
          <view>
            <view class="center">
              <view class="size-24">冻结金额</view>
              <image src="/static/jg.png" @click="show=true" style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" mode=""></image>
            </view>
            <view class="size-36 bold">{{info.freeze_money}}</view>
          </view>
          <view>
            <view class="size-24">累计收益</view>
            <view class="size-36 bold">{{info.total_money}}</view>
          </view>
        </view>
      </view>
      <view class="box">
		  
		<view class="item" @click="navto('./team/team')">
		  <view>
		    <image src="../../static/icon1.png" mode=""></image>
		    <view>
		      <view>我的团队</view>
		      <text>查看详情</text>
		    </view>
		  </view>
		  <image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
		</view>  
		  
        <view class="item" @click="navto('./billDetails/billDetails')">
          <view>
            <image src="../../static/icon1.png" mode=""></image>
            <view>
              <view>账单明细</view>
              <text>查看详情</text>
            </view>
          </view>
          <image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
        </view>
        <view class="item" @click="navto('./tixianList/tixianList')">
          <view>
            <image src="../../static/icon2.png" mode=""></image>
            <view>
              <view>提现记录</view>
              <text>查看详情</text>
            </view>
          </view>
          <image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
        </view>
        <view class="item" @click="navto('./info/info')">
          <view>
            <image src="../../static/icon3.png" mode=""></image>
            <view>
              <view>收款信息</view>
              <text>查看详情</text>
            </view>
          </view>
          <image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
        </view>
      </view>
    </scroll-view>
		<u-popup :show="show" round="20" mode="center" @close="show = false" :safeAreaInsetBottom="false">
			<view class="div text-center">
				<view class="mt-50 size-32">注意</view>
				<view class="mt-36 size-28 plr-50">
          <view>买断包端次月20-25号结算</view>
					<!-- <view>您可以进入账单明细去确认账单，</view>
					<view>冻结金额为未确认账单且不可提现金额。</view> -->
				</view>
				<view style="height: 20rpx;"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import Head from '@/components/head/head.vue'
	export default {
    components: {
      Head
    },
		data() {
			return {
				top: 0,
				show:false,
			}
		},
		onShow() {
			if(this.info){
				this.$store.dispatch('updateIndexInfo')
			}
		},
		mounted() {
			this.getElInfo()
		},
		computed:{
			...mapState(['userInfo','info','token'])
		},
		methods: {
			navto(url){
				uni.navigateTo({
					url
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
          console.log(this.top)
				}).exec();
			},
		}
	}
</script>

<style lang="scss">
.logo{
  width: 75rpx;
  height: 75rpx;
}
.box{
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50rpx 50rpx 0 0;
  margin-top: 30rpx;
  min-height: calc(100vh - 474rpx);
  padding-top: 44rpx;
  padding-bottom: 30rpx;
  .item{
    width: 694rpx;
    height: 240rpx;
    background: #F9F9F9;
    border-radius: 29rpx;
    margin: 0 auto 36rpx;
    padding: 0 38rpx 0 48rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>view{
      display: flex;
      align-items: center;
      justify-content: space-between;
      view view{
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      image{
        width: 88rpx;
        height: 88rpx;
        margin-right: 46rpx;
      }
    }
    text{
      font-size: 28rpx;
      color: #C2C2C2;
    }
  }
}
.div {
	width: 610rpx;
	height: 288rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
}
.btn{
	width: 176rpx;
	height: 76rpx;
	background: #0DC7DA;
	border-radius: 38rpx;
	// margin: 12rpx auto 0;
	text-align: center;
	line-height: 76rpx;
	color: #fff;
	font-size: 26rpx;
}

.tixian{
  width: 100%;
  box-sizing: border-box;
  padding: 50rpx 24rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    .size-24{
      color: #A6A6A6;
    }
  }
}

.shouyi{
  padding: 0 24rpx;
  justify-content: flex-start;
  &>view{
    margin-right: 88rpx;
  }
  .size-24{
    color: #A6A6A6;
  }
}

</style>
