<template>
	<view>
		<view class="head">
			<Head :title="title" />
		</view>
		<view class="pd-30 size-28" v-html="content">
			
		</view>
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
				content:'',
				title:''
			};
		},
		onLoad(e) {
			this.$api.getArticleList({
				id:e.id
			}).then(res=>{
				this.content = this.$utils.handleRichText(res.data.content)
				this.title = res.data.title
			})
		},
    methods: {
    }
	}
</script>

<style lang="scss">

</style>
