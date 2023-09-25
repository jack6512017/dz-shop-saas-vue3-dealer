<template>
	<view>
		<dz-navbar title="申请经销商"></dz-navbar>
		<view class="form-content">
			<dz-form ref="formRef" :model="form" :label-width="140">
				<dz-form-item label="手机号" prop="mobile" :borderBottom="true">
					<dz-input v-model="form.mobile" placeholder="请输入手机号码" clearable border="none">
						<template #prefix>
							<view class="dz-m-r-15" @tap="handleArea">
								{{ areaName }}
								<dz-icon name="unfold"></dz-icon>
							</view>
						</template>
					</dz-input>
				</dz-form-item>
				<dz-form-item :label="language.modifyMobile.labelCode" prop="code">
					<dz-input type="text" v-model="form.code" :disabled="isLoaidng" :placeholder="language.modifyMobile.codeHolder" border="none">
						<template #suffix>
							<dz-button
								type="info"
								size="mini"
								shape="circle"
								hover-class="none"
								:border="false"
								:custom-style="{ background: isLoaidng ? theme.dzBaseDisabled : theme.dzBaseColor, color: theme.dzBaseFontColor }"
								:disabled="codeDisabled() || waitingCaptcha"
								@click="getCode()"
							>
								{{ waitingCaptcha ? api.formatString(language.bindMobile.getCaptchaLater, waitingSecond) : language.bindMobile.getCaptcha }}
							</dz-button>
						</template>
					</dz-input>
				</dz-form-item>
			</dz-form>
		</view>
		<view class="button" style="margin-top: 100rpx">
			<dz-button
				shape="circle"
				:custom-style="{ width: '100%', background: theme.dzBaseColor, color: theme.dzBaseFontColor }"
				:border="false"
				hover-class="none"
				:loading="isBtnLoaidng"
				@click="submit"
			>
				确定
			</dz-button>
		</view>
		<dz-select v-model="selectShow" mode="single-column" :safe-area-inset-bottom="true" :list="mobileAreaInfo" @confirm="areaConfirm"> </dz-select>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, unref } from 'vue';
import { onLoad, onShow, onReady } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';
import { useGroup } from '@/hooks/group';

const userStore = useUserStore();
const groupData = useGroup();
const language = uni.$api.language;
const formRef = ref(null);
const { lastInputMobile, lastSelectMobileArea } = userStore.getData;
const selectShow = ref<boolean>(false);
const mobilePattern = uni.$api.dataConfig.mobilePattern;
const mobileAreaInfo = ref([]);
const areaName = ref('');
const waitingCaptcha = ref<Boolean>(false);
const waitingSecond = ref<Number>(60);
const timeInterval = ref();
const isLoaidng = ref<Boolean>(false);
const isBtnLoaidng = ref<Boolean>(false);
const form = reactive({
	username: '',
	mobile: lastInputMobile,
	mobile_area: lastSelectMobileArea || '86',
	code: '',
});

const rules = {
	mobile: [
		{
			type: 'string',
			required: true,
			message: '请输入手机号',
			trigger: ['blur', 'change'],
		},
		{
			validator: (rule, value, callback) => {
				return uni.$api.isMobile(form.mobile_area + value, form.mobile_area);
			},
			message: '请输入正确的手机号',
			trigger: ['change', 'blur'],
		},
	],
	code: {
		type: 'string',
		required: true,
		message: '请输入验证码',
		trigger: ['blur'],
	},
};

const theme = computed(() => {
	return userStore.getTheme;
});

const dealerCode = computed(() => {
	return userStore.getDealerCode;
});

const lastBindMobileCaptchaTimeStamp = computed(() => {
	return userStore.getLastBindMobileCaptchaTimeStamp;
});

onLoad(async () => {
	await uni.$onLaunched;
	uni.setNavigationBarTitle({ title: '申请经销商' });
	for (let area in mobilePattern) {
		mobileAreaInfo.value.push({
			value: area,
			label: mobilePattern[area].label,
		});
	}
	areaName.value = mobilePattern[form.mobile_area].label;
});

onShow(() => {
	computeLastCaptcha();
});

onReady(() => {
	unref(formRef).setRules(rules);
});

function codeDisabled() {
	if (uni.$api.isMobile(form.mobile_area + form.mobile, form.mobile_area)) {
		return false;
	}
	return true;
}

function computeLastCaptcha() {
	if (timeInterval.value) {
		return;
	}
	const lastCaptchaTimeStamp = lastBindMobileCaptchaTimeStamp.value;
	let timeNow = parseInt(new Date().getTime() / 1000);
	let timeDiff = timeNow - lastCaptchaTimeStamp;
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

function handleArea() {
	selectShow.value = true;
}

function getCode() {
	if (isLoaidng.value) return;
	if (!form.mobile) {
		uni.$api.toast(uni.$api.language.bindMobile.bindError);
		return;
	}
	uni.showLoading({
		title: language.thirdPartyLogin.codeLoading,
	});

	if (!uni.$api.isMobile(form.mobile_area + form.mobile, form.mobile_area)) {
		uni.$api.toast(uni.$api.language.loginCode.mobileError);
		return;
	}
	isLoaidng.value = true;
	uni.$api.http
		.post(uni.$api.apiUserAccount.smsCode, {
			mobile: form.mobile,
			mobile_area: form.mobile_area,
			usage: 'register',
		})
		.then((res) => {
			if (res.data && !res.data.queue_id && import.meta.env.NODE_ENV === 'development') {
				uni.$api.toast(res.data);
			}
			userStore.setLastCaptchaTimeStamp('lastBindMobileCaptchaTimeStamp', parseInt(new Date().getTime() / 1000));
			userStore.setLastInputMobile(form.mobile);
			userStore.setLastSelectMobileArea(form.mobile_area);
			computeLastCaptcha();
		})
		.finally(() => {
			uni.hideLoading();
			isLoaidng.value = false;
		});
}

function areaConfirm(e) {
	form.mobile_area = e[0].value;
	areaName.value = e[0].label;
}

//注册
function submit() {
	unref(formRef)
		.validate()
		.then((res) => {
			if (isBtnLoaidng.value) {
				return;
			}
			isBtnLoaidng.value = true;
			uni.showLoading({
				mask: true,
			});
			const formData = {
				...form,
				group: groupData.group,
			};
			if (dealerCode.value) {
				formData.dealer_code = dealerCode.value;
			}
			uni.$api.http
				.post(uni.$api.apiUserAccount.mobileRegister, {
					...formData,
				})
				.then((res) => {
					userStore.setUserMobile(form.mobile);
					userStore.setUserMobileArea(form.mobile_area);
					uni.$api.toast(res.message);
					setTimeout(() => {
						uni.$api.router.redirectTo({
							route: uni.$api.routesConfig.login,
						});
					}, 1000);
				})
				.finally(() => {
					isBtnLoaidng.value = false;
					uni.hideLoading();
				});
		});
}
</script>

<style lang="scss" scoped>
.form-content {
	margin: 20rpx;
	padding: 10rpx 24rpx;
	background-color: #fff;
	border-radius: 20rpx;
}

.button {
	margin: 0 30rpx;
}
</style>
