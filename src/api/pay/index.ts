//支付
export default {
	/* 公用支付  */
	// 	获取支付配置
	payConfig: '/pay/pay/config',
	// 创建支付
	payCreate: '/pay/pay/create',
	// 	无登录支付
	payCreateNoAuth: '/pay/pay/create-no-auth',

	/* 支付订单 */
	//  查询支付订单
	payLogFindByOutTradeNo: '/pay/pay-log/find-by-out-trade-no',

	/* 云账户 */
	// 获取协议预览URL
	yunzhanghuDealerSignContract: '/pay/yunzhanghu-dealer/sign-contract',
	// 用户签约
	yunzhanghuDealerSign: '/pay/yunzhanghu-dealer/member-sign',
	// 上传免验证用户名单信息
	yunzhanghuDealerExempted: '/pay/yunzhanghu-dealer/member-exempted',
	// 绑卡列表
	yunzhanghuDealerCardIndex: '/pay/yunzhanghu-dealer-card/index',
	// 绑卡详情
	yunzhanghuDealerCardView: '/pay/yunzhanghu-dealer-card/view',
	// 添加卡
	yunzhanghuDealerCardCreate: '/pay/yunzhanghu-dealer-card/create',
	// 删除卡
	yunzhanghuDealerCardDelete: '/pay/yunzhanghu-dealer-card/delete',
	
	/* 新国都 */
	// 用户签约
	yunhuotecDealerSign: '/pay/yunhuotec-dealer/member-sign',
	// 绑卡列表
	yunhuotecDealerCardIndex: '/pay/yunhuotec-dealer-card/index',
	// 绑卡详情
	yunhuotecDealerCardView: '/pay/yunhuotec-dealer-card/view',
	// 添加卡
	yunhuotecDealerCardCreate: '/pay/yunhuotec-dealer-card/create',
	// 修改
	yunhuotecDealerCardUpdate: '/pay/yunhuotec-dealer-card/update',
	// 删除卡
	yunhuotecDealerCardDelete: '/pay/yunhuotec-dealer-card/delete',
};
