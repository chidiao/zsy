<template>
  <view class="page">
    <Head class="head" title="绑定设备" />
    <scroll-view
      scroll-y="true"
      class="scroll"
      :style="{ height: 'calc(100vh - ' + top + 'px)' }"
    >
      <view class="over-hidden">
        <!-- <view class="flex flex-around tab">
					<view class="btns1" :class="{active:count==1}" @click="count=1">
						<text>整机绑定</text>
						<image v-if="count == 1" src="../../../static/sanjiao.png" style="width: 30rpx;height: 15rpx;"
							mode=""></image>
					</view>
					<view class="btns1" :class="{active:count==2}" @click="count=2">
						<text>交换机绑定</text>
						<image v-if="count == 2" src="../../../static/sanjiao.png" style="width: 30rpx;height: 15rpx;"
							mode=""></image>
					</view>
				</view> -->
        <view class="scan-box box plr-30">
          <view @click="scanCode" class="scan">点击扫描设备二维码</view>
        </view>
        <view style="height: 20rpx"></view>
        <view class="box plr-30">
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 2"
          >
            <view class="size-28">SN号 <text style="color: red">*</text></view>
            <view class="flex">
              <image
                src="/static/sao.png"
                style="width: 40rpx; height: 40rpx"
                mode=""
              ></image>
            </view>
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28"
              >设备ID <text style="color: red">*</text></view
            >
            <input
              type="text"
              v-model="form.device_id"
              class="text-right size-28 flex-1"
              placeholder="请输入设备ID"
            />
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            @click="(type = 1), (show = true)"
          >
            <view class="size-28"
              >业务类型 <text style="color: red">*</text></view
            >
            <view class="flex">
              <view class="size-28 gray-2 mr-15" v-if="yw_text == ''"
                >请选择</view
              >
              <view class="size-28 mr-15" v-else>{{ yw_text }}</view>
              <image
                src="../../../static/next.png"
                style="width: 25rpx; height: 25rpx"
                mode=""
              ></image>
            </view>
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
            @click="(type = 2), (show = true)"
          >
            <view class="size-28 flex"
              >计费方式
              <image
                @click.stop="navto"
                src="/static/tips.png"
                style="width: 35rpx; height: 35rpx; margin-left: 10rpx"
                mode=""
              ></image>
            </view>
            <view class="flex">
              <view class="size-28 gray-2 mr-15" v-if="jf_text == ''"
                >请选择</view
              >
              <view class="size-28 mr-15" v-else>{{ jf_text }}</view>
              <image
                src="../../../static/next.png"
                style="width: 25rpx; height: 25rpx"
                mode=""
              ></image>
            </view>
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28">备注</view>
            <input
              type="text"
              class="text-right size-28"
              v-model="form.remark"
              placeholder="请填写备注(不超20字符)"
            />
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28"
              >单条上行 <text style="color: red">*</text></view
            >
            <input
              type="text"
              class="text-right size-28"
              v-model="form.upBandwidth"
              placeholder="单位Mbps，进制1024"
            />
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28"
              >线路数量 <text style="color: red">*</text></view
            >
            <input
              type="text"
              class="text-right size-28"
              v-model="form.lineNumber"
              placeholder="请填写线路数量"
            />
          </view>
          <cityPicker
            v-if="form.device_channel_id && config.location"
            @change="addressChange"
            :level="2"
            :location="config.location"
            :platform="form.device_channel_id"
          >
            <view
              class="ptb-40 flex"
              style="border-bottom: 1rpx solid #f1f1f1"
              v-if="count == 1"
            >
              <view class="size-28"
                >地域 <text style="color: red">*</text></view
              >
              <view class="text-right size-28 gray-2" v-if="form.province == ''"
                >务必正确填写，否则影响收益</view
              >
              <view class="text-right size-28" v-else
                >{{ form.province }}-{{ form.city }}</view
              >
            </view>
          </cityPicker>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
            @click="(type = 3), (show = true)"
          >
            <view class="size-28"
              >运营商 <text style="color: red">*</text></view
            >
            <view class="flex">
              <view class="size-28 gray-2 mr-15" v-if="form.isp == ''"
                >请选择</view
              >
              <view class="size-28 mr-15">{{ form.isp }}</view>
              <image
                src="../../../static/next.png"
                style="width: 25rpx; height: 25rpx"
                mode=""
              ></image>
            </view>
          </view>
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28"
              >DNS
              <!-- <text style="color: red;">*</text> --></view
            >
            <input
              type="text"
              class="text-right size-28"
              v-model="form.dns"
              placeholder="填写DNS有助于提升您的跑量哦"
            />
          </view>
        </view>
        <view class="box plr-30">
          <view
            class="ptb-40 flex"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1"
          >
            <view class="size-28 title"
              >上网方式 <text style="color: red">*</text></view
            >
            <view class="flex" @click="showDiallingType = true">
              <view class="size-28 gray-2 mr-15" v-if="form.diallingType == ''"
                >请选择</view
              >
              <view class="size-28 mr-15" v-else>{{
                diallingList.find((item) => item.id == form.diallingType).name
              }}</view>
              <image
                src="../../../static/next.png"
                style="width: 25rpx; height: 25rpx"
                mode=""
              ></image>
            </view>
            <!-- <view class="flex_l flex-1 flex-wrap ml-50"> -->
            <!-- <view class="flex_l mt-10 radio pr-15" style="width: 50%;" v-for="item in diallingList" @click="form.diallingType = item.id">
								<image src="../../../static/s_ed.png" v-if="form.diallingType == item.id" style="width: 30rpx;height: 30rpx;" mode=""></image>
								<image src="../../../static/s.png" v-else style="width: 30rpx;height: 30rpx;" mode=""></image>
								<view class="ml-15 size-28 flex-1">{{item.name}}</view>
							</view> -->
            <!-- <view class="flex_l" style="width: 50%;">
								<image src="../../../static/s.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
								<view class="ml-15 size-28">固定公网多IP</view>
							</view>
							<view class="flex_l mt-30" style="width: 50%;">
								<image src="../../../static/s.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
								<view class="ml-15 size-28">路由器上网</view>
							</view>
							<view class="flex_l mt-30" style="width: 50%;">
								<image src="../../../static/s.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
								<view class="ml-15 size-28">服务器上网</view>
							</view> -->
            <!-- </view> -->
          </view>
          <view
            class="ptb-40 flex1"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="count == 1 && nat_type.length"
          >
            <view class="size-28 title"
              >公网/内网 <text style="color: red">*</text></view
            >
            <view class="flex_l flex-1 flex-wrap ml-50">
              <view
                class="flex_l"
                style="width: 50%"
                v-for="item in nat_type"
                :key="item.id"
                @click="form.natType = item.id"
              >
                <image
                  src="../../../static/s_ed.png"
                  v-if="form.natType == item.id"
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <image
                  src="../../../static/s.png"
                  v-else
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <view class="ml-15 size-28">{{ item.name }}</view>
              </view>
            </view>
          </view>
          <view
            class="ptb-40 flex1"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="machine_room_type.length"
          >
            <view class="size-28 title">机房类型</view>
            <view class="flex_l flex-1 flex-wrap ml-50">
              <view
                class="flex_l"
                style="width: 50%"
                v-for="item in machine_room_type"
                :key="item"
                @click="form.machineRoomType = item"
              >
                <image
                  src="../../../static/s_ed.png"
                  v-if="form.machineRoomType == item"
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <image
                  src="../../../static/s.png"
                  v-else
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <view class="ml-15 size-28">{{ item }}</view>
              </view>
            </view>
          </view>
          <view class="ptb-40 flex1" style="border-bottom: 1rpx solid #f1f1f1">
            <view class="size-28 title"
              >UPS
              <!-- <text style="color: red;">*</text> --></view
            >
            <view class="flex_l flex-1 flex-wrap ml-50">
              <view class="flex_l" style="width: 50%" @click="form.ups = '0'">
                <image
                  src="../../../static/s_ed.png"
                  v-if="form.ups == '0'"
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <image
                  src="../../../static/s.png"
                  v-else
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <view class="ml-15 size-28">无ups</view>
              </view>
              <view class="flex_l" style="width: 50%" @click="form.ups = '1'">
                <image
                  src="../../../static/s_ed.png"
                  v-if="form.ups == '1'"
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <image
                  src="../../../static/s.png"
                  v-else
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <view class="ml-15 size-28">有ups</view>
              </view>
            </view>
          </view>
          <view
            class="ptb-40 flex1"
            style="border-bottom: 1rpx solid #f1f1f1"
            v-if="ip_protocol.length"
          >
            <view class="size-28 title"
              >IP协议栈 <text style="color: red">*</text></view
            >
            <view class="flex_l flex-1 flex-wrap ml-50">
              <view
                class="flex_l"
                style="width: 50%"
                v-for="item in ip_protocol"
                :key="item"
                @click="form.ipProtocol = item"
              >
                <image
                  src="../../../static/s_ed.png"
                  v-if="form.ipProtocol == item"
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <image
                  src="../../../static/s.png"
                  v-else
                  style="width: 30rpx; height: 30rpx"
                  mode=""
                ></image>
                <view class="ml-15 size-28">{{ item }}</view>
              </view>
            </view>
          </view>
          <view class="text-center size-28 gray-2 mt-45" v-if="count == 1">
            <view>填写DNS有助于提升您的跑量哦~ </view>
            <view>绑定设备前要确保设备联网</view>
          </view>
          <view style="height: 40rpx" v-if="count == 1"></view>
        </view>
        <view class="button" @click="confirm">立即绑定</view>
      </view>
    </scroll-view>
    <u-popup :show="show" round="20" @close="show = false">
      <view class="div" v-if="type == 1">
        <scroll-view scroll-y="true" style="width: 100%; height: 680rpx">
          <view class="plr-30">
            <view
              v-for="(item, index) in ywList"
              @click="selectChange(1, item, index)"
            >
              <view
                class="text-center ptb-40 size-30"
                style="border-bottom: 1rpx solid #f1f1f1"
              >
                {{ item.name }}
              </view>
            </view>
          </view>
        </scroll-view>

        <view style="height: 20rpx; background-color: #f1f1f1"></view>
        <view class="text-center ptb-40 size-30" @click="show = false"
          >取消</view
        >
      </view>
      <view class="div" v-if="type == 2">
        <!-- <scroll-view scroll-y="true" style="width: 100%;height: 680rpx;"> -->
        <view class="plr-30">
          <view v-for="item in jfList" @click="selectChange(2, item, index)">
            <view
              class="text-center ptb-40 size-30"
              style="border-bottom: 1rpx solid #f1f1f1"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
        <!-- </scroll-view> -->
        <view style="height: 20rpx; background-color: #f1f1f1"></view>
        <view class="text-center ptb-40 size-30" @click="show = false"
          >取消</view
        >
      </view>
      <view class="div" v-if="type == 3">
        <view class="plr-30">
          <view v-for="item in yyList" @click="selectChange(3, item)">
            <view
              class="text-center ptb-40 size-30"
              style="border-bottom: 1rpx solid #f1f1f1"
            >
              {{ item }}
            </view>
          </view>
        </view>
        <view style="height: 20rpx; background-color: #f1f1f1"></view>
        <view class="text-center ptb-40 size-30" @click="show = false"
          >取消</view
        >
      </view>
    </u-popup>
    <u-picker
      :show="showDiallingType"
      :columns="[diallingList]"
      keyName="name"
      :defaultIndex="[
        diallingList.findIndex((item) => item.id == form.diallingType) || 0,
      ]"
      closeOnClickOverlay
      @close="showDiallingType = false"
      @cancel="showDiallingType = false"
      @confirm="handleConfirm"
    ></u-picker>
  </view>
</template>

<script>
import Head from "@/components/head/head.vue";
import cityPicker from "./components/lingdang-AddressPicker/AddressPicker.vue";
export default {
  components: {
    Head,
    cityPicker,
  },
  data() {
    return {
      top: 0,
      count: 1,
      show: false,
      type: 1,
      ywList: [],
      jfList: [],
      form: {
        device_id: "",
        device_type_id: "",
        device_charging_id: "",
        lineNumber: "",
        upBandwidth: "",
        isp: "",
        city: "",
        province: "",
        diallingType: "",
        dns: "",
        machineRoomType: "",
        natType: "",
        ipProtocol: "",
        remark: "",
        ups: "",
		province_id:'',
		city_id:''
      },
      yw_text: "",
      jf_text: "",
      config: {},
      showDiallingType: false,
      province_id: "",
      city_id: "",
    };
  },
  mounted() {
    this.getElInfo();
  },
  computed: {
    diallingList() {
      return Object.keys(this.config.dialling_type || {}).map((key) => ({
        id: key,
        name: this.config.dialling_type[key],
      }));
    },
    yyList() {
      return this.config.isp || [];
    },
    ip_protocol() {
      return this.config.ip_protocol || [];
    },
    machine_room_type() {
      return this.config.machine_room_type || [];
    },
    nat_type() {
      return Object.keys(this.config.nat_type || {}).map((key) => ({
        id: key,
        name: this.config.nat_type[key],
      }));
    },
  },
  onLoad(e) {
    this.form.device_id = e.device_id;
    this.form.device_channel_id = e.channel_id;
    this.getConfig();
    this.getDeviceType();
    this.getDeviceCharging();
  },
  methods: {
    getConfig() {
      this.$api
        .getDeviceConfig({
          channel_id: this.form.device_channel_id,
        })
        .then((res) => {
          this.config = res.data;
          console.log(res);
        });
    },
    scanCode() {
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ["qrCode"],
        success: (res) => {
          console.log(res); // 打印扫描结果
          var param = res.result;
          if (param.includes("?")) {
            param = param.split("?")[1].slice(10);
          }
          this.form.device_id = param;
        },
        fail: (res) => {
          console.log(res);
          this.$utils.showToast(res.errMsg);
        },
      });
    },
    handleConfirm(e) {
      console.log(e);
      this.form.diallingType = (e.value[0] || this.diallingList[0]).id;
      this.showDiallingType = false;
    },
    confirm() {
      if (this.count == 1) {
        uni.showLoading({
          title: "绑定中...",
        });
        if (this.form.device_id == "")
          return this.$utils.showToast("请输入设备id");
        if (this.form.device_type_id == "")
          return this.$utils.showToast("请选择业务类型");
        if (this.form.upBandwidth == "")
          return this.$utils.showToast("请输入单行上行");
        if (this.form.lineNumber == "")
          return this.$utils.showToast("请输入线路数量");
        if (this.form.province == "")
          return this.$utils.showToast("请选择区域");
        if (this.form.isp == "" && this.yyList.length)
          return this.$utils.showToast("请选择运营商");
        // if(this.form.dns == '') return this.$utils.showToast('请输入DNS')
        if (this.form.diallingType == "" && this.diallingList.length)
          return this.$utils.showToast("请选择上网方式");
        if (this.form.natType == "" && this.nat_type.length)
          return this.$utils.showToast("请选择公网/内网");
        // if(this.form.ups == '') return this.$utils.showToast('请选择UPS')
        if (this.form.ups == "") this.form.ups = "0";
        if (this.form.ipProtocol == "" && this.ip_protocol.length)
          return this.$utils.showToast("请选择IP协议栈");
        console.log(this.form);
        let body = {};
        if (this.form.device_channel_id == "3") {
          body = {
            ...this.form,
            // province_id: this.province_id,
            // city_id: this.city_id,
          };
        } else {
          body = this.form;
        }

        this.$api.addDevice(body).then((res) => {
          this.$utils.showToast(res.msg);
          if (res.code == 1) {
            this.$store.dispatch("updateIndexInfo");
            setTimeout(function () {
              uni.navigateBack();
            }, 1500);
          }
        });
      }
    },
    selectChange(type, item, index) {
      if (type == 1) {
        this.form.device_type_id = item.id;
        this.yw_text = item.name;
      } else if (type == 2) {
        this.form.device_charging_id = item.id;
        this.jf_text = item.name;
      } else {
        this.form.isp = item;
      }
      this.show = false;
    },
    addressChange(e) {
      console.log(e);
      this.form.province = e.data[0].name;
      this.form.city = e.data[1].name;
      this.form.province_id = e.data[0].id;
      this.form.city_id = e.data[1].id;
    },
    getDeviceType() {
      this.$api
        .getDeviceType({
          channel_id: this.form.device_channel_id,
        })
        .then((res) => {
          this.ywList = res.data.task;
        });
    },
    getDeviceCharging() {
      this.$api
        .getDeviceCharging({
          channel_id: this.form.device_channel_id,
        })
        .then((res) => {
          this.jfList = res.data;
        });
    },
    getElInfo() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".head")
        .boundingClientRect((data) => {
          this.top = data.height;
        })
        .exec();
    },
    navto() {
      uni.navigateTo({
        url: "/pages/user/xieyi/xieyi?id=4",
      });
    },
  },
};
</script>

<style lang="scss">
.scan-box {
  width: 750rpx;
  background: #fff;
  border-radius: 30rpx 30rpx 0rpx 0rpx;
  margin-bottom: 10rpx;
  .scan {
    padding: 24rpx 0;
    text-align: center;
    color: blue;
    font-size: 28rpx;
  }
}
.div {
  width: 750rpx;
  background: #fff;
  border-radius: 30rpx 30rpx 0rpx 0rpx;
  // padding: 0 30rpx;
}
.radio:nth-child(2n) {
  padding-right: 0 !important;
}
.active {
  background-color: #1ac4d6 !important;
  color: #fff !important;
}

.button {
  margin: 54rpx auto 80rpx;
}

.title {
  width: 150rpx;
}

.tab {
  margin-top: 20rpx;

  .btns1 {
    width: 284rpx;
    height: 80rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #333333;
    position: relative;
  }

  image {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -15rpx;
  }
}

input {
  flex: 1;
  margin-left: 30rpx;
}

.box {
  width: 710rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin: 20rpx auto 0;
}
</style>
