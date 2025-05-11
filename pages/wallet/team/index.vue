<template>
  <view>
    <u-navbar title="我的团队" :autoBack="true" placeholder> </u-navbar>

    <view style="padding: 30rpx">
      <team-count :count="teamCount"></team-count>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      teamCount: {
        line_online_total: 0,
        line_total: 0,
        my_profit: 0,
        my_yesterday_profit: 0,
        total_money: 0,
        total_yesterday: 0
      }
    }
  },
  mounted() {
    this.getData()
  },
  onPullDownRefresh() {
    this.getData()
  },
  methods: {
    getData() {
      try {
        this.$api.getTeamCount().then((res) => {
          if (res.data) {
            this.teamCount = res.data
          }
        })
      } catch {
      } finally {
        uni.stopPullDownRefresh()
      }
    }
  }
}
</script>

<style>
page {
  background: #f2f2f2;
}
</style>
