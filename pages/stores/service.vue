<template>
	<view class="content">
		<form>
			<view class="input-block">
				<view class="input-title">预约项目名称</view>
				<input v-model="service_name" class="input-class" placeholder-class="input-plaorder-class" type="text" placeholder="请输入预约项目名称" />
			</view>
		
			<view class="input-block">
				<view class="input-title">小孩出生年月</view>
				<picker name="birthday" @change="changebirthday" class="picker-class" mode="date" :value="birthday"  >
					<view class="input-class">{{birthday}}</view>
				</picker>
			</view>
			<view class="input-block">
				<view class="input-title">联系电话</view>
				<input v-model="tel_phone" class="input-class" placeholder-class="input-plaorder-class" type="text" placeholder="请输入联系电话" />
			</view>
			<view class="input-block">
				<view class="input-title">联系人</view>
				<input v-model="name" class="input-class" placeholder-class="input-plaorder-class" type="text" placeholder="请输入联系人姓名" />
			</view>
			<view class="input-block">
				<view class="input-title">到店日期</view>
				<picker name="arrival_time" @change="changedays" class="picker-class" mode="date" :value="arrival_time"  >
					<view class="input-class">{{arrival_time}}</view>
				</picker>
			</view>
			<view class="input-block">
				<view class="input-title">到店时间</view>
				<picker name="hours" @change="changeHour" class="picker-class" mode="time" :value="hours" start="00:00" end="24:00" >
					<view class="input-class">{{hours}}</view>
				</picker>
			</view>
			<view class="textarea-block">
				<view  class="textarea-title">备注</view>
				<textarea v-model="remark" class="textarea-class" placeholder-class="textarea-plaorder-class" placeholder="请输入备注"></textarea>
			</view>
			
			<button @click="subInfo()" class="yyue-btn">提交预约申请</button>
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
				service_name:'',
				arrival_time:'请输入到店日期',
				hours:'请输入到店时间',
				tel_phone:'',
				name:'',
				remark:'',
				birthday:'请输入出生年月',
				
			}
		},
		onLoad() {
			
		},
		methods: {
			changedays:function(e){
				this.$data.arrival_time = e.target.value
			},
			changeHour:function(e){
				this.$data.hours = e.target.value
			},
			changebirthday:function(e){
				this.$data.birthday = e.target.value
			},
			subInfo:async function(){
				let userInfo = await _base._getCache('userInfo');
				let _data = {
					service_name:this.$data.service_name,
					arrival_time:this.$data.arrival_time+ ' '+this.$data.hours,
					tel_phone:this.$data.tel_phone,
					name:this.$data.name,
					remark:this.$data.remark,
					birthday:this.$data.birthday,
				}
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token}
				let response = await _base._request_wxapi(
					_api.host_api+_api.storeServiseSub_api_url,
					_data,
					this.$data.header
				)
				response = response.data
				if(response.code == 2000){
					uni.showToast({
						title:response.msg,
						icon:'none'
					})
				}
			}	
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
