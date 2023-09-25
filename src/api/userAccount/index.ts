//会员账号相关API接口
export default {
	// 手机号注册，对应手机号密码登录方式
	mobileRegister: "/dealer/user-account/mobile-register",
	// 手机号验证码一键登录
	mobileCodeLogin: "/dealer/user-account/mobile-code-login",
	// 解绑手机号/验证原手机号
	mobileUnbind: "/dealer/user-account/mobile-unbind",
	// 重绑定手机号
	mobileRebind: "/dealer/user-account/mobile-rebind",
	// 设置或修改支付密码/需要手机号验证码验证
	setPayPassword: "/dealer/user-account/set-pay-password",
	// 刷新token
	refresh: "/dealer/user-account/refresh",
	// 退出登录
	logout: "/dealer/user-account/logout",
	// 注销/删除账号
	logoff: "/dealer/user-account/logoff",
	// 发送验证码短信
	smsCode: "/dealer/user-account/sms-code",
}
