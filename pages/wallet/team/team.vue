<template>
  <view class="page">
    <view class="head">
      <Head title="团队成员" />
      <view style="display: none">
        <u-tabs :list="list" lineColor="#1AC4D6" :activeStyle="activeStyle" :scrollable="false" @click="click"></u-tabs>
      </view>
    </view>

    <scroll-view
      scroll-y="true"
      class="scroll"
      :style="{ height: 'calc(100vh - ' + top + 'px)' }"
      @scrolltolower="scrolltolower"
    >
      <view class="over-hidden">
        <view class="member" v-for="item in dataList" @click="onItem(item)">
          <view style="flex-shrink: 0">
            <u-avatar></u-avatar>
          </view>

          <view style="display: grid; gap: 2px; flex-grow: 1">
            <view style="font-size: 14px; opacity: 1">{{ item.nickname }}</view>
            <view style="font-size: 12px; opacity: 0.8">{{ item.mobile }}</view>
            <view style="font-size: 10px; opacity: 0.6">注册时间：{{ item.createtime }}</view>
          </view>

          <view class="right">
            <view>
              {{ item.level_text }}
            </view>
            <view>
              {{ item.rate_text }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <team-rate :show="showRate" @close="showRate = false" @submit="onSetRate"></team-rate>
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
      list: [
        {
          name: '一级代理'
        },
        {
          name: '二级代理'
        },
        {
          name: '三级代理'
        }
      ],
      count: 0,
      page: 1,
      activeStyle: {
        'font-weight': 700,
        'font-size': '30rpx',
        color: '#333'
      },
      dataList: [],
      more: true,
      showRate: false,
      selectedItem: {}
    }
  },
  mounted() {
    this.getElInfo()
    this.init()
  },
  methods: {
    click(e) {
      this.count = e.index
      this.page = 1
      this.more = true
      this.dataList = []
      this.init()
    },
    scrolltolower() {
      if (this.more) {
        this.page++
        this.init()
      }
    },
    init() {
      this.$api
        .getTeamList({
          type: this.count,
          page: this.page,
          size: 10
        })
        .then((res) => {
          if (res.data.data.length < 10) {
            this.more = false
          }
          this.dataList = this.dataList.concat(res.data.data)
        })
    },
    getElInfo() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('.head')
        .boundingClientRect((data) => {
          this.top = data.height
        })
        .exec()
    },
    reset() {
      this.page = 1
      this.more = true
      this.dataList = []
      this.init()
    },
    onItem(item) {
      this.selectedItem = item
      this.showRate = true
    },
    onSetRate(params) {
      this.setRate({
        uid: this.selectedItem.id,
        ...params
      })
    },
    async setRate(params) {
      try {
        uni.showLoading({
          title: 'loading'
        })
        const { msg } = await this.$api.setTeamRate(params)
        uni.showToast({
          title: msg,
          icon: 'none'
        })
        this.reset()
      } catch (e) {
        //
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style>
.member {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 710rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin: 30rpx auto 0;
  padding: 30rpx;
}

.member .right {
  min-width: 64px;
  flex-shrink: 0;
  color: #fb553c;
  font-weight: bold;
  display: grid;
  gap: 4px;
  justify-content: right;
}
</style>
