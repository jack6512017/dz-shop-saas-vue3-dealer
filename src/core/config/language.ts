import $mAppConfig from './appConfig';

//语言包
const LANGUAGE = {
	chs: {
		//公共语言包
		application: {
			appName: $mAppConfig.appName[$mAppConfig.language],
			welcomeTo: '欢迎来到' + $mAppConfig.appName[$mAppConfig.language],
			moneySymbol: '￥',
			shareTitle: '为您挑选了一个好物',
			appCloseContent: '商城正在维护中...',
			guessYouLike: '猜你喜欢',
			searchHold: '搜宝贝',
			loginRequired: '您的登录状态已过期，请重新登录',
			confirm: '确认',
			cancel: '取消',
			reset: '重置',
			select: '选择',
			selectAll: '全选',
			delete: '删除',
			deleteAll: '全部删除',
			deleteSelected: '删除选定',
			collection: '收藏',
			read: '已读',
			pressSaveImage: '长按图片保存到相册',
			unit: '件',
			gotIt: '我知道了',
			times: '次',
			anonymous: '匿名',
			left: '剩余',
			finished: '结束',
			defaultSkuName: '默认款',
			or: '或',
			and: '加',
			modalTitle: '提示',
			copySuccess: '已复制到剪贴板',
			shareUrlCopySuccess: '分享链接已复制到剪贴板',
			more: '更多',
			wxshareTip: '请点击右上角进行分享',
			siteCloseTitle: '应用维护中',
			wechatAuthTitle: '用户信息授权',
			wechatAuthContent: '为了更好的服务，请授权用户信息',
		},
		//组件语言包
		shopAttrContent: {
			store: '库存',
			piece: '件',
			selected: '已选',
			quantity: '购买数量',
			addToCart: '加入购物车',
			buyNow: '立即购买',
			specificationsTip: '请选择商品规格',
			outOfStock: '库存不足',
		},
		shopProductList: {
			paidNumber: '人付款',
			notSaleTip: '商品暂时不可出售',
			outOfStock: '库存不足',
			addToCartSuccessTip: '加入购物车成功',
			point: '{0}',
		},
		//页面语言包
		index: {
			titleIndex: '首页',
			newProductClass: '新品上市',
			recommendClass: '推荐商品',
			hotClass: '热门商品',
			launchMiniProgramError: '打开微信小程序失败',
			getWeixinServiceError: '获取微信服务失败',
			scanError: '扫码失败:',
			scanMpError: '不能识别的二维码',
		},
		cart: {
			titleCart: '购物车',
			complete: '完成',
			manage: '管理',
			cartEmpty: '空空如也,随便逛逛',
			cartEmptyTip: '购物车空空如也',
			cartTotal: '购物车共 {0} 件商品',
			gift: '赠品',
			invalid: '失效',
			invalidProduct: '产品失效',
			invalidClear: '清空失效',
			total: '合计：',
			buy: '结算',
			defaultSkuName: '默认款',
			notSale: '商品暂时不可出售',
			outOfStock: '库存不足',
			clearCartConfirm: '您确定要清空购物车吗？',
			clearinvalidConfirm: '您确定要清空过期商品吗？',
			deleteCartConfirm: '您确定要删除选择的商品吗？',
			deleteCurrentCartConfirm: '您确定要删除当前商品吗？',
		},
		login: {
			titleLogin: '登录',
			titlePasswordLogin: '密码登录',
			titleAuthLogin: '授权登录',
			welcomLogin: '欢迎登录',
			mobileHolder: '请输入手机号码',
			passwordHolder: '请输入登录密码',
			mobileLoginTips: '未注册的手机号验证后自动创建账号',
			passwordLoginTips: '绑定或使用手机号注册并且设置密码的用户可使用密码登录',
			mobileError: '手机号码不对啊~',
			passwordLabel: '密码',
			passwordError: '请输入登录密码',
			mobileLogin: '手机号登录/注册',
			passwordLogin: '密码登录',
			getProblem: '遇到问题？',
			passwordLoginSumbit: '密码登录',
			wechatAuthLoginSubmit: '微信授权登录',
			getCaptcha: '获取短信验证码',
			getCaptchaLater: '{0}秒后获取验证码',
			wechatLogin: '微信',
			qqLogin: 'QQ',
			appleLogin: 'Apple',
			uninstallWechatAuthService: '未安装微信登录授权服务',
			uninstallIosAuthService: '未安装苹果登录授权服务',
			getWechatAuthServiceError: '获取微信登录授权服务失败',
			getIosAuthServiceError: '获取苹果登录授权服务失败',
			getWechatAuthInfoError: '获取微信登录授权失败',
			getIosAuthInfoError: '获取苹果登录授权失败',
			getAuthServiceError: '获取授权服务失败',
			wechatLoading: '微信登录中...',
			iosLoading: '苹果登录中...',
			userAgreement: '用户协议',
			privacyAgreement: '隐私政策',
			loginAgree: '登录代表您同意',
			grantAuthorization: '并授权使用您的{0}账号信息（如昵称、头像）以便统一管理',
		},
		loginCode: {
			titleCode: '获取验证码',
			inputCode: '请输入验证码',
			codeSendTo: '验证码已发送至{0}',
			codeSend: '验证码已发送',
			noCaptcha: '没有收到验证码？点我重新发送',
			getCaptchaLater: '{0}秒后获取验证码',
			mobileError: '手机号码不对啊~',
		},
		thirdPartyLogin: {
			titleLogin: '绑定手机',
			welcomLogin: '绑定手机号',
			labelMobile: '手机号',
			labelCode: '验证码',
			mobileHolder: '请输入手机号码',
			codeHolder: '请输入验证码',
			mobileLoginTips: '第三方登录请绑定新的手机号或已注册的手机号',
			mobileError: '手机号码不对啊~',
			codeError: '请输入手机验证码',
			getCaptcha: '获取验证码',
			getCaptchaLater: '{0}秒后获取验证码',
			submit: '绑定手机号并登录',
			mpSubmit: '微信手机号一键授权',
			mpLoginTips: '您可以使用微信一键授权手机号绑定并登录',
			codeLoading: '正在获取验证码...',
			authLoading: '正在获取授权...',
			getWechatAuthServiceError: '获取微信授权服务失败',
			getWechatAuthInfoError: '获取微信手机授权失败',
		},
		bindMobile: {
			titleBindMobile: '绑定手机号',
			labelMobile: '手机号',
			labelCode: '验证码',
			mobileHolder: '请输入手机号码',
			codeHolder: '请输入验证码',
			mobileError: '手机号码不对啊~',
			codeError: '请输入手机验证码',
			getCaptcha: '获取验证码',
			getCaptchaLater: '{0}S',
			bindError: '已绑定手机号，请不要重复绑定',
			submit: '绑定手机号码',
		},
		modifyMobile: {
			titleModifyMobile: '修改手机号',
			labelMobileOld: '原手机号',
			labelMobile: '新手机号',
			labelCode: '验证码',
			mobileHolder: '请输入手机号码',
			codeHolder: '请输入验证码',
			mobileError: '手机号码不对啊~',
			codeError: '请输入手机验证码',
			getCaptcha: '获取验证码',
			getCaptchaLater: '{0}S',
			submitVerify: '验证原手机号',
			submit: '修改手机号码',
		},
		modifyPassword: {
			titleModifyPassword: '设置/修改密码',
			labelMobile: '手机号',
			labelCode: '验证码',
			labelPassword: '密码',
			labelConfirmPassword: '确认密码',
			codeHolder: '请输入验证码',
			passwordHold: '请输入密码',
			confirmPasswordHold: '请再次输入密码',
			codeError: '请输入验证码',
			passwordError: '密码需要6-20位',
			confirmPasswordError: '两次输入的密码不一致',
			getCaptcha: '获取验证码',
			getCaptchaLater: '{0}秒后获取验证码',
			submit: '设置/修改密码',
		},
		search: {
			titleSearch: '搜一搜',
			searchHistory: '搜索历史',
			hotSearch: '大家都在搜',
			enterKeywords: '请输入关键字',
			noRecord: '暂无搜索记录',
			noHotRecord: '暂无热门搜索',
			clearSearchHistory: '确认清空搜索历史吗？',
		},
		noticeIndex: {
			titleNotice: '公告',
			viewDetail: '查看详情',
		},
		noticeDetail: {
			titleNoticeDetail: '公告详情',
		},
		vedio: {
			titleVedio: '视频播放',
		},
		//商品列表
		productList: {
			titleProductList: '商品列表',
			sellNum: '销量',
			filter: '筛选',
			priceRange: '价格区间',
			priceRangeTip: '请输入最低价和最高价',
			lowestPrices: '最低价',
			highestPrice: '最高价',
			multiple: '综合',
			priceAsc: '价格升序',
			priceDesc: '价格降序',
			all: '全部',
			newProduct: '新品',
			recommendProduct: '推荐',
			hotProduct: '热门',
			paidNumber: '人付款',
			notSale: '商品暂时不可出售',
			outOfStock: '库存不足',
			addToCartSuccess: '添加购物车成功',
			addToCart: '加入购物车',
			immediatelyBuy: '立即购买',
			selectSpec: '请选择规格',
		},
		//商品详情
		product: {
			titleProduct: '商品详情',
			productVedio: '产品视频',
			hot: '热门',
			recommend: '推荐',
			new: '新品',
			share: '分享',
			poster: '海报',
			posterCreating: '正在生成海报',
			posterCreateImageError: '生成图片失败',
			posterCreateError: '生成海报失败',
			shipping: '快递',
			shippingFree: '包邮',
			shippingPay: '买家自付',
			shippingInfo: '快递说明',
			monthSale: '月销',
			marketPriceInfo: '价格',
			overMoney: '满{0}',
			store: '库存',
			outOfStockTip: '库存不足，请等待补货',
			outOfStock: '库存不足',
			left: '剩余',
			overMoneyShippingFree: '满{0}包邮',
			productDetail: '宝贝详情',
			reachBottom: '已经到最底了',
			cart: '购物车',
			addToCart: '加入购物车',
			addToCartSuccess: '加入购物车成功',
			directBuy: '直接购买',
			limitedBuy: '立即购买',
			discountBuy: '立即抢购',
			sku: '款式',
			number: '数量',
			choiceProductAttribute: '请选择商品参数',
		},
		// 地址
		address: {
			shippingAddress: '收货地址',
			defaultAddress: '默认',
			newReceivingAddress: '新增地址',
			wechatAddress: '微信地址',
			editAddress: '编辑收货地址',
			recipients: '收件人',
			recipientsName: '请输入收件人姓名',
			phoneNumber: '电话号码',
			addPhoneNumber: '请输入收件人电话号码',
			region: '所在地区',
			pleaseChoose: '请选择',
			pleaseChooseAddress: '请选择地址',
			detailedAddress: '详细地址',
			addDetailedAddress: '请输入详细地址',
			setDefaultAddress: '默认地址',
			delAddress: '删除收货地址',
			saveAddress: '保存地址',
			delShippingAddress: '确定要删除收货地址吗',
			successfullyDelete: '删除成功',
			addressAddedSuccessfully: '添加地址成功',
			correctRealname: '请输入收件人姓名',
			correctPhoneNumber: '请输入正确的手机号码',
			correctAddressDetails: '请输入收件详细地址',
			modifySuccessfully: '修改成功',
			intelligentIdentification: '地址识别',
			noAddress: '还没有收货地址,添加一个吧~',
			letMeToIdentify: '点我识别',
			autofillContent: '复制粘贴自动填写内容',
			noContent: '还没有内容',
		},
		//创建订单
		orderCreate: {
			titleCreateOrder: '创建订单',
			pleaseShippingAddress: '请选择收货地址',
			shopList: '商品列表',
			theDefaultParagraph: '默认款',
			issueAnInvoice: '开具发票',
			noIssueAnInvoice: '本次不开具发票',
			electronicInvoice: '电子发票',
			company: '公司',
			name: '个人',
			remark: '备注',
			setRemark: '请填写备注信息',
			modeOfDistribution: '配送方式',
			selectDeliveryMode: '选择配送方式',
			give: '递',
			courierServicesCompany: '快递公司',
			pleaseCourierServicesCompany: '选择快递公司',
			carry: '提',
			storePickUpPoint: '门店自提点',
			needIntegrals: '需用{0}',
			youNeedToUseIntegrals: '需要使用{0}{1}',
			subtract: '减',
			usePoint: '使用{0}{1}抵用{2}元',
			amountGoods: '商品金额',
			price: '￥{0}',
			discountAmount: '优惠金额',
			shippingMoney: '运费',
			packageMoney: '包装费',
			freeShippingMoney: '无',
			invoiceAmount: '发票税费',
			givePoint: '赠送{0}',
			integral: '{0}{1}',
			point: '{0}',
			actualPayment: '实付款',
			submitOrder: '提交订单',
			noIntegral: '{0}不足',
			free: '免运费',
			notOrder: '订单不存在',
			logisticsDistribution: '快递配送',
			theBuyerToThe: '买家自提',
			uncharted: '未知',
			logisticsClose: '快递配送暂未开启',
			giveaways: '赠品',
		},
		//订单支付
		orderPay: {
			titleOrderPay: '订单支付',
			payMoney: '支付金额',
			payLeftTime: '剩余支付时间',
			wechatPay: '微信支付',
			aliPay: '支付宝',
			quickPay: '快捷支付',
			balancePay: '{0}支付',
			brokeragePay: '{0}支付',
			confirmPay: '确定支付',
			orderClosed: '订单已关闭',
			balanceLessTip: '{0}不足',
			brokerageLessTip: '{0}不足',
			payTypeError: '请选择支付方式',
			balanceError: '{0}不足，请选择其它支付方式',
			brokerageError: '{0}不足，请选择其它支付方式',
			payTypeDisabledError: '当前支付方式不可用',
			commissionError: '分销功能已关闭，暂时不能使用{0}支付',
			userBalance: '当前{0}{1}',
			userBrokerage: '当前{0}{1}',
			userWarehouseBrokerage: '当前货款{0}',
			allinpayTip: '支付账户由通联支付进行安全托管，请放心使用',
			getCode: '获取验证码',
			getCodeLater: '{0}秒后重新获取',
			mobileLabel: '手机号',
			codeLabel: '验证码',
			realnameLabel: '真实姓名',
			idLabel: '身份证号',
			bankcardTypeLabel: '卡类型',
			bankcardDepositLabel: '储蓄卡',
			bankcardCreditLabel: '信用卡',
			bankcardLabel: '银行卡号',
			creditCardLabel: '信用卡号',
			bankcardHolderLabel: '请使用和真实姓名一致的银行卡',
			bankMobileLabel: '预留手机',
			bankcardValidateLabel: '有效日期',
			bankcardValidateHolder: '如05/20',
			bankcardCvvLabel: '安全码',
			bankcardCvvHolder: '信用卡签名处最后3位数字',
			bankcardDefaultLabel: '默认卡',
			authSubmitLabel: '安全认证',
			realnameSubmitLabel: '实名认证',
			bindcardSubmitLabel: '绑定银行卡',
			allinpayAuthContent: '您需要认证才能进行支付',
			allinpayAuthConfirmContent: '确认认证',
			allinpayBindcardContent: '您需要绑卡才能进行支付',
			allinpayBindcardConfirmContent: '确认绑卡',
			allinpayStep1: '认证',
			allinpayStep2: '实名',
			allinpayStep3: '绑卡',
			allinpayAlreadyAuth: '您之前已完成认证，系统已自动更新您的认证信息',
			authMobileError: '请输入正确的手机号',
			codeError: '请输入验证码',
			realNameError: '请输入真实姓名',
			idError: '身份证号不正确',
			bankcardError: '请输入银行卡号',
			bankcardCodeError: '请输入验证码',
			bankcardMobileError: '请输入银行预留手机号',
			bankcardValidateError: '请输入信用卡有效期',
			bankcardCvvError: '请输入信用卡安全码',
			choiceBankcard: '请选择支付卡：',
			bankcardEmpty: '暂无可用的支付卡',
			bankcardAdd: '添加支付卡',
			bankcardSendCodeTip: '验证码已发出，请输入您收到的验证码',
			bankcardPaySubmit: '确认支付',
			bankcardSendCodeError: '请输入验证码',
			payTradenoError: '交易号错误，请重试',
			payResultTip: '正在查询支付结果，请稍候...',
			payFailTip: '支付失败：',
			wxPayFailTip: '您取消了支付或者支付失败',
			wechatPayH5Tip: '微信浏览器中才能使用微信支付',
			launchMiniProgrameError: '打开微信小程序失败',
			allinpayAppWxPayFail: '您取消了支付或支付失败',
			allinpayBankCardPayCodeSended: '验证码已自动发送',
			payMethodClosed: '当前使用的支付方式已关闭',
			payNotInWechat: '该支付方式适用于公众号或微信浏览器',
			payNotInWechatMp: '该支付方式适用于微信小程序',
			payNotInH5: '该支付方式适用于H5',
			payNotInApp: '该支付方式适用于APP',
			payNotInH5OrApp: '该支付方式适用于H5或APP',
			payNotInAppOrWechatMp: '该支付方式适用于APP或微信小程序',
			payMethodNoSupported: '当前使用的支付方式暂未支持',
			openAlipayError: '打开支付宝失败',
			allinpayAlipayTip: '如果已完成支付，请点击下方按钮，系统会自动进行支付确认；支付宝支付到账较慢，请不要重复支付。',
			allinpayAlipayConfirm: '已完成支付',
			recharge: '充值',
			orderPaid: '该笔订单已支付，请不要重复支付并耐心等待支付结果',
		},
		//APP跳转小程序支付
		allinpayAppWxPay: {
			titleAllinpayAppWxPay: '微信支付',
			tip: '微信支付中...',
			errTip: '支付失败',
			completeTip: '支付完成',
			backToApp: '返回APP',
		},
		//发票
		invoice: {
			invoiceManagement: '发票管理',
			tolerant: '默认',
			invoiceTitle: '发票抬头',
			company: '公司',
			name: '个人',
			personalInvoicesHaveNoTaxNumber: '个人发票无税号',
			addInvoice: '新增发票',
			noInvoice: '暂无发票~',
			delInvoice: '确定要删除该发票吗',
			delOk: '删除成功',
			invoiceType: '发票类型',
			inputInvoiceTitle: '请输入发票抬头',
			invoiceNumber: '发票税号',
			inputInvoiceNumber: '请输入发票税号',
			setTolerant: '设为默认',
			saveTheMessage: '保存信息',
			editInvoice: '编辑发票',
			invoiceTitleError: '发票抬头不能为空',
			invoiceParagraphError: '发票税号不能为空',
			invoiceEditSuccess: '发票编辑成功',
			invoiceAddSuccess: '发票增加功能',
			invoiceHistory: '开票历史',
			orderNumber: '订单编号:',
			invoiceSum: '开票金额:',
			noInvoiceData: '您还没有开过票哦~',
		},
		//我的订单
		order: {
			myOrder: '我的订单',
			integralToUse: '已用{0}{1}抵用{2}元',
			integralToUse2: '已用{0}{1}抵用',
		},
		//个人中心
		user: {
			productTheShelves: '商品已下架',
			personalData: '个人信息',
			protocolRule: '协议规则',
			wipeCache: '清除缓存',
			currentVersion: '当前版本',
			theme: '皮肤样式',
			notification: '消息推送',
			logOut: '退出登录',
			confirmLogOut: '确定要退出登录吗',
			confirmWipeCache: '确定要清除缓存吗',
			noWipeCache: '暂无缓存',
			mobile: '手机号码',
			nickname: '昵称',
			realname: '真实姓名',
			gender: '性别',
			changeNickname: '修改昵称',
			inputNickname: '请输入昵称',
			changeRealname: '真实姓名',
			inputRealname: '请输入真实姓名',
			realnameExist: '真实姓名已设置，无法修改。如果需要修改请联系工作人员',
			changeGender: '修改性别',
			man: '男',
			woman: '女',
			modifiedDataSuccessfully: '修改资料成功',
			theAgreement: '相关协议',
			userAgreement: '用户协议',
			privacyPolicy: '隐私政策',
			modifyMobile: '修改手机号',
			bindMobile: '绑定手机号',
		},
		//提示成功失败页面
		notice: {
			successTitle: '操作成功',
			successSub: '您可以返回上一页或者回到用户中心',
			successTip: '平台不会储存您的任何实名等相关信息。请勿泄露个人姓名、身份证号码、银行卡！谨防电话诈骗！',
			paySuccessTitle: '支付成功',
			paySuccessSub: '您可以查看订单或者回到用户中心',
			paySuccessTip: '平台不会储存您的任何实名等相关信息。请勿泄露个人姓名、身份证号码、银行卡！谨防电话诈骗！',
			payCompleteTitle: '支付结果',
			payCompleteTardeNoEmptyTitle: '订单号错误',
			payCompleteTimeoutTitle: '查询超时',
			payCompleteErrorTitle: '查询失败',
			payCompleteSuccessTitle: '支付成功',
			payCompleteFailTitle: '支付失败',
			payCompleteSub: '正在获取支付结果，请稍候...',
			payCompleteTardeNoEmptySub: '获取订单号错误，请确认订单',
			payCompleteTimeoutSub: '查询支付结果超时，请稍后在订单中心查看支付结果',
			payCompleteErrorSub: '查询支付结果失败，请稍后在订单中心查看支付结果',
			payCompleteSuccessSub: '您可以查看订单或者回到用户中心',
			payCompleteFailSub: '支付失败，您可以前往订单中心重新付款',
			payCompleteTip: '平台不会储存您的任何实名等相关信息。请勿泄露个人姓名、身份证号码、银行卡！谨防电话诈骗！',
			failTitle: '操作失败',
			failSub: '您可以返回上一页或者回到用户中心',
			failTip: '平台不会储存您的任何实名等相关信息。请勿泄露个人姓名、身份证号码、银行卡！谨防电话诈骗！',
			back: '返回',
			userCenter: '用户中心',
			viewOrder: '查看订单',
			tip: '温馨提示:',
		},
	},
	cht: {},
	eng: {},
};

export default LANGUAGE[$mAppConfig.language];