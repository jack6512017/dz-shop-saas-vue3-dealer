//商城配置
class Setting {
	constructor() {
		// 商城设置
		this.store_name = ''; //店铺名称
		this.store_logo = ''; //店铺LOGO
		this.store_desc = ''; //店铺简介
		this.store_hot_line = ''; //客服电话
		this.store_province_id = 0; //店铺地址省
		this.store_city_id = 0; //店铺地址市
		this.store_area_id = 0; //店铺地址区
		this.store_address = ''; //店铺地址
		this.store_longitude = ''; //店铺地址经度
		this.store_latitude = ''; //店铺地址纬度
		this.store_refund_username = ''; //店铺售后联系人
		this.store_refund_mobile = ''; //店铺售后电话

		// 登录注册设置
		this.third_party_register = 0; //第三方注册绑定设置 0强制绑定手机，1非强制绑定手机，2后绑定手机
		this.app_agreement_default_select = 0; //协议默认选中 0不显示协议勾选框 1协议默认勾选 2协议默认不勾选
		this.mobile_show_apple_login = 0; //APP在IOS下是否显示苹果登录
		this.wechat_share_page_auto_login = 1; //公众号打开分享页面自动授权注册登录并绑定推荐人
		this.login_is_open = 1; //开放登录
		
		//三方登录配置
		this.login_qq_appid = ''; //QQ开放平台AppId
		this.login_sina_appid = ''; //新浪微博开放平台AppId
		this.login_dealer_wechat_appid = ''; //微信开放平台AppId
		this.login_github_appid = ''; //Github开放平台AppId

		// 购物设置
		this.order_auto_delivery = 7; // 自动收货时间(天)
		this.order_buy_close_time = 60; // 订单自动关闭时间(分钟)
		this.order_pickup_complete_status = 0; // 订单提货完成状态(0:订单收货状态;1:订单完成状态)
		this.order_delivery_complete_time = 14; // 订单完成时间(天)
		this.order_buy_min_pay_money = 0; // 订单下单最低支付金额
		this.evaluate_show = 1; // 用户主动评论后立即显示
		this.evaluate_day = 7; //系统默认评价时间(天)
		this.after_sale_date = 7; //售后设置(天)
		this.evaluate = ''; // 默认评价语
		this.order_refund_cancel_reapply = 0; // 用户取消售后后可重新申请
		this.order_invoice_is_open = 1; //订单发票是否开启

		// 配送设置
		this.close_all_logistics = 0; //关闭全部配送方式
		this.is_open_logistics = 1; //开启物流配送
		this.buyer_self_lifting = 0; //开启买家自提
		this.is_logistics_query_open = 0; //开启物流查询
		this.pickup_point_fee = 0; //门店运费
		this.pickup_point_freight = 0; //满X免运费
		this.pickup_point_is_open = 0; //是否启用

		//物流配置
		this.logistics_type = 'aliyun'; //物流进度查询类型
		this.logistics_aliyun_subscribe_app_code = ''; //阿里云物流订阅-appcode

		// 发票设置
		this.order_invoice_tax = 0; //用户发票税率

		// 分类页面
		this.style_cate_type = '3-1'; //分类加载类型
		// 商城风格
		this.style_user_is_open = 0; //用户可自定义风格
		this.style_type = '3-1'; //店铺风格
		// 加载样式ok
		this.style_loading_is_open = 1; //页面加载开启
		this.style_loading_type = 'circle'; //页面加载类型

		// 关注引导
		this.style_attention_mini_program_name = ''; //小程序名称
		this.style_attention_mini_program_logo = ''; //小程序logo
		this.style_attention_official_account_name = ''; //公众号名称
		this.style_attention_official_account_qrcode = ''; //公众号二维码
		this.style_attention_app_guide = ''; //App引导页

		//商家地址
		this.merchant_address = ''; //联系方式
		this.merchant_name = ''; //收货地址
		this.merchant_mobile = ''; //收件人
		this.merchant_zip_code = ''; //邮编
		this.merchant_longitude_latitude = ''; //地址经纬度

		// 商品海报
		this.product_poster_is_open = 0; //是否开启
		this.product_poster_qr_type = 'h5_qr'; //二维码显示类型
		this.product_share_title = '为您淘了一个好物，速来！'; //产品分享海报标题
		this.dealer_poster_qr_type = 'h5_qr';

		// 商品海报
		this.is_open_recharge = 1; //是否开启充值入口

		// 版权信息
		this.copyright_logo = ''; //版权logo
		this.copyright_company_name = ''; //公司名称
		this.copyright_icp = ''; //ICP备案号
		this.copyright_url = ''; //工信部备案链接
		this.copyright_desc = ''; //自定义版权信息
		this.copyright_show = 0; //首页底部显示版权信息

		// 热门搜索
		this.hot_search_default = ''; //默认搜索
		this.hot_search_list = ''; //热门搜索

		// 站点维护
		this.is_open_site = 1; //开启站点
		this.close_site_date = ''; //关闭站点时间
		this.close_site_explain = ''; //关闭站点说明

		// 消息通知
		this.notify_app_message = []; // 站内信
		this.notify_wechat_tmpl = []; // 微信公众号模板消息
		this.notify_miniprogram_sub = []; //小程序订阅消息
		this.notify_app_push = []; // APP推送


		// 前端文字
		this.balance_front_name = '余额'; //余额前端名称
		this.point_front_name = '积分'; //积分前端名称
		this.commission_front_name = '佣金'; //佣金前端名称

		// 公众号配置
		this.dealer_wechat_account = ''; //公众号账号
		this.dealer_wechat_id = ''; //原始ID
		this.dealer_wechat_appid = ''; //App ID
		this.dealer_wechat_token = ''; //Token
		this.dealer_wechat_qrcode = ''; //微信关注二维码

		// 小程序配置
		this.dealer_miniprogram_appid = ''; //App ID
		this.dealer_miniprogram_qrcode = ''; //小程序码展示

		// 验证码短信
		this.sms_code_length = 4; //短信验证码长度
		this.sms_strategies = 0; //多网关发送策略 0顺序发送 1随机发送
		
		this.dealer_brokerage_withdraw_enabled = 1; // 提现
	}
}

export default new Setting();
