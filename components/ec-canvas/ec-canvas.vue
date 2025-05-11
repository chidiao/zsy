<template>
	<view style="width: 100%;height: 100%;">
		<view class="chart-container">
			<l-echart ref="chart" @finished="init"></l-echart>
		</view>
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	export default {
		components: {
			LEchart
		},
		data() {
			return {
				option: {
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
          grid: {
            left: uni.upx2px(20),
            bottom: uni.upx2px(20),
            top: uni.upx2px(44),
            containLabel: true
          },
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line',
						stack: 'Total',
						smooth: true
					},{
						data: [],
						type: 'line',
						stack: 'Total',
						smooth: true
					}]
				},
			}
		},
		mounted() {
			// this.$refs.chart.init(echarts, chart => {
			// 	chart.setOption(this.option);
			// });
		},

		methods: {
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			}
		}
	}
</script>

<style>
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>