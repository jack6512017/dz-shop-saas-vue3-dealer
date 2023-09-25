<template>
	<view>
		<dz-navbar title="推广用户" :borderBottom="false"></dz-navbar>
		<view class="search-box">
			<dz-search
				v-model="nickname"
				placeholder="输入昵称查询"
				@input="changeInput"
				@custom="search"
				@focus="inputFocus"
				@search="search"
				:show-action="true"
			></dz-search>
		</view>
		<view class="card-box">
			<view class="card-item" v-for="(item, index) in list" :key="index">
				<view class="img"><dz-image width="120rpx" height="120rpx" border-radius="60rpx" :src="item.head_portrait || missingFace"></dz-image></view>
				<view class="right">
					<view class="cell">
						<text>ID:</text>
						{{ item.id }}
					</view>
					<view class="name">
						昵称:
						<text>{{ item.nickname || item.realname }}</text>
					</view>
					<view class="cell">
						<text>电话:</text>
						{{ item.mobile || '无' }}
					</view>
					<view v-if="item.level_name && item.promoter_state == 1" class="cell">
						<text>经销商等级:</text>
						{{ item.level_name }}
					</view>
					<view class="cell">
						<text>注册时间:</text>
						{{ api.timeFormat(item.created_time, 'yyyy-mm-dd') }}
					</view>
				</view>
			</view>
		</view>
		<dz-empty v-if="loadingStatus == 'noData'" :margin-top="180" text="暂无推广用户" :src="emptyUser" iconSize="360"></dz-empty>
		<view class="dz-ios-p-safe-bottom">
			<dz-loadmore v-if="loadingStatus == 'loading'" :status="loadingStatus" :margin-top="128" :margin-bottom="20"></dz-loadmore>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';

const language = uni.$api.language;
const page = ref<number>(1);
const list = ref<any>([]);
const missingFace = uni.$api.assetsConfig.missingFace;
const emptyUser = uni.$api.assetsConfig.emptyUser;
const loadingStatus = ref<string>('loading');
const nickname = ref<string>('');
const isKeyword = ref<boolean>(false);
const isLoading = ref<boolean>(false);

onLoad(async () => {
	await uni.$onLaunched;
	uni.setNavigationBarTitle({
		title: '推广用户',
	});
	getList();
});

onPullDownRefresh(() => {
	page.value = 1;
	list.value = [];
	getList();
});

onReachBottom(() => {
	if (loadingStatus.value == 'nomore') return;
	page.value++;
	getList();
});

function getList() {
	loadingStatus.value = 'loading';
	let query = {
		page: page.value,
		page_size: uni.$api.appConfig.pageSize,
	};
	let params = {};
	if (nickname.value) {
		params.nickname = nickname.value;
	}
	isLoading.value = true;
	uni.$api.http
		.post(uni.$api.apiDealer.promotionIndex + `?page=${query.page}&page_size=${query.page_size}`, {
			...params,
		})
		.then((res) => {
			loadingStatus.value = res.data.length == uni.$api.appConfig.pageSize ? 'loadmore' : 'nomore';
			list.value = [...list.value, ...res.data];
			if (page.value == 1 && res.data.length == 0) {
				loadingStatus.value = 'noData';
			}
		})
		.catch(() => {
			loadingStatus.value = 'loadmore';
		})
		.finally(() => {
			isLoading.value = false;
		});
	uni.stopPullDownRefresh();
}

// 控制清除搜索
function inputFocus() {
	isKeyword.value = true;
}

// 清除搜索
function changeInput() {
	if (!nickname.value && isKeyword.value) {
		search();
	}
}

// 确定搜索
function search() {
	list.value = [];
	getList();
}
</script>

<style lang="scss" scoped>
.search-box {
	width: 100%;
	position: fixed;
	z-index: 2;
	padding: 20rpx 15rpx 20rpx 20rpx;
	background: #fff;
}

.card-box {
	padding: 124rpx 20rpx 20rpx;
	.card-item {
		display: flex;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background: #fff;
		color: #333;
		.img {
			flex-shrink: 0;
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			margin-right: 20rpx;
		}
		.name {
			color: #999;
			text {
				margin-left: 6rpx;
				font-size: 32rpx;
				color: #333;
			}
		}
		.cell {
			line-height: 46rpx;
			text {
				margin-right: 6rpx;
				color: #999;
			}
		}
		.time {
			color: #999;
		}
	}
	.card-item:last-child {
		margin-bottom: 0;
	}
}
</style>
