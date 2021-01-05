<template>
	<view class="content">
		<form>
			<view class="input-block">
				<view class="input-title">预约项目名称</view>
				<view class="input-class">{{info.service_name}}</view>
			</view>
		
			<view class="input-block">
				<view class="input-title">小孩出生年月</view>
				<view class="input-class">{{info.birthday}}</view>
			</view>
			<view class="input-block">
				<view class="input-title">联系电话</view>
				<view class="input-class">{{info.tel_phone}}</view>
			</view>
			<view class="input-block">
				<view class="input-title">联系人</view>
				<view class="input-class">{{info.name}}</view>
			</view>
			<view class="input-block">
				<view class="input-title">到店时间</view>
				<view class="input-class">{{info.arrival_time}}</view>
			</view>
			<view class="input-block">
				<view class="input-title">备注</view>
				<view class="input-class">{{info.remark}}</view>
			</view>
		</form>
	</view>
</template>

<script>
	import _login from '../../common/js/_login/__login.js';
	import _base from '../../common/js/_base/_base.js';
	import _api from '../../common/js/_base/_api.js';
	export default {
		data() {
			return {
				info:[]
			}
		},
		async onLoad(option) {
			let userInfo = await _base._getCache('userInfo');
			//初次获取首页数据
			this.$data.header = {token:userInfo.data.token};
			let response = await _base._request_wxapi(_api.host_api+_api.storesAppointmentInfo_api_url,{id:option.id},this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
				})
			}
			this.$data.info = response.data
		},
		methods: {
				
		}
		
	}
</script>

<style>
	@import "../../common/css/stores.css";
	page{
		background: #f5f5f5;
		padding-top: 8upx;
	}
</style>
