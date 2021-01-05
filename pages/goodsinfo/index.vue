<template>
	<view class="content">
		<swiper class="self-swiper" autoplay="true" indicator-dots="true" indicator-active-color="pink"  interval="4000">
			<swiper-item v-for="(item,index) in goodsInfo.goods_href" :key="index">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="padding-block">
			<view class="goods-title">{{ goodsInfo.goods_desc.constructor.toString() === 'function Array() { [native code] }' ? goodsInfo.goods_desc[goodsIndex] : goodsInfo.goods_desc}}</view>
			<view class="goods-desc">
				<text>{{ goodsInfo.sale_desc}}</text>
			</view>
			<view class="goods-price">
				<text class="goods-price-yuan">{{moneySign}}</text>
				<text class="goods-price-now">{{goodsInfo.goods_price[goodsIndex]}}</text>
				<text class="goods-price-yuan">原价{{moneySign}}</text>
				<text class="goods-price-yuan">{{goodsInfo.goods_market_price[goodsIndex]}}</text>
			</view>
		</view>
		<view class="padding-block">
			<view class="title-class" v-if="goodsInfo.goods_size.length != 0">尺码</view>
			<view class="size-block-class" v-if="goodsInfo.goods_size.length != 0">
				<view @click="selectAttrbute(index,true)" :class="goodsIndex==index ? 'size-class click-class':'size-class'" v-for="(item,index) in goodsInfo.goods_size" :key="index">{{item}}</view>
			</view>
			<view class="title-class" v-if="goodsInfo.goods_level.length != 0">段数</view>
			<view class="size-block-class">
				<view @click="selectAttrbute(index,true)" :class="goodsIndex==index ? 'size-class click-class':'size-class'" v-for="(item,index) in goodsInfo.goods_level" :key="index">{{item}}</view>
			</view>
			<view class="title-class" v-if="goodsInfo.goods_color.length != 0">颜色</view>
			<view class="size-block-class" v-if="goodsInfo.goods_color.length != 0">
				<view @click="selectAttrbute(index,false)" :class="goodsColorIndex==index ? 'color-class click-class':'color-class'" v-for="(item,index) in goodsInfo.goods_color" :key="index">{{item}}</view>
			</view>
			<view class="number-block">
				<view class="title-class">数量</view>
				<view class="count-btn">
					<view @click="counter(-1)">
						<image src="http://www.zimuyunying.cn/static/xcx/addnum.png"></image>
					</view>
					<view>
						<input type="number" v-model="buynum" />
					</view>
					<view @click="counter(+1)">
						<image src="http://www.zimuyunying.cn/static/xcx/delnum.png"></image>
					</view>
				</view>
			</view>
			<view class="goods-info-title">商品详情</view>
			<view class="goods-info-attribute">商品编号：{{goodsInfo.goods_code}}</view>
			<view class="goods-info-attribute">商品使用年龄：{{goodsInfo.goods_applicable_age}}</view>
			<view class="goods-info-attribute">商品使用性别：{{goodsInfo.goods_applicable_sex}}</view>
			<view class="goods-detail-img">
				<image style="vertical-align: middle;" @click="imgPreview(goodsInfo.goods_details,index)"  v-for="(item,index) in goodsInfo.goods_details" :src="item" :key="index" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer-class">
			<view class="pic-font-class" @click="callPhone">
				<view>
					<image src="http://www.zimuyunying.cn/static/xcx/kefu.png"></image>
				</view>
				<view>客服</view>
			</view>
			<view style="position: relative;" class="pic-font-class" @click="switchToPage('/pages/card/index')">
				<view>
					<image src="http://www.zimuyunying.cn/static/xcx/card-footer.png"></image>
				</view>
				<view>购物车</view>
				<view v-if="cardGoodsnum > 0" class="float-cart-num">{{cardGoodsnum}}</view>
			</view>
			<view class="addcard" @click="goodsToCard">
				加入购物车
			</view>
			<view class="gobuy" @click="goodsToOrder" >
				立刻购买
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
				goodsInfo:[],//商品详情
				phone:'',//客服电话
				goodsIndex:0,//显示的商品下标[变更价格使用]
				goodsColorIndex:0,//颜色单独下标【变更商品属性，不变更价格】
				buynum:1,//购买数量
				cardGoodsnum:0,//用户购物车商品数量
				moneySign:"¥",
				shareMsg:'实惠健康尽在孕婴'
			}
		},
		async onLoad(option) {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(_api.host_api+_api.goodsInfo_api_url,{goodsId:option.goodsId},this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.goodsInfo = response.data.goodInfo
			//判断是否需要更换积分或者钱的符号
			this.$data.moneySign = response.data.goodInfo.goods_cate_id == 3 ? '积分' :'¥';
			this.$data.phone = response.data.phone
			this.$data.cardGoodsnum =  response.data.cardGoodsnum
		},
		methods: {
			//选择商品属性index 产品属性下标   is_change_price是否变更价格
			selectAttrbute(index,is_change_price){
				if(is_change_price === false){
					this.$data.goodsColorIndex = index
				}
				if(is_change_price === true){
					this.$data.goodsIndex = index
					this.$data.buynum = 1
				}
			},
			callPhone(){
				uni.makePhoneCall({
				    phoneNumber: this.$data.phone
				});
			},
			navigateToPage(pageurl){
				uni.navigateTo({
					url:pageurl
				})
			},
			switchToPage(pageurl){
				uni.switchTab({
					url:pageurl
				})
			},
			counter(num){
				if(num < 0 && this.$data.buynum == 0){
					return;
				}
				this.$data.buynum = Number(this.$data.buynum)  + num
			},
			//加入到购物车
			async goodsToCard(){
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let _color = this.$data.goodsInfo.goods_color[this.$data.goodsColorIndex]
				_color = (_color == undefined) ? '' : _color
				
				let _data = {
					goodsId:this.$data.goodsInfo.id,
					order_num:this.$data.buynum,
					goodsIndex:this.$data.goodsIndex,
					goodsColor:_color,
				}
				let response = await _base._request_wxapi(_api.host_api+_api.addCard_api_url,_data,this.$data.header)
				response = response.data
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
				if(response.code == 2000){
					this.$data.cardGoodsnum = this.$data.cardGoodsnum + this.$data.buynum
				}
			},
			//立即购买 提交数据到订单
			async goodsToOrder(){
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let _color = this.$data.goodsInfo.goods_color[this.$data.goodsColorIndex]
				_color = (_color == undefined) ? '' : _color
				
				let _data = {
					goodsId:this.$data.goodsInfo.id,
					order_num:this.$data.buynum,
					goodsIndex:this.$data.goodsIndex,
					goodsColor:_color,
				}
				let response = await _base._request_wxapi(_api.host_api+_api.payCreatOrder_api_url,_data,this.$data.header)
				response = response.data
				if(response.code == 2000){
					 uni.navigateTo({
					 	url:'/pages/usercenter/suborder?orderNum=' + response.data.orderNumbers,
					 })
				}
			},
			//preview
			imgPreview(tempFilePaths,current){
				uni.previewImage({
				   urls: tempFilePaths,
				   current:current
			   });
			},
			onShareAppMessage(res) {
			  return {
			    title: this.shareMsg,
			    path: '/pages/test/index?puid=' + userInfo.data.id
			  }
			},
			 
		}
	}
</script>

<style>
	@import "../../common/css/goodsinfo.css";
	page{
		background: #f5f5f5;
	}
</style>
