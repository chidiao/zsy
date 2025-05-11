<template>
  <view class="page">
    <Head class="head" title="下载编辑" />
    <scroll-view scroll-y="true" class="scroll" :style="{height:'calc(100vh - '+top+'px)'}">
      <view class="over-hidden">
        <view class="btn1 center" @click="download">
          点击下载
        </view>
        <view class="btn1 center" @click="upload">
          上传文件
        </view>
      </view>
      <view style="height: 280rpx;"></view>
    </scroll-view>
  </view>
</template>

<script>
  import Head from '@/components/head/head.vue'
  // #ifdef APP
  import fileSelect from "@/uni_modules/lemon-filePicker"
  // #endif
  import {
    baseURL
  } from '@/config/config.js'
  export default {
    components: {
      Head
    },
    data() {
      return {
        top: 0,
        value: true,
        device_id: '',
        name: '',
        list: []
      }
    },
    mounted() {
      this.getElInfo()
    },
    onLoad(e) {
      this.device_id = e.device_id
      this.name = e.name
    },
    onShow() {

    },
    methods: {
      upload() {
        // #ifdef MP-WEIXIN
        uni.chooseMessageFile({
          count: 1, //能选择文件的数量
          type: 'file',
          success: res => {
            this.uploadFile(res.tempFiles[0].name, res.tempFiles[0].path)
          }
        })
        // #endif
        // #ifdef APP
        // see: https://ext.dcloud.net.cn/plugin?id=12988
        fileSelect({
          permission: true,
          success: (res) => {
            console.log(res, res.fileName, res.filePath)
            this.uploadFile(res.fileName, res.filePath);
          },
          fail(err) {
            console.log(err);
            // err.code=1001  未授权文件读取权限,可以提示用户未打开读取文件权限（仅安卓）
            uni.showModal({
              title: "需要文件访问权限",
              content: "您还未授权本应用读取文件。为保证您可以正常上传文件，请在权限设置页面打开文件访问权限（不同手机厂商表述可能略有差异）请根据自己手机品牌设置",
              confirmText: "去授权",
              cancelText: "算了",
              success(e) {
                if (e.confirm) {
                  fileSelect({
                    permission: true
                  })
                }
              }
            })
          }
        })
        // #endif
      },
      uploadFile(name, path) {
        var type = name.split('.')[1]
        if (type == 'xlsx') {
          uni.showLoading({
            title: '上传中...'
          })
          uni.uploadFile({
            url: baseURL + 'common/upload', //仅为示例，非真实的接口地址
            filePath: path,
            name: 'file',
            header: {
              'token': uni.getStorageSync('token')
            },
            success: (uploadFileRes) => {
              var data1 = JSON.parse(uploadFileRes.data)
              this._up(data1.data.url)
            },
            complete: () => {
              uni.hideLoading()
            }
          });
        } else {
          uni.showToast({
            title: '文件格式必须为xlsx类型！',
            icon: "none",
            duration: 2000,
            mask: true
          })
        }
        console.log(res)
      },
      _up(url) {
        this.$api.deviceImport({
          device_id: this.device_id,
          name: this.name,
          file: url
        }).then(res => {
          this.$utils.showToast(res.msg)
          if (res.code == 1) {
            setTimeout(function() {
              uni.navigateBack()
            }, 1000)
          }
        })
      },
      download() {
        uni.showLoading({
          title: '下载中...'
        })
        this.$api.deviceExport({
          device_id: this.device_id,
          name: this.name
        }).then(res => {
          if (res.code == 1) {
            uni.downloadFile({
              url: res.data, //仅为示例，并非真实的资源
              success: (res) => {
                console.log(res)
                uni.hideLoading()
                var tempFilePath = res.tempFilePath;
                uni.openDocument({
                  filePath: tempFilePath,
                  showMenu: true,
                  success: function(res) {
                    console.log('打开文档成功');
                  }
                });
              }
            });
          } else {
            this.$utils.showToast(res.msg)
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
  .btn1 {
    width: 200rpx;
    height: 72rpx;
    background: #E4FCFF;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    font-size: 28rpx;
    color: #333333;
    margin: 30rpx 0 0 35rpx;
  }
</style>