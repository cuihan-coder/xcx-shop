<template>
	<view class="content">
		<view class="huiyuan-back">
			<image v-if="userInfo.vip_level == 1" src="http://www.zimuyunying.cn/static/xcx/pthy.png"></image>
			<image v-if="userInfo.vip_level == 2" src="http://www.zimuyunying.cn/static/xcx/byhy.png"></image>
			<image v-if="userInfo.vip_level == 3" src="http://www.zimuyunying.cn/static/xcx/hjhy.png"></image>
			<image v-if="userInfo.vip_level == 4" src="http://www.zimuyunying.cn/static/xcx/zshy.png"></image>
			<image v-if="userInfo.vip_level == 5" src="http://www.zimuyunying.cn/static/xcx/zshy.png"></image>
			
		</view>
		<view class="userinfo">
			<view class="userinfo-all" v-if="userInfo.name == ''">
				<image src="http://resource.akscan.com/default-user.png"></image>
				<view class="user-name">
					<button class="login-btn" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">点击进行登录</button>
				</view>
			</view>
			<view class="userinfo-all" v-if="userInfo.name != ''">
				<image :src="userInfo.face_img"></image>
				<view class="user-name">
					<view>{{userInfo.name}}</view>
					<view>{{userInfo.vip_level ? userInfo.vip_level_title : '普通会员'}}</view>
				</view>
			</view>
			<view  class="userinfo-huiyuan">
				<image src="http://www.zimuyunying.cn/static/xcx/hg.png"></image>
				<text>升级享受五大权益</text>
			</view>
		</view>
		<view class="float-class">
			<view class="float-item">
				<view>{{userInfo.wallet_balance}}</view>
				<view>余额</view>
			</view>
			<view  class="float-item">
				<view>{{vouchers?vouchers:0}}</view>
				<view>优惠券</view>
			</view>
			<view  class="float-item" @click="redirectTopage('/pages/usercenter/stores')">
				<view>{{storsOrder?storsOrder:0}}</view>
				<view>门店预约</view>
			</view>
			<view  class="float-item">
				<view>{{userInfo.integral?userInfo.integral:0}}</view>
				<view>积分</view>
			</view>
		</view>
		<view class="cygn-title">常用功能</view>
		<view class="cygn-block">
			<view class="cygn-block-item" @click="redirectTopage('order')">
				<image src="http://www.zimuyunying.cn/static/xcx/dingdan.png"></image>
				<view>订单管理</view>
			</view>
			<view  class="cygn-block-item">
				<image src="http://www.zimuyunying.cn/static/xcx/yhye.png"></image>
				<button plain="true" open-type="share">邀请好友</button>
			</view>
			<view  class="cygn-block-item" @click="redirectTopage('feedback')">
				<image src="http://www.zimuyunying.cn/static/xcx/pinjia.png"></image>
				<view>意见反馈</view>
			</view>
			<view @click="callPhone(phone)"  class="cygn-block-item">
				<image src="http://www.zimuyunying.cn/static/xcx/shouhou.png"></image>
				<view>退款/售后</view>
			</view>
		</view>
		<view class="logistics-bloack" v-if="logistics_info.length > 0">
			<view class="logistics-time">
				<view>最新物流</view>
				<view>{{logistics_info.ctime}}</view>
			</view>
			<view class="logistics-content" >
				<image :src="logistics_info.goods_href"></image>
				<view  class="logistics-area">
					<view>运输中</view>
					<view>{{logistics_info.content}}</view>
				</view>
			</view>
		</view>
		<view class="moreserve-block">
			<view class="moreserve-title">更多服务</view>
			<view class="moreserve-item-list">
				<view @click="redirectTopage('/pages/stores/service')"  class="moreserve-item">
					<image src="http://www.zimuyunying.cn/static/xcx/yuyuebtn.png"></image>
					<view>到店预约</view>
				</view>
				<view  class="moreserve-item" @click="redirectTopage('consumption')">
					<image src="http://www.zimuyunying.cn/static/xcx/wallet.png"></image>
					<view>消费记录</view>
				</view>
				<view  class="moreserve-item" @click="redirectTopage('coupons')">
					<image src="http://www.zimuyunying.cn/static/xcx/youhuiquan.png"></image>
					<view >优惠券</view>
				</view>
				<view  class="moreserve-item" @click="redirectTopage('sysmsg')">
					<image src="http://www.zimuyunying.cn/static/xcx/xiaoxi.png"></image>
					<view >消息</view>
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
				userInfo:[],
				logistics_info:[],
				vouchers:'',
				storsOrder:'',
				phone:''
			}
		},
		async onShow() {
			let cacheUserInfo = await _base._getCache('userInfo');
			this.userInfo = cacheUserInfo.data
			
			//初次获取首页数据
			this.$data.header = {token:cacheUserInfo.data.token}
			let response = await _base._request_wxapi(
								_api.host_api+_api.userInfo_api_url,
								{},
								this.$data.header
							)
			response = response.data.data
			if(response.code !== 2000){
				uni.showToast({
					title:response.msg,
					icon:'none'
				})
			}
			this.$data.userInfo = response.userInfo
			this.$data.logistics_info = response.logistics_info
			this.$data.vouchers =  response.vouchers
			this.$data.storsOrder = response.storsOrder
			this.$data.phone   = response.phone
		},
		methods: {
			callPhone(phone)
			{
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			redirectTopage(url)
			{
				uni.navigateTo({
					url: url,
				});
			},
			async mpGetUserInfo(result) {
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				this.hasUserInfo = true;
				this.userInfo = result.detail.userInfo;
				this.userInfo.face_img = this.userInfo.avatarUrl
				this.userInfo.vip_level  = 1
				this.userInfo.name  = this.userInfo.nickName
				let cacheUserInfo = await _base._getCache('userInfo')
				cacheUserInfo.data.name = this.userInfo.nickName
				cacheUserInfo.data.face_img = this.userInfo.avatarUrl
				cacheUserInfo.data.country = this.userInfo.country
				cacheUserInfo.data.city = this.userInfo.city
				cacheUserInfo.data.sex = this.userInfo.gender
				cacheUserInfo.data.province = this.userInfo.province
				
				_base._setCache('userInfo',cacheUserInfo)
				this.$data.header = { token: cacheUserInfo.data.token };
				let _data = {
					memId:cacheUserInfo.data.id,
					nickname:this.userInfo.nickName,
					avatarUrl:this.userInfo.avatarUrl,
					city:this.userInfo.city,
					country:this.userInfo.country,
					gender:this.userInfo.gender,
					province:this.userInfo.province,
				}
				let response = await _base._request_wxapi(_api.host_api+_api.perfectUserInfo_api_url,_data,this.$data.header)
			},
		},
		 onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '邀请大家一起来享受优惠',
		      path: '/pages/index/index?puid='+this.$data.userInfo.id,
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
