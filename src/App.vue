<script setup lang="ts">
import { onLaunch, onShow, onHide, onError } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';
import themeConfig from '@/core/config/themeConfig';

const userStore = useUserStore();
const { customerTheme, styleLoadingType } = userStore.getData;

onLaunch((options) => {
	console.log('App Launch');
	// #ifdef H5
	if (process.env.NODE_ENV === 'production') {
		//api访问地址
		uni.$api.appConfig.h5Domain = `${window.location.origin}/dealer`;
		uni.$api.appConfig.userH5Domain = `${window.location.origin}/h5`;
	}
	// #endif
	if (options.query && options.query.merchant_code) {
		userStore.setMerchantCode(options.query.merchant_code);
	}
	if (options.scene) {
		userStore.setWechatMpScene(options.scene);
	}
	init();
	if (!userStore.hasLogin) {
		uni.$api.router.redirectTo({
			route: uni.$api.routesConfig.login,
		});
	}
});

onShow(() => {
	console.log('App Show');
	uni.hideTabBar();
});
onHide(() => {
	console.log('App Hide');
});
onError((err) => {
	//全局错误监听
	// #ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, () => {
		const res = uni.getSystemInfoSync();
		let errMsg = `手机品牌：${res.deviceBrand}；手机型号：${res.deviceModel}；操作系统版本：${res.osVersion}；客户端平台：${res.osName}；错误描述：${err}`;
		console.log('发生错误：' + errMsg);
	});
	// #endif
});

async function init() {
	//微信小程序升级
	// #ifdef MP-WEIXIN
	if (uni.canIUse('getUpdateManager')) {
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
			if (res.hasUpdate) {
				updateManager.onUpdateReady(function (res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate();
							}
						},
					});
				});
				updateManager.onUpdateFailed(function (res) {
					wx.showModal({
						title: '发现新版本',
						content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开',
					});
				});
			}
		});
	} else {
		uni.showModal({
			title: '提示',
			content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。',
			showCancel: false,
		});
	}
	// #endif

	// #ifdef APP-PLUS
	// 锁定方向
	plus.screen.lockOrientation('portrait-primary');
	// 监听推送点击事件
	plus.push.addEventListener(
		'click',
		(msg) => {
			uni.$api.shop.navTo(JSON.parse(msg.content), 'click');
		},
		false
	);
	// 监听在线消息事件
	plus.push.addEventListener(
		'receive',
		(msg) => {
			uni.$api.shop.navTo(JSON.parse(msg.content), 'receive');
		},
		false
	);
	// #endif

	// 配置初始化
	await getSettingList();

	//完成基础加载
	await uni.$isResolve();
}

// 获取全局配置
async function getSettingList() {
	let field = Object.keys(uni.$api.shopSetting).join(',');
	await uni.$api.http
		.get(uni.$api.apiCommon.configIndex, {
			params: {
				field: field,
			},
		})
		.then(async (res) => {
			initSetting(res.data);
		});
}

// 初始化全局配置
function initSetting(data: any) {
	let filed = Object.keys(uni.$api.shopSetting);
	for (let i = 0; i < filed.length; i++) {
		if (data[filed[i]]) {
			uni.$api.shopSetting[filed[i]] = data[filed[i]];
		}
	}
	userStore.setShopSetting(uni.$api.shopSetting);
	// 如果客户皮肤自定义
	if (data.style_user_is_open && parseInt(data.style_user_is_open) === 1) {
		let ct = customerTheme || data.style_type;
		if (ct && themeConfig[ct]) {
			uni.$api.theme = { ...uni.$api.theme, ...themeConfig[ct].colors };
			userStore.setTheme(themeConfig[ct].colors);
		} else {
			if (themeConfig[data.style_type]) {
				uni.$api.theme = {
					...uni.$api.theme,
					...themeConfig[data.style_type].colors,
				};
			}

			userStore.setTheme(themeConfig[data.style_type].colors);
		}
		userStore.setCustomerTheme(ct);
	} else {
		if (themeConfig[data.style_type]) {
			uni.$api.theme = {
				...uni.$api.theme,
				...themeConfig[data.style_type].colors,
			};
		}
		const styleType = customerTheme || data.style_type;
		userStore.setTheme(themeConfig[data.style_type].colors);
		userStore.setCustomerTheme(data.style_type);
	}

	//如果客户Loading自定义
	if (data.style_loading_is_open && parseInt(data.style_loading_is_open) == 1) {
		userStore.setLoadingType(styleLoadingType);
	} else {
		userStore.setLoadingType(data.style_loading_type);
	}
}
</script>
<style lang="scss">
/* 图标 */
@import '@/core/iconfont.css';
@import '@/assets/style/main.scss';
</style>
