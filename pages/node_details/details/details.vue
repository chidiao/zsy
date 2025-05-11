<template>
  <view>
    <!-- <Head class="head" title="节点详情" /> -->
    <u-tabs
      :list="list"
      :lineColor="`url(${lineBg}) 100% 100%`"
      :activeStyle="activeStyle"
      :scrollable="true"
      @click="click"
    ></u-tabs>
    <com-info :count="count" :channel_id="channel_id"></com-info>
    <view style="height: 100rpx" class="safe_btm"></view>
    <view class="foot safe_btm">
      <view class="foot_left" @click="adminShow = true">
        <u-icon name="order" size="24"></u-icon>
        <view class="foot_text">压测详情</view>
      </view>
      <view class="flex-1">
        <u-button
		  @click="to_perssurePostInfo"
          text="重新提交资源"
          shape="circle"
          color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        ></u-button>
      </view>
    </view>
	
	<u-action-sheet cancelText="取消" :closeOnClickOverlay="true" :actions="adminlist" round="20" :show="adminShow" @close="adminShow = false" @select="getType"></u-action-sheet>
	
  </view>
</template>

<script>
import Head from "@/components/head/head.vue";
import lineBg from "@/pages/jiedian/detail/lineBg.js";
import ComInfo from "./components/com-info.vue";
export default {
  components: {
    Head,
    ComInfo,
  },
  data() {
    return {
	  adminShow:false,
	  adminlist:[
		  {
		  		name:'带宽压测详情',
				type:1
		  }
	  ],
      count: 1,
      lineBg,
      activeStyle: {
        "font-weight": 700,
        "font-size": "32rpx",
        color: "#333",
      },
      list: [
        {
          name: "流量监控",
        },
        {
          name: "基础信息",
        },
        {
          name: "硬件信息",
        },
        {
        	name: "网络信息",
        },
		{
			name: "收益",
		},
      ],
      channel_id: "",
      
    };
  },
  onLoad(e) {
    this.channel_id = e.channel_id;
  },
  methods: {
	to_perssurePostInfo(){
		uni.navigateTo({
			url:'/pages/node_details/pressurePostInfo/pressurePostInfo?channel_id='+this.channel_id
		})
	},
   getType(e){
	 console.log(e);  
	 if(e.type == 1){
		 uni.navigateTo({
		 	url:'/pages/node_details/pressureDetails/pressureDetails?channel_id='+this.channel_id
		 })
	 }
   },
    click(e) {
      this.count = e.index + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.foot {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  padding-right: 30rpx;

  .foot_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16rpx;

    .foot_text {
      font-size: 20rpx;
    }
  }
}

.safe_btm {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box !important;
}
.adminLi{
	padding: 20rpx 0rpx;
	width: 690rpx;
	text-align: center;
	
}
</style>
