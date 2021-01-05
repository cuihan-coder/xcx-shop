<template>
	<view class="content">
		<view class="order-tab">
			<view @click="getVoucherList(1)" :class="Tabindex == 1 ? 'active' : ''">
				<text>待领取</text>
			</view>
			<view @click="getVoucherList(2)" :class="Tabindex == 2 ? 'active' : ''">
				<text>可使用</text>
			</view>
			<view @click="getVoucherList(3)" :class="Tabindex == 3 ? 'active' : ''">
				<text>已使用</text>
			</view>
			<view @click="getVoucherList(4)" :class="Tabindex == 4 ? 'active' : ''">
				<text>已失效</text>
			</view>
		</view>
		<view  class="not-data" v-if="voucherList.length == 0" style="margin: 50% auto">
			<image src="http://www.zimuyunying.cn/static/xcx/not-data.png"></image>
			<view>优惠券领完了</view>
		</view>
		<view class="coupoin-list" v-if="voucherList.length > 0">
			<view v-for="(item,index) in voucherList" :key="index" class="coupoin-item">
				<view :class="item.type == 1 ? 'coupoin-item-left' : 'coupoin-item-left2' ">
					<view class="coupoin-item-left-price">
						<text>¥</text>
						<text>10.00</text>
					</view>
					<view>{{item.type == 1 ? '满减券' : '单品券'}}</view>
				</view>
				<view class="coupoin-item-right">
					<view>一次性消费满50元可减10元</view>
					<view 
					@click="giveVoucher(item.id,index)"
					v-if="Tabindex == 1"
					:class="item.type == 1 ? 'go-back1' : 'go-back2' ">点击领取</view>
					<view 
					v-if="Tabindex == 2 && item.is_use == 1 " 
					:class="item.type == 1 ? 'go-back1' : 'go-back2' ">已使用</view>
					<view 
					v-if="Tabindex == 2 && item.is_use != 1 && item.is_guoqi == 1" 
					:class="item.type == 1 ? 'go-back1' : 'go-back2' ">已失效</view>
					<view
					@click="redirectTopage(item.type,item.goods_id)"
					v-if="Tabindex == 2 && item.is_use != 1 && item.is_guoqi == 0" 
					:class="item.type == 1 ? 'go-back1' : 'go-back2' ">去使用</view>
					<view class="time">{{item.start_time}} - {{item.end_time}}</view>
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
				voucherList:[],
				Tabindex:1
			}
		},
		async onLoad() {
			let userInfo = await _base._getCache('userInfo');
		
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(
				_api.host_api+_api.voucherList_api_url,
				{index:this.$data.Tabindex},
				this.$data.header
			)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none'
				})
			}
			this.$data.voucherList = response.data
		},
		methods: {
			redirectTopage(type,goods_id)
			{
				if(type == 2){
					uni.navigateTo({
						url: '/pages/goodsinfo/index?goodsId='+goods_id,
					});
				}
				if(type == 1){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
				console.log()
			},
			async getVoucherList(index)
			{
				this.$data.Tabindex = index
				let userInfo = await _base._getCache('userInfo');
				let _data = {
					index:this.$data.Tabindex
				}
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let response = await _base._request_wxapi(
									_api.host_api+_api.voucherList_api_url,
									_data,
									this.$data.header
								)
				response = response.data
				if(response.code !== 2000){
					uni.showToast({
						title:response.msg,
						icon:'none'
					})
				}
				this.$data.voucherList = response.data
			},
			async giveVoucher(id,index)
			{
				let userInfo = await _base._getCache('userInfo');
				let _data = {
					id:id
				}
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let response = await _base._request_wxapi(
					_api.host_api+_api.giveVoucher_api_url,
					_data,
					this.$data.header
				)
				response = response.data
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
				if(response.code === 2000){
					this.$data.voucherList.splice(index,1)
				}
				
			}
			
		}
	}
</script>

<style>
	@import "../../common/css/usercenter.css";
	.content {
		background: #ffffff;
	}
	
.not-data{
	width: 100%;
	display: grid;
	align-items: center;
	justify-content: center;
}
.not-data image{
	width: 128upx;
	height: 128upx;
}
.not-data view{
	text-align: center;
	color: #999;
	font-size: 20upx;
}

</style>
