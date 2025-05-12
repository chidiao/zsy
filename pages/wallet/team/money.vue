<template>
  <view>
    <u-navbar title="分佣记录" :autoBack="true" placeholder> </u-navbar>

    <view class="list">
      <view class="item" v-for="i in list" :key="i.id">
        <view class="gap" style="flex-grow: 1; overflow: hidden; text-overflow: ellipsis">
          <view>
            {{ i.pid }}
          </view>
          <view>
            {{ i.memo }}
          </view>
          <view style="font-size: 10px; opacity: 0.6">
            {{ i.createtime }}
          </view>
        </view>

        <view class="gap" style="flex-shrink: 0; color: #fb553c">
          <view style="font-weight: bold">
            {{ i.after }}
          </view>
          <view style="font-size: 10px">
            {{ i.money >= 0 ? `+${i.money}` : `-${i.money}` }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      loading: false,
      more: true
    }
  },
  mounted() {
    this.getList()
  },
  onReachBottom() {
    if (this.more) {
      this.getList()
    }
  },
  methods: {
    reset() {
      this.list = []
      this.page = 1
      this.more = true
    },
    async getList() {
      try {
        if (this.loading) return

        const params = {
          page: this.page,
          size: this.size
        }
        this.loading = true
        const { data } = await this.$api.getMoneyList(params)
        const _list = data.data
        this.list = this.list.concat(_list)
        this.page++
        if (_list.length < this.size) {
          this.more = false
        }
      } catch {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
page {
  background: #f2f2f2;
}

.list {
  padding: 30rpx;
  display: grid;
  gap: 16px;
}

.item {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.gap {
  display: grid;
  gap: 2px;
}
</style>
