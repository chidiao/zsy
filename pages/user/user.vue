<template>
	<view class="page2">
    <view class="head">
    	<u-navbar leftIcon="" title="我的" :fixed="false" bgColor="rgba(0,0,0,0)">
        <view slot="left">
          <image src="/static/logo3.png" class="logo" mode=""></image>
        </view>
        <!-- #ifndef MP -->
        <view slot="right">
          <image src="/static/share.png" class="share" @click="showShare = true"></image>
        </view>
        <!-- #endif -->
    	</u-navbar>
    </view>
		<view class="avatar" @click="handleTapUser">
			<image :src="userInfo.avatar" mode="aspectFill"></image>
      <view>
        <view>{{userInfo.nickname || '请登录'}}</view>
        <text>推荐码:{{ userInfo.id || '' }}</text>
      </view>
		</view>
		<view class="flex_l flex-around box">
			<view @click="goWallet">
				<view class="size-36 bold">{{info.total_money}}</view>
				<view class="size-24">账户收益</view>
			</view>
			<view @click="goWallet">
				<view class="size-36 bold">{{info.yesterday_money}}</view>
				<view class="size-24">昨日收益</view>
			</view>
			<view @click="goWallet">
				<view class="size-36 bold">{{info.freeze_money}}</view>
				<view class="size-24">冻结金额</view>
			</view>
			<view @click="goWallet">
				<view class="size-36 bold">{{info.money}}</view>
				<view class="size-24">可提现金额</view>
			</view>	
		</view>
    
    <view class="entry-box">
      <!-- <view class="row flex" @click="navto('./news/news')">
      	<view class="flex">
      		<image src="/static/icon4.png" mode=""></image>
      		<view class="size-28 mr-20">消息中心</view>
      		<view class="tips" v-if="userInfo.no_read_num > 0">{{userInfo.no_read_num}}</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view> -->
      <view class="row flex" @click="navto('./help/help')">
      	<view class="flex">
      		<image src="/static/icon5.png" mode=""></image>
      		<view class="size-28 mr-20">帮助中心</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view>
      <view class="row flex" @click="navto('./contact-service/contact-service')">
      	<view class="flex">
      		<image src="/static/icon6.png" mode=""></image>
      		<view class="size-28 mr-20">联系客服</view>
      	</view>
      	<image src="../../static/next.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
      </view>
      <view class="row flex" @click="navto('./feedback/feedback')">
      	<view class="flex">
      		<image src="/static/icon7.png" mode=""></image>
      		<view class="size-28 mr-20">意见反馈</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view>
      <!-- #ifndef APP-PLUS -->
      <view class="row flex" @click="handleDownload">
      	<view class="flex">
      		<image src="/static/icon8.png" mode=""></image>
      		<view class="size-28 mr-20">APP下载</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view>
      <!-- #endif -->
      <view class="row flex" @click="navto('/pages/user/xieyi/xieyi?id=6')">
      	<view class="flex">
      		<image src="/static/icon9.png" mode=""></image>
      		<view class="size-28 mr-20">隐私声明</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view>
      <view class="row flex" @click="navto('./setting/setting')">
      	<view class="flex">
      		<image src="/static/icon10.png" mode=""></image>
      		<view class="size-28 mr-20">设置中心</view>
      	</view>
				<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
      </view>
      <view class="button1" @click="outLogin">
      	退出登录
      </view>
    </view>
    
    <u-popup :show="showShare"  @close="showShare = false" @open="open" closeOnClickOverlay>
      <view class="share-popup">
        <view class="share-type">
          <view class="share-item" @click="handleShare('weixin', 'WXSceneSession')">
            <image src="https://zs.weishangfeng.com/uploads/20241007/6e0b316e945b7376f774b8c8dbb8db96.png" mode=""></image>
            <text>微信</text>
          </view>
          <view class="share-item" @click="handleShare('weixin', 'WXSceneTimeline')">
            <image src="https://zs.weishangfeng.com/uploads/20241007/7011adb8082f06a911d1bcc01d82f69f.png" mode=""></image>
            <text>朋友圈</text>
          </view>
          <view class="share-item" @click="handleShare('qq')">
            <image src="https://zs.weishangfeng.com/uploads/20241007/cbe993b381b760314392b77be2ae8c63.png" mode=""></image>
            <text>qq</text>
          </view>
        </view>
        <view class="cancel" @click="showShare = false">
          取消
        </view>
      </view>
    </u-popup>
	</view>
</template>

<script>
	import Head from '@/components/head/head.vue'
	import {mapState} from 'vuex'
	export default {
    components: {
      Head
    },
		data() {
			return {
        showShare: false,
        downloadUrl: 'https://www.pgyer.com/XvzQ07'
			}
		},
		computed:{
			...mapState(['userInfo','info'])
		},
		onShow() {
			this.$store.dispatch('updateUserInfo')
			this.$store.dispatch('updateIndexInfo')
		},
		methods: {
      goWallet() {
        uni.switchTab({
          url: '/pages/wallet/wallet'
        })
      },
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.userInfo.serve_phone
				})
			},
			outLogin(){
				uni.showModal({
					title:'温馨提示',
					content:'确定退出登录吗？',
					success:res=>{
						if(res.confirm){
							uni.removeStorageSync('token')
							uni.removeStorageSync('userInfo')
							uni.reLaunch({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			navto(url){
				uni.navigateTo({
					url
				})
			},
      handleTapUser() {
        if(this.userInfo.id) {
          this.navto('./userInfo/userInfo')
        } else {
          this.navto('/pages/login/login')
        }
      },
      // #ifdef APP-PLUS
      handleShare(provider, scene = '') {
        this.showShare = false
        uni.share({
          provider,
          scene,
          type: 0,
          href: this.downloadUrl,
          title: "卓思云",
          summary: "PCDN边缘计算领先平台，覆盖全行业一手资源。",
          imageUrl: "https://qiniu.zhuosiyun.com/logo.png",
          success: (res) => {
            this.$utils.showToast('分享成功')
          },
          fail: (err) => {
            console.log("fail:" + JSON.stringify(err));
          }
        })
      },
      // #endif
      // #ifndef APP-PLUS
      handleDownload() {
        this.navto('./download/download')
      }
      // #endif
		}
	}
</script>

<style lang="scss">
.avatar{
	text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 28rpx;
	image{
		width: 124rpx;
		height: 124rpx;
		border-radius: 100rpx;
    margin-right: 26rpx;
		// border: 4rpx solid #FFFFFF;
	}
  &>view{
    font-size: 32rpx;
    display: flex;
    flex-direction: column;
    height: 124rpx;
    justify-content: center;
    align-items: flex-start;
  }
  text{
    font-size: 24rpx;
    color: #7B7B7B;
    margin-top: 20rpx;
    text-indent: 6rpx;
  }
}
.logo{
  width: 75rpx;
  height: 75rpx;
}
.share{
  width: 50rpx;
  height: 50rpx;
  margin-top: 10rpx;
}
.button1{
  width: 620rpx;
  height: 92rpx;
  background: #F8F8F8;
  border-radius: 58rpx;
  display: flex;
  align-items: center;
  justify-content: center;
	color: #999999;
  margin: 30rpx auto;
  font-size: 32rpx;
}
.tips{
	padding: 0 15rpx;
	height: 28rpx;
	background: #FF3414;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	color: #fff;
	font-size: 20rpx;
}
.box{
	width: 690rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	text-align: center;
  justify-content: space-between;
  margin: 30rpx auto;
  .size-24{
    color: #A6A6A6;
  }
}


.entry-box{
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50rpx 50rpx 0 0;
  .row{
    width: 100%;
  	height: 120rpx;
    padding: 26rpx 48rpx;
  	background: #FFFFFF;
  	border-radius: 20rpx 20rpx 20rpx 20rpx;
  	image{
  		width: 60rpx;
  		height: 60rpx;
  	}
    &>view image{
      margin-right: 14rpx;
    }
  }
}

.share-popup{
  .share-type{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 290rpx;
  }
  .share-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    image{
      width: 100rpx;
      height: 100rpx;
      margin-bottom: 20rpx;
    }
  }
  .cancel{
    height: 110rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #F1F1F1;
  }
}
</style>
