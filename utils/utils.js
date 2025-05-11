import {
	doUpUrl
} from '../config/config.js'

var g_wakelock = null;
//允许程序后台运行，以持续获取GPS位置  
export function wakeLock() {
	//Android  
	var main = plus.android.runtimeMainActivity();
	var Context = plus.android.importClass("android.content.Context");
	var PowerManager = plus.android.importClass("android.os.PowerManager");
	var pm = main.getSystemService(Context.POWER_SERVICE);
	g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
	g_wakelock.acquire();
}
//结束程序后台运行  
export function releaseWakeLock() {
	if (g_wakelock != null && g_wakelock.isHeld()) {
		g_wakelock.release();
		g_wakelock = null;
	}
}

//showToast 提示
export function showToast(msg) {
	uni.showToast({
		title: msg,
		icon: 'none'
	})
}
// 截取url中的code方法
export function getUrlCode() {
	var url = window.location.href;
	var theRequest = new Object()
	if (url.indexOf("?") != -1) {
		var str = url.split("?")[1]
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
		}
	}
	return theRequest
}


//封装复制到剪贴板的方法
export function copy(data) {
	uni.setClipboardData({
		data: data,
		success: (res) => {
			uni.showToast({
				title: '复制成功',
				icon: 'none',
				duration: 3000
			})
		}
	})
}
//检测升级
export function doUpData() {
	// #ifdef APP-PLUS
	var ver = plus.runtime.version;
	// var aid = plus.runtime.appid;
	uni.request({
		url: doUpUrl,
		method: 'GET',
		success: result => {
			var data = result.data;
			if (data.version != ver) {
				let url = data.wgtUrl; //保存下载地址
				uni.showModal({
					title: "发现新版本",
					content: "确认下载更新",
					success: (res) => {
						if (res.confirm) { //当用户确定更新，执行更新
							uni.showLoading({
								title: '更新中……'
							})
							uni.downloadFile({ //执行下载
								url: url,
								success: downloadResult => { //下载成功
									if (downloadResult.statusCode === 200) {
										uni.showModal({
											title: '',
											content: '更新成功，确定现在重启吗？',
											confirmText: '重启',
											confirmColor: '#EE8F57',
											success: function(res) {
												if (res.confirm) {
													plus.runtime.install( //安装
														downloadResult.tempFilePath, {
															force: true
														},
														function() {
															// utils.showToast('更新成功，重启中');
															plus.runtime.restart();
														},
														function(e) {
															// utils.showToast('更新失败');
															// uni.showToast({
															// 	title: '更新失败',
															// 	icon: 'none',
															// 	duration: 3000
															// })
														}
													);
												}
											}
										});
									}
								},
								complete: () => {
									uni.hideLoading();
								}
							});
						} else {

						}
					}
				})
			}
		}
	});
	// #endif
}
// 拨打电话
export function makePhoneCall(e) {
	uni.makePhoneCall({
		phoneNumber: e
	});
}
/*  
格式化时间戳
*/
export function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
	// return Y + M + D+ h + m;
}
/* 
		验证邮箱
	 */
export function checkEmail(value) {
	return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
}
/**
 * 验证手机号
 * @param {Object} phone
 */
export function checkPhone(phone) {
	let zz = /^1[3456789]\d{9}$/;
	return zz.test(phone);
}
/**
 *手机掩码
 * @param {Object} phone
 */
export function phoneMask(phone) {
	return phone.substring(0, 3) + '****' + phone.substring(7);
}
/**
 *  页面返回
 */
export function backTo() {
	uni.navigateBack({
		delta: 1,
	})
}
export function handleRichText(html = '', w = 710) {
  const fontSize = uni.upx2px(28)
  const width = uni.upx2px(w)
  html = html.replace(/<(img).*?(\/?>|<\/img>)/g, function (mats) {
    if (mats.indexOf('style') < 0) {
      return mats.replace(/<\s*img/, `<img style="max-width:${width}px;height:auto;"`)
    } else {
      return mats.replace(/style=("|')/, `style=$1max-width:${width}px;height:auto;`)
    }
  })
  return `<div style="width: ${width}px;font-size: ${fontSize}px;word-break: break-all;white-space: pre-wrap;overflow:hidden;">${html}</div>`
}