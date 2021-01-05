<template>
	<view class="content">
		<view class="order-status">
			订单状态：{{orderInfo.orderStatus}}
		</view>
		<view class="order-status">
			订单号：{{orderInfo.order_numbers}}
		</view>
		<view class="order-good-list">
			<view v-for="(item,index) in orderInfo.list" :key="index" class="order-good">
				<image :src="item.goods_href"></image>
				<view class="order-goodinfo">
					<view>
						<text>{{item.goods_name}}</text>
					</view>
					<view class="order-good-price">
						<text>¥{{item.goods_price}}</text>
						<text>x{{item.order_num}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="consignee-info">收货人信息</view>
		<view class="consignee">
			<view>{{orderInfo.receive_name}}</view>
			<view>{{orderInfo.receive_phone}}</view>
			<view>{{orderInfo.receive_area}}</view>
		</view>
		<view  class="consignee-info">物流信息</view>
		<!-- 2 物流配送 -->
		<view v-if="orderInfo.logistic_type == 2" class="logistics-info">
			<view>{{orderInfo.logis_content}}</view>
			<view>{{orderInfo.logis_ctime}}</view>
		</view>
		<view v-if="orderInfo.logistic_type != 2" class="logistics-info">
			<view>请到门店提取您购买的物品。</view>
			
		</view>
		
		<view class="consignee-info">支付信息</view>
		<view class="pay-info">
			<view class="pay-info-detail">
				<text>支付方式</text>
				<text>{{orderInfo.pay_type}}</text>
			</view>
			<view class="pay-info-detail">
				<text>订单金额</text>
				<text>¥{{orderInfo.order_money}}</text>
			</view>
			<view class="pay-info-detail">
				<text>运费</text>
				<text>¥{{orderInfo.logistic_money}}</text>
			</view>
			<view class="pay-info-detail">
				<text>优惠金额</text>
				<text>¥{{orderInfo.deduction_price}}</text>
			</view>
			<view class="pay-info-detail">
				<text>实际支付</text>
				<text class="red-font">¥{{orderInfo.pay_money}}</text>
			</view>
			<view class="pay-info-detail">
				<text>备注</text>
				<text>{{orderInfo.note}}</text>
			</view>
		</view>
		<view class="consignee-info">订单信息</view>
		<view class="pay-info">
			<view class="pay-info-detail">
				<text>订单编号</text>
				<text>{{orderInfo.order_numbers}}</text>
			</view>
			<view class="pay-info-detail">
				<text>下单时间</text>
				<text>{{orderInfo.ctime}}</text>
			</view>
		</view>
		<view 
		v-if="orderInfo.status == 1 || orderInfo.status == 2 || orderInfo.status == 0 || orderInfo.status == 4" 
		@click="confirmGoods(orderInfo.order_numbers)"
		class="play-btn">确认收货</view>
	</view>
</template>

<script>
	import _login from '../../common/js/_login/__login.js';
	import _base from '../../common/js/_base/_base.js';
	import _api from '../../common/js/_base/_api.js';
	export default {
		data() {
			return {
				orderInfo:[]
			}
		},
		async onLoad(option) {
			if(option.orderNums == undefined){
				uni.showToast({
					title:'无法显示该笔订单信息',
					icon:'none'
				})
			}
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token};
			let _data = {
				orderNums:option.orderNums
			}
			let response = await _base._request_wxapi(_api.host_api+_api.orderInfo_api_url,_data,this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.orderInfo = response.data
		},
		methods: {
			confirmGoods: async function(orderNums)
			{
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token};
				let _data = {
					orderNums:orderNums
				}
				let response = await _base._request_wxapi(_api.host_api+_api.confirmGoods_api_url,_data,this.$data.header)
				response = response.data
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
				if(response.code === 2000){
					this.$data.orderInfo.status = 3;
				}
			}
		}
	}
</script>

<style>
	@import "../../common/css/usercenter.css";
	page{
		background: #f5f5f5;
	}
</style>
