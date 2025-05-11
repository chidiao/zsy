<template>
  <view class="page">
    <view class="head">
      <Head title="节点详情" />
      <view class="time flex_l">
        <image src="../../../../static/time.png" mode=""></image>
        <view class="center flex-1" @click="show = true">
          <view class="size-28 gray-2" v-if="form.start_time == ''">
            开始时间
          </view>
          <view class="size-28" v-else>
            {{ $u.timeFormat(form.start_time, 'yyyy-mm-dd') }}
          </view>
          <view class="mlr-80 size-28">至</view>
          <view class="size-28 gray-2" v-if="form.end_time == ''">
            结束时间
          </view>
          <view class="size-28" v-else>
            {{ $u.timeFormat(form.end_time, 'yyyy-mm-dd') }}
          </view>
        </view>
      </view>
      <view class="flex mt-10">
        <view class="tabs ml-10" style="width: 425rpx">
          <u-tabs
            :list="filterTab"
            lineColor="#1AC4D6"
            :inactiveStyle="inactiveStyle"
            :activeStyle="activeStyle"
            :scrollable="false"
            @click="click"
          ></u-tabs>
        </view>
        <view class="tab flex mr-30">
          <view :class="{ active: form.status == 0 }" @click="tabChange(0)">
            5m
          </view>
          <view :class="{ active: form.status == 1 }" @click="tabChange(1)">
            1h
          </view>
        </view>
      </view>
    </view>
    <scroll-view
      :scroll-y="cid == 1"
      class="scroll"
      :enhanced="true" :bounces="false"
      :style="{ height: 'calc(100vh - ' + top + 'px)' }"
    >
      <view class="over-hidden">
        <view class="box ptb-20 plr-14">
          <view class="flex">
            <view class="size-26 bold">上下行带宽({{cid == 1?'M':'G'}})</view>
            <view class="flex">
              <view class="flex">
                <view class="radius" style="background: #91cc75"></view>
                <view class="size-22">上行带宽</view>
              </view>
              <view class="ml-40 flex">
                <view class="radius" style="background: #5470c6"></view>
                <view class="size-22">下行带宽</view>
              </view>
            </view>
          </view>
          <view class="chart">
            <echarts ref="dkRef" />
          </view>
        </view>
        <view class="box ptb-20 plr-14" :style="{opacity: cid == 1 ? 1 : 0}">
          <view class="flex">
            <view class="size-26 bold">CPU利用率</view>
            <view class="flex">
              <view class="flex">
                <view class="radius" style="background: #5470c6"></view>
                <view class="size-22">CPU：{{ cpuNum }}核</view>
              </view>
            </view>
          </view>
          <view class="chart">
            <echarts ref="cpuRef" />
          </view>
        </view>
        <view class="box ptb-20 plr-14" :style="{opacity: cid == 1 ? 1 : 0}">
          <view class="flex">
            <view class="size-26 bold">内存利用率</view>
            <view class="flex">
              <view class="flex">
                <view class="radius" style="background: #5470c6"></view>
                <view class="size-22">内存：{{ memorySize }}G</view>
              </view>
            </view>
          </view>
          <view class="chart">
            <echarts ref="ncRef" />
          </view>
        </view>
        <view class="box ptb-20 plr-14" v-if="cid != 1">
          <view class="flex">
            <view class="size-26 bold"></view>
            <view class="flex">
              <view class="flex">
                <view class="radius" style="background: #5470c6"></view>
                <view class="size-22"></view>
              </view>
            </view>
          </view>
          <view class="chart">
            <echarts ref="ncRef" />
          </view>
        </view>
        <view class="box ptb-20 plr-14" v-if="cid == 1">
          <view class="flex">
            <view class="size-26 bold">磁盘利用率</view>
            <view class="flex">
              <view class="flex">
                <view class="radius" style="background: #5470c6"></view>
                <view class="size-22">磁盘总容量：{{ diskSize }}tb</view>
              </view>
            </view>
          </view>
          <view class="chart">
            <echarts ref="cpRef" />
          </view>
        </view>
      </view>
      <view style="height: 80rpx"></view>
    </scroll-view>
    
    <u-calendar
      :catchtouchmove="true"
      :show="show"
      mode="range"
      :minDate="minDate"
      :monthNum="4"
      :maxRange="maxRange"
      @close="show = false"
      @confirm="confirmTime"
    ></u-calendar>
  </view>
</template>

<script>
import Head from '@/components/head/head.vue'
import echarts from '@/components/ec-canvas/ec-canvas.vue'
export default {
  components: {
    Head,
    echarts
  },
  data() {
    const minDate = Date.now() - 3 * 30 * 24 * 60 * 60 * 1000
    return {
      minDate,
      maxRange: 3,
      show: false,
      top: 0,
      activeStyle: {
        'font-weight': 700,
        'font-size': '30rpx',
        color: '#333'
      },
      inactiveStyle: {
        'font-size': '26rpx',
        color: '#999'
      },
      list: [
        {
          name: '今日',
          id: 'today'
        },
        {
          name: '昨日',
          id: 'yesterday'
        },
        {
          name: '本周',
          id: 'week'
        },
        {
          name: '本月',
          id: 'month'
        }
      ],
      form: {
        device_id: '',
        start_time: '',
        end_time: '',
        type: 'today',
        status: '0'
      },
      cpuNum: 0,
      dkNum: 0,
      ncNum: 0,
      cpNum: 0,
      diskSize: '',
      cpuNum: '',
      memorySize: '',
      cid: 1
    }
  },
  computed: {
    filterTab() {
      if(this.cid == 1) {
        return this.list
      } else {
        return this.list.slice(0, 2)
      }
    }
  },
  mounted() {
    this.getElInfo()
  },
  onLoad(e) {
    this.form.device_id = e.device_id
    this.diskSize = e.diskSize
    this.cpuNum = e.cpuNum
    this.memorySize = e.memorySize
    this.cid = e.cid
    if(this.cid == 1) {
      this.maxRange = 90
    }
    this.init()
  },
  methods: {
    stop(e) {},
    init() {
      uni.showLoading({
        title: '加载中...'
      })
      this.$api.monitor(this.form).then((res) => {
        uni.hideLoading()
        var downBandwidth = [] //下行贷款
        var upBandwidth = [] //上行贷款
        var cpuUsage = [] //cpu使用情况
        var diskUsage = [] //磁盘使用情况
        var memUsage = [] //内存使用情况
        var time = []
        res.data.forEach((item) => {
          downBandwidth.push(Number(item.downBandwidth).toFixed(2))
          upBandwidth.push(Number(item.upBandwidth).toFixed(2))
          time.push(item.timestamp)
          if(this.cid == 1) {
            cpuUsage.push(Number(item.cpuUsage).toFixed(2))
            diskUsage.push(Number(item.diskUsage).toFixed(2))
            memUsage.push(Number(item.memUsage).toFixed(2))
          }
        })
        this.$refs.dkRef.option.series[0].data = downBandwidth
        this.$refs.dkRef.option.series[1].data = upBandwidth
        this.$refs.dkRef.option.xAxis.data = time
        this.$refs.dkRef.init()
        
        if(this.cid == 1) {
          this.$refs.cpuRef.option.series[0].data = cpuUsage
          this.$refs.cpuRef.option.xAxis.data = time
          this.$refs.cpuRef.init()

          this.$refs.ncRef.option.series[0].data = diskUsage
          this.$refs.ncRef.option.xAxis.data = time
          this.$refs.ncRef.init()

          this.$refs.cpRef.option.series[0].data = memUsage
          this.$refs.cpRef.option.xAxis.data = time
          this.$refs.cpRef.init()
        }
      })
    },
    tabChange(e) {
      this.form.status = e
      this.form.start_time = ''
      this.form.end_time = ''
      // this.form.type = ''
      this.init()
    },
    confirmTime(e) {
      this.show = false
      var start = e[0]
      var end = e[e.length - 1]
      this.form.type = ''
      this.form.start_time = new Date(start).getTime() / 1000
      this.form.end_time = new Date(end).getTime() / 1000
      this.init()
    },
    click(e) {
      this.form.start_time = ''
      this.form.end_time = ''
      this.form.type = e.id
      this.init()
    },
    getElInfo() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('.head')
        .boundingClientRect((data) => {
          this.top = data.height
        })
        .exec()
    }
  }
}
</script>

<style lang="scss">
.box {
  width: 690rpx;
  // height: 582rpx;
  overflow: hidden;
  background: #ffffff;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  margin: 20rpx auto 0;
}
.chart {
  width: 100%;
  height: 500rpx;
}
.active {
  background: #1ac4d6 !important;
  color: #fff;
}
.radius {
  width: 16rpx;
  height: 16rpx;
  margin-right: 15rpx;
}
.tab {
  width: 200rpx;
  height: 50rpx;
  background: #ffffff;
  border-radius: 10rpx;
  overflow: hidden;
  view {
    height: 50rpx;
    width: 50%;
    text-align: center;
    line-height: 50rpx;
    font-size: 24rpx;
  }
}
.time {
  width: 690rpx;
  height: 96rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  padding: 0 30rpx;
  margin: 15rpx auto 0;
  image {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
