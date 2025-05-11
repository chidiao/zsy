import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as api from '@/config/api.js'

export const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || {name:'张三'},
		info:{}  //收益数据
	},
	// this.$store.commit('getUserInfo', info)
	mutations: {
		getUserInfo(state, info) {
			state.userInfo = info
			state.token = state.userInfo.token
			uni.setStorageSync('token', state.userInfo.token)
		},
		getDeviceIndex(state, info) {
			state.info = info
		},
	},
	getters: {},
	// this.$store.dispatch('updateUserInfo')
	actions: {
		updateUserInfo({
			commit
		}) {
			api.getUserInfo().then(res=>{
				commit('getUserInfo', res.data)
			})
		},
		updateIndexInfo({
			commit
		}) {
			api.deviceIndex().then(res=>{
				commit('getDeviceIndex', res.data)
			})
		},
	}
})
