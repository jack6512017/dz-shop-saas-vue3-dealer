import { App } from 'vue';
// import { request } from '@/utils/http';

//全局请求
import $mHttp from './utils/http';
import appConfig from './config/appConfig';
import helper from '@/utils/helper';
import router from '@/core/utils/router';
import dataConfig from './config/dataConfig';
import apiUserAccount from '@/api/userAccount';
import apiDealer from '@/api/dealer';
import apiBase from '@/api/base';
import apiHome from '@/api/home';
import apiShop from '@/api/shop';
import apiCommon from '@/api/common';
import apiPay from '@/api/pay';
import apiChannel from '@/api/channel';
import shopSetting from './config/shopSetting';
import language from './config/language';
import routesConfig from './config/routesConfig';
import assetsConfig from './config/assetsConfig';
import tabbarConfig from './config/tabbarConfig';
import throttle from './utils/throttle';
import components from './utils/components';
import appUpdate from '@/core/utils/appUpdate';
import theme from './config/theme';
import zIndex from './config/zIndex';
import test from './utils/test';

// #ifdef H5
import jweixin from 'weixin-js-sdk';
// #endif
import shop from '@/core/utils/shop';

const $api = {
	appConfig,
	http: $mHttp,
	...helper,
	router,
	dataConfig,
	apiUserAccount,
	apiDealer: apiDealer.api,
	apiShop: apiShop.api,
	apiCommon,
	apiChannel,
	apiBase,
	apiHome,
	apiPay,
	systemInfo: uni.getSystemInfoSync(),
	shopSetting,
	language,
	routesConfig,
	assetsConfig,
	tabbarConfig,
	appUpdate,
	theme,
	...components,
	throttle,
	zIndex,
	//  #ifdef H5
	jweixin,
	//  #endif
	shop,
	test,
};

uni.$api = $api;
uni.$onLaunched = new Promise((resolve) => {
	uni.$isResolve = resolve;
});
export default {
	install: (app: App) => {
		app.config.globalProperties.api = $api;
		app.config.globalProperties.api = $api;
	},
};
