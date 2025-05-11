<template>
	<view class="page">
		<Head class="head" :title="title" />
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="box">
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #F1F1F1;">
						<view class="size-28 bold">账号</view>
						<input type="text" v-model="form.account" class="text-right size-28" placeholder="请输入账号">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #F1F1F1;">
						<view class="size-28 bold">密码</view>
						<input type="text" v-model="form.password" class="text-right size-28" placeholder="请输入密码">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #F1F1F1;">
						<view class="size-28 bold">vlan</view>
						<input type="text" v-model="form.vlanId" class="text-right size-28" placeholder="请输入">
					</view>
					<!-- <view class="ptb-40 flex">
						<view class="size-28 bold">网卡</view>
						<input type="text" class="text-right size-28" placeholder="请输入">
					</view> -->
					<view class="ptb-40 flex" v-if="cid == 1">
						<view class="size-28 bold">V6</view>
						<u-switch size="18" activeColor="#1AC4D6" @change="change" :value="form.enableV6 == 0 ? false : true"></u-switch>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="button" @click="confirm">
			确认修改
		</view>
	</view>
</template>

<script>
	import Head from '@/components/head/head.vue'
	export default {
		components: {
			Head
		},
		onLoad(e) {
			var obj = JSON.parse(e.item)
      this.cid = e.cid
			this.form.number = obj.number || obj.adslNum
			this.form.device_id = e.device_id
			this.form.name = e.name
			this.form.account = obj.account
			this.form.password = obj.password
			this.form.vlanId = obj.vlanId
			this.form.enableV6 = e.cid == 1 ? obj.enableV6 : '0'
		},
		data() {
			return {
				top: 0,
				title:'修改账号',
				form:{
          number: '',
					device_id:'',
          name: '',
					account:'',
					password:'',
					vlanId:"",
					enableV6:''
				},
        cid: 1
			}
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
			change(e){
				console.log(e)
				this.form.enableV6 = e ? 1 : 0
			},
			confirm(){
        uni.showLoading({
          title:'修改中...'
        })
				this.$api.editDialInfo(this.form).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						setTimeout(function(){
							uni.navigateBack()
						},500)
					}
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
	width: 710rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 20rpx auto 0;
	padding: 0 30rpx;
}
.button{
	position: fixed;
	bottom: 80rpx;
	left: 50%;
	transform: translateX(-50%);
}
</style>
