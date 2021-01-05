<template>
	<view class="content">
		<view class="order-status">
			订单状态：等待支付
		</view>
		<view class="order-status">
			订单号：2019090876354737
		</view>
		<view class="order-good-list">
			<view class="order-good">
				<image src="http://www.zimuyunying.cn/static/xcx/dptj.jpeg"></image>
				<view class="order-goodinfo">
					<view>
						<text>花王尿不湿大码大袋透气</text>
					</view>
					<view class="order-good-price">
						<text>¥388.00</text>
						<text>x1</text>
					</view>
				</view>
			</view>
			<view class="order-good">
				<image src="http://www.zimuyunying.cn/static/xcx/dptj.jpeg"></image>
				<view class="order-goodinfo">
					<view>
						<text>花王尿不湿大码大袋透气</text>
					</view>
					<view class="order-good-price">
						<text>¥388.00</text>
						<text>x1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="consignee-info">收货人信息</view>
		<view class="consignee">
			<view>胡婷</view>
			<view>13889899898</view>
			<view>收获地址：湖南省长沙市望城区时代倾城第一期1888</view>
		</view>
		<view class="consignee-info">物流信息</view>
		<view class="logistics-info">
			<view>快递已经在派送，请保持电话通畅，如有疑问请拨打18237383993</view>
			<view>2019-10-9 10:10:28</view>
		</view>
		
		<view class="consignee-info">支付信息</view>
		<view class="pay-info">
			<view class="pay-info-detail">
				<text>支付方式</text>
				<text>微信支付</text>
			</view>
			<view class="pay-info-detail">
				<text>订单金额</text>
				<text>¥2080</text>
			</view>
			<view class="pay-info-detail">
				<text>运费</text>
				<text>¥8</text>
			</view>
			<view class="pay-info-detail">
				<text>实际支付</text>
				<text class="red-font">¥2080</text>
			</view>
			<view class="pay-info-detail">
				<text>备注</text>
				<text>无</text>
			</view>
		</view>
		<view class="consignee-info">订单信息</view>
		<view class="pay-info">
			<view class="pay-info-detail">
				<text>订单编号</text>
				<text>201937237929</text>
			</view>
			<view class="pay-info-detail">
				<text>下单时间</text>
				<text>2019-10-7</text>
			</view>
		</view>
		<view class="play-btn">确认收获</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style>
	@import "../../common/css/usercenter.css";
	page{
		background: #f5f5f5;
	}
</style>
