import  _api from '../../js/_base/_api.js';
import  _base from '../../js/_base/_base.js';

class Login {
	constructor() {
	}
	//获取微信登录凭证code 
	_getLoginCode(){
		return new Promise((resolve,reject)=>{
			uni.login({
				provider: 'weixin',
				success:function (loginRes) {
					if(loginRes.errMsg == 'login:ok'){
						 // 获取用户信息
						    uni.getUserInfo({
						      provider: 'weixin',
						      success: function (infoRes) {
						        console.log(infoRes);
						      }
						    });
						//将code返回
						resolve(loginRes.code)
						return;
					}
					console.log('授权失败')
					resolve('')
				}
			})
		})
	}
	
	 _wx_check_login(){
		 return new Promise((resolve,reject)=>{
			 uni.checkSession({
				 success() {
				 	resolve(true)
				 },fail() {
				 	resolve(false)
				 }
			 })
		 })
	 }
	
	//code提交到后台  _siteId 站点ID
	 async _wx_Login(mustInit = false){
		
		let is_online = await this._wx_check_login();
		let userInfo = await _base._getCache('userInfo');
		//授权登录
		if((is_online === false || userInfo.data == undefined || userInfo.data.length == 0) || mustInit == true){
			let code  = await this._getLoginCode()
			console.log(code)
			let _response  = await _base._request_wxapi(
				_api.host_api+_api.login_api_url,
				{code:code},
			)
			//缓存用户信息
			_base._setCache('userInfo',_response.data)
			return  _response.data
			
		}else{
			//token登录
			let _data = {};
			let _header = {token:userInfo.data.token}
			let _response  = await this._wx_token_Login(_data,_header)
			//缓存用户信息
			_base._setCache('userInfo',_response.data)
			return  _response.data
		}
	}
	
	//token登录
	async _wx_token_Login(_data,_header){
		return await _base._request_wxapi(
			_api.host_api+_api.tokenlogin_api_url,
			_data,
			_header
		)
	}
	
}

export default Login;

