<template>
	<view class="content">
		<view v-for="(item,index) in list" :key="index" class="sysmsg-item">
			<view class="sysmsg-time">{{item.ctime}}</view>
			<view class="sysmsg-content" @click="redirectTopage('/pages/usercenter/storesInfo?id='+item.id)">
				<view>{{item.service_name}}</view>
				<text>
				到店时间:{{item.arrival_time}}
				到店备注:{{item.remark}}
				</text>
				<view >点击查看详情</view>
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
			this.$data.header = {token:userInfo.data.token};
			let response = await _base._request_wxapi(_api.host_api+_api.storesAppointment_api_url,{},this.$data.header)
			response = response.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none',
					duration:3000
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
	page{
		background: #f5f5f5;
	}
</style>
