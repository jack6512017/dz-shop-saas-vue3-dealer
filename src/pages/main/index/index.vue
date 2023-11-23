<template>
	<view class="home">
		<dz-navbar :is-back="false" title="经销商中心" :background="{ background: '#F3F3F3' }" :borderBottom="false">
			<template #right>
				<view class="dz-m-r-24">
					<dz-icon name="message" :size="38" @tap="handelPageTab('notifyIndex')"></dz-icon>
					<dz-badge :count="notifyCount" :offset="[10, 10]"></dz-badge>
				</view>
			</template>
		</dz-navbar>
		<view class="home-head">
			<view class="home-head-left">
				<dz-image :src="userInfo.head_portrait || missingFace" :width="120" :height="120" :borderRadius="60"></dz-image>
			</view>
			<view class="home-head-right">
				<view class="home-head-top">
					<view class="home-head-name">{{ userInfo.nickname }}</view>
					<view v-if="userInfo.dealerLevel" class="home-head-level">{{ userInfo.dealerLevel.name }}</view>
				</view>
				<view class="dz-m-t-10 dz-font-24 dz-content-color">{{ userInfo.next_level_order_amount }}</view>
			</view>
		</view>
		<view class="dz-relative" @tap="handelMore">
			<dz-notice-bar
				:list="notifyAnnounce"
				mode="vertical"
				bg-color="#FFFCF7"
				duration="5000"
				:volumeIcon="1"
				:moreIcon="true"
				title="公告"
				:title-style="{
					fontSize: 16,
					isBold: 1,
					color: 'rgb(113, 48, 9)',
				}"
				:borderRadius="20"
				:margin-left-right="0"
				:margin-top="20"
				:margin-bottom="20"
				rightIconColor="rgb(113, 48, 9)"
			></dz-notice-bar>
		</view>
		<view class="home-card-item">
			<dz-cell-item
				title="我的订单"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				hover-class="none"
				value="全部"
				@click="handelOrderPageTab(1)"
			></dz-cell-item>
			<dz-grid :border="false" col="4" :customStyle="{ overflow: 'visible' }">
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelOrderPageTab(2)">
					<dz-icon name="pay" size="55"></dz-icon>
					<dz-badge v-if="hasLogin" :offset="[-15, 35]" :count="userInfo.order_synthesize_num[0]" style="padding: 8rpx 12rpx"></dz-badge>
					<view class="dz-m-t-6 dz-font-24 dz-tips-color">待付款</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelOrderPageTab(3)">
					<dz-icon name="send" size="55"></dz-icon>
					<dz-badge v-if="hasLogin" :offset="[-15, 35]" :count="userInfo.order_synthesize_num[1]" style="padding: 8rpx 12rpx"></dz-badge>
					<view class="dz-m-t-6 dz-font-24 dz-tips-color">待发货</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelOrderPageTab(4)">
					<dz-icon name="deliver" size="55"></dz-icon>
					<dz-badge v-if="hasLogin" :offset="[-15, 35]" :count="userInfo.order_synthesize_num[2]" style="padding: 8rpx 12rpx"></dz-badge>
					<view class="dz-m-t-6 dz-font-24 dz-tips-color">待收货</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelPageTab('refundList')">
					<dz-icon name="refund" size="55"></dz-icon>
					<dz-badge v-if="hasLogin" :offset="[-15, 35]" :count="userInfo.order_synthesize_num[-1]" style="padding: 8rpx 12rpx"></dz-badge>
					<view class="dz-m-t-6 dz-font-24 dz-tips-color">退款/售后</view>
				</dz-grid-item>
			</dz-grid>
		</view>

		<view class="home-card-item">
			<dz-cell-item
				title="推广服务费"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				hover-class="none"
				value="更多明细"
				@click="handelPageTab('brokerage')"
			></dz-cell-item>
			<dz-grid :border="false" col="2">
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('brokerageLog')">
					<view
						><text class="dz-font-22">￥</text><text class="dz-font-32 dz-font-weight">{{ userInfo.accumulate_brokerage }}</text></view
					>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">累计推广收益</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('brokerageIndex')">
					<view
						><text class="dz-font-22">￥</text><text class="dz-font-32 dz-font-weight">{{ userInfo.amount_drawn_brokerage }}</text></view
					>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">累计提现</view>
				</dz-grid-item>
			</dz-grid>
		</view>
		<view class="home-card-item">
			<dz-cell-item
				title="我的业绩"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				hover-class="none"
				value="更多明细"
				@click="handelPageTab('promoterRecord')"
			></dz-cell-item>

			<dz-grid :border="false" col="2">
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('promoterRecord', 1)">
					<view
						><text class="dz-font-22">￥</text><text class="dz-font-32 dz-font-weight">{{ userInfo.settle_order_money }}</text></view
					>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">已结算业绩</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('promoterRecord', 2)">
					<view
						><text class="dz-font-22">￥</text><text class="dz-font-32 dz-font-weight">{{ userInfo.unsettle_order_money }}</text></view
					>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">待结算业绩</view>
				</dz-grid-item>
			</dz-grid>
		</view>
		<view class="home-card-item">
			<dz-cell-item
				title="我的推广"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				hover-class="none"
				value="更多"
				@click="handelPageTab('promotion')"
			></dz-cell-item>
			<dz-grid :border="false" col="2">
				<dz-grid-item customStyle="padding-bottom: 15px">
					<view class="dz-font-32 dz-font-weight">{{ userInfo.child_count }}</view>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">推广用户</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px">
					<view class="dz-font-32 dz-font-weight">{{ userInfo.child_count_today }}</view>
					<view class="dz-m-t-6 dz-tips-color dz-font-24">今日推广</view>
				</dz-grid-item>
			</dz-grid>
		</view>
		<view class="home-card-item">
			<dz-cell-item
				title="用户日增长"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				:arrow="false"
				hover-class="none"
			></dz-cell-item>
			<dz-line-echart class="line-chart" ref="lineChart"></dz-line-echart>
		</view>
		<view class="home-card-item">
			<dz-cell-item
				title="常用功能"
				:border-bottom="false"
				:title-style="{
					'font-size': '30rpx',
					color: theme.dzMainColor,
					'font-weight': '700',
				}"
				:arrow="false"
				hover-class="none"
			></dz-cell-item>
			<dz-grid :border="false" col="4">
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelPageTab('address')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="location" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">地址</text>
					</view>
				</dz-grid-item>
				<dz-grid-item v-if="parseInt(shopSetting.dealer_brokerage_withdraw_enabled) === 1" customStyle="padding-bottom: 15px" @click="withdrawClick()">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="sponsor" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">提现</text>
					</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelPageTab('promotion')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="iconfonttuijianren" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">推广用户</text>
					</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelPageTab('qrcode')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="qrcode" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">推广二维码</text>
					</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('brokerageLog')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="time" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">服务费明细</text>
					</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @tap="handelPageTab('brokerageIndex')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="tixianjilu" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">提现明细</text>
					</view>
				</dz-grid-item>
				<dz-grid-item customStyle="padding-bottom: 15px" @click="handelPageTab('set')">
					<view class="grid-item">
						<view class="icon-bg">
							<view><dz-icon name="settings" size="50"></dz-icon></view>
						</view>
						<text class="grid-item-text">设置</text>
					</view>
				</dz-grid-item>
			</dz-grid>
		</view>
		<view>
			<!--ICP备案-->
			<!--#ifdef H5-->
			<view class="home-copyright" v-if="parseInt(shopSetting.copyright_show) == 1 && showPageCopyright">
				<dz-icon
					v-if="shopSetting.copyright_logo"
					:name="shopSetting.copyright_logo"
					width="28"
					height="28"
					:custom-style="{ marginRight: '6rpx' }"
				></dz-icon>
				{{ shopSetting.copyright_desc || shopSetting.copyright_companyname }}
				<dz-link
					customStyle="margin-left: 10rpx;"
					:fontSize="26"
					:href="shopSetting.copyright_url || 'https://beian.miit.gov.cn/'"
					:text="shopSetting.copyright_icp"
				></dz-link>
			</view>
			<!-- #endif -->
			<view style="height: 20rpx"></view>
		</view>
		<dz-page-loading :show="pageLoadingShow" :status="pageLoadingStatus" zIndex="981" @click="pageLoadingClick" />
		<!-- tabbar -->
		<dz-tabbar
			v-if="tabbarList.props && tabbarList.props.dataSource != 'default'"
			value="/pages/main/index/index"
			:list="tabbarList.props.list.slice(0, tabbarList.props.num)"
			:bgColor="tabbarList.props.bgColor"
			:inactiveColor="tabbarList.props.inactiveColor"
			:activeColor="tabbarList.props.activeColor || theme.dzBaseColor"
		>
		</dz-tabbar>
		<dz-tabbar v-else value="/pages/main/index/index" :list="defaultTabbarList" :activeColor="theme.dzBaseColor"></dz-tabbar>
		<!-- 云账户签约 -->
		<dz-popup v-model:show="yunzhanghuShow" mode="center" width="90%" :closeable="true" closeIcon="close" border-radius="20">
			<view class="dz-text-center dz-font-32 dz-font-weight dz-p-t-30 dz-m-b-20">用户签约</view>
			<view class="dealer-type">
				<view class="card dz-m-r-30" @tap="handleSign(1)"> 中国人 </view>
				<view class="card" @tap="handleSign(2)">
					外籍人
					<text v-if="yunzhanghu_dealer_exempted" class="dz-font-24" :style="{ color: stateColorFilters(yunzhanghu_dealer_exempted.state) }"
						>({{ stateFilters(yunzhanghu_dealer_exempted.state) }})</text
					>
				</view>
			</view>
		</dz-popup>
		<!-- 新国都签约 -->
		<dz-modal
			v-model:show="yunhuotecShow"
			content="系统检查到您未签约，请签约后在重试"
			:show-cancel-button="true"
			@confirm="yunhuotecConfirm"
			:confirm-color="theme.dzBaseColor"
		></dz-modal>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from 'vue';
import { onLoad, onShow, onShareAppMessage, onShareTimeline, onPullDownRefresh, onUnload } from '@dcloudio/uni-app';
import { useGroup } from '@/hooks/group';
import tabbarConfig from '@/core/config/tabbarConfig';
import { useUserStore } from '@/state/modules/user';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const userStore = useUserStore();
const groupData = useGroup();
const defaultTabbarList = tabbarConfig.tabbarList;
const tabbarList = computed(() => userStore.getTabbarList);
const shopSetting = computed(() => userStore.getShopSetting);
const userInfo = computed(() => userStore.getUserInfo);
const theme = computed(() => userStore.getTheme);
const isGuide = computed(() => userStore.getIsGuide);
const hasLogin = computed(() => userStore.hasLogin);
const missingFace = uni.$api.assetsConfig.missingFace;
const lineChart = ref(null);

const data = reactive({
	loading: false,
	notifyCount: 0,
	notifyAnnounce: [],
	pageLoadingShow: false,
	pageLoadingStatus: 'loading',
	isLoadingProduct: false,
	loadingStatus: 'loading',
	customerService: false,
	sessionFrom: '',
	serviceType: shopSetting.value.app_service_type,
	isLoading: false,
	activeCurrent: 0,
	popAdvShow: false,
	guideShow: false,
	guidePaddingTop: '',
	updating: false,
	showPageCopyright: false,
	wechatAuth: false,
	withdrawConfig: null,
	yunzhanghu_dealer_exempted: null,
	yunzhanghu_dealer: null,
	yunzhanghuShow: false,
	yunhuotec_dealer: null,
	yunhuotecShow: false,
	isUpdate: false,
	mpShare: {
		title: '', // 默认为小程序名称
		path: '', // 默认为当前页面路径
		imageUrl: '', // 默认为当前页面的截图
	},
});

const isYunhuotec = computed(() => {
	return data.yunhuotec_dealer ? true : false;
});

const merchantCode = computed(() => userStore.getMerchantCode);

onLoad(async (options) => {
	await uni.$onLaunched;
	uni.setNavigationBarTitle({ title: shopSetting.value.store_name });

	if (!userStore.hasLogin) return;
	// 刷新Token
	let accessToken = userStore.getAccessToken;
	const index = accessToken.lastIndexOf('\_');
	accessToken = accessToken.substring(index + 1, accessToken.length);
	const effectiveTime = parseInt(accessToken) + userStore.getExpirationTime;
	const getTime = parseInt(new Date().getTime() / 1000);
	if (accessToken && effectiveTime - getTime < 86400) {
		await handleVerifyAccessToken();
	}

	//经销商
	if (options.dealer_code) {
		userStore.setDealerCode(options.dealer_code);
	}

	//分享
	updateShare();

	// #ifdef APP-PLUS
	setTimeout(
		() => {
			init();
		},
		isGuide.value ? 1000 : 0
	);
	// #endif
	// #ifndef APP-PLUS
	await init();
	// #endif
	data.isUpdate = true;
	uni.$on('updateHome', () => {
		if (!data.pageLoadingShow) {
			init();
		}
	});
	uni.$on('yunzhanghuMemberChange', () => {
		getWithdrawConfig();
	});
});

onShow(() => {
	// #ifdef APP-PLUS
	checkUpdate();
	// #endif
	if ((data.pageLoadingStatus == 'error' || data.pageLoadingStatus == 'loading') && data.pageLoadingShow) {
		init();
	}
});

onPullDownRefresh(() => {
	data.loadingStatus = 'loading';
	init();
});

onShareAppMessage(() => {
	return data.mpShare;
});

// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return data.mpShare;
});
// #endif

onUnload(() => {
	uni.$off(['yunzhanghuMemberChange']);
});

watch(
	() => userStore.hasLogin,
	() => {
		updateShare();
	}
);

//更新分享
function updateShare() {
	//初始化小程序分享
	data.mpShare.title = shopSetting.value.product_share_title;
	data.mpShare.path = sharePath();
	data.mpShare.imageUrl = shopSetting.value.store_logo || uni.$api.assetsConfig.logo;
}

//刷新TOKEN
async function handleVerifyAccessToken() {
	const refresh_token = userStore.getRefreshToken;
	await uni.$api.http.post(uni.$api.apiUserAccount.refresh, { refresh_token, group: groupData.group }).then((res) => {
		userStore.setTokenInfo(res.data);
	});
}

function pageLoadingClick() {
	data.pageLoadingStatus = 'loading';
	init();
}

async function checkUpdate() {
	if (!uni.$api.appConfig.appCheckUpdate) {
		return;
	}
	if (data.updating) {
		return;
	}
	data.updating = true;
	let type = plus.os.name == 'iOS' ? 2 : 1;
	try {
		const wgtInfo = await uni.$api.getWgtInfoAsync();
		const res = await uni.$api.http.get(uni.$api.apiChannel.versionsIndex, {
			params: {
				type: type,
				version: wgtInfo.version,
			},
		});
		if (res.data) {
			//验证跳过版本
			let jumpVersion = uni.getStorageSync('jumpUpdateVersion') || '1.0.0';
			let isUpdate = uni.$api.compareVersion(res.data.version, jumpVersion);
			if (isUpdate) {
				let updateData = {
					content: res.data.content,
					version: res.data.version,
					is_enforce: parseInt(res.data.is_enforce),
					download_url: res.data.download_url,
					progress: true,
					mask_click: false,
					buttonNum: 0,
				};
				uni.$api.appUpdate(updateData);
			}
		}
	} catch (e) {
		data.updating = false;
	}
}

async function init() {
	if (isGuide.value) {
		// #ifdef APP-PLUS
		setTimeout(() => {
			console.log('关闭启动页');
			plus.navigator.closeSplashscreen();
		}, 1000);
		// #endif
	}
	try {
		if (data.loading) {
			return;
		}
		data.loading = true;
		await getHome();

		setTimeout(() => {
			data.showPageCopyright = true;
		}, 1500);
	} catch (e) {
		data.pageLoadingStatus = 'loading';
	} finally {
		data.loading = false;
		uni.stopPullDownRefresh();
	}
}

//加载折线图数据
function loadLineData(e: any) {
	//这里请求服务器拿到数据
	let res = {
		//x轴数据
		xData: e.xAxisData,
		//y轴数据
		yData: e.seriesData[0].data,
	};
	//这里option配置参考文档：https://echarts.apache.org/zh/option.html
	let option = {
		xAxis: {
			type: 'category',
			// x轴数据文字颜色
			axisLabel: {
				color: '#a7a7a7',
			},
			// x轴那天坐标轴线的颜色
			axisLine: {
				lineStyle: {
					color: '#f1f1f1',
				},
			},
			//x轴上面刻度线隐藏
			axisTick: {
				show: false,
			},
			//这里是x轴数据
			data: res.xData,
		},
		//设置网格
		grid: {
			top: 40,
			bottom: 30,
		},
		//y轴设置
		yAxis: {
			minInterval: 1,
			type: 'value',
			//y轴标签文字颜色
			axisLabel: {
				color: '#a7a7a7',
			},
			// y轴分割线设置为虚线
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
				},
			},
		},
		//设置提示为点击时
		tooltip: {
			trigger: 'axis',
			triggerOn: 'click',
			formatter: '{b} \n 数据: {c}',
		},
		//设置曲线的颜色
		color: ['#4e9d77'],
		series: [
			{
				//这里是数据
				data: res.yData,
				type: 'line',
				//设置为平滑，默认为折线
				smooth: true,
			},
		],
	};
	lineChart.value?.init(echarts, (chart) => {
		chart.setOption(option);
	});
}

async function getHome() {
	data.pageLoadingShow = true;
	await getDealerInfo();
	await getNotifyUnRead();
	await getNotifyAnnounceIndex();
	await uni.$api.http
		.post(uni.$api.apiHome.indexData, {
			type: 'this7Day',
		})
		.then((res) => {
			loadLineData(res.data);
			data.pageLoadingShow = false;
		})
		.catch(() => {
			data.pageLoadingStatus = 'error';
		});
}

async function getDealerInfo() {
	await uni.$api.http.get(uni.$api.apiDealer.dealerIndex).then((res) => {
		userStore.setUserInfo(res.data);
	});
}

async function getNotifyUnRead() {
	//通知消息
	await uni.$api.http.get(uni.$api.apiDealer.notifyUnReadCount).then((res) => {
		data.notifyCount = res.data.count;
	});
}

async function getNotifyAnnounceIndex() {
	data.notifyAnnounce = [];
	await uni.$api.http.get(uni.$api.apiBase.announceIndex).then((res) => {
		res.data.forEach((itme) => {
			data.notifyAnnounce.push(itme.title);
		});
		data.pageLoadingShow = false;
	});

	uni.stopPullDownRefresh();
}

function handelMore() {
	uni.$api.router.push({
		route: uni.$api.routesConfig.notice,
		query: {},
	});
}

function handelPageTab(name: string, type?: number) {
	const query = {};
	if (type) {
		query.type = type;
	}
	uni.$api.router.push({
		route: uni.$api.routesConfig[name],
		query,
	});
}

function handelOrderPageTab(val) {
	uni.$api.router.push({
		route: uni.$api.routesConfig.orderIndex,
		query: {
			status: val,
		},
	});
}

function toPage(url: string, type?: string) {
	const params = {};
	if (type) {
		params.type = type;
	}
	uni.$api.router.push({
		route: uni.$api.routesConfig[url],
		query: params,
	});
}

//提现申请
async function withdrawClick() {
	if (!data.withdrawConfig) {
		uni.showLoading({
			mask: true,
		});
		let loaded = await getWithdrawConfig();
		uni.hideLoading();
		// 加载配置失败
		if (!data.withdrawConfig) {
			uni.$api.toast('加载配置失败');
			return;
		}
	}
	if (parseInt(data.withdrawConfig.dealer_brokerage_withdraw_mode) === 0) {
		//普通提现账号
		toPage('brokerageCreate');
	} else if (parseInt(data.withdrawConfig.dealer_brokerage_withdraw_mode) === 1) {
		if (isYunzhanghu()) {
			toPage('brokerageCreate', 'yunzhanghu');
		} else {
			data.yunzhanghuShow = true;
		}
	} else if (parseInt(data.withdrawConfig.dealer_brokerage_withdraw_mode) === 2) {
		if (isYunhuotec.value) {
			toPage('brokerageCreate', 'yunhuotec');
		} else {
			data.yunhuotecShow = true;
		}
	}
}

//获取提现配置
async function getWithdrawConfig() {
	await uni.$api.http
		.get(uni.$api.apiDealer.brokerageWithdrawConfig)
		.then((res) => {
			data.withdrawConfig = res.data;
			data.yunzhanghu_dealer_exempted = res.data.yunzhanghu_dealer_exempted;
			data.yunzhanghu_dealer = res.data.yunzhanghu_dealer;
			data.yunhuotec_dealer = res.data.yunhuotec_dealer;
			return true;
		})
		.catch((err) => {
			return false;
		});
}

function isYunzhanghu(): boolean {
	let state = false;
	if (data.yunzhanghu_dealer && (data.yunzhanghu_dealer.is_sign == 1 || data.yunzhanghu_dealer.is_exempted == 1)) {
		state = true;
	}
	return state;
}

function handleSign(e: number) {
	if (e == 2) {
		toPage('yunzhanghuMemberExempted');
	} else {
		toPage('yunzhanghuMemberSign');
	}
	data.yunzhanghuShow = false;
}

function yunhuotecConfirm() {
	toPage('yunhuotecMemberSign');
	data.yunhuotecShow = false;
}

function sharePath() {
	let domain = uni.$api.appConfig.h5Domain;
	let url = '';
	const params = {};
	if (domain.endsWith('/')) {
		domain = domain.substr(0, domain.length - 1);
	}
	// #ifdef MP
	url = uni.$api.routesConfig.index.path;
	// #endif
	// #ifndef MP
	url = `${domain}${uni.$api.routesConfig.index.path}`;
	if (params.merchant_code) {
		params.merchant_code = merchantCode.value;
	}
	// #endif
	if (userStore.hasLogin) {
		params.dealer_code = userInfo.value.dealer_code;
	}
	url = uni.$api.objParseUrlAndParam(url, params);
	return url;
}

const { notifyCount, pageLoadingShow, pageLoadingStatus, notifyAnnounce, showPageCopyright, yunzhanghuShow, yunzhanghu_dealer_exempted, yunhuotecShow } = {
	...toRefs(data),
};
</script>

<style lang="scss">
page,
.home {
	min-height: 100vh;
}
.home {
	position: relative;
	padding: 20rpx;
	//备案
	&-head {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx 0rpx;
		&-right {
			margin-left: 20rpx;
		}
		&-name {
			font-size: 30rpx;
			font-weight: 700;
		}
		&-top {
			display: flex;
		}
		&-level {
			height: 36rpx;
			margin-left: 10rpx;
			padding: 0 6rpx;
			background-image: linear-gradient(4.71239rad, rgb(255, 225, 206), rgb(255, 240, 229));
			border-radius: 18rpx;
			font-size: 24rpx;
		}
	}

	&-card-item {
		position: relative;
		background-color: #ffffff;
		margin-top: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
		.grid-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.icon-bg {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 80rpx;
			height: 80rpx;
			border-radius: 40rpx;

			background: #f4f4f6;
		}

		.grid-item-text {
			margin-top: 10rpx;
			display: block;
			text-align: center;
			font-size: 24rpx;
			color: $dz-tips-color;
		}
	}

	&-copyright {
		display: flex;
		justify-content: center;
		vertical-align: middle;
		margin: 30rpx 0;
		width: 100%;
		font-size: 26rpx;
		color: #666;
	}
}

// 云账户
.dealer-type {
	display: flex;
	padding: 40rpx;
	.card {
		flex: 1;
		padding: 30rpx;
		border-radius: 15rpx;
		text-align: center;
		background: #f3f4f6;
	}
}
</style>
