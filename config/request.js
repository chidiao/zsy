import {baseURL} from "./config.js"

export const get = (url,data) =>{
	// return request(params, 'GET')
	return request(url,data, 'GET')
}

// post请求
export const post = (url,data) =>{
	return request(url,data, 'POST')
}
const request = function(aaa, bbb, method) {
	uni.onNetworkStatusChange((res) => {
	    if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
	    return false
	});
	// 请求地址
	let url = baseURL + aaa;
	console.log(url)
	let loading = true
	// 请求头
	let header = {
		"Content-Type":"application/x-www-form-urlencoded",
		"Accept-Language":'zh-hk',
		'token': uni.getStorageSync('token'),
		// "Cookie" : uni.getStorageSync('token')
	};
	// 请求方式
	method = method;
	// header = params.header || header;
	// bbb.token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
	let data = bbb;   // 请求参数
	if(!loading){
		return 
	}
	return new Promise((resolve, reject) => {
		loading = false
		// 发起请求
		uni.request({
			url,
			method,
			header,
			data,
			success(res) {
				loading = true
				// 请求成功后的操作
				if (res.statusCode == 200) {
					if(res.data.code == 409){
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						return uni.reLaunch({
							url:'/pages/login/login'
						})
					}
					resolve(res.data);
					
				} else {
					  if(res.statusCode == 401){
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						return uni.reLaunch({
							url:'/pages/login/login'
						})
					  }
					//其他异常
					reject('运行时错误,请稍后再试');
					uni.showToast({
						title: '接口报错'+res.statusCode,
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}