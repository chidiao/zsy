<template>
  <view>
    <u-navbar title="分佣记录" :autoBack="true" placeholder> </u-navbar>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const params = {
          page: 1
        }
        const { data } = await this.$api.getMoneyList(params)
        console.log(data.data)
      } catch {}
    }
  }
}
</script>

<style></style>
