<template>
	<view>
		<dz-navbar title="业绩明细" :borderBottom="false"></dz-navbar>
		<dz-tabs
			:list="tabList"
			:current="current"
			:scrollable="false"
			lineHeight="4"
			:activeStyle="{
				color: theme.dzBaseColor,
				fontSize: '30rpx',
				fontWeight: '700',
			}"
			:lineColor="theme.dzBaseColor"
			@change="tabChange"
			style="position: fixed; width: 100%; z-index: 2"
		></dz-tabs>
		<view class="order-box">
			<view class="order-item" v-for="(item, index) in list" :key="index">
				<view class="num">
					<view>
						<text class="title">类型:</text>
						推广收益
					</view>
					<text :class="[colorFilters(parseInt(item.state))]">{{ filterStateText(parseInt(item.state)) }}</text>
				</view>
				<dz-line></dz-line>
				<view class="cell dz-m-t-4">
					<text>购买用户ID:</text>
					{{ item.member.id }}
				</view>
				<view class="cell">
					<text>购买用户昵称:</text>
					{{ item.member.nickname }}
				</view>
				<view class="cell">
					<text>销售商品:</text>
					{{ item.remark }}
				</view>
				<view class="cell">
					<text>销售数量:</text>
					{{ item.num }}
				</view>
				<view class="cell">
					<text>订单号:</text>
					{{ item.map_sn }}
				</view>
				<view class="cell dz-m-b-10">
					<text>销售时间:</text>
					{{ api.timeFormat(item.created_time) }}
				</view>
				<dz-line></dz-line>
				<view class="price dz-m-t-10">
					收益金额：
					<text :style="{ color: theme.dzBaseColor }">{{ item.commission_money }}</text>
				</view>
			</view>
		</view>
		<dz-empty v-if="loadingStatus == 'noData'" text="暂无业绩明细" margin-top="80" :src="emptyData" iconSize="360"></dz-empty>
		<view class="dz-ios-p-safe-bottom">
			<dz-loadmore v-if="loadingStatus == 'loading'" :status="loadingStatus" :margin-top="20" :margin-buttom="20"></dz-loadmore>
		</view>
		<dz-page-loading :show="loadingShow" :status="pageLoadingStatus" @click="loadingClick"></dz-page-loading>
	</view>
</template>

<script lang="ts" setup>
import { reactive, computed, toRefs } from 'vue';
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
import { useUserStore } from '@/state/modules/user';

const userStore = useUserStore();
const emptyData = uni.$api.assetsConfig.emptyData;
const tabList = [
	{
		value: '',
		name: '全部',
	},
	{
		value: '1',
		name: '已结算',
	},
	{
		value: '0',
		name: '待结算',
	},
	{
		value: '-1',
		name: '已退款',
	},
];
const data = reactive({
	current: 0,
	page: 1,
	state: '',
	loadingStatus: 'loading',
	list: [],
	loadingShow: true,
	pageLoadingStatus: 'loading',
});

const theme = computed(() => {
	return userStore.getTheme;
});

onLoad(async (options) => {
	await uni.$onLaunched;
	uni.setNavigationBarTitle({
		title: '业绩明细',
	});
	if (options.type) {
		data.current = options.type;
	}
	getList();
});

onPullDownRefresh(() => {
	data.page = 1;
	data.list = [];
	data.loadingShow = true;
	getList();
});

onReachBottom(() => {
	if (data.loadingStatus == 'nomore') return;
	data.page++;
	getList();
});

function filterStateText(val: number) {
	switch (parseInt(val)) {
		case 1:
			return '已完成';
		case 0:
			return '待结算';
		case -1:
			return '已关闭';
	}
}

function colorFilters(val: number) {
	switch (parseInt(val)) {
		case 1:
			return 'color1';
		case 0:
			return 'color2';
		case -1:
			return 'color3';
	}
}

function loadingClick() {
	getList();
}

async function getList() {
	data.loadingStatus = 'loading';
	await uni.$api.http
		.get(uni.$api.apiShop.promoterRecordIndex, {
			params: {
				page: data.page,
				page_size: uni.$api.appConfig.pageSize,
				state: data.state,
			},
		})
		.then((res) => {
			data.loadingStatus = res.data.length == uni.$api.appConfig.pageSize ? 'loadmore' : 'nomore';
			data.loadingShow = false;
			data.list = [...data.list, ...res.data];
			if (data.page == 1 && res.data.length == 0) {
				data.loadingStatus = 'noData';
			}
		});
	uni.stopPullDownRefresh();
}

function tabChange({ index }: any) {
	data.current = index;
	data.state = tabList[index].value;
	data.page = 1;
	data.list = [];
	getList();
}

const { list, current, loadingStatus, loadingShow, pageLoadingStatus } = { ...toRefs(data) };
</script>

<style lang="scss" scoped>
.color1 {
	color: #41cc8b;
}

.color2 {
	color: rgb(255, 196, 63);
}

.color3 {
	color: #fd5548;
}

.order-box {
	margin-top: 108rpx;
	padding: 0 20rpx 1rpx;

	.order-item {
		padding: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;

		.num {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;

			.title {
				color: #999;
				margin-right: 6rpx;
			}
		}

		.price {
			text-align: right;

			text {
				color: red;
			}
		}

		.cell {
			line-height: 46rpx;

			text {
				color: #999;
				margin-right: 6rpx;
			}
		}
	}
}
</style>
