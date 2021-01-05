<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="index-search">
			<view style="width: 28rpx;"></view>
			<!-- <image class="index-search-scan" src="../../static/saomiao.png"></image> -->
			<view class="index-search-input">
				<image src="http://www.zimuyunying.cn/static/xcx/sousuo.png"></image>
				<input v-model="searchGoodsName" class="" placeholder="" />
				<view @click="navigateToPage('/pages/index/searchgoodslist?goodsName='+searchGoodsName)" class="search-btn">搜索</view>
			</view>
			<view class="index-search-msg" @click="navigateToPage('/pages/usercenter/sysmsg')">
				<image src="http://www.zimuyunying.cn/static/xcx/msg.png"></image>
				<text>{{sysReadNum}}</text>
			</view>
		</view>
		<swiper v-if="bannerList.length > 0" class="self-swiper" autoplay="true" indicator-dots="true" indicator-active-color="pink"  interval="2000">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<image :src="item.pic"></image>
			</swiper-item>
		</swiper>
		<view class="index-menu">
			<view class="index-menu-item" @click="navigateToPage('/pages/index/goodslist?field=goods_cate_id&value=1')">
				<view class="index-menu-icon kuajinicon">
					<image src="http://www.zimuyunying.cn/static/xcx/kuangjing.png"></image>
				</view>
				<view>跨境商品</view>
			</view>
			<view  class="index-menu-item" @click="navigateToPage('/pages/index/goodslist?field=goods_cate_id&value=2')">
				<view  class="index-menu-icon guoneimingping">
					<image src="http://www.zimuyunying.cn/static/xcx/jiangbei.png"></image>
				</view>
				<view>国内名品</view>
			</view>
			<view  class="index-menu-item" @click="navigateToPage('/pages/index/goodslist?field=goods_cate_id&value=3')">
				<view  class="index-menu-icon jifenzhuanxiang">
					<image src="http://www.zimuyunying.cn/static/xcx/zhu.png"> </image>
				</view>
				<view>积分专享</view>
			</view>
			<view  class="index-menu-item" @click="navigateToPage('/pages/usercenter/coupons')">
				<view class="index-menu-icon huiyuanzhongxin">
					<image src="http://www.zimuyunying.cn/static/xcx/huangguan.png"> </image>
				</view>
				<view>领优惠券</view>
			</view>
		</view>
		<!-- 游泳预约 -->
		<view class="index-swimming-block" v-if="storeOrder.length > 0">
			<view class="index-swimming-image">
				<image :src="storeOrder.goods_href"></image>
			</view>
			<view class="index-swimming-content">
				<view  class="index-swimming-title">
					<text>您预约的 {{storeOrder.goods_name}} 即将开始</text>
					<text> {{storeOrder.arrival_time}} </text>
				</view>
				<view class="index-swimming-detail">
					<text>服务码 {{storeOrder.id}}</text>
					<view>查看详情</view>
				</view>
				<!-- close tip-->
				<view class="index-swimming-close"></view>
			</view>
		</view>
		
		<view class="index-white-block">
			<!-- 每日疯抢 好物优选 新品推荐 -->
			<view class="index-activety-block">
				<view class="index-activety-today" @click="navigateToPage('/pages/index/goodslist?field=goods_sale_type&value=1')">
					<image src="http://www.zimuyunying.cn/static/xcx/miaosha.png"></image>
				</view>
				<view class="index-activety-youxuan">
					<view class="index-activety-itemone" @click="navigateToPage('/pages/index/goodslist?field=goods_sale_type&value=2')">
						<image src="http://www.zimuyunying.cn/static/xcx/youxuan@2x.png"></image>
					</view>
					<view  class="index-activety-itemtwo" @click="navigateToPage('/pages/index/goodslist?field=goods_sale_type&value=3')">
						<image src="http://www.zimuyunying.cn/static/xcx/tuijian.jpg"></image>
					</view>
				</view>
			</view>
			<!-- 店铺推荐 -->
			<view class="index-title" v-if="storesRecoment.length >0">
				<text>店铺推荐</text>
				<text>精选超值优质商品</text>
			</view>
			<view v-if="storesRecoment.length >0" class="scroll-view"  @scroll="scroll" scroll-x="true" show-scrollbar="false">
				<view v-for="(item,index) in storesRecoment" :key="index" @click="navigateToPage('/pages/goodsinfo/index?goodsId='+item.id)" class="index-scroll-item">
					<view class="scroll-item-image">
						<image :src="item.goods_href"></image>
					</view>
					<view  class="scroll-item-price"><text>¥</text>{{item.goods_price}}</view>
					<view class="scroll-item-markprice">¥{{item.goods_market_price}}</view>
				</view>
			</view>
		</view>
		<!-- 分类商品 -->
		<scroll-view class="scroll-view-x" scroll-x="true" @scroll="scroll">
			<text @click="tabChange(item.type)" :class="item.type == goodsType ? 'scroll-view-block scroll-active': 'scroll-view-block'" v-for="(item,index) in goodsTitle" :key="index">
				{{item.name}}
			</text>
		</scroll-view>
		<view class="goods-list">
			<view class="not-data" v-if="goodsList.length == 0">
				<image src="http://www.zimuyunying.cn/static/xcx/not-data.png"></image>
				<view>商品正在上架中哦</view>
			</view>
			<view class="goods-list-item" v-for="(item,index) in goodsList" :key="index" @click="navigateToPage('/pages/goodsinfo/index?goodsId='+item.id)">
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
				bannerList:[],//广告列表
				goodsTitle:[],//商品种类栏目
				goodsList:[],//商品列表
				storesRecoment:[],//门店推荐
				storeOrder:[],//门店预约数据
				sysReadNum:0,//系统消息未读数量
				goodsType:1,//商品选择切换tab的类型
				searchGoodsName:'花王纸尿裤',//搜索商品名称
				shareMsg:'优质商品，优质服务，欢迎您的光临！'
			}
		},
		//用来邀请注册进行上级邀请者注册统计
		async onLoad(option){
			//存入本地缓存，然后记录上级信息，
			if(option.puid){
				await _base._setCache('puid',option.puid)
			}
			// this.$data.goodsType = 1
			let userInfo = await _base._getCache('userInfo');
			if(userInfo.data == undefined){
				this.loginObj = new _login();
				let response = await this.loginObj._wx_Login(true)
				console.log(response.code)
				if(response.code == 4010 || response.code == 2020){
					console.log(2222)
					uni.showToast({
					    title: response.msg,
					    duration: 3000,
						icon:'none'
					});
					return false;
				}
				userInfo = await _base._getCache('userInfo');
			}
					
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			//是否有推荐人
			let _Data = {}
			let puid = await _base._getCache('puid')
			if(puid){_Data.puid = puid}
			let response = await _base._request_wxapi(_api.host_api+_api.indexdata_api_url,_Data,this.$data.header)
			
			if(response.data.code == 4010){
				this.loginObj = new _login();
				let response = await this.loginObj._wx_Login(true)
				this.$data.header = {token:userInfo.data.token}
				let _Data = {}
				let puid = await _base._getCache('puid')
				if(puid){_Data.puid = puid}
				response = await _base._request_wxapi(_api.host_api+_api.indexdata_api_url,_Data,this.$data.header)
			}
			response = response.data.data
			this.$data.bannerList = response.bannerList
			this.$data.goodsTitle = response.goodsTitle
			this.$data.goodsList = response.goodsList
			this.$data.storesRecoment = response.storesRecoment
			this.$data.storeOrder = response.storeOrder
			this.$data.sysReadNum = response.sysReadNum
			this.$data.shareMsg = response.shareMsg
		},
		
		onShareAppMessage(res) {
		  return {
		    title: this.shareMsg,
		    path: '/pages/test/index?puid=' + userInfo.data.id
		  }
		},
		methods: {
			navigateToPage(pageurl){
				uni.navigateTo({
					url:pageurl
				})
			},
			async tabChange(goodsType)
			{
				this.$data.goodsType = goodsType
				let response = await _base._request_wxapi(_api.host_api+_api.goodsList_api_url,{type:goodsType},this.$data.header)
				response = response.data.data
				this.$data.goodsList = response.goodsList
			},
			
		}
	}
</script>

<style>
	@import "../../common/css/index.css";
	page{
		background: #f5f5f5;
	}
</style>
