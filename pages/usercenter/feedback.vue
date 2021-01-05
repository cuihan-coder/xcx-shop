<template>
	<view class="content">
		<form>
			<view class="feedback">
				<textarea 
					class="feedback-content" 
					placeholder="感谢您对平台提出的宝贵建议,我们会给您及时反馈情况!" 
					placeholder-class="feedback-content-plaoeder"
					v-model="content">
				</textarea>
			</view>
			<view class="touch-class">
				<label>
					联系方式<input v-model="phone" type="number" placeholder="请输入您的联系方式"/>
				</label>
			</view>
			<button @click="adviceSub" class="feedback-btn">提交</button>
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
				content:'',
				phone:''
			}
		},
		onLoad() {
			
		},
		methods: {
			async adviceSub()
			{
				let userInfo = await _base._getCache('userInfo');
				//初次获取首页数据
				this.$data.header = {token:userInfo.data.token};
				if(this.$data.phone == '' || this.$data.content == ''){
					uni.showToast({
						title:'请填写所有信息',
						icon:'none',
						duration:3000
					})
					return
				}
				let _data = {
					phone:this.$data.phone,
					content:this.$data.content
				}
				let response = await _base._request_wxapi(
									_api.host_api+_api.adviceFreeback_api_url,
									_data,
									this.$data.header
								)
				response = response.data
				if(response.code == 2000){
					uni.showToast({
						title:response.msg,
						icon:'none'
					})
					this.$data.phone = ''
					this.$data.content = ''
				}
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
