<template>
	<view class="page">
		<view class="head">
			<Head :title="title" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="box plr-30" v-if="form.type == 1">
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">开户名</view>
						<input type="text" class="text-right size-28" v-model="form.name" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">开户行</view>
						<input type="text" class="text-right size-28" v-model="form.bank" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">银行账号</view>
						<input type="text" class="text-right size-28" v-model="form.account" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">联系电话</view>
						<input type="text" class="text-right size-28" v-model="form.mobile" placeholder="请输入">
					</view>
					<view class="ptb-40 flex">
						<view class="size-28 bold">身份证号</view>
						<input type="text" class="text-right size-28" v-model="form.idcard" placeholder="请输入">
					</view>
				</view>
				<view class="box plr-30" v-if="form.type == 0">
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">支付宝账号</view>
						<input type="text" class="text-right size-28" v-model="form.account" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">姓名</view>
						<input type="text" class="text-right size-28" v-model="form.name" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">手机号</view>
						<input type="text" class="text-right size-28" v-model="form.mobile" placeholder="请输入">
					</view>
					<view class="ptb-40 flex" style="border-bottom: 1rpx solid #f8f8f8;">
						<view class="size-28 bold">身份证号</view>
						<input type="text" class="text-right size-28" v-model="form.idcard" placeholder="请输入">
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="button" @click="confirm">
			确定
		</view>
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
				title:'',
				form:{
					type:'',
					account:'',
					mobile:'',
					idcard:'',
					name:'',
					bank:''
				}
			}
		},
		onLoad(e) {
			this.title = e.title
			this.form.type = e.type
			this.init()
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
			confirm(){
				this.$api.operateAccount(this.form).then(res=>{
					this.$utils.showToast(res.msg)
					if(res.code == 1){
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					}
				})
			},
			init(){
				this.$api.getMyAccount({
					type:this.form.type
				}).then(res=>{
					if(res.data.length != 0){
						this.form.bank = res.data.bank
						this.form.idcard = res.data.idcard
						this.form.mobile = res.data.mobile
						this.form.name = res.data.name
						this.form.account = res.data.account
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

<style >
.box{
	width: 710rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 30rpx auto 0;
}
.button{
	position: fixed;
	bottom: 80rpx;
	left: 50%;
	transform: translateX(-50%);
}
</style>
