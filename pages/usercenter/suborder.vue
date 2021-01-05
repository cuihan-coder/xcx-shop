<template>
	<view>
		<view class="content" v-if="list.length !== 0">
			<view class="order-status">
				订单状态：{{otherInfo.status}}
			</view>
			<view class="order-good-list">
				<view class="order-good" v-for="(item,key) in list" :key="key">
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
				<input class="input-class" type="text" placeholder="请填写姓名"  v-model="otherInfo.receive_name"/>
				<input class="input-class" type="number" placeholder="请填写电话" maxlength="12" v-model="otherInfo.receive_phone"/>
				<input class="input-class" type="text"  placeholder="请填写收货地址"  v-model="otherInfo.receive_area"/>
			</view>
			<view class="consignee-info">配送方式</view>
			<view class="peisong-select">
				 <radio-group @change="radioChange">
					 <label class="radio"><radio value="1"  :checked="otherInfo.logistic_type == 1"/>门店自提</label>
				     <label class="radio"><radio value="2" :checked="otherInfo.logistic_type == 2" />快递配送（自付运费）</label>
				 </radio-group>
			</view>
			<view  class="consignee-info">优惠券</view>
			<view  class="voucher-select">
				 <radio-group @change="voucherRadioChange">
					 <label class="radio" v-for="(item,index) in otherInfo.voucherList" :key="index">
						 <view style="voucher-radio" >
						 <radio :value="item.voucher_id"  />
						 {{item.title}}
						 </view>
					</label>
				 </radio-group>
			</view>
			<view class="consignee-info">支付信息</view>
			<view class="pay-info">
				<view class="pay-info-detail">
					<text>支付方式</text>
					<text>{{otherInfo.payType}}</text>
				</view>
				<view class="pay-info-detail">
					<text>订单金额</text>
					<text>¥{{otherInfo.orderMoney}}</text>
				</view>
				<view class="pay-info-detail">
					<text>运费（选择配送）</text>
					<text>¥{{otherInfo.fareMoney}}</text>
				</view>
				<view class="pay-info-detail">
					<text>活动抵扣金额</text>
					<text>¥{{otherInfo.full_preferential}}</text>
				</view>
				
				<view class="pay-info-detail">
					<text>实际支付</text>
					<text class="red-font">¥{{otherInfo.payMoney - voucherDelMoney}}</text>
				</view>
				<view class="pay-note-view">
					<textarea maxlength="300" placeholder="请输入备注信息" v-model="otherInfo.note" placeholder-class="pay-note">
						
					</textarea>
				</view>
			</view>
			<view class="consignee-info">订单信息</view>
			<view class="pay-info">
				<view class="pay-info-detail">
					<text>订单编号</text>
					<text>{{otherInfo.orderNumbers}}</text>
				</view>
				<view class="pay-info-detail">
					<text>下单时间</text>
					<text>{{otherInfo.orderCtime}}</text>
				</view>
			</view>
			<view class="placeholder-bloack"></view>
			<view class="sub-order">
				<view class="sub-order-left">
					<text>共{{otherInfo.goodsNum}}件商品，合计</text>
					<text>¥</text>
					<text>{{otherInfo.payMoney - voucherDelMoney}}</text>
				</view>
				<view @click="payOrders" class="sub-order-right">确认支付</view>
			</view>
		</view>
		<view class="not-data" v-if="list.length == 0" style="margin: 50% auto">
			<image src="http://www.zimuyunying.cn/static/xcx/not-data.png"></image>
			<view>没有购物数据</view>
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
				list:[],//商品列表
				otherInfo:[],//其他信息,
				voucherDelMoney:0,//选择优惠券减去的
				voucherId:0//选择优惠券后的ID
			}
		},
		async onLoad(option) {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(_api.host_api+_api.payOrderList_api_url,{orderNum:option.orderNum},this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.list = response.data.list
			this.$data.otherInfo = response.data.otherInfo
			
		},
		methods: {
			radioChange: function(evt) {
				this.$data.otherInfo.logistic_type = evt.target.value
				if(evt.target.value == 1){
					this.$data.otherInfo.payMoney = parseInt(this.$data.otherInfo.payMoney) - parseInt(this.$data.otherInfo.fareMoney)
				}
				if(evt.target.value == 2){
					this.$data.otherInfo.payMoney = parseInt(this.$data.otherInfo.payMoney)  + parseInt(this.$data.otherInfo.fareMoney)
				}
			},
			voucherRadioChange: function(evt) {
				let lenI = this.$data.otherInfo.voucherList.length
				for(let I = 0;I < lenI;I++){
					if(this.$data.otherInfo.voucherList[I].voucher_id == evt.target.value){
						this.$data.voucherDelMoney = parseInt(this.$data.otherInfo.voucherList[I].del_money) 
						this.$data.voucherId = evt.target.value
						break;
					}
				}
			},
			payOrders:async function(){
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token};
				let _data = {
					orderNumbers:this.$data.otherInfo.orderNumbers,
					logistic_type:this.$data.otherInfo.logistic_type,
					note:this.$data.otherInfo.note,
					receive_phone:this.$data.otherInfo.receive_phone,
					receive_name:this.$data.otherInfo.receive_name,
					receive_area:this.$data.otherInfo.receive_area,
					voucher_id:this.$data.voucherId
				}
				let response = await _base._request_wxapi(_api.host_api+_api.payOrders_api_url,_data,this.$data.header)
				response = response.data
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
				if(response.code == 2000){
					uni.navigateTo({
						url:'/pages/usercenter/order',
					})
				}
			}
		}
	}
</script>

<style>
	@import "../../common/css/usercenter.css";
	@import "../../common/css/stores.css";
	@import "../../common/css/index.css";
	page{
		background: #f5f5f5;
	}
</style>
