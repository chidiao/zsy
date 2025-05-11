<script>
	export default {
		onLaunch: function() {
			// uni.setStorageSync('token','f3c2d40b-ef00-4e96-b11f-b68a7074d26b')
			var token = uni.getStorageSync('token')
			if(!token){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
      // #ifdef MP-WEIXIN
      this.update()
      this.share()
      // #endif
      // #ifdef APP
      this.getAppConfig()
      // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    methods: {
      // #ifdef APP
      getAppConfig() {
        // index/is_grounding
        this.$api.getAppConfig().then(res => {
          uni.setStorageSync('isHideAppStore', res.data == '1')
        }).catch(err => {
          
        })
      },
      // #endif
      // #ifdef MP-WEIXIN
      // 小程序自动更新
      update() {
        if (wx.canIUse('getUpdateManager')) {
          const updateManager = wx.getUpdateManager()
          updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
              updateManager.onUpdateReady(function () {
                wx.showModal({
                  title: '更新提示',
                  content: '新版本已经准备好，是否重启应用？',
                  success: function (res) {
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate()
                    }
                  }
                })
              })
              updateManager.onUpdateFailed(function () {
                // 新的版本下载失败
                wx.showModal({
                  title: '已经有新版本了哟~',
                  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                })
              })
            }
          })
        }
      },
      
      // 全局分享
      share: function () { 
        wx.onAppRoute(res => {
          const pages = getCurrentPages()
          const view = pages[pages.length - 1]
          wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
          })
          view.onShareAppMessage = () =>  {
            return this.getShareData(view)
          }
          view.onShareTimeline = () => {
            return this.getShareData(view)
          }
        })
      },
      
      // 获取分享数据
      getShareData(view) {
        const shareData = {
          title: '卓思云',
          // imageUrl: ''
        } 
        return shareData
      },
      // #endif
    }
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./config/common.scss";
	/*每个页面公共css */
	view{
		box-sizing: border-box;
	}
  ::v-deep {
    .u-navbar__content__title{
      font-weight: 700;
    }
  }
	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		/* font-size: 18px; */
		text-align: center;
		text-decoration: none;
		/* // line-height: 1; */
		line-height: 1.35;
		/* // border-radius: 5px; */
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
	
	button::after {
		border: none;
	}
	// .flex{
	// 	display: flex;
	// }
	.page1{
		width: 100vw;
		height: 100vh;
		// background-image: url('https://qny.lddaojia.com/uploads/20230807/079921b3e7c10017f229535ca64c3e25.png');
		// background-size: 100% 100%;
		// background-repeat: no-repeat;
    background: url('https://qiniu.zhuosiyun.com/page-bg.png') left top / 100% 422rpx no-repeat, linear-gradient(-47deg, #F7FDF9 0px, #EBFBF8 100%) left top / 100% 100% no-repeat;
	}
	.scroll {
		width: 100%;
		height: 100%;
	}
	.page{
		width: 100vw;
		height: 100vh;
		// background-image: url('https://qny.lddaojia.com/uploads/20230807/8390e08ec70fe09b292d94552139e029.png');
		// background-size: 100% 100%;
		// background-repeat: no-repeat;
    background: url('https://qiniu.zhuosiyun.com/page-bg.png') left top / 100% 422rpx no-repeat, linear-gradient(-47deg, #F7FDF9 0px, #EBFBF8 100%) left top / 100% 100% no-repeat;
	}
  .page2{
    width: 100vw;
    height: 100vh;
    background: url('https://qiniu.zhuosiyun.com/page-bg.png') left top / 100% 422rpx no-repeat, linear-gradient(-47deg, #F7FDF9 0px, #EBFBF8 100%) left top / 100% 100% no-repeat;
  }
	.ju-center{
		justify-content: center;
	}
	.ju-sb{
		justify-content: space-between;
	}
	.align-center{
		align-items: center;
	}
	.ju-sa{
		justify-content: space-around;
	}
	.danhang{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.duohang{
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.button{
		width: 630rpx;
		height: 100rpx;
		background: linear-gradient(0deg, #1AC4D6 0%, #44E7F8 100%);
		box-shadow: 0rpx 2rpx 4rpx 2rpx rgba(109,169,175,0.66);
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
	}
</style>
