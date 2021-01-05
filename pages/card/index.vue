<template>
	<view class="content">
		<view class="card-num">购物车共{{goodsNum}}件宝贝</view>
		<view class="top-tab">
			<view @click="changeTab(1)" :class="type == 1 ? 'tab-item tab-item-click' :'tab-item'">
				<text>全部商品</text>
				<text>（{{goodsNum}}）</text>
			</view>
			<view @click="changeTab(2)" :class="type == 2 ? 'tab-item tab-item-click' :'tab-item'">
				<text>降价通知</text>
				<text>（{{reduceNum}}）</text>
			</view>
			<view @click="changeTab(3)" :class="type == 3 ? 'tab-item tab-item-click' :'tab-item'">
				<text>库存紧张</text>
				<text>（{{inventoryNum}}）</text>
			</view>
		</view>
		<!-- 
		<view class="huiyuan-tip">
			<view class="huiyuan-tip-red">
				<image src="../../static/card-huiyuan.png"></image>
				<text>我的会员</text>
			</view>
			<text class="zhekou-tip">加入超级会员本次购买最高可节省58元</text>
			<view class="goto-class"></view>
		</view> -->
		
		<view class="product-item" v-for="(item,index) in goodsList" :key="index">
			<view class="ckeck-class" @click="singleselect(index)">
				<image v-if="item.is_check == 0" src="http://www.zimuyunying.cn/static/xcx/check.png"></image> 
				<image v-if="item.is_check == 1" src="http://www.zimuyunying.cn/static/xcx/checked.png"></image>
			</view>
			<view class="product-item-pic">
				<image :src="item.goods_href"></image>
			</view>
			<view  class="product-item-detail">
				<view class="product-item-title">{{item.goods_desc}}</view>
				<view  class="product-item-attribute">
					<text v-for="(item,index) in item.goods_detail" :key="index">{{item}}</text>
				</view>
				<view class="number-block">
					<view class="title-class">
						¥{{item.goods_price}}
					</view>
					<view class="count-btn">
						<view @click="counter(index,-1)">
							<image src="http://www.zimuyunying.cn/static/xcx/addnum.png"></image>
						</view>
						<view>
							<input type="number" :value="item.order_num" />
						</view>
						<view @click="counter(index,+1)">
							<image src="http://www.zimuyunying.cn/static/xcx/delnum.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-placeorder"></view>
		<!-- 满减提示 -->
		<view class="manjian-tip" v-if="fullPreferential.length != 0">
			<text>满减</text>
			<text>满{{fullPreferential['full_money']}}减{{fullPreferential['preferential_money']}}元优惠活动，付款减{{fullPreferential['preferential_money']}}元</text>
			<view class="goto-class"></view>
		</view>
		
		<!-- 底部 -->
		<view class="footer-class">
			<view class="footer-left" @click="selectAllMethod">
				<image v-if="selectAll == 0" src="http://www.zimuyunying.cn/static/xcx/check.png"></image>
				<image v-if="selectAll == 1" src="http://www.zimuyunying.cn/static/xcx/checked.png"></image>
				<text>全选</text>
			</view>
			<view class="footer-right">
				<view class="footer-price">
					<view class="price-heji">
						<text>总计</text>
						<text>¥</text>
						<text>{{totalPrice}}</text>
					</view>
					<view class="logistic-price">不含快递费</view>
				</view>
				<view @click="createOrder" class="footer-gobuy">去结算</view>
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
				goodsNum:0,//商品总数
				reduceNum:0,//降价数量
				inventoryNum:0,//库存紧张数量
				selectAll:0,//是否全选
				goodsList:[],//购物车数量
				totalPrice:0,//全部合计
				type:1,//1 全部商品 2 降价商品 3 低库存商品
				fullPreferential:[],//是否存在满减
			}
		},
		async onShow() {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(_api.host_api+_api.cardInfo_api_url,{type:this.$data.type},this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.goodsNum = response.data.goodsNum
			this.$data.reduceNum = response.data.reduceNum
			this.$data.inventoryNum = response.data.inventoryNum
			this.$data.goodsList =  response.data.goodsList
			this.$data.selectAll = response.data.selectAll
			this.$data.totalPrice = response.data.totalPrice
			this.$data.fullPreferential = response.data.fullPreferential
		},
		methods: {
			//计数器（增减商品的数量）当置0时 将删除
			async counter(cardListIndex,num)
			{
				if(num < 0 && this.$data.buynum == 0){
					return;
				}
				let lenI = this.$data.goodsList.length
				for(var i = 0;i < lenI ; i++){
					if(i == cardListIndex ){
						this.$data.goodsList[i]['order_num']
						 = Number(this.$data.goodsList[i]['order_num'])  + num
						 //更新线上数据
						 let userInfo = await _base._getCache('userInfo');
						 //初次获取首页数据
						 this.$data.header = {token:userInfo.data.token}
						 let _data = {cardId:this.$data.goodsList[i]['id'],num:num}
						 let response = await _base._request_wxapi(_api.host_api+_api.delCardNum_api_url,_data,this.$data.header)
						 response = response.data
						 uni.showToast({
						 	title:response.msg,
						 	icon:'none',
						 	duration:3000
						 })
						 
						 //更改总价格
						 this.$data.totalPrice += (num * this.$data.goodsList[i]['goods_price'])
						 
						 //当数量为0 则将其从列表中删除
						 if(this.$data.goodsList[i]['order_num'] == 0){
						 	this.$data.goodsList.splice(i,1) 
						 }
						
						break;
					}
				}
			},
			//底部全选/反选
			selectAllMethod()
			{
				let lenI = this.$data.goodsList.length
				this.$data.selectAll = this.$data.selectAll == 0 ? 1 : 0;
				for(var i = 0;i < lenI ; i++){
					this.$data.goodsList[i]['is_check'] = this.$data.selectAll
				}
			},
			//单个商品勾选
			singleselect(ItenI)
			{
				let lenI = this.$data.goodsList.length
				let selectNum = 0
				for(var i = 0;i < lenI ; i++){
					if(ItenI == i){
						this.$data.goodsList[i]['is_check'] 
						= 
						this.$data.goodsList[i]['is_check'] == 0 ? 1 : 0
					}
					if(this.$data.goodsList[i]['is_check'] == 1){
						selectNum++
					}
				}
				//如果子产品勾选数量等于全选应该数量则  全选默认勾选
				lenI == selectNum ? this.$data.selectAll = 1 : this.$data.selectAll = 0;
			}
			,
			//切换tab
			async changeTab(type)
			{
				if(this.$data.type == type){
					return;
				}
				this.$data.type = type
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let response = await _base._request_wxapi(_api.host_api+_api.cardInfo_api_url,{type:this.$data.type},this.$data.header)
				response = response.data
				if(response.code !== 2000){
					uni.showToast({
						title:response.msg,
						icon:'none',
						duration:3000
					})
				}
				this.$data.goodsNum = response.data.goodsNum
				this.$data.reduceNum = response.data.reduceNum
				this.$data.inventoryNum = response.data.inventoryNum
				this.$data.goodsList =  response.data.goodsList
				this.$data.selectAll = response.data.selectAll
				this.$data.totalPrice = response.data.totalPrice
			},
			//提交物品 生成订单
			async createOrder(){
				
				//获取选择购买的物品
				let lenI = this.$data.goodsList.length
				//如果没有购物车数据 则直接跳转订单的界面
				if(lenI == 0){
					uni.navigateTo({
						url:'/pages/usercenter/order',
					})
					return;
				}
				let cardId = []
				for(var i = 0;i < lenI ; i++){
					if(this.$data.goodsList[i]['is_check'] == 1){
						cardId.push(this.$data.goodsList[i]['id'])
					}
				}
				if(cardId === []){
					uni.showToast({title:'请选择要购买的商品',icon:'none',duration:3000})
					return
				}
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let response = await _base._request_wxapi(_api.host_api+_api.createOrders_api_url,{cardId:cardId.join()},this.$data.header)
				response = response.data
				if(response.code == 2000){
					uni.navigateTo({
						url:'/pages/usercenter/suborder?orderNum=all',
					})
				}
				
			},
		}
	}
</script>

<style>
	@import "../../common/css/card.css";
	page{
		background: #f5f5f5;
	}
</style>
