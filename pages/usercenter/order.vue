<template>
	<view class="content">
		<view class="order-tab">
			<view :class="status== 'all' ? 'active' :''" @click="getOrderList('all')">
				<text>全部订单</text>
			</view>
			<view :class="status== '0' ? 'active' :''" @click="getOrderList('0')">
				<text>待付款</text>
			</view>
			<view :class="status== '4' ? 'active' :''" @click="getOrderList('4')">
				<text>待自提</text>
			</view>
			<view :class="status== '1' ? 'active' :''" @click="getOrderList('1')">
				<text>待发货</text>
			</view>
			<view :class="status== '2' ? 'active' :''" @click="getOrderList('2')">
				<text>待收货</text>
			</view>
		</view>
		
		<view v-for="(item,index) in list" :key="index" class="order-class" >
			<view class="order-num" @click="navigateToPage('/pages/usercenter/orderinfo?orderNums='+item.order_numbers)">
				<view class="order-num-content">
					<text>订单号：</text>
					<text>{{item.order_numbers}}</text>
				</view>
				<view>{{item.orderStatus}}</view>
			</view>
			<view @click="navigateToPage('/pages/usercenter/orderinfo?orderNums='+item.order_numbers)" v-for="(itemInfo,childindex) in item.itemInfo" :key="childindex" class="order-desc-class">
				<image :src="itemInfo.goods_href"></image>
				<view class="order-desc-content">
					<view>{{itemInfo.goods_name}}</view>
					<view>{{itemInfo.goods_detail}}</view>
					<view>
						<text>数量：x{{itemInfo.order_num}}</text>
						<text>价格：{{item.type == 2 ? '积分' :'¥'}}{{itemInfo.goods_price}}</text>
					</view>
				</view>
			</view>
			<view class="heji-money">
				<!-- 合计 等于 商品金额 -抵扣金额 + 物流金额 -->
				合计：{{item.type == 2 ? '积' :'¥'}}{{item.allPrice  - item.deduction_price + item.fareMoney}}
			</view>
			<view class="go-all-pay" v-if="item.status == 0">
				<view class="time-updown">
					<text>支付剩余：</text>
					<text>{{item.countdown}}</text>
				</view>
				<view class="go-all-pay-btn" >
					<view @click="cannelOrder(item.order_numbers)">取消订单</view>
					<view @click="navigateToPage('/pages/usercenter/suborder?orderNum=' + item.order_numbers)">立即支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _login from '../../common/js/_login/__login.js';
	import _base from '../../common/js/_base/_base.js';
	import _api from '../../common/js/_base/_api.js';
	export default {
		data() {
			return {
				status:'all',
				list:[]
			}
		},
		async onShow() {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token};
			let _data = {
				status:this.$data.status
			}
			let response = await _base._request_wxapi(_api.host_api+_api.orderList_api_url,_data,this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.list = response.data
			
		},
		methods: {
			navigateToPage(page)
			{
				uni.navigateTo({
					url:page
				})
			},
			async getOrderList(status)
			{
				this.$data.status = status
				let _data = {
					status:status
				}
				let response = await _base._request_wxapi(_api.host_api+_api.orderList_api_url,_data,this.$data.header)
				response = response.data
				if(response.code !== 2000){
					uni.showToast({
						title:response.msg,
						icon:'none',
						duration:3000
					})
				}
				this.$data.list = response.data
			},
			async cannelOrder(order_numbers)
			{
				let _data = {
					order_numbers:order_numbers
				}
				let response = await _base._request_wxapi(_api.host_api+_api.cannelOrder_api_url,_data,this.$data.header)
				response = response.data
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
				if(response.code == 2000){
					let lenI = this.$data.list.length
					s
					for(let i = 0;i < lenI;i++){
						if(this.$data.list[i].order_numbers == order_numbers){
							this.$data.list.splice(i,1)
							
						}
					}
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
