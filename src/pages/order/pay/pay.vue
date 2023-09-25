<template>
	<view>
		<dz-navbar :title="language.orderPay.titleOrderPay" :borderBottom="false"></dz-navbar>
		<view class="price-box" :style="{ color: theme.dzBaseColor }">
			<view class="dz-flex dz-row-center">
				<view>{{ language.application.moneySymbol }}</view>
				<view class="price">{{ money }}</view>
			</view>
			<view class="time" v-if="parseInt(orderDetail.order_status) !== 1 && parseInt(orderDetail.close_left_time) > 0">
				{{ language.orderPay.payLeftTime }}
				<dz-count-down
					class="dz-m-l-10"
					:timestamp="orderDetail.close_left_time"
					:show-days="false"
					:color="theme.dzBaseColor"
					:separator-color="theme.dzBaseColor"
					:bg-color="'transparent'"
					@end="orderEnd"
				></dz-count-down>
			</view>
		</view>
		<dz-radio-group ref="radioGroup" v-model="checkType">
			<view class="pay-type-list">
				<!--微信支付-->
				<dz-cell-item
					v-if="parseInt(payConfig[`pay_${payGroup}_wechatpay`]) > 0"
					:borderBottom="false"
					center
					hoverClass="none"
					:arrow="false"
					:title="language.orderPay.wechatPay"
					icon="wechat"
					iconSize="60"
					:icon-style="{ color: '#42E38D', 'margin-right': '30rpx' }"
					@click="checkboxChange(1)"
				>
					<template #value>
						<view class="dz-inline-block">
							<dz-radio :name="1" :active-color="theme.dzBaseColor"></dz-radio>
						</view>
					</template>
				</dz-cell-item>
				<!--支付宝支付-->
				<dz-cell-item
					v-if="parseInt(payConfig[`pay_${payGroup}_alipay`]) > 0"
					:borderBottom="false"
					center
					:arrow="false"
					hoverClass="none"
					:title="language.orderPay.aliPay"
					icon="alip"
					iconSize="60"
					:icon-style="{ color: '#2EAFFF', 'margin-right': '30rpx' }"
					@click="checkboxChange(2)"
				>
					<template #value>
						<view class="dz-inline-block">
							<dz-radio :name="2" :active-color="theme.dzBaseColor"></dz-radio>
						</view>
					</template>
				</dz-cell-item>
				<!--经销商支付-->
				<dz-cell-item
					center
					title="经销商服务费"
					:label="userInfo.brokerage"
					icon="balance"
					hoverClass="none"
					iconSize="60"
					:icon-style="{ color: '#FFC43F', 'margin-right': '30rpx' }"
					:border-bottom="false"
					:arrow="false"
					@click="checkboxChange(9)"
				>
					<template #value>
						<view class="dz-inline-block">
							<dz-radio :name="9" :active-color="theme.dzBaseColor"></dz-radio>
						</view>
					</template>
				</dz-cell-item>
			</view>
		</dz-radio-group>
		<view class="footer">
			<view class="footer-btn">
				<view style="width: 90%">
					<dz-button
						:custom-style="{
							width: '100%',
							background:
								parseInt(orderDetail.order_status) !== 0 || parseInt(orderDetail.close_left_time || submitting) <= 0
									? theme.dzBaseDisabled
									: theme.dzBaseColor,
							color: theme.dzBaseFontColor,
						}"
						hover-class="none"
						shape="circle"
						:border="false"
						:loading="submitting"
						@click="paySubmit"
						:disabled="parseInt(orderDetail.order_status) !== 0 || parseInt(orderDetail.close_left_time) <= 0"
					>
						{{ language.orderPay.confirmPay + language.application.moneySymbol + money }}
					</dz-button>
				</view>
			</view>
		</view>
		<!--通商云支付宝支付确认-->
		<dz-popup v-model:show="allinpayAliPayShow" mode="center" width="90%" border-radius="30" :closeable="true">
			<view class="dz-p-t-40 dz-p-b-40 dz-p-l-20 dz-p-r-20">
				<view class="dz-text-center dz-font-24 dz-p-30 dz-tips-color">{{ language.orderPay.allinpayAlipayTip }}</view>
				<dz-button
					:custom-style="{
						background: theme.dzBaseColor,
						color: theme.dzBaseFontColor,
						marginTop: '50rpx',
						marginLeft: '20rpx',
						marginRight: '20rpx',
					}"
					hover-class="none"
					:border="false"
					@click="getPayResult()"
				>
					{{ language.orderPay.allinpayAlipayConfirm }}
				</dz-button>
			</view>
		</dz-popup>
		<!-- 页面加载 -->
		<dz-page-loading :show="pageLoadingShow" :status="pageLoadingStatus" @click="pageLoadingClick"></dz-page-loading>
	</view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, unref, toRefs } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';
import { useGroup } from '@/hooks/group';
const language = uni.$api.language;

const userStore = useUserStore();
const groupData = useGroup();
const radioGroup = ref(null);
const data = reactive({
	submitting: false,
	pageLoadingStatus: 'loading',
	pageLoadingShow: true,
	id: '',
	type: '', //公众号使用
	auto: '', //公众号使用
	wxCode: '', //公众号使用
	money: 0, //支付金额
	checkType: 9, //支付类型
	payConfig: {}, //支付配置
	payGroup: groupData.payGroup, //支付组别
	orderInfo: {}, //订单信息
	orderGroup: '', //订单组别
	group: groupData.group, //客户端组别
	payTradeno: '', //支付流水号
	submitQuery: {}, //提交参数
	apiUrl: uni.$api.apiPay.payCreate, //API提交地址
	wxAutoParam: {}, //微信自动登录带入参数
	orderDetail: {},
	allinpayAliPayShow: false,
});

const userInfo = computed(() => {
	return userStore.getUserInfo;
});

const shopSetting = computed(() => {
	return userStore.getShopSetting;
});

const theme = computed(() => {
	return userStore.getTheme;
});

onLoad(async (options) => {
	await uni.$onLaunched;
	data.id = options.id;
	uni.setNavigationBarTitle({
		title: uni.$api.language.orderPay.titleOrderPay,
	});
	data.type = options.type;
	data.auto = options.auto;
	data.wxCode = options.code || '';
	data.orderGroup = options.orderGroup || 'order';
	initData();
	initOrder();
});

onShow(() => {
	getDealerInfo();
});

async function getDealerInfo() {
	await uni.$api.http.get(uni.$api.apiDealer.dealerIndex).then((res) => {
		userStore.setUserInfo(res.data);
	});
}

//页面重新载入
function pageLoadingClick() {
	data.pageLoadingStatus = 'loading';
	initData();
}

//初始化公共数据
async function initData() {
	//获取支付配置
	await uni.$api.http
		.get(uni.$api.apiPay.payConfig, {
			params: {
				group: data.group,
			},
		})
		.then((res) => {
			data.payConfig = res.data;
			payModeAutoSelect();
		})
		.catch(() => {
			data.pageLoadingStatus = 'error';
			return;
		});
}

//支付类型自动选择
function payModeAutoSelect() {
	if (parseInt(data.payConfig[`pay_${data.payGroup}_alipay`]) > 0) {
		data.checkType = 2;
		return;
	}
	if (parseInt(data.payConfig[`pay_${data.payGroup}_balance`]) > 0) {
		data.checkType = 5;
		return;
	}
}

//获取订单信息
async function initOrder() {
	if (data.orderGroup == 'order') {
		await uni.$api.http
			.get(uni.$api.apiDealer.orderView, {
				params: {
					id: data.id,
					simplify: 1,
				},
			})
			.then((res: any) => {
				data.orderDetail = res.data;
				data.money = res.data.order_status == '202' ? res.data.final_payment_money : res.data.pay_money;
				data.pageLoadingShow = false;
			})
			.catch(() => {
				data.pageLoadingStatus = 'error';
				return;
			});
	} 

	if (data.auto && data.auto == 'wechat') {
		data.checkType = 1;
		paySubmit();
	}
}

//倒计时结束
function orderEnd() {
	initData();
}

//支付方式切换
function checkboxChange(e: number) {
	if (e == data.checkType) return;
	const item = unref(radioGroup)?.children.find((item) => item.name == e);
	if (!item) return;
	item.checked = true;
	unref(radioGroup).unCheckedOther(item);
}

//支付提交
function paySubmit() {
	if (data.submitting) {
		return;
	}
	if (parseInt(data.orderDetail.order_status) !== 0 && parseInt(data.orderDetail.order_status) !== 202 && parseInt(data.orderDetail.close_left_time) <= 0) {
		return;
	}
	if (data.checkType <= 0) {
		uni.$refs.dzToast.show({
			title: uni.$api.language.orderPay.payTypeError,
			type: 'warning',
		});
		return;
	}
	data.submitting = true;
	data.orderInfo.order_id = data.id;
	data.orderInfo.dealer_id = userInfo.value.id;
	data.submitQuery = {
		id: data.id,
		type: data.type,
		wholesale_id: data.orderDetail.wholesale_id,
		orderGroup: data.orderGroup == 'order' ? '' : data.orderGroup,
	};
	data.wxAutoParam = {
		id: data.id,
		type: data.type,
	};
	if (data.checkType === 9) {
		//经销商支付
		brokeragePaySubmit();
	} else if (data.checkType === 1) {
		//微信支付
		wechatPaySubmit();
	} else if (data.checkType === 2) {
		//支付宝支付
		aliPaySubmit();
	}
}

//经销商支付
async function brokeragePaySubmit() {
	if (!userInfo.value.brokerage || parseFloat(userInfo.value.brokerage) < data.money) {
		uni.$api.toast('经销商服务费余额不足');
		data.submitting = false;
		return;
	}
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 9,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			data.payTradeno = res.data.out_trade_no;
			let post = {
				...data.submitQuery,
				out_trade_no: data.payTradeno,
			};
			uni.$api.router.redirectTo({
				route: uni.$api.routesConfig.paySuccess,
				query: post,
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

//微信支付
async function wechatPaySubmit() {
	let thirdpartyPayMode = parseInt(data.payConfig[`pay_${data.payGroup}_wechatpay_mode`]);
	let orderWechatMethod = parseInt(data.payConfig[`pay_${data.payGroup}_wechatpay_option_id`]);
	let orderWechatOption = data.payConfig[`pay_${data.payGroup}_wechatpay_option`];
	if (thirdpartyPayMode === 0 || orderWechatMethod === 0) {
		//支付关闭
		uni.$api.toast(uni.$api.language.orderPay.payMethodClosed);
		data.submitting = false;
		return;
	}
	if (thirdpartyPayMode === 1) {
		//原生微信支付
		//公众号
		console.log('normalNativePayInWechat');
		// #ifdef H5
		if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
			normalNativePayInWechat();
		} else {
			uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
			data.submitting = false;
			return;
		}
		// #endif
		//小程序
		// #ifdef MP-WEIXIN
		normalNativePayInWechatMp();
		// #endif
		//APP
		// #ifdef APP-PLUS
		normalNativePayWxInApp();
		// #endif
	} else if (thirdpartyPayMode === 2) {
		//通联微信基础支付
		switch (orderWechatOption.method) {
			case 'h5_cashier':
				//公众号
				// #ifdef H5
				if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
					allinpayCashierOrgPayInWechat();
				} else {
					uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
					data.submitting = false;
					return;
				}
				// #endif
				// #ifdef MP || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
				data.submitting = false;
				// #endif
				break;
			case 'miniprogram':
				// 微信小程序支付（收银宝）集团
				// #ifdef MP-WEIXIN
				normalNativePayInWechatMp();
				// #endif
				// #ifdef APP-PLUS
				allinpayMiniprogramCashierOrgPayInApp();
				// #endif
				// #ifndef MP-WEIXIN || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.payNotInAppOrWechatMp);
				data.submitting = false;
				// #endif
				break;
			case 'miniprogram_cashier':
				// 微信小程序支付（收银台）集团
				// #ifdef MP-WEIXIN
				miniprogramCashierPayInWechatMp();
				// #endif
				// #ifndef MP-WEIXIN
				uni.$api.toast(uni.$api.language.orderPay.payNotInAppOrWechatMp);
				data.submitting = false;
				// #endif
				break;
			// 微信JS支付（公众号）
			case 'js':
				//微信JS支付(公众号)_集团
				// #ifdef H5
				if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
					uni.$api.toast(uni.$api.language.orderPay.payNotInWechat);
					data.submitting = false;
					// normalNativePayInWechat();
				} else {
					uni.$api.toast(uni.$api.language.orderPay.payNotInWechat);
					data.submitting = false;
				}
				// #endif
				// #ifndef H5
				uni.$api.toast(uni.$api.language.orderPay.payNotInWechat);
				data.submitting = false;
				// #endif
				break;
		}
	} else if (thirdpartyPayMode === 3) {
		//杉德支付
		switch (orderWechatOption.method) {
			case 'h5_cashier':
				//公众号
				// #ifdef H5
				if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
					allinpayCashierOrgPayInWechat();
				} else {
					uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
					data.submitting = false;
					return;
				}
				// #endif
				// #ifdef MP || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
				data.submitting = false;
				// #endif
				break;
			case 'miniprogram':
				// 微信小程序支付（收银宝）集团
				// #ifdef MP-WEIXIN
				normalNativePayInWechatMp();
				// #endif
				// #ifdef APP-PLUS
				allinpayMiniprogramCashierOrgPayInApp();
				// #endif
				// #ifndef MP-WEIXIN || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.payNotInAppOrWechatMp);
				data.submitting = false;
				// #endif
				break;
			case 'miniprogram_cashier':
				// 微信小程序支付（收银台）集团
				// #ifdef MP-WEIXIN
				miniprogramCashierPayInWechatMp();
				// #endif
				// #ifndef MP-WEIXIN
				uni.$api.toast(uni.$api.language.orderPay.payNotInAppOrWechatMp);
				data.submitting = false;
				// #endif
				break;
		}
	} else if (thirdpartyPayMode === 4) {
		//杉德河马支付
		switch (orderWechatOption.method) {
			case 'js':
				// #ifdef H5
				if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
					normalNativePayInWechat();
				} else {
					uni.$api.toast(uni.$api.language.orderPay.wechatPayH5Tip);
					data.submitting = false;
					return;
				}
				// #endif
				break;
			case 'miniprogram':
				//小程序
				// #ifdef MP-WEIXIN
				normalNativePayInWechatMp();
				// #endif
				break;
		}
	}
}

/**
 * 通商云收银台集团/通联基础收银台
 * 微信公众号中支付
 */
async function allinpayCashierOrgPayInWechat() {
	//请求创建支付订单
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 1,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.payTradeno = res.data.out_trade_no;
			data.submitting = false;
			window.location.href = res.data.config;
		})
		.catch(() => {
			data.submitting = false;
		});
}

// 通联基础APP中跳转小程序支付
function allinpayMiniprogramCashierOrgPayInApp() {
	uni.showLoading();
	plus.share.getServices(
		(serviceRes) => {
			let sweixin = null;
			for (let i = 0; i < serviceRes.length; i++) {
				let t = serviceRes[i];
				if (t.id == 'weixin') {
					sweixin = t;
					break;
				}
			}
			if (!sweixin) {
				uni.$api.toast(uni.$api.language.orderPay.launchMiniProgrameError);
				data.submitting = false;
				uni.hideLoading();
				return;
			}
			//todo:这一句有点问题，这里仅仅针对普通订单
			sweixin.launchMiniProgram({
				id: shopSetting.value.miniprogram_id,
				type: shopSetting.value.miniprogram_type,
				path: uni.$api.routesConfig.allinpayAppWxPay.path + '?order_id=' + data.orderInfo.order_id + '&dealer_id=' + data.orderInfo.dealer_id,
			});
			data.submitting = false;
			uni.hideLoading();
		},
		(serviceErr) => {
			console.log(JSON.stringify(serviceErr), '10');
			uni.$api.toast(uni.$api.language.orderPay.payFailTip + serviceErr.message);
			data.submitting = false;
			uni.hideLoading();
		}
	);
}

//微信公众号原生支付
async function normalNativePayInWechat() {
	//如果未授权，获取code
	if (data.wxCode) {
		console.log('wxCode got and pay');
		await uni.$api.http
			.post(
				data.apiUrl,
				{
					order_group: data.orderGroup,
					group: data.group,
					pay_type: 1,
					data: JSON.stringify(data.orderInfo),
				},
				{
					params: {
						code: data.wxCode,
					},
				}
			)
			.then(async (res) => {
				if (res.data.payStatus === true) {
					uni.$api.toast(uni.$api.language.orderPay.orderPaid);
					return;
				}
				data.payTradeno = res.data.out_trade_no;
				uni.$api.jweixin.ready(() => {
					uni.$api.jweixin.chooseWXPay({
						...res.data.config,
						success() {
							data.wxCode = '';
							data.submitting = false;
							getPayResult();
						},
						fail() {
							data.wxCode = '';
							data.submitting = false;
							uni.$api.toast(uni.$api.language.orderPay.wxPayFailTip);
						},
						cancel() {
							data.wxCode = '';
							data.submitting = false;
						},
					});
				});
			})
			.catch(() => {
				data.submitting = false;
			});
	} else {
		//向微信申请CODE
		let h5Url = uni.$api.delAllUrlParams(window.location.href);
		let url = uni.$api.objParseUrlAndParam(h5Url, {
			...data.wxAutoParam,
			auto: 'wechat',
			r: uni.$api.helper.guid(16),
		});
		//避免缓存
		url = encodeURIComponent(url);
		window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
																				appid=${shopSetting.value.dealer_wechat_appid}&
																				redirect_uri=${url}&
																				response_type=code&
																				scope=snsapi_userinfo&
																				state=STATE#wechat_redirect`;
	}
}

//小程序原生支付
async function normalNativePayInWechatMp() {
	//如果未授权，获取code
	uni.login({
		provider: 'weixin',
		success: (loginRes) => {
			uni.$api.http
				.post(
					data.apiUrl,
					{
						order_group: data.orderGroup,
						group: data.group,
						pay_type: 1,
						data: JSON.stringify(data.orderInfo),
					},
					{
						params: {
							code: loginRes.code,
						},
					}
				)
				.then((res) => {
					if (res.data.payStatus === true) {
						uni.$api.toast(uni.$api.language.orderPay.orderPaid);
						return;
					}
					data.payTradeno = res.data.out_trade_no;
					uni.requestPayment({
						...res.data.config,
						timeStamp: res.data.config.timestamp,
						success: () => {
							data.submitting = false;
							getPayResult();
						},
						fail: (paymentErr) => {
							console.log(JSON.stringify(paymentErr));
							data.submitting = false;
						},
					});
				})
				.catch(() => {
					data.submitting = false;
				});
		},
		fail: (loginErr) => {
			console.log(JSON.stringify(loginErr));
			data.submitting = false;
			uni.$api.toast(uni.$api.language.orderPay.payFailTip + loginErr.errMsg);
		},
	});
}

// 微信小程序支付（收银台）
async function miniprogramCashierPayInWechatMp() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 1,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.payTradeno = res.data.out_trade_no;
			uni.navigateToMiniProgram({
				appId: 'wxef277996acc166c3',
				extraData: res.data.config.params,
				success: () => {
					data.submitting = false;
					getPayResult();
				},
				fail: (paymentErr) => {
					console.log(JSON.stringify(paymentErr));
					data.submitting = false;
				},
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

//APP原生微信支付
async function normalNativePayWxInApp() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 1,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.payTradeno = res.data.out_trade_no;
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: res.data.config,
				success: () => {
					data.submitting = false;
					getPayResult();
				},
				fail: (paymentErr) => {
					console.log(JSON.stringify(paymentErr));
					data.submitting = false;
				},
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

//支付宝支付
function aliPaySubmit() {
	let thirdpartyPayMode = parseInt(data.payConfig[`pay_${data.payGroup}_alipay_mode`]);
	let orderAliMethod = parseInt(data.payConfig[`pay_${data.payGroup}_alipay_option_id`]);
	let orderWechatOption = data.payConfig[`pay_${data.payGroup}_alipay_option`];
	if (orderAliMethod === 0 || orderAliMethod === 0) {
		//支付关闭
		uni.$api.toast(uni.$api.language.orderPay.payMethodClosed);
		data.submitting = false;
		return;
	}
	if (thirdpartyPayMode === 1) {
		//原生支付宝支付
		// #ifdef H5
		if (uni.$api.h5IsWechat() && shopSetting.value.dealer_wechat_appid != '') {
			uni.$api.toast(uni.$api.language.orderPay.payNotInH5);
			data.submitting = false;
		} else {
			normalNativePayAliInH5();
		}
		// #endif
		// #ifdef APP-PLUS
		normalNativePayAliInApp();
		// #endif
		// #ifndef H5 || APP-PLUS
		uni.$api.toast(uni.$api.language.orderPay.payNotInH5OrApp);
		data.submitting = false;
		// #endif
	} else if (thirdpartyPayMode === 2) {
		//通联基础收银台支付
		switch (orderWechatOption.method) {
			case 'h5_cashier':
				// #ifdef H5
				allinpayAlipayCashierOrgInH5();
				// #endif
				// #ifdef APP-PLUS
				allinpayAlipayCashierOrgInApp();
				// #endif
				// #ifndef H5 || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.payNotInH5OrApp);
				data.submitting = false;
				// #endif
				break;
			case 'app':
				//收银宝支付宝APP支付_集团
				//TODO 暂未支持
				// #ifdef APP-PLUS
				normalNativePayAliInApp();
				// #endif
				//TODO 暂未支持
				// #ifndef APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.payMethodNoSupported);
				data.submitting = false;
				// #endif
				break;
			case 'js':
				// 支付宝JS支付（生活号）
				//支付宝JS支付(生活号)_集团
				allinpayAlipayCashierOrgInH5();
				data.submitting = false;
				break;
		}
	} else if (thirdpartyPayMode === 3) {
		// 杉德收银台支付
		switch (orderWechatOption.method) {
			case 'h5_cashier':
				// #ifdef H5
				allinpayAlipayCashierOrgInH5();
				// #endif
				// #ifdef APP-PLUS
				allinpayAlipayCashierOrgInApp();
				// #endif
				// #ifndef H5 || APP-PLUS
				uni.$api.toast(uni.$api.language.orderPay.payNotInH5OrApp);
				data.submitting = false;
				// #endif
				break;
		}
	}
}

/**
 * 通联收银台集团支付宝H5/通联基础收银台
 */
async function allinpayAlipayCashierOrgInH5() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 2,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			//跳转到支付宝打开支付页面
			data.submitting = false;
			data.payTradeno = res.data.out_trade_no;
			uni.$api.router.redirectTo({
				route: uni.$api.routesConfig.aliMiddle,
				query: {
					...data.submitQuery,
					out_trade_no: data.payTradeno,
					url: encodeURIComponent(res.data.config),
				},
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

/**
 * 通联标准版收银台集团支付宝H5/通联基础收银台
 */
async function allinpayAlipayCashierOrgInApp() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 2,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.submitting = false;
			data.payTradeno = res.data.out_trade_no;
			let payUrl = 'alipays://platformapi/startapp?appId=20000067&url=' + encodeURIComponent(res.data.config);
			data.allinpayAliPayShow = true;
			plus.runtime.openURL(payUrl, () => {
				uni.$api.toast(uni.$api.language.orderPay.openAlipayError);
				data.allinpayAliPayShow = false;
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

//H5原生支付宝支付
async function normalNativePayAliInH5() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 2,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.submitting = false;
			data.payTradeno = res.data.out_trade_no;
			window.location.href = res.data.config.config;
		})
		.catch(() => {
			data.submitting = false;
		});
}

//APP原生支付宝支付
async function normalNativePayAliInApp() {
	await uni.$api.http
		.post(data.apiUrl, {
			order_group: data.orderGroup,
			group: data.group,
			pay_type: 2,
			data: JSON.stringify(data.orderInfo),
		})
		.then((res) => {
			if (res.data.payStatus === true) {
				uni.$api.toast(uni.$api.language.orderPay.orderPaid);
				return;
			}
			data.payTradeno = res.data.out_trade_no;
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: res.data.config.config,
				success: () => {
					data.submitting = false;
					getPayResult();
				},
				fail: (paymentErr) => {
					console.log(JSON.stringify(paymentErr));
					data.submitting = false;
				},
			});
		})
		.catch(() => {
			data.submitting = false;
		});
}

//查询支付结果
function getPayResult() {
	uni.$api.router.redirectTo({
		route: uni.$api.routesConfig.payComplete,
		query: {
			...data.submitQuery,
			out_trade_no: data.payTradeno,
		},
	});
}

const { payGroup, payConfig, orderDetail, money, checkType, submitting, pageLoadingShow, pageLoadingStatus, allinpayAliPayShow } = {
	...toRefs(data),
};
</script>

<style lang="scss" scoped>
.price-box {
	margin: 80rpx 0 60rpx;
	text-align: center;
	.price {
		font-size: 60rpx;
		font-weight: 700;
	}
	.tip {
		font-size: 24rpx;
	}
}
.pay-type-list {
	width: 100%;
	background-color: #ffffff;
	margin: 24rpx;
	padding: 10rpx 0;
	border-radius: 20rpx;
	overflow: hidden;
}
.footer {
	width: 100%;
	position: fixed;
	z-index: 99;
	background-color: #fff;
	bottom: 0;
}
.footer-btn {
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: env(safe-area-inset-bottom);
}
.bankcardList {
	padding: 30rpx;
}
.bankcardTip {
	padding-bottom: 20rpx;
}
.link {
	text-decoration: none;
}

.dz-transparent-btn {
	display: block;
	background: transparent;
	margin: 0;
	padding: 0;
	border-radius: 0;
	border: 0;
}

.dz-transparent-btn::after {
	border: 0;
}
</style>
