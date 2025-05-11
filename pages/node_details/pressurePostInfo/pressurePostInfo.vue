<template>
  <view class="com_info">
	  <u-tabs
	    :list="list"
	    :lineColor="`url(${lineBg}) 100% 100%`"
	    :activeStyle="activeStyle"
	    :scrollable="false"
	    @click="click"
	  ></u-tabs>
    <view v-if="count == 1 && deviceInfo.device_net_info">
		<view class=""  v-for="(item,index) in deviceInfo.device_net_info.dial_info" :key="index" >
			<view class="nicItem u-border-bottom">
			  <view style="font-weight: bold">网卡：{{item.label}} | 速率：{{item.speed}}M</view>
			  <view class="right_text">
				  <view class="" @click="to_piliang(item)">
				  	批量编辑
				  </view>
			    <!-- <view>共{{item.nums}}条线路</view> -->
			    <!-- <view>拨号失败{{item.nums - item.success || 0}}条</view> -->
			  </view>
			</view>
			<view class="nic_box" v-for="(item2,index2) in item.net_info" :key="index2">
			  <view class="t_item">
			    <view>IP:{{item2.ip}}</view>
			    <u-tag :text="item2.status" size="mini" :type="item2.status == '已拨通'?'success':'error'"></u-tag>
			  </view>
			  <view class="grid">
			    <view>是否内网</view>
			    <view class="grid_color">{{item2.int_ip}}</view>
			  </view>
			  <view class="grid">
			    <view>账号</view>
			    <view class="grid_color">{{item2.account}}</view>
			  </view>
			  <view class="grid">
			    <view>密码</view>
			    <view class="grid_color">{{item2.password}}</view>
			  </view>
				  <view class="grid">
				    <view>vlan_id</view>
				    <view class="grid_color">{{item2.vlan_id}}</view>
				  </view>
			</view>
		</view>
	  <!-- <view class="InfoBox">
		<view class="InfoBoxLi">
			<view class="InfoBoxLiTitle">管理网卡</view>
			<view class="checkBox">
				<view class="" style="width: 400rpx;">
					<u--input
					    placeholder="请输入总带宽"
					    border="none"
					    v-model="value"
					  ></u--input>
				</view>
			</view>
		</view>
	   </view> -->
    </view>
    <template v-if="count == 2">
      <view class="title">基础信息</view>
      <u-cell-group>
        <u-cell title="机器 ID">
          <view slot="value" class="my_value">{{
            deviceInfo.device_id || "--"
          }}</view>
        </u-cell>
        <u-cell title="节点状态">
          <view slot="value" class="my_value">{{
            deviceInfo.status || "--"
          }}</view>
        </u-cell>
        <u-cell title="运营商">
          <view slot="value" class="my_value">{{
            deviceInfo.isp_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="机房地址">
          <view slot="value" class="my_value">{{
            deviceInfo.address || "--"
          }}</view>
        </u-cell>
        <u-cell title="备注">
          <view slot="value" class="my_value">{{
            deviceInfo.remark || ""
          }}</view>
        </u-cell>
        <u-cell title="计费方式">
          <view slot="value" class="my_value">{{
            deviceInfo.device_charging_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="设备故障">
          <view slot="value" class="my_value"
            ><u-tag
              :text="deviceInfo.client_status"
              bgColor="#145570"
              borderColor="#145570"
              size="mini"
              v-if="deviceInfo.client_status"
            ></u-tag
          ></view>
        </u-cell>
        <u-cell title="总带流量 | MB">
          <view slot="value" class="my_value">{{
            deviceInfo.band_count || "--"
          }}</view>
        </u-cell>
        <u-cell title="昨日利用率">
          <view slot="value" class="my_value">{{
            deviceInfo.y_availability || "--"
          }}</view>
        </u-cell>
        <u-cell title="昨日收益 | 元">
          <view slot="value" class="my_value">{{
            deviceInfo.yesterday_incomes == undefined
              ? "--"
              : deviceInfo.yesterday_incomes
          }}</view>
        </u-cell>
        <u-cell title="资源类型">
          <view slot="value" class="my_value">{{
            deviceInfo.resource_type_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="带宽条数">
          <view slot="value" class="my_value">{{
            deviceInfo.band_num || "--"
          }}</view>
        </u-cell>
        <u-cell title="内存">
          <view slot="value" class="my_value" v-if="deviceInfo.disk_info">{{
            deviceInfo.disk_info.memory
          }}</view>
        </u-cell>
        <u-cell title="硬盘类型">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_type || "--"
          }}</view>
        </u-cell>
        <u-cell title="硬盘大小">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_memory
          }}</view>
        </u-cell>
      </u-cell-group>
    </template>
    <template v-if="count == 3 && deviceInfo.disk_info">
      <view class="title">硬件信息</view>
      <u-cell-group>
        <u-cell title="CPU">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_info.cpu || "--"
          }}</view>
        </u-cell>
        <u-cell title="内存">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_info.memory || "--"
          }}</view>
        </u-cell>
        <u-cell title="硬盘数量">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_info.disk_num || "--"
          }}</view>
        </u-cell>
        <u-cell title="硬盘容量">
          <view slot="value" class="my_value">{{
            deviceInfo.disk_info.disk_memory || "--"
          }}</view>
        </u-cell>
      </u-cell-group>
      <view v-for="(item, index) in deviceInfo.disk_info.disk" :key="index">
        <view class="title mt">硬盘信息</view>
        <u-cell-group>
          <u-cell title="硬盘名称">
            <view slot="value" class="my_value">{{ item.name || "--" }}</view>
          </u-cell>
          <u-cell title="硬盘类型">
            <view slot="value" class="my_value">{{ item.type || "--" }}</view>
          </u-cell>
          <u-cell title="硬盘容量">
            <view slot="value" class="my_value">{{ item.memory || "--" }}</view>
          </u-cell>
        </u-cell-group>
      </view>
    </template>
    <!-- <template v-if="count == 4 && deviceInfo.device_net_info">
      <view class="title">网络信息</view>
      <u-cell-group>
        <u-cell title="资源类型">
          <view slot="value" class="my_value">{{
            deviceInfo.device_net_info.resource_type_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="网络模式">
          <view slot="value" class="my_value">{{
            deviceInfo.device_net_info.net_type_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="拨号模式">
          <view slot="value" class="my_value">{{
            deviceInfo.device_net_info.dial_type_name || "--"
          }}</view>
        </u-cell>
        <u-cell title="拨号线路">
          <view slot="value" class="my_value">{{
            deviceInfo.device_net_info.dial_line_name || "--"
          }}</view>
        </u-cell>
      </u-cell-group>
      <view class="" v-for="(item,index) in deviceInfo.device_net_info.dial_info" :key="index">
      	<view class="nicItem u-border-bottom">
      	  <view style="font-weight: bold">网卡：{{item.label}} | 速率：{{item.speed}}M</view>
      	  <view class="right_text">
      	    <view>共{{item.nums}}条线路</view>
      	    <view>拨号失败{{item.nums - item.success || 0}}条</view>
      	  </view>
      	</view>
      	<view class="nic_box" v-for="(item2,index2) in item.net_info" :key="index2">
      	  <view class="t_item">
      	    <view>IP:{{item2.ip}}</view>
      	    <u-tag :text="item2.status" size="mini" :type="item2.status == '已拨通'?'success':'error'"></u-tag>
      	  </view>
      	  <view class="grid">
      	    <view>是否内网</view>
      	    <view class="grid_color">{{item2.int_ip}}</view>
      	  </view>
      	  <view class="grid">
      	    <view>账号</view>
      	    <view class="grid_color">{{item2.account}}</view>
      	  </view>
      	  <view class="grid">
      	    <view>密码</view>
      	    <view class="grid_color">{{item2.password}}</view>
      	  </view>
		  <view class="grid">
		    <view>vlan_id</view>
		    <view class="grid_color">{{item2.vlan_id}}</view>
		  </view>
      	</view>
      </view>
    </template> -->
  </view>
</template>

<script>
import * as echarts from "@/uni_modules/lime-echart/static/echarts.min";
import lineBg from "@/pages/jiedian/detail/lineBg.js";
export default {
  data() {
    return {
	   count:1,
	   channel_id:'',
	   value:'',
	   lineBg,
	   type:'1',
      timeList: [
        {
          title: "今天",
          value: "today",
        },
        {
          title: "昨天",
          value: "yesterday",
        },
        {
          title: "近7天",
          value: "seven",
        },
        {
          title: "近30天",
          value: "thirty",
        },
        {
          title: "本月",
          value: "month",
        },
        {
          title: "上月",
          value: "lastmonth",
        },
      ],
	  list: [
	    {
	      name: "网络信息",
	    },
	    {
	      name: "基础信息",
	    },
	    {
	      name: "硬件信息",
	    }
	    // {
	    // 	name: "网络信息",
	    // },
	  ],
	  activeStyle: {
	  	'font-weight': 700,
	  	'font-size': '32rpx',
	  	'color': '#333'
	  },
      flowList: {},
      total: "",
      active: "today",
      deviceInfo: {},
	  networkCard:[],//网卡信息
    };
  },
  onLoad(data) {
	this.channel_id = data.channel_id
    console.log("constlog");
	
  },
  onShow() {
  	this.getDeviceInfo();//查询设备信息
  	this.getDataSource();//获取资源信息---获取网卡列表
  	this.flowQuery();//流量监控
  	this.externalPressTestDetail();//带宽压测详情
  },
  methods: {
	//批量编辑
	to_piliang(item){
		let dialInfo = this.networkCard
		let thisdia = item
		let obj = {}
		for(let i in dialInfo){
			if(dialInfo[i].label == thisdia.label){
				obj = dialInfo[i]
				console.log(dialInfo[i]);
			}
		}
		if(obj.value){
			uni.navigateTo({
				url:'/pages/node_details/subimtPresure/subimtPresure?value='+obj.value+'&allInfo='+JSON.stringify(thisdia)+'&channel_id='+this.channel_id
			})
		}else{
			this.$u.toast('未查询到信息')
		}
		
	},
	//切换
	click(e) {
	    this.count = e.index + 1;
	},
    initEcharts() {
      const seriesData = Object.values(this.flowList);
	  const timestamps = Object.keys(this.flowList);
	  let formattedTimes = timestamps.map(timestamp => {
			let date = new Date(parseInt(timestamp) * 1000); // 将时间戳乘以1000转换为毫秒并传递给Date构造函数
		  let hours = date.getHours(); // 获取小时
		  let minutes = date.getMinutes(); // 获取分钟
		  let formattedTime = `${hours}:${minutes}`; // 格式化时和分
		  return formattedTime;
	  });
	   // console.log('组件数据',formattedTimes);
      const option = {
        xAxis: {
          type: "category",
          data: formattedTimes,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: seriesData,
            type: "line",
            areaStyle: {},
          },
        ],
      };
		uni.hideLoading()
      this.$refs.chart.init(echarts, (chart) => {
        chart.setOption(option);
      });
    },
    onClickItem(e) {
	  uni.showLoading({
	  	title:'加载中',
		mask:true
	  })
      this.active = e.value;
	  this.flowQuery()
    },
    externalPressTestDetail() {
      this.$api
        .externalPressTestDetail({
          device_id: this.channel_id,
        })
        .then((res) => {
          console.log(res);
        });
    },
    flowQuery() {
      this.$api
        .flowQuery({
          device_id: this.channel_id,
          type: this.active,
        })
        .then((res) => {
          this.flowList = res.data.list;
          this.total = res.data.total;
          console.log(this.flowList, "this.flowList");
          // this.option.xAxis.data = xAxis
          this.initEcharts();
        });
    },
    getDeviceInfo() {
      this.$api
        .getDeviceInfo({
          device_id: this.channel_id,
        })
        .then((res) => {
          console.log('设备信息',res);
          this.deviceInfo = res.data;
        });
    },
    getDataSource() {
      this.$api
        .getDataSource({
          device_id: this.channel_id,
        })
        .then((res) => {
          console.log('网卡信息',res);
		  this.networkCard = res.data
		  if(this.networkCard.length == 0){
			  this.$u.toast('设备绑定中，请稍后重试')
		  }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 120rpx 1fr;
  .grid_color{
    color: #000 !important;
  }
}
.nic_box {
  padding: 20rpx 0;
  font-size: 25rpx;
  color: #666;
}
.t_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx 0rpx;
}
.nicItem {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .right_text {
    font-size: 24rpx;
    color: #777;
  }
}
.mt {
  margin-top: 50rpx;
}
.active {
  background-color: #145570 !important;
  color: #fff !important;
}
.my_scroll {
  display: flex;
  align-items: center;
  .scroll_item {
    font-size: 28rpx;
    min-width: 130rpx;
    border: 1rpx solid #145570;
    padding: 10rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #145570;
    margin-left: -1rpx;
  }
}
.com_info {
  padding: 10rpx 30rpx 50rpx;
}
.title {
  color: #999;
  margin-bottom: 15rpx;
}
::v-deep .u-cell__body {
  padding: 20rpx 0 !important;
}
.my_value {
  max-width: 420rpx;
  word-wrap: break-word;
  color: #777;
}
.handsOnTime {
  text-align: right;
  color: #999;
}
.top_margin {
  margin-bottom: 20rpx;
}
.totalBandwidth {
  margin-top: 30rpx;
  margin-bottom: 10rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.InfoBox{
	// padding: 20rpx 20rpx;
	.InfoBoxLi{
		padding: 30rpx 0rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #f0f0f0;
		.checkBox{
			display: flex;
			align-items: center;
			// margin-left: 20rpx;
		}
		.InfoBoxLiTitle{
			width: 180rpx;
			color: #4d4d4d;
			font-size: 30rpx;
		}
	}
}
</style>
