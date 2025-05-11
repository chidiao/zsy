<template>
	<view class="sticky">
		<u-navbar :fixed="false" :title="title" :leftIcon="leftIcon" leftIconSize="24px" :bgColor="bgColor" :autoBack="true">
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			leftIcon: {
				type: String,
				default: 'arrow-left'
			}
		},
		data() {
			return {
				bgColor: "rgba(0,0,0,0)"
			}
		}
	}
</script>

<style lang="scss">
	.sticky{
		width: 100%;
		position: sticky;
		top: 0;
	}
</style>