<template>
  <view class="page2">
    <view class="content" v-if="info">
      <template v-if="!info.manager">
        <view class="tip">检测到您的设备已启用{{ netCount }}个网卡</view>
        <view class="title">请选中一个管理线路网卡:</view>
      </template>
      
      <view class="list" v-if="info.manager">
        <view class="name">您的管理线路网卡是</view>
        <view class="item active" @tap="handleCancel">
          网卡：{{ info.manager.name }} 速率：{{ info.manager.speed }} IP：{{ info.manager.ip }}
        </view>
      </view>
    
      <view v-if="info.net" class="list">
        <view class="name" v-if="info.manager">您的数据线路是</view>
        <view class="item" v-for="(item, index) in info.net" :key="index" :class="{active: current === index}" @tap="handleChange(index)">
          网卡：{{ item.name }} | 速率：{{ item.speed }} | IP：{{ item.ip }}
        </view>
      </view>
      
      <view class="btm">
        <view class="btn" v-if="!info.manager" @tap="handleSubmit">确认管理线路网卡</view>
        <view class="tip" v-else>注: 如您需要重新选择管理线路网卡，
        请先<text>取消已选网卡</text></view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        device_id: '',
        info: null,
        current: -1
      };
    },
    onLoad(e) {
      this.device_id = e.device_id
      this.getManager()
    },
    computed: {
      netCount() {
        return (this.info?.net?.length || 0) + (this.info?.manager ? 1 : 0)
      }
    },
    methods: {
      // 获取网卡列表
      getManager() {
        this.$api.getDeviceInter({
          device_id: this.device_id
        }).then(res => {
          this.info = res.data
          console.log(res)
        }).catch(err => {})
      },
      
      handleChange(index) {
        if(this.info.manager) {
          return this.$utils.showToast('请先取消已选的网卡！')
        }
        this.current = index
      },
      
      handleCancel() {
        this.info.net.push(this.info.manager)
        this.info.manager = null
      },
      
      handleSubmit() {
        const item = this.info.net[this.current]
        if(!item) {
          return this.$utils.showToast('请先选择网卡！')
        }
        this.$api.setManager({
          manager_name: item.name,
          device_id: this.device_id
        }).then(res => {
          console.log(res)
          uni.$emit('updateDetailInfo')
          this.$utils.showToast('设置成功！')
          setTimeout(() => {
            uni.navigateBack()
          }, 300)
        }).catch(err => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.content{
  padding: 24rpx;
  .tip{
    
  }
  .title{
    font-weight: bold;
    margin: 10rpx 0 20rpx;
  }
}
.list{
  .name{
    margin-bottom: 20rpx;
  }
  .item{
    padding: 30rpx 20rpx;
    font-size: 28rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    &.active{
      background-color: #0DC7DA;
      color: #fff;
    }
  }
}
.btm{
  position: fixed;
  left: 20rpx;
  bottom: 100rpx;
  width: 710rpx;
  .btn{
    width: 690rpx;
    height: 88rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0DC7DA;
    color: #fff;
    border-radius: 14rpx;
  }
  .tip{
    font-size: 28rpx;
    width: 480rpx;
    margin: 0 auto;
    text-align: center;
    color: #999;
    text{
      color: orange;
    }
  }
}
</style>
