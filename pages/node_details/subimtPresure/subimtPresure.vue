<template>
	<view>
		<view class="tips">
			网卡信息，批量时，如果是汇聚固定多ip：则填写规则为：ip+空格+网关+空格+掩码+空格+vlanid + 回车换行；如果是汇聚拨号：填写规则为：拨号账号+空格+拨号密码+空格+vlanid+回车换行
		</view>
		<view class="Box">
			<u--textarea 
			v-model="carValue" 
			placeholder="请输入内容" 
			height="500" 
			maxlength="-1">
			</u--textarea>
		</view>
		<view class="But">
			<u-button type="primary" text="提交" @click="subimt"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				allInfo:{},
				carValue:'',
				info:'',
				channel_id:'',
				sumValue:[]
			}
		},
		onLoad(data) {
			this.value = data.value
			this.allInfo = JSON.parse(data.allInfo)
			this.channel_id = data.channel_id
		},
		methods: {
			subimt(){
				if(!this.carValue)return this.$u.toast('请输入信息')
				let text = this.carValue
				this.info = text.replace(/\n|\r\n/g,' \r\n ')
				let obj = {
					adapter:this.value,
					value:this.info
				}
				this.sumValue = []
				this.sumValue.push(obj)
				let postObj = {
					device_id: this.channel_id,
					dial_string:JSON.stringify(this.sumValue)
				}
				console.log(postObj);
				this.$api
				  .submitSource(postObj)
				  .then((res) => {
				    console.log(res);
					if(res.code == 0){
						this.$u.toast('设备异常，请联系客服')
					}else{
						this.$u.toast('设置成功')
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
				  });
				
			}
		}
	}
</script>

<style scoped lang="scss">
.tips{
	width: 690rpx;
	margin:20rpx auto;
}
.Box{
	width: 690rpx;
	margin:20rpx auto;
}
.But{
	width: 690rpx;
	margin:20rpx auto;
}
</style>
