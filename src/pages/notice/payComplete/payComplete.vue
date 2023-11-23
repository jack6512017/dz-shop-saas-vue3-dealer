<template>
	<view class="container">
		<view class="dz-bg" :style="{ background: 'linear-gradient(20deg, ' + theme.dzBaseColor + ', ' + theme.dzBaseDark + ')' }"> </view>
		<view class="dz-line"></view>
		<view class="dz-content">
			<view class="dz-form">
				<view class="decorate left"></view>
				<view class="decorate right"></view>
				<image :src="img" class="dz-icon" mode="widthFix"></image>
				<view class="dz-title">{{ title }}</view>
				<view class="dz-sub-title">
					<dz-loading class="dz-m-r-10" v-if="loading"></dz-loading>

					<text v-else>{{ sub }}</text>
				</view>
				<view class="dz-btn-box">
					<dz-button
						hoverClass="none"
						:border="false"
						:custom-style="{ background: theme.dzBgColor, borderColor: theme.dzBgColor, width: '240rpx', height: '80rpx' }"
						:plain="true"
						shape="circle"
						@click="navTo(1)"
					>
						{{ language.notice.viewOrder }}
					</dz-button>
					<dz-button
						:border="false"
						:custom-style="{
							background: loading ? theme.dzBaseDisabled : theme.dzBaseColor,
							color: theme.dzBaseFontColor,
							width: '240rpx',
							height: '80rpx',
						}"
						hover-class="none"
						:disabled="loading"
						shape="circle"
						@click="navTo(2)"
					>
						回到经销商中心
					</dz-button>
				</view>
			</view>
		</view>
		<view class="dz-tips">
			<view class="dz-grey">{{ language.notice.tip }}</view>
			<view class="dz-light-grey">{{ tip }}</view>
		</view>
	</view>
</template>

<script lange="ts" setup>
import { reactive, computed, toRefs } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';

const userStore = useUserStore();
const language = uni.$api.language;
const img = uni.$api.assetsConfig.waitting;
const data = reactive({
	title: uni.$api.language.notice.payCompleteTitle,
	sub: uni.$api.language.notice.payCompleteSub,
	tip: uni.$api.language.notice.payCompleteTip,
	orderId: '',
	orderType: '',
	payTradeno: '',
	btnType: 0,
	loading: false,
	payResultTimeout: 3000, //支付结果查询间隔
	payResultMaxCount: 5, //最大查询次数
	payResultCount: 0, //当前查询次数
	orderGroup: '',
	queryForm: {},
});

const userInfo = computed(() => {
	return userStore.getUserInfo;
});

const shopSetting = computed(() => {
	return userStore.getShopSetting;
});

const hasLogin = computed(() => {
	return userStore.hasLogin;
});

const theme = computed(() => {
	return userStore.getTheme;
});

const wechatMpLogin = computed(() => {
	return userStore.getWechatMpLogin;
});

onLoad(async (options) => {
	uni.setNavigationBarTitle({
		title: uni.$api.language.notice.payCompleteTitle,
	});
	data.orderId = options.id || '';
	data.orderType = options.type || '';
	data.payTradeno = options.out_trade_no || '';
	data.orderGroup = options.orderGroup || '';
	if (options.params) {
		data.queryForm = JSON.parse(uni.$api.helper.strDecode(options.params));
	}
	await uni.$onLaunched;
	if (!data.payTradeno) {
		data.loading = false;
		data.title = uni.$api.language.notice.payCompleteTardeNoEmptyTitle;
		data.sub = uni.$api.language.notice.payCompleteTardeNoEmptySub;
		data.img = uni.$api.assetsConfig.failure;
	} else {
		getPayResult();
	}
});

async function getPayResult() {
	data.payResultCount++;
	if (data.payResultCount > data.payResultMaxCount) {
		//超时
		data.loading = false;
		data.title = uni.$api.language.notice.payCompleteTimeoutTitle;
		data.sub = uni.$api.language.notice.payCompleteTimeoutSub;
		data.img = uni.$api.assetsConfig.timeout;
		return;
	}
	await uni.$api.http
		.get(uni.$api.apiPay.payLogFindByOutTradeNo, {
			params: {
				out_trade_no: data.payTradeno,
			},
		})
		.then(async (res) => {
			let payStatus = parseInt(res.data.pay_status);
			if (payStatus === 0 || payStatus === 2) {
				//等待支付结果
				setTimeout(() => {
					getPayResult();
				}, data.payResultTimeout);
			} else if (payStatus === 1) {
				//支付成功，刷新用户信息
				await uni.$api.http
					.get(uni.$api.apiMember.memberIndex)
					.then((res) => {
						userStore.setUserInfo(res.data);
					})
					.catch((err) => {});
				data.loading = false;
				data.title = uni.$api.language.notice.payCompleteSuccessTitle;
				data.sub = uni.$api.language.notice.payCompleteSuccessSub;
				data.img = uni.$api.assetsConfig.success;
			} else if (payStatus === -1) {
				//支付失败
				data.loading = false;
				data.title = uni.$api.language.notice.payCompleteFailTitle;
				data.sub = uni.$api.language.notice.payCompleteFailSub + ' \n ' + res.data.error_msg;
				data.img = uni.$api.assetsConfig.failure;
			}
		})
		.catch((err) => {
			//查询错误
			data.loading = false;
			data.title = uni.$api.language.notice.payCompleteErrorTitle;
			data.sub = uni.$api.language.notice.payCompleteErrorSub;
			data.img = uni.$api.assetsConfig.failure;
		});
}

function navTo(page) {
	if (page == 1) {
		// #ifdef MP
		if (
			wechatMpLogin.value &&
			shopSetting.value.notify_miniprogram_sub &&
			(shopSetting.value.notify_miniprogram_sub.order_consign || shopSetting.value.notify_miniprogram_sub.order_signin)
		) {
			let tmplIds = [];
			// 订单发货
			shopSetting.value.notify_miniprogram_sub.order_consign && tmplIds.push(shopSetting.value.notify_miniprogram_sub.order_consign);
			// 订单签收
			shopSetting.value.notify_miniprogram_sub.order_signin && tmplIds.push(shopSetting.value.notify_miniprogram_sub.order_signin);
			wx.requestSubscribeMessage({
				tmplIds: tmplIds,
				success: (res) => {
					toOrder();
				},
				fail(err) {
					toOrder();
					console.log(err, 2);
				},
			});
		} else {
			toOrder();
		}
		// #endif
		// #ifndef MP
		toOrder();
		// #endif
	} else if (page == 2) {
		uni.$api.router.reLaunch({
			route: uni.$api.routesConfig.index,
			query: {},
		});
	}
}

function toOrder() {
	uni.$api.router.redirectTo({
		route: uni.$api.routesConfig.orderIndex,
		query: {
			status: 1,
		},
	});
}

const { title, loading, orderGroup, sub, tip, queryForm, orderType } = { ...toRefs(data) };
</script>

<style lang="scss">
.dz-bg {
	width: 100%;
	height: 260rpx;
}

.dz-line {
	height: 20rpx;
	margin: -105rpx 30rpx 0rpx;
	background: rgba(0, 0, 0, 0.08);
	border-radius: 10rpx;
}

.dz-content {
	padding: 0 60rpx;
	box-sizing: border-box;
}

.dz-form {
	background: #fff;
	border-radius: 0 0 40rpx 40rpx;
	margin-top: -10rpx;
	position: relative;
	z-index: 10;
	display: flex;
	align-items: center;
	flex-direction: column;
}

.decorate {
	position: absolute;
	top: 300rpx;
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	background: #f5f5f5;
}
.left {
	left: -25rpx;
}
.right {
	right: -25rpx;
}

.dz-icon {
	width: 260rpx;
	display: block;
	margin-top: 60rpx;
}

.dz-title {
	font-size: 42rpx;
	line-height: 42rpx;
	padding-top: 28rpx;
}

.dz-sub-title {
	color: #666666;
	font-size: 28rpx;
	line-height: 28rpx;
	padding: 20rpx 30rpx 0;
}

.dz-btn-box {
	width: 570rpx;
	display: flex;
	align-items: center;
	padding-top: 80rpx;
	padding-bottom: 40rpx;
}

.dz-btn {
	width: 240rpx;
	height: 70rpx;
}

.dz-tips {
	font-size: 26rpx;
	padding: 48rpx 60rpx;
	box-sizing: border-box;
	text-align: justify;
	line-height: 48rpx;
}

.dz-grey {
	color: #666;
}

.dz-light-grey {
	color: #888;
}
</style>
