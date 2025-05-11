<template>
	<view class="page">
		<Head class="head" title="网络信息" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="box flex_l flex-around text-center ptb-46">
					<view>
						<view class="size-26">上网</view>
						<view class="size-40 bold mt-18">{{info.net_num || 0}}</view>	
					</view>
					<view>
						<view class="size-26">已拨通</view>
						<view class="size-40 bold mt-18">{{info.successed_num || 0}}</view>	
					</view>
					<view>
						<view class="size-26">未拨通</view>
						<view class="size-40 bold mt-18">{{info.no_successed || 0}}</view>	
					</view>
					<view>
						<view class="size-26">已联网</view>
						<view class="size-40 bold mt-18">{{info.connected_num || 0}}</view>	
					</view>
				</view>
				<view class="flex mt-20">
					<view></view>
					<view class="size-26 mr-30">IPv6：已开启{{info.enableV6 || 0}}条  拨通{{info.enableV6_successed || 0}}条  联网{{info.enableV6_connected || 0}}条</view>
				</view>
				<view class="box" v-for="(val, index) in list">
          <view class="flex header">
            <view class="pt-24 pl-28 size-26 pb-20">网卡：{{val.name || 0}}  |  速率：{{val.speed || 0}}M  |  线路：{{val.net_num || 0}}条</view>
            <view class="edit" @click="navto('/pages/jiedian/networkInfo/setAccount/setAccount?device_id='+device_id+ '&name=' + val.name+'&cid='+info.device_channel_id)">
              <image src="/static/edit.png"></image>
              <text>编辑</text>
            </view>
          </view>
					<view class="flex_l text-center ptb-20 size-28 bold" style="background: #E4FCFF;">
						<view style="width: 110rpx;">序号</view>
						<view style="width: 300rpx;">上网信息</view>
						<view style="width: 300rpx;">上网结果</view>
					</view>
					<view class="flex_l ptb-30 size-24" style="border-bottom: 1rpx solid #f8f8f8;" v-for="item in val.dialingInfo.slice(0, val.isOpen ? 9999 : 3)">
						<view style="width: 110rpx;" class="text-center">{{item.number+1}}</view>
						<view style="width: 300rpx;" class="pl-10">
							<view>账号：{{item.account}}</view>
							<view>密码：{{item.password}}</view>
							<view>vlan_id：{{item.vlanId}}</view>
						</view>
						<view style="width: 300rpx;" class="pl-35">
              <view>IPV4：
              <template v-if="info.device_channel_id == 1">
                <text style="color: #34AE00;" v-if="item.v4Successed">已拨通/</text>
                <text style="color: #FF0000;" v-else>未拨通/</text>
                <text style="color: #34AE00;" v-if="item.v4Connected">已联网</text>
                <text style="color: #FF0000;" v-else>未联网</text>
              </template>
              <template v-else>
                <text style="color: #34AE00;" v-if="item.v4Successed == 'succeed'">已拨通/</text>
                <text style="color: #FF0000;" v-else>未拨通/</text>
                <text style="color: #34AE00;" v-if="item.v4Connected == 'succeed'">已联网</text>
                <text style="color: #FF0000;" v-else>未联网</text>
              </template>
							</view>
							<view>IPV6：
              <template v-if="info.device_channel_id == 1">
                <text style="color: #34AE00;" v-if="item.v6Successed">已拨通/</text>
                <text style="color: #FF0000;" v-else>未拨通/</text>
                <text style="color: #34AE00;" v-if="item.v6Connected">已联网</text>
                <text style="color: #FF0000;" v-else>未联网</text>
              </template>
              <template v-else>
                <text style="color: #34AE00;" v-if="item.v6Successed == 'succeed'">已拨通/</text>
                <text style="color: #FF0000;" v-else>未拨通/</text>
                <text style="color: #34AE00;" v-if="item.v6Connected == 'succeed'">已联网</text>
                <text style="color: #FF0000;" v-else>未联网</text>
              </template>
							</view>
							<view>IP：{{item.ip}}</view>
						</view>
					</view>
          <view class="ptb-24 text-center size-28 gray flex flex-center" @click="switchOpen(val)">
            <text class="mr-10">{{ val.isOpen ? '收起' : '展开全部' }}</text>
            <u-icon :name="val.isOpen ? 'arrow-up' : 'arrow-down'" color="gray" size="14"></u-icon>
          </view>
				</view>
				<view class="mt-20 ml-30 bold size-28 pb-30" @click="copyText">复制上网信息</view>
				<!-- <view class="button" @click="navto('/pages/jiedian/networkInfo/adjustLine/adjustLine?type=1&device_id='+device_id)">调整线路</view> -->
				<!-- <view class="button" @click="navto('/pages/jiedian/networkInfo/adjustLine/adjustLine?type=2&device_id='+device_id)">开启/关闭IPV6</view> -->
				<view class="button btn" @click="syncNetcard">同步网卡信息</view>
				<view class="button btn" @click="startDialing">开始拨号</view>
				<view class="button btn" @click="navto('/pages/jiedian/testResult/testResult?device_id='+device_id)">测速</view>
				<!-- <view class="button btn" @click="show = true">测速</view> -->
				<!-- <view class="button btn" @click="navto('/pages/jiedian/networkInfo/setAccount/setAccount?device_id='+device_id)">修改账号</view> -->
				<view style="height: 80rpx;"></view>
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
				top:0,
				info: {},
        list: [],
				device_id:''
			}
		},
		onLoad(e) {
			this.device_id = e.device_id
		},
		onShow() {
			this.init()
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
      switchOpen(val) {
        val.isOpen = !val.isOpen
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      },
			syncNetcard(){
				uni.showLoading({
					title:'同步中...'
				})
				this.$api.syncNetcard({
					device_id: this.device_id
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						// this.init()
					}
				})
			},
      startDialing() {
        uni.showLoading({
          title:'拨号中...'
        })
				this.$api.startDialing({
					device_id:this.device_id
				}).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						this.init()
					}
				})
      },
			init(){
				this.$api.getNewDialingInfo({
					device_id:this.device_id
				}).then(res=>{
					this.info = res.data.data || {}
          res.data.list.forEach(item => {
            item.isOpen = false
          })
					this.list = res.data.list || []
				})
			},
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
      copyText() {
        const list = this.list
        const data = list.map(val => {
          const d = val.dialingInfo
          return `网卡：${val.name} 速率：${val.speed}M\n${
            d.map(item => `${item.account} ${item.password} ${item.vlanId}`).join('\n')
          }`
        }).join('\n\n')
        uni.setClipboardData({
          data: data,
        })
      },
			navto(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
.box{
	width: 710rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 20rpx auto 0;
}
.button{
	height: 90rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	line-height: 90rpx;
	margin: 16rpx auto 0;
}
.btn{
	background: #F8F8F8 !important;
	color: #333;
	border: 2rpx solid #E3E3E3;
	box-shadow:none;
}
.header{
  justify-content: space-between;
}
.edit{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 10rpx;
  image{
    width: 36rpx;
    height: 36rpx;
    margin-right: 10rpx;
  }
  text{
    font-size: 24rpx;
    color: #1AC4D6;
  }
}
</style>
