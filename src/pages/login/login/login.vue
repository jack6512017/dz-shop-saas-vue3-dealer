<template>
	<view>
		<dz-navbar title="登录" :isBack="false"></dz-navbar>
		<view class="container">
			<view class="dz-flex dz-row-center">
				<dz-image :src="logo" :width="170" :height="170" :borderRadius="20"></dz-image>
			</view>
			<view class="form-wrap">
				<view class="dz-m-t-60">
					<dz-input
						v-model="mobile"
						:height="100"
						placeholder="请输入手机号码"
						clearable
						border="none"
						:customStyle="{ padding: '26rpx', borderRadius: '50rpx', background: '#F3F4F6' }"
					>
						<template #prefix>
							<view class="dz-m-r-15 dz-main-color" @tap="handleArea">
								{{ areaName }}
								<dz-icon name="unfold"></dz-icon>
							</view>
						</template>
					</dz-input>
				</view>
				<view class="dz-m-t-30">
					<dz-button
						v-if="!closeLogin"
						:custom-style="{ width: '100%', height: '95rpx', background: theme.dzBaseDisabled, color: theme.dzBaseFontColor }"
						hover-class="none"
						shape="circle"
						:border="false"
						:disabled="true"
						>应用暂时关闭登录</dz-button
					>
					<dz-button
						v-else
						:custom-style="{
							width: '100%',
							height: '95rpx',
							background: submitDisabled() || waitingCaptcha || isLoaidng ? theme.dzBaseDisabled : theme.dzBaseColor,
							color: theme.dzBaseFontColor,
						}"
						:disabled="submitDisabled() || waitingCaptcha"
						shape="circle"
						:border="false"
						:loading="isLoaidng"
						hover-class="none"
						@click="handleSubmit"
					>
						{{ waitingCaptcha ? api.formatString(language.login.getCaptchaLater, waitingSecond) : language.login.getCaptcha }}
					</dz-button>
				</view>
				<view class="dz-m-t-20 dz-font-24 dz-text-right" @tap="handlePageTab('mobileRegister')"><text style="color: #06f">申请经销商</text></view>
				<view class="dz-m-t-30 dz-font-24 dz-main-color">
					<block v-if="agreeMode == 0">
						{{ language.login.loginAgree + appName }}

						<text class="dz-tips-color dz-text-underline" @tap="protocal(language.login.userAgreement, 'register')">{{
							language.login.userAgreement
						}}</text>
						、
						<text class="dz-tips-color dz-text-underline" @tap="protocal(language.login.privacyAgreement, 'privacy')">{{
							language.login.privacyAgreement
						}}</text>

						{{ api.formatString(language.login.grantAuthorization, appName) }}
					</block>
					<block v-else>
						<view class="dz-flex dz-row-center">
							<dz-checkbox-group v-model="agreeCheck" shape="circle" :activeColor="theme.dzBaseColor">
								<dz-checkbox label="我已仔细阅读并同意" />
							</dz-checkbox-group>
							<view>
								<text class="dz-m-l-6 dz-tips-color dz-text-underline" @tap="protocal(language.login.userAgreement, 'register')"
									>《{{ language.login.userAgreement }}》</text
								>
								、
								<text class="dz-tips-color dz-text-underline" @tap="protocal(language.login.privacyAgreement, 'privacy')"
									>《{{ language.login.privacyAgreement }}》</text
								>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!--手机号码地区选择-->
		<dz-select
			mode="single-column"
			v-model="areaSelectShow"
			:defaultValue="areaDefaultValue"
			:safe-area-inset-bottom="true"
			:list="mobileAreaInfo"
			@confirm="areaConfirm"
		></dz-select>
	</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';

const language = uni.$api.language;
const mobilePattern = uni.$api.dataConfig.mobilePattern;
const mobileAreaInfo = ref([]);
const areaDefaultValue = ref<number[]>([]);
const areaName = ref<string>('');
const userStore = useUserStore();
const { lastInputMobile, lastSelectMobileArea } = userStore.getData;
const shopSetting = computed(() => {
	return userStore.getShopSetting;
});
const theme = computed(() => {
	return userStore.getTheme;
});

const lastLoginCaptchaTimeStamp = computed(() => {
	return userStore.getLastLoginCaptchaTimeStamp;
});
const mobile = ref<string>(lastInputMobile);
const areaCode = ref<string>(lastSelectMobileArea || '86');
const waitingCaptcha = ref<Boolean>(false);
const waitingSecond = ref<Number>(60);
const timeInterval = ref();
const isLoaidng = ref<Boolean>(false);
const canIUseProfile = ref<Boolean>(false);
const logo = ref<String>(shopSetting.value.store_logo || uni.$api.assetsConfig.logo);
const appName = ref<String>(shopSetting.value.store_name);
const agreeMode = ref<Number>(parseInt(shopSetting.value.app_agreement_default_select));
const closeLogin = ref<Boolean>(parseInt(shopSetting.value.login_is_open) == 1);
// app
const agreeCheck = ref<number[]>();
const areaSelectShow = ref<Boolean>(false);
const currentPages = ref<any>([]);

onLoad(async () => {
	await uni.$onLaunched;
	uni.setNavigationBarTitle({
		title: uni.$api.language.login.titleLogin,
	});
	currentPages.value = getCurrentPages();
	// #ifdef MP-WEIXIN
	// 新版小程序登录判断
	if (uni.getUserProfile) {
		canIUseProfile.value = true;
	}
	// #endif

	for (let area in mobilePattern) {
		mobileAreaInfo.value.push({
			value: area,
			label: mobilePattern[area].label,
		});
	}
	areaName.value = mobilePattern[areaCode.value].label;
	if (agreeMode.value == 0) {
		agreeCheck.value = [1];
	} else if (agreeMode.value == 1) {
		agreeCheck.value = [1];
	} else if (agreeMode.value == 2) {
		agreeCheck.value = [];
	}
});

onShow(() => {
	computeLastCaptcha();
});

function submitDisabled() {
	if (uni.$api.isMobile(areaCode.value + mobile.value, areaCode.value)) {
		return false;
	}
	return true;
}

function handleArea() {
	const findIndex = mobileAreaInfo.value.findIndex((item) => item.value == areaCode.value);
	if (findIndex != -1) {
		areaDefaultValue.value = [findIndex];
	}
	areaSelectShow.value = true;
}

function areaConfirm(e: any) {
	areaCode.value = e[0].value;
	areaName.value = e[0].label;
}

function computeLastCaptcha() {
	if (timeInterval.value) {
		return;
	}
	let timeNow = parseInt(new Date().getTime() / 1000);
	let timeDiff = timeNow - lastLoginCaptchaTimeStamp.value;
	if (timeDiff < 60 && timeDiff >= 0) {
		waitingCaptcha.value = true;
		waitingSecond.value = 60 - timeDiff;
		timeInterval.value = setInterval(() => {
			waitingSecond.value--;
			if (waitingSecond.value <= 0) {
				waitingCaptcha.value = false;
				clearInterval(timeInterval.value);
				timeInterval.value = null;
			}
		}, 1000);
	} else {
		waitingCaptcha.value = false;
	}
}

// 页面切换
function handlePageTab(path: string) {
	uni.$api.router.push({
		route: uni.$api.routesConfig[path],
	});
}

//协议
function protocal(title: string, field: string) {
	uni.$api.router.push({
		route: uni.$api.routesConfig.protocolDetail,
		query: {
			title,
			field,
		},
	});
}

function handleSubmit() {
	if (isLoaidng.value) return;
	if (!closeLogin.value) {
		uni.$api.toast('应用暂时关闭登录');
		return;
	}
	if (!agreeCheck.value.length) {
		uni.$api.toast('请仔细阅读并勾选会员协议');
		return;
	}

	isLoaidng.value = true;
	if (uni.$api.isMobile(areaCode.value + mobile.value, areaCode.value)) {
		//发送验证码并跳转
		uni.$api.http
			.post(uni.$api.apiUserAccount.smsCode, {
				mobile: mobile.value,
				mobile_area: areaCode.value,
				usage: 'login',
			})
			.then((res) => {
				userStore.setLastCaptchaTimeStamp('lastLoginCaptchaTimeStamp', parseInt(new Date().getTime() / 1000));
				userStore.setLastInputMobile(mobile.value);
				userStore.setLastSelectMobileArea(areaCode.value);
				computeLastCaptcha();
				isLoaidng.value = false;
				uni.$api.router.redirectTo({
					route: uni.$api.routesConfig.loginCode,
					query: {
						mobile_area: uni.$api.strEncode(areaCode.value),
						mobile: uni.$api.strEncode(mobile.value),
						code: res.data,
					},
				});
			})
			.catch(() => {
				isLoaidng.value = false;
			});
	} else {
		isLoaidng.value = false;
		uni.$api.toast(uni.$api.language.loginCode.mobileError);
	}
}
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #fff;
}
.container {
	padding-top: 80rpx;
	background-color: #fff;
	.form-wrap {
		padding: 20rpx 36rpx;
	}
}

.model-hover {
	background-color: rgb(230, 230, 230) !important;
}
</style>
