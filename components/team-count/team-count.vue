<template>
  <view>
    <view class="team">
      <view class="title"> 我的团队 </view>

      <view class="group">
        <view class="count" style="align-content: center" @click="toTeam">
          <image class="icon" src="@/static/team.png" />

          <text class="label">查看团队</text>
        </view>

        <view class="count" style="align-content: center" @click="toMoney">
          <image class="icon" src="@/static/shouyi.png" />

          <text class="label">查看分佣</text>
        </view>
      </view>
    </view>

    <view class="team" style="margin-top: 16px">
      <view class="title"> 我的设备 </view>

      <view class="group">
        <view class="count">
          <text class="value">{{ count.line_total }}</text>
          <text class="label">设备数量</text>
        </view>

        <view class="count">
          <text class="value">{{ count.line_online_total }}</text>
          <text class="label">在线设备数量</text>
        </view>
      </view>
    </view>

    <view class="team" style="margin-top: 16px">
      <view class="title">我的收益</view>

      <view class="group">
        <view class="count">
          <text class="value">{{ count.my_profit }}</text>
          <text class="label">我的收益</text>
        </view>

        <view class="count">
          <text class="value">{{ count.my_yesterday_profit }}</text>
          <text class="label">我的昨日收益</text>
        </view>

        <view class="count">
          <text class="value">{{ count.total_money }}</text>
          <text class="label">总收益</text>
        </view>

        <view class="count">
          <text class="value">{{ count.total_yesterday }}</text>
          <text class="label">昨日总收益</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      count: {
        line_online_total: 0,
        line_total: 0,
        my_profit: 0,
        my_yesterday_profit: 0,
        total_money: 0,
        total_yesterday: 0
      }
    }
  },
  methods: {
    toTeam() {
      uni.navigateTo({
        url: '/pages/wallet/team/team'
      })
    },
    toMoney() {
      uni.navigateTo({
        url: '/pages/wallet/team/money'
      })
    }
  }
}
</script>

<style scoped>
.team {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 16px;
  background: rgba(255, 255, 255, 1);
  display: grid;
}

.title {
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 22px;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 16px;
  background: linear-gradient(90deg, rgb(249, 249, 249) 0%, rgba(249, 249, 249, 0.5) 100%);
}

.group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 12px 0 6px 0;
  position: relative;
}

.count {
  border-radius: 8px;
  background: linear-gradient(90deg, rgb(249, 249, 249) 0%, rgba(249, 249, 249, 0.7) 100%);
  display: grid;
  padding: 8px 16px;
  position: relative;
  min-height: 86px;
}

.icon {
  --size: 64px;

  width: var(--size);
  height: var(--size);
  object-fit: cover;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: rgba(255, 126, 64, 1);
  font-size: 32px;
  font-weight: bold;
}
</style>
