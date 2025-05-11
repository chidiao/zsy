<template>
	<view class="page">
		<view class="head">
			<Head title="个人信息" />
		</view>
		<scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
			<view class="over-hidden">
				<view class="flex row" style="height: 120rpx;" @click="selectImg">
					<view>头像</view>
					<view class="flex_l">
						<image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
						<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
					</view>
				</view>
				<view class="flex row">
					<view>昵称</view>
					<view class="flex" @click="navto('/pages/user/changeName/changeName')">
						<view class="size-28 gray-2 mr-10">{{userInfo.nickname}}</view>
						<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
					</view>
				</view>
				<view class="flex row">
					<view>手机号</view>
					<view class="flex" @click="navto('/pages/login/changePhone/changePhone')">
						<view class="size-28 gray-2 mr-10">{{userInfo.mobile}}</view>
						<image src="/static/next.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
  import {baseURL} from "@/config/config.js"
	import Head from '@/components/head/head.vue'
	import {mapState} from 'vuex'
import { resolve } from "path"
	export default {
		components: {
			Head
		},
		data() {
			return {
				top: 0,
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		mounted() {
			this.getElInfo()
		},
		methods: {
			getElInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(data => {
					this.top = data.height
				}).exec();
			},
			navto(url){
				uni.navigateTo({
					url
				})
			},
      showModel() {
        return new Promise((resolve, reject) => {
          plus.android.checkPermission('android.permission.READ_EXTERNAL_STORAGE', e => {
            if(e.checkResult === -1) {
              uni.showModal({
                title: '提示',
                content: '应用将需要您授权相机及存储权限，来选择图片更换头像？',
                confirmText: "同意",
                success(res) {
                  if(res.confirm) {
                    resolve()
                  } else {
                    reject()
                  }
                }
              })
            } else {
              resolve()
            }
          })
        })
      },
      chooseImage(option){
        let chooseMethod
        // #ifdef MP-WEIXIN
        chooseMethod = uni.chooseMedia
        // #endif
        // #ifndef MP-WEIXIN
        chooseMethod = uni.chooseImage
        // #endif
        return new Promise((resolve, reject) => {
          chooseMethod({
            count: 1,
            mediaType: ['image'],
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            ...option,
            success: (res) => {
              resolve(res)
            },
            fail: (err) => {
              reject(err)
            }
          })
        })
      },
      async selectImg() {
        // #ifdef APP
        if(uni.getSystemInfoSync().osName === 'android') {
          await this.showModel()
        }
        // #endif
        this.chooseImage().then(res => {
          const path = res.tempFiles[0].tempFilePath || res.tempFiles[0].path
          console.log(path)
          uni.uploadFile({
            url: baseURL + 'common/upload',
            name: 'file',
            timeout: 10 * 60 * 1000,
            filePath: path,
            header: {
              "Accept-Language":'zh-hk',
              'ba-user-token':uni.getStorageSync('token'),
            },
            success: (res) => {
              if(res.statusCode !== 200) {
                this.$utils.showToast(res.message)
                return;
              } 
              const d = JSON.parse(res.data)
              if(d.code !== 1) {
                return;
              }
              this.$api.changeUserInfo({
                avatar: d.data.url
              }).then(res => {
                this.$utils.showToast(res.msg)
                if(res.code == 1){
                  this.$store.commit('getUserInfo', { ...this.userInfo, avatar: d.data.fullurl })
                }
              })
            },
            fail: (err) => {
              const d = JSON.parse(err.data)
              this.$utils.showToast(d.msg || err.message)
              console.log(err)
            }
          })
        }).catch(err => {
          
        })
      }
		}
	}
</script>

<style >
.row{
	width: 710rpx;
	height: 90rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin: 30rpx auto 0;
	padding: 0 34rpx;
	font-size: 28rpx;
}
.avatar{
	width: 80rpx;
	height: 80rpx;
	border-radius: 100rpx 100rpx 100rpx 100rpx;
	margin-right: 10rpx;
}
</style>
