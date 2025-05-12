<template>
  <view>
    <u-popup
      :show="show"
      mode="center"
      :closeOnClickOverlay="false"
      @close="close"
      closeable
      :round="16"
      :customStyle="customStyle"
    >
      <view class="modal">
        <view> 分佣比例 </view>

        <u--input placeholder="0~100" type="digit" v-model="rate">
          <template slot="suffix">
            <view> % </view>
          </template>
        </u--input>

        <view> 成员等级 </view>

        <view style="position: relative">
          <u--input placeholder="设置等级" :value="levelText" readonly> </u--input>

          <view style="position: absolute; inset: 0; z-index: 9" @click="showLevels = true"> </view>
        </view>

        <view style="padding-top: 15px" @click="submit">
          <u-button type="primary">确定</u-button>
        </view>
      </view>
    </u-popup>

    <u-picker
      :show="showLevels"
      :columns="levels"
      keyName="label"
      @cancel="showLevels = false"
      @close="showLevels = false"
      @confirm="onLevel"
    ></u-picker>
  </view>
</template>

<script>
export default {
  props: ['show'],
  emits: ['close', 'submit'],
  data() {
    return {
      rate: 0,
      level: 0,
      showLevels: false,
      levels: [
        [
          { label: '一级', level: 1 },
          { label: '二级', level: 2 },
          { label: '三级', level: 3 }
        ]
      ]
    }
  },
  computed: {
    levelText() {
      const levels = [
        { label: '一级', level: 1 },
        { label: '二级', level: 2 },
        { label: '三级', level: 3 }
      ]

      const level = levels.find((item) => item.level == this.level)

      if (level) {
        return level.label
      } else {
        return ''
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.reset()
      }
    },
    rate(newVal, oldVal) {
      let num = parseFloat(newVal)

      if (isNaN(num)) {
        this.rate = 0
        return
      }

      if (num < 0) {
        this.rate = 0
      } else if (num > 100) {
        this.rate = 100
      } else {
        if (newVal !== num.toString()) {
          this.rate = num
        }
      }
    }
  },
  methods: {
    close() {
      this.showLevels = false
      this.$emit('close')
    },
    onLevel(e) {
      const { level } = e.value[0]
      this.level = level
      this.showLevels = false
    },
    reset() {
      this.rate = 0
      this.level = 0
    },
    submit() {
      this.$emit('close')

      if (this.level == 0) {
        uni.showToast({
          title: '参数无效',
          icon: 'none'
        })
      } else {
        this.$emit('submit', {
          rate: this.rate,
          level: this.level
        })
      }
    }
  }
}
</script>

<style>
.modal {
  width: 640rpx;
  padding: 24px;
  display: grid;
  gap: 8px;
}
</style>
