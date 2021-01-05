<template>
	<view class="content">
		<view class="cons-top">
			<text>类型</text>
			<text>金额</text>
			<text>时间</text>
		</view>
		
		<view v-for="(item,index) in list"  :key="index" :class="item.acount < 0 ? 'cons-xiaofei' : 'cons-chongzhi'">
			<view :class="item.acount < 0 ? 'cons-xiaofei-left' : 'cons-chongzhi-left'">
				<view v-if="item.acount < 0">消</view>
				<view v-if="item.acount > 0">充</view>
				<text>{{item.note}}</text>
			</view>
			<view  :class="item.acount < 0 ? 'cons-xiaofei-center' : 'cons-chongzhi-center' ">
				{{item.acount}}
			</view>
			<view  class="cons-xiaofei-right">
				<view>{{item.days}}</view>
				<view>{{item.hours}}</view>
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
				list:[]
			}
		},
		async onLoad() {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token}
			let response = await _base._request_wxapi(
								_api.host_api+_api.balanceLog_api_url,
								{},
								this.$data.header
							)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none'
				})
			}
			this.$data.list = response.data
		},
		methods: {
			redirectTopage(url)
			{
				uni.navigateTo({
					url: url,
				});
			}
		}
	}
</script>

<style>
	@import "../../common/css/usercenter.css";
	page {
		background: #f5f5f5;
	}
</style>
