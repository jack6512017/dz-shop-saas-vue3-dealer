<template>
	<view>
		<block v-if="isWechatMpScene">
			<dz-mask :show="true" :zIndex="9998" @click="handleHide"></dz-mask>
			<view class="mp-scene">
				<view class="mp-weixin dz-flex dz-row-center"><dz-icon name="round_link_fill" color="#7A80FC" :size="70"></dz-icon></view>
				<view class="mp-tip dz-text--center">点击右下角</view>
				<img :src="guide" />
			</view>
		</block>
		<dz-product-detail
			:productData="data.productDetail"
			:customerService="customerService"
			:sessionFrom="sessionFrom"
			:serviceType="serviceType"
			:shareData="data.shareData"
			:scrollTop="scrollTop"
			:wxCustomerServicePath="wxCustomerServicePath"
		></dz-product-detail>
		<!-- 返回顶部 -->
		<dz-back-top
			:scrollTop="scrollTop"
			:customStyle="{
				background: '#fff',
				boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
			}"
			:icon-style="{ fontSize: '36rpx' }"
		></dz-back-top>
		<!-- 页面加载 -->
		<dz-page-loading
			:show="pageLoadingShow"
			:showBack="true"
			:status="pageLoadingStatus"
			:errorText="errorText"
			@click="pageLoadingClick"
			@back="pageBackClick"
		></dz-page-loading>
	</view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';

const userStore = useUserStore();
const productId = ref<string>();
const data = reactive({
	productDetail: {},
	shareData: {},
	mpShare: {
		title: '', // 默认为小程序名称
		path: '', // 默认为当前页面路径
		imageUrl: '', // 默认为当前页面的截图
	},
});
const scrollTop = ref<number>(0);
const customerService = ref<boolean>(false);
const sessionFrom = ref<string>('');
const wxCustomerServicePath = ref<string>('');
const pageLoadingShow = ref<boolean>(false);
const pageLoadingStatus = ref<string>('loading');
const errorText = ref<string>('您浏览的商品不存在~');
const isWechatMpScene = ref<boolean>(false);
const guide = uni.$api.assetsConfig.guide;

const wechatMpScene = computed(() => {
	return userStore.getWechatMpScene;
});
const shopSetting = computed(() => {
	return userStore.getShopSetting;
});
const userInfo = computed(() => {
	return userStore.getUserInfo;
});

const merchantCode = computed(() => userStore.getMerchantCode);

const serviceType = ref<string>(shopSetting.value.app_service_type);

onLoad(async (options) => {
	await uni.$onLaunched;
	if (wechatMpScene.value != '' && wechatMpScene.value == 1154) {
		isWechatMpScene.value = true;
	}
	productId.value = options.id;
	pageLoadingStatus.value = 'loading';
	pageLoadingShow.value = true;
	serviceType.value = shopSetting.value.app_service_type;
	getProductDetail();

	//经销商
	if (options.dealer_code) {
		userStore.setDealerCode(options.dealer_code);
	}
});

onPageScroll((e) => {
	scrollTop.value = e.scrollTop;
});

function pageLoadingClick() {
	pageLoadingStatus.value = 'loading';
	getProductDetail();
}

function handleHide() {
	isWechatMpScene.value = false;
}

async function getProductDetail() {
	await uni.$api.http
		.get(uni.$api.apiShop.productView, {
			params: {
				id: productId.value,
			},
		})
		.then((res) => {
			data.productDetail = res.data;
			uni.setNavigationBarTitle({ title: res.data.name });
			pageLoadingShow.value = false;
			//初始化小程序分享
			data.mpShare.title = shopSetting.value.product_share_title;
			data.mpShare.path = sharePath();
			data.mpShare.imageUrl = data.productDetail.covers[0];
			//初始化APP分享
			data.shareData = {
				shareUrl: sharePath(),
				shareTitle: shopSetting.value.product_share_title,
				shareContent: data.productDetail.name,
				shareImg: data.productDetail.covers[0],
			};
		})
		.catch((err) => {
			pageLoadingShow.value = true;
			pageLoadingStatus.value = err == '找不到该产品' ? 'invalid' : 'error';
		});
}

//分享路径
function sharePath() {
	let domain = uni.$api.appConfig.userH5Domain;
	let url = '';
	if (domain.endsWith('/')) {
		domain = domain.substr(0, domain.length - 1);
	}
	// #ifdef MP
	url = `${uni.$api.routesConfig.product.path}?id=${productId.value}`;
	// #endif
	// #ifndef MP
	url = `${domain}${uni.$api.routesConfig.product.path}?id=${productId.value}`;
	if (merchantCode.value) {
		url = `${url}&merchant_code=${merchantCode.value}`;
	}
	// #endif
	if (userStore.hasLogin) {
		url = url + '&dealer_code=' + userInfo.value.dealer_code;
	}
	return url;
}

function pageBackClick() {
	let pages = getCurrentPages();
	if (pages.length == 1) {
		let indexPath = uni.$api.appConfig.indexPath;
		uni.reLaunch({
			url: indexPath,
		});
	} else {
		uni.navigateBack();
	}
}
</script>
