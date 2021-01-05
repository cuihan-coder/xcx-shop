<template>
	<view class="content">
		<view class="goods-list">
			<view class="not-data" v-if="goodsList.length == 0">
				<image src="http://www.zimuyunying.cn/static/xcx/not-data.png"></image>
				<view>商品正在上架中哦</view>
			</view>
			<view @click="navigateToPage('/pages/goodsinfo/index?goodsId='+item.id)" class="goods-list-item" v-for="(item,index) in goodsList" :key="index">
				<view class="goods-item-image">
					<image :src="item.goods_href"></image>
				</view>
				<view class="goods-item-content">{{item.goods_desc}}</view>
				<view class="goods-item-tag">
					<!-- <text class="goods-item-tag-mj">满减</text>-->
					<text class="goods-item-tag-wyg">无忧购</text> 
				</view>
				<view  class="goods-item-price">
					<text>¥</text>
					<text>{{item.goods_price}}</text>
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
				goodsList:[],//商品列表
				goodsType:1,//商品选择切换tab的类型
			}
		},
		async onLoad(option) {
			if(option.goodsName == ''){
				uni.showToast({
					title:'请输入查询数据',
					icon:'none'
				})
				return;
			}
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(_api.host_api+_api.searchGoodsList_api_url,{goodsName:option.goodsName},this.$data.header)
			response = response.data.data
			this.$data.goodsList = response.goodsList
		},
		methods: {
			navigateToPage(pageurl){
				uni.navigateTo({
					url: pageurl
				});
			}
		}
	}
</script>

<style>
	@import "../../common/css/index.css";
	page{
		background: #f5f5f5;
	}
</style>
