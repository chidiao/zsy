import { get, post } from './request.js'

//登陆
export const login = (data) => post('user/login', data)
//注册
export const register = (data) => post('user/register', data)
//修改密码
export const respwd = (data) => post('user/respwd', data)
export const getBusinessList = (data) => post('index/getBusinessList', data)
export const getBusinessInfo = (data) => post('index/getBusinessInfo', data)
//发送验证码
export const getCode = (data) => post('sms/send', data)
//获取用户信息
export const getUserInfo = (data) => post('user/index', data)
// 获取帮助中心列表
export const getHelpList = (data) => post('index/getArticleList', data)
//获取协议
export const getArticleList = (data) => post('index/getArticleInfo', data)
//获取我的提现账号信息
export const getMyAccount = (data) => post('user/getMyAccount', data)
//操作提现账号（新增/编辑）
export const operateAccount = (data) => post('user/operateAccount', data)
//提现
export const applyWithdraw = (data) => post('user/applyWithdraw', data)
//提现记录
export const getMyWithdrawList = (data) => post('user/getMyWithdrawList', data)
//消息列表
export const getSystemNoticeList = (data) => post('index/getSystemNoticeList', data)
//消息详情
export const getSystemNoticeInfo = (data) => post('index/getSystemNoticeInfo', data)
//获取设备业务类型
export const getDeviceType = (data) => post('device/getDeviceType', data)
//添加设备时，获取设备配置项
export const getDeviceConfig = (data) => post('device/getDeviceConfig', data)
//获取设备计费方式
export const getDeviceCharging = (data) => post('device/getDeviceCharging', data)
//添加设备
export const addDevice = (data) => post('device/addDevice', data)
//首页数据
export const deviceIndex = (data) => post('device/index', data)
//获取节点列表
export const getMyDeviceList = (data) => post('device/getDeviceList', data)
//搜索节点列表
export const searchMyDeviceList = (data) => post('device/search', data)
//获取节点详情
export const getDeviceInfo = (data) => post('device/getDeviceInfo', data)
//获取拨号信息
export const getDialingInfo = (data) => post('device/getDialingInfo', data)
//获取拨号信息(多网卡)
export const getNewNetInfo = (data) => post('device/getDialInfo', data)
//同步网卡信息
export const syncNetcard = (data) => post('device/syncNetcard', data)
//获取网卡信息
export const getNetcard = (data) => post('device/getNetcard', data)
//获取网卡信息
export const getNewDialingInfo = (data) => post('device/getDialList', data)
//
//测速
export const bandwidth = (data) => post('device/setBandwidth', data)
//获取压测结果
export const getBandwidth = (data) => post('device/bandwidth', data)
//账单信息
export const getMyIncomeList = (data) => post('device/getMyIncomeList', data)
//设备监控
export const monitor = (data) => post('device/monitor', data)
//修改拨号信息
export const editDialInfo = (data) => post('device/editDialInfo', data)
//修改拨号信息（多网卡）
export const newEditDialInfo = (data) => post('device/newEditDialInfo', data)
//修改设备备注
export const editDevice = (data) => post('device/editDevice', data)
//批量下载
export const deviceExport = (data) => post('device/export', data)
//批量下载
export const deviceNewExport = (data) => post('device/newExport', data)

//批量上传
export const deviceImport = (data) => post('device/import', data)
// 修改用户信息
export const changeUserInfo = (data) => post('user/profile', data)
// 修改手机号
export const changePhone = (data) => post('user/changemobile', data)
// 拨号
export const startDialing = (data) => post('device/dialing', data)

// 获取渠道列表
export const getDeviceChannel = () => post('device/getDeviceChannel', {})
// 客服工单
export const serveLog = (data) => post('user/serveLog', data)
// 问题反馈
export const feedback = (data) => post('user/feedback', data)
// 注销
export const logoff = () => post('user/logOff', {})
// 获取设备网卡列表
export const getDeviceInter = (data) => post('device/getDeviceInter', data)
// 设置设备网卡
export const setManager = (data) => post('device/setManager', data)

// 获取App配置（控制上架信息展示）
export const getAppConfig = () => post('index/is_grounding', {})

// 获取资源信息---获取网卡列表
export const getDataSource = (data) => post('device/getDataSource', data)

// 流量监控
export const flowQuery = (data) => post('device/flowQuery', data)

// 带宽压测详情
export const externalPressTestDetail = (data) => post('device/externalPressTestDetail', data)
//提交资源信息
export const submitSource = (data) => post('device/submitSource', data)

// 我的团队
export const getTeamList = (data) => get('user/teamList', data)
// 我的统计
export const getTeamCount = () => get('/user/tj')
// 我的分佣
export const getMoneyList = ({ type = 0, page, size = 10 }) =>
  get('/user/moneyList', {
    type,
    page,
    size
  })
// 设置比例
export const setTeamRate = ({ uid, rate, level }) =>
  post('/user/setLevel', {
    uid,
    rate,
    level
  })
