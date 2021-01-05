<template>
	<view class="content">
		<!-- 分类商品 -->
		<scroll-view class="scroll-view-x" :scroll-left="scrollleft" scroll-x="true" @scroll="scroll">
				<image v-for="(item,index) in bannerList" :key="index" :src="item"></image>
		</scroll-view>
		
		<view class="content-block">
			<view class="shopinfo">
				<view class="shopinfo-left">
					<text>营业时间 09:00-22:00</text>
					<text>湖南省长沙市望城区时代倾城1栋</text>
				</view>
				<view class="shopinfo-phone">
					<image src="http://www.zimuyunying.cn/static/xcx/phone.png"></image>
				</view>
			</view>
			<view class="appointment-scan">
				<view class="appointment-bloack" @click="redirectpage('/pages/stores/service')">
					<image src="http://www.zimuyunying.cn/static/xcx/yuyue.png"></image>
					<text>服务预约</text>
				</view>
				<view  class="scan-bloack">
					<image src="http://www.zimuyunying.cn/static/xcx/saoma.png"></image>
					<text>扫码购</text>
				</view>
			</view>
			
			<view class="storesServ">
				<view></view>
				<view>门店服务</view>
			</view>
			<view class="item-list">
				<view class="item-image">
					<image src="http://www.zimuyunying.cn/static/xcx/swimming.png"></image>
				</view>
				<view  class="item-desc">
					<view class="item-desc-title">0-6岁宝宝单人首次纯净水游泳</view>
					<view  class="item-desc-time">
						<text>周一至周五 | 提前预约</text>
					</view>
					<view class="item-desc-sales">已售1825件</view>
					
					<view  class="item-desc-price">
						<view>
							<text class="text-rmb">¥</text>
							<text class="price">68</text>
							<text class="market-price">¥108</text>
						</view>
						<view class="pay-btn">购买</view>
					</view>
				</view>
			</view>
			<view class="item-list">
				<view class="item-image">
					<image src="http://www.zimuyunying.cn/static/xcx/swimming.png"></image>
				</view>
				<view  class="item-desc">
					<view class="item-desc-title">0-6岁宝宝单人首次纯净水游泳</view>
					<view  class="item-desc-time">
						<text>周一至周五 | 提前预约</text>
					</view>
					<view class="item-desc-sales">已售1825件</view>
					
					<view  class="item-desc-price">
						<view>
							<text class="text-rmb">¥</text>
							<text class="price">68</text>
							<text class="market-price">¥108</text>
						</view>
						<view class="pay-btn">购买</view>
					</view>
				</view>
			</view>
			<view class="item-list">
				<view class="item-image">
					<image src="http://www.zimuyunying.cn/static/xcx/swimming.png"></image>
				</view>
				<view  class="item-desc">
					<view class="item-desc-title">0-6岁宝宝单人首次纯净水游泳</view>
					<view  class="item-desc-time">
						<text>周一至周五 | 提前预约</text>
					</view>
					<view class="item-desc-sales">已售1825件</view>
					
					<view  class="item-desc-price">
						<view>
							<text class="text-rmb">¥</text>
							<text class="price">68</text>
							<text class="market-price">¥108</text>
						</view>
						<view class="pay-btn">购买</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollleft:300,
				bannerList:[
					'../../static/banner.jpg',
					'../../static/banner2.jpg',
					'../../static/banner3.jpg'
				]
			}
		},
		onLoad() {
			let sysInfo = uni.getSystemInfoSync()
			this.$data.scrollleft = sysInfo.screenWidth * 0.72
			console.log(this.$data.scrollleft)
		},
		methods: {
			redirectpage(url){
				uni.navigateTo({
					url:url
				})
			}	
		}
	}
</script>

<style>
	@import "../../common/css/stores.css";
</style>
