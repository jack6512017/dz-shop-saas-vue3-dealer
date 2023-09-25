/*
 * 路由表对象：
 * 该文件挂载在Vue
 * 作用：调用router对象的方法 传入以下对应的路由对象
 * 示例：this.$api.router.push({route:this.$api.routesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// --------------------------微商城路由----------------------------
	// tabbar
	index: {
		name: '首页',
		path: '/pages/main/index/index',
	},

	material: {
		name: '物料',
		path: '/pages/main/material/material',
	},

	poster: {
		name: '海报',
		path: '/pages/main/poster/poster',
	},

	cart: {
		name: '购物车',
		path: '/pages/main/cart/cart',
	},


	//public
	search: {
		name: '搜索',
		path: '/pages/public/search/search',
	},
	notice: {
		name: '公告',
		path: '/pages/public/notice/index',
	},
	noticeDetail: {
		name: '公告详情',
		path: '/pages/public/notice/detail',
	},
	vedio: {
		name: '视频',
		path: '/pages/public/vedio/vedio',
	},
	webview: {
		name: '浏览器',
		path: '/pages/public/webview/webview',
	},

	//login
	login: {
		name: '登录/注册',
		path: '/pages/login/login/login',
	},
	mobileLogin: {
		name: '手机登录',
		path: '/pages/login/login/login',
	},
	loginCode: {
		name: '获取验证码',
		path: '/pages/login/code/code',
	},
	modifyMobileStep1: {
		name: '修改手机号',
		path: '/pages/login/modifyMobileStep/index1',
		requiresAuth: true,
	},
	modifyMobileStep2: {
		name: '修改手机号',
		path: '/pages/login/modifyMobileStep/index2',
		requiresAuth: true,
	},
	mobileRegister: {
		name: '手机号注册',
		path: '/pages/login/mobileRegister/mobileRegister',
	},

	// notify
	notifyIndex: {
		name: '消息',
		path: '/pages/user/notify/index/index',
	},
	notifyLogistics: {
		name: '物流交易',
		path: '/pages/user/notify/logistics/logistics',
	},
	notifyRefund: {
		name: '售后服务',
		path: '/pages/user/notify/refund/refund',
	},
	notify: {
		name: '服务通知',
		path: '/pages/user/notify/notify/notify',
	},

	//product
	product: {
		name: '产品详情',
		path: '/pages/product/detail/detail',
	},
	productList: {
		name: '产品列表',
		path: '/pages/product/list/list',
	},

	calculatePay: {
		name: '人生测算支付',
		path: '/pages/order/pay/calculatePay',
	},

	//order
	orderCreate: {
		name: '创建订单',
		path: '/pages/order/create/create',
		requiresAuth: true,
	},
	orderIndex: {
		name: '我的订单',
		path: '/pages/order/index/index',
		requiresAuth: true,
	},
	orderDetail: {
		name: '订单详情',
		path: '/pages/order/detail/detail',
		requiresAuth: true,
	},
	pay: {
		name: '订单支付',
		path: '/pages/order/pay/pay',
		requiresAuth: true,
	},
	allinpayAppWxPay: {
		name: '订单支付',
		path: '/pages/order/allinpayAppWxPay/allinpayAppWxPay',
		requiresAuth: true,
	},
	aliMiddle: {
		name: '支付宝支付',
		path: '/pages/order/pay/aliMiddle',
		requiresAuth: true,
	},

	//notice
	success: {
		name: '操作成功',
		path: '/pages/notice/success',
		requiresAuth: false,
	},
	fail: {
		name: '操作失败',
		path: '/pages/notice/fail/index',
		requiresAuth: false,
	},
	paySuccess: {
		name: '支付成功',
		path: '/pages/notice/paySuccess/paySuccess',
		requiresAuth: true,
	},
	payComplete: {
		name: '支付结果',
		path: '/pages/notice/payComplete/payComplete',
		requiresAuth: true,
	},
	allinpayAppWxPaySuccess: {
		name: '支付成功',
		path: '/pages/notice/allinpayAppWxPaySuccess',
		requiresAuth: false,
	},

	//user
	userInfo: {
		name: '用户资料',
		path: '/pages/user/userInfo/userInfo',
		requiresAuth: true,
	},
	coupon: {
		name: '我的优惠券',
		path: '/pages/user/coupon/coupon',
		requiresAuth: true,
	},
	myCouponDetail: {
		name: '优惠券详情',
		path: '/pages/user/coupon/myCoupon',
		requiresAuth: true,
	},
	couponList: {
		name: '领劵中心',
		path: '/pages/user/coupon/list',
		requiresAuth: true,
	},
	address: {
		name: '收货地址',
		path: '/pages/user/address/address',
		requiresAuth: true,
	},
	addressUpdate: {
		name: '收货地址管理',
		path: '/pages/user/address/update',
		requiresAuth: true,
	},

	set: {
		name: '设置',
		path: '/pages/user/set/set',
		requiresAuth: true,
	},
	supplier: {
		name: '供应商入驻',
		path: '/pages/user/supplier/supplier',
	},

	avatarCropper: {
		name: '头像裁剪',
		path: '/pages/user/avatarCropper/index',
		requiresAuth: true,
	},
	authorization: {
		name: '授权',
		path: '/pages/set/authorization/list',
		requiresAuth: true,
	},
	feedbackDetail: {
		name: '反馈详情',
		path: '/pages/user/feedback/detail',
		requiresAuth: true,
	},
	feedbackList: {
		name: '我的反馈',
		path: '/pages/user/feedback/list',
		requiresAuth: true,
	},
	feedback: {
		name: '意见反馈',
		path: '/pages/user/feedback/feedback',
		requiresAuth: true,
	},
	feedbackCreate: {
		name: '意见反馈',
		path: '/pages/user/feedback/create',
		requiresAuth: true,
	},
	loading: {
		name: 'Loading加载动画',
		path: '/pages/user/loading/loading',
	},
	orderInvoice: {
		name: '开票历史',
		path: '/pages/user/invoice/orderInvoice',
		requiresAuth: true,
	},
	invoice: {
		name: '开票管理',
		path: '/pages/user/invoice/invoice',
		requiresAuth: true,
	},
	invoiceUpdate: {
		name: '开票管理',
		path: '/pages/user/invoice/update',
		requiresAuth: true,
	},

	refundIndex: {
		name: '售后服务',
		path: '/pages/order/refund/index',
		requiresAuth: true,
	},
	refundList: {
		name: '售后主页',
		path: '/pages/order/refund/list',
		requiresAuth: true,
	},
	refund: {
		name: '售后',
		path: '/pages/order/refund/refund',
		requiresAuth: true,
	},
	refundDetail: {
		name: '售后详情页',
		path: '/pages/order/refund/detail',
		requiresAuth: true,
	},
	refundShipping: {
		name: '售后物流信息填写',
		path: '/pages/order/refund/shipping/shipping',
		requiresAuth: true,
	},
	orderRefundApply: {
		name: '申请退款',
		path: '/pages/order/refund/apply',
		requiresAuth: true,
	},
	customerIndex: {
		name: '售后服务',
		path: '/pages/order/customer/index/index',
		requiresAuth: true,
	},
	orderItem: {
		name: '订单商品列表',
		path: '/pages/order/item',
		requiresAuth: true,
	},
	productExpressDetails: {
		name: '订单物流',
		path: '/pages/order/productExpressDetails/productExpressDetails',
		requiresAuth: true,
	},
	shippingReturn: {
		name: '退货物流',
		path: '/pages/order/shipping/return',
		requiresAuth: true,
	},
	brokerage: {
		name: '我的佣金',
		path: '/pages/user/brokerage/brokerage',
		requiresAuth: true,
	},
	brokerageLog: {
		name: '佣金日志',
		path: '/pages/user/brokerage/log',
		requiresAuth: true,
	},
	bankAccount: {
		name: '提现账号',
		path: '/pages/user/bankAccount/bankAccount',
		requiresAuth: true,
	},
	bankAccountUpdate: {
		name: '提现账号管理',
		path: '/pages/user/bankAccount/update',
		requiresAuth: true,
	},
	brokerageCreate: {
		name: '提现',
		path: '/pages/user/brokerage/create',
		requiresAuth: true,
	},
	brokerageIndex: {
		name: '提现记录',
		path: '/pages/user/brokerage/index',
		requiresAuth: true,
	},
	setPayPassword: {
		name: '设置支付密码',
		path: '/pages/user/setPayPassword/setPayPassword',
		requiresAuth: true,
	},
	yunzhanghuMemberExempted: {
		name: '上传免验证',
		path: '/pages/user/yunzhanghu/memberExempted/memberExempted',
		requiresAuth: true,
	},
	
	// 云账户
	yunzhanghuMemberSign: {
		name: '上传免验证',
		path: '/pages/user/yunzhanghu/memberSign/memberSign',
		requiresAuth: true,
	},
	yunzhanghuMemberCard: {
		name: '云账户银行卡',
		path: '/pages/user/yunzhanghu/card/card',
		requiresAuth: true,
	},
	yunzhanghuMemberCardUpdate: {
		name: '云账户银行卡',
		path: '/pages/user/yunzhanghu/card/update',
		requiresAuth: true,
	},
	
	// 新国都
	yunhuotecMemberSign: {
		name: '用户签约',
		path: '/pages/user/yunhuotec/memberSign/memberSign',
		requiresAuth: true,
	},
	yunhuotecMemberCard: {
		name: '新国都银行卡',
		path: '/pages/user/yunhuotec/card/card',
		requiresAuth: true,
	},
	yunhuotecMemberCardUpdate: {
		name: '新国都银行卡',
		path: '/pages/user/yunhuotec/card/update',
		requiresAuth: true,
	},

	//allinpay
	allinpayCard: {
		name: '银行卡',
		path: '/pages/allinpay/card/card',
		requiresAuth: true,
	},
	allinpayWithdraw: {
		name: '提现',
		path: '/pages/allinpay/withdraw/withdraw',
		requiresAuth: true,
	},

	protocol: {
		name: '关于',
		path: '/pages/common/protocol/protocol',
	},
	protocolDetail: {
		name: '协议',
		path: '/pages/common/protocol/detail',
	},
	weappPay: {
		name: '微信小程序支付',
		path: '/pages/user/money/weappPay',
	},
	weappSuccess: {
		name: '支付成功',
		path: '/pages/user/money/weappSuccess',
	},
	couponDetail: {
		name: '优惠券详情',
		path: '/pages/user/coupon/detail',
		requiresAuth: false,
	},
	promotion: {
		name: '推广用户',
		path: '/pages/user/promotion/promotion',
		requiresAuth: true,
	},
	promoterRecord: {
		name: '推广用户',
		path: '/pages/user/promoterRecord/promoterRecord',
		requiresAuth: true,
	},
	qrcode: {
		name: '推广二维码',
		path: '/pages/user/qrcode/qrcode',
		requiresAuth: true,
	},
};
