//用户订单API接口
export default {
	// 列表
	orderIndex: '/dealer/order/index',
	// 详细
	orderView: '/dealer/order/view',
	// 取消
	orderClose: '/dealer/order/close',
	// 删除
	orderDelete: '/dealer/order/delete',
	// 确认收货
	orderTakeDelivery: '/dealer/order/take-delivery',

	/* 订单退款退货 */
	// 列表
	orderProductIndex: '/dealer/order-product/index',
	// 退款申请
	orderProductRefundApply: '/dealer/order-product/refund-apply',
	// 退货提交
	orderProductRefundSalesReturn: '/dealer/order-product/refund-sales-return',
	// 换货确认收货
	orderProductRefundSalesDelivery: '/dealer/order-product/refund-sales-delivery',
	// 关闭申请
	orderProductRefundClose: '/dealer/order-product/refund-close',

	/* 订单售后 */
	// 退款申请
	orderCustomerApply: '/dealer/order-customer/apply',
	// 退货提交
	orderCustomerSalesReturn: '/dealer/order-customer/sales-return',
	// 换货确认收货
	orderCustomerSalesDelivery: '/dealer/order-customer/sales-delivery',
	// 关闭申请
	orderCustomerClose: '/dealer/order-customer/close',

	/* 订单物流 */
	orderProductExpressDetails: '/dealer/order-product-express/details',

	/* 订单发票*/
	// 添加
	orderInvoiceCreate: '/dealer/order-invoice/create',
};
