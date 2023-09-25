export default {
	//手机号码区号与正则
	mobilePattern: {
		'86': { label: 'CN +86', pattern: /^(\+?86)?1\d{10}$/ }, //中国
		'852': { label: 'HK +852', pattern: /^(\+?852)?[569]\d{3}\-?\d{4}$/ }, //香港
		'853': { label: 'MO +853', pattern: /^(\+?853)?6\d{7}$/ }, //澳门
		'886': { label: 'TW +886', pattern: /^(\+?886|0)?9\d{8}$/ }, //台湾
		'1': { label: 'US +1', pattern: /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/ }, //美国,加拿大
		'7': { label: 'RU +7', pattern: /^(\+?7|8)?9\d{9}$/ }, //俄罗斯
		'26': { label: 'ZM +26', pattern: /^(\+?26)?09[567]\d{7}$/ }, //赞比亚
		'27': { label: 'ZA +27', pattern: /^(\+?27|0)\d{9}$/ }, //南非
		'30': { label: 'GR +30', pattern: /^(\+?30)?(69\d{8})$/ }, //希腊
		'32': { label: 'BE +32', pattern: /^(\+?32|0)4?\d{8}$/ }, //比利时
		'33': { label: 'FR +33', pattern: /^(\+?33|0)[67]\d{8}$/ }, //法国
		'34': { label: 'ES +34', pattern: /^(\+?34)?(6\d{1}|7[1234])\d{7}$/ }, //西班牙
		'36': { label: 'HU +36', pattern: /^(\+?36)(20|30|70)\d{7}$/ }, //匈牙利
		'39': { label: 'IT +39', pattern: /^(\+?39)?\s?3\d{2} ?\d{6,7}$/ }, //意大利
		'44': { label: 'GB +44', pattern: /^(\+?44|0)7\d{9}$/ }, //英国
		'45': { label: 'DK +45', pattern: /^(\+?45)?(\d{8})$/ }, //丹麦
		'47': { label: 'NO +47', pattern: /^(\+?47)?[49]\d{7}$/ }, //挪威
		'48': {
			label: 'PL +48',
			pattern: /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
		}, //波兰
		'49': {
			label: 'DE +49',
			pattern: /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
		}, //德国
		'55': {
			label: 'BR +55',
			pattern: /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
		}, //巴西
		'60': {
			label: 'MS +60',
			pattern: /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
		}, //马来西亚
		'61': { label: 'AU +61', pattern: /^(\+?61|0)4\d{8}$/ }, //澳大利亚
		'63': { label: 'PH +63', pattern: /^(\+?63)?\d{10}$/ }, //菲律宾
		'64': { label: 'NZ +64', pattern: /^(\+?64|0)2\d{7,9}$/ }, //新西兰
		'65': { label: 'SG +65', pattern: /^(\+?65)?\d{10}$/ }, //新加坡
		'66': { label: 'TH +66', pattern: /^(\+?66)?\d{10}$/ }, //泰国
		'81': {
			label: 'JP +81',
			pattern: /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
		}, //日本
		'82': { label: 'KR +82', pattern: /^(\+?82)?0[71](?:\d{8,9})$/ }, //韩国
		'84': {
			label: 'VN +84',
			pattern: /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
		}, //越南
		'90': { label: 'R +90', pattern: /^(\+?90|0)?5\d{9}$/ }, //土耳其
		'91': { label: 'IN +91', pattern: /^(\+?91|0)?[789]\d{9}$/ }, //印度
		'213': { label: 'DZ +213', pattern: /^(\+?213|0)(5|6|7)\d{8}$/ }, //阿尔及利亚
		'351': { label: 'PT +351', pattern: /^(\+?351)?9[1236]\d{7}$/ }, //葡萄牙
		'358': {
			label: 'FI +358',
			pattern: /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
		}, //芬兰
		'381': { label: 'RS +381', pattern: /^(\+3816|06)[- \d]{5,9}$/ }, //塞尔维亚
		'420': {
			label: 'CZ +420',
			pattern: /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
		}, //捷克
		'963': { label: 'SY +963', pattern: /^(!?(\+?963)|0)?9\d{8}$/ }, //叙利亚
		'966': { label: 'SA +966', pattern: /^(!?(\+?966)|0)?5\d{8}$/ }, //沙特
		'972': {
			label: 'IL +972',
			pattern: /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/,
		}, //以色列
	},
	//用户登录类型
	memberGroup: {
		DEFAULT: 'tinyShop',
		PC: 'pc',
		IOS: 'ios',
		ANDROID: 'android',
		APP: 'app',
		H5: 'h5',
		WECHAT: 'wechat',
		WECHAT_MP: 'wechatMp',
		ALI_MP: 'aliMp',
		QQ_MP: 'qqMp',
		BAIDU_MP: 'baiduMp',
		TOU_TIAO_MP: 'touTiaoMp',
		S_360_MP: '360Mp',
	},
	//订单类型
	orderType: {
		combination: '组合套餐',
		haggle: '砍价',
		limited_buy: '限量购',
		join_buy: '拼团',
		presell_buy: '预售',
	},
	// 订单状态
	orderStatus: [
		{ key: 0, value: '待付款' },
		{ key: 1, value: '待发货' },
		{ key: 2, value: '已发货' },
		{ key: 3, value: '已收货' },
		{ key: 4, value: '已完成' },
		{ key: 201, value: '待备货' },
		{ key: 202, value: '备货完成' },
		{ key: -1, value: '退货申请' },
		{ key: -2, value: '退货/退款/换货中' },
		{ key: -3, value: '退货/退款/换货完成' },
		{ key: -4, value: '已关闭' },
		{ key: -5, value: '撤销申请' },
		{ key: -101, value: '待成团' },
		{ key: 12, value: '部分发货' },
	],
	// 售后状态
	refundStatus: [
		{ key: 1, value: '退货/退款/换货审核中' }, // 买家退款申请
		{ key: 2, value: '等待您退货' }, // 等待买家退货
		{ key: 3, value: '验收中' }, // 等待卖家确认收货
		{ key: 4, value: '退货/退款/换货中' }, // 等待卖家确认退款
		{ key: 5, value: '退货/退款成功' }, // 卖家同意退款
		{ key: 6, value: '待发货' }, // 等待卖家重新发货
		{ key: 7, value: '等待您确认收货' }, // 等待买家确认收货
		{ key: 8, value: '换货成功' }, // 买家确认收货
		{ key: -1, value: '不符合退货/退款要求' }, // 退款已拒绝
		{ key: -2, value: '退货/退款已关闭' }, // 退款已关闭
		{ key: -3, value: '申请不通过' }, // 退款申请不通过
	],
	//虚拟码
	orderProductVirtualTypeList: [
		{
			status: 0,
			name: '未使用',
		},
		{
			status: 1,
			name: '已使用',
		},
		{
			status: -1,
			name: '已过期',
		},
	],
	//分销中心
	distribution: {
		areaAgentShow: true, //是否显示区域代理功能
		statDetailShow: true, //分销订单统计是否以明细方式展现
	},
	profile: {
		tools: {
			wholesaleShow: true, //是否显示拼团
			liveShow: true, //是否显示直播
			haggleShow: true, //是否显示砍价
			virtualCodeShow: false, //是否显示虚拟码
		},
	},
};
