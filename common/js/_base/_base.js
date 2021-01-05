import _api from './_api.js'

class Base{
	constructor() {
	    
	}
	
	//设置本地缓存信息
	static async _setCache(_key,_data){
		return uni.setStorageSync(_key, _data);
	}
	
	
	//获取本地缓存信息
	static async _getCache(_key){
		return uni.getStorageSync(_key);
	}
	
	//请求api封装
	static _request_wxapi(_url,_data,_header = {},_method = 'POST'){
		return new Promise((resolve,reject) =>{
			uni.showLoading({
			    title: '加载中'
			});
			uni.request({
				url:_url,
				data:_data,
				header:_header,
				method:_method,
				success: async (res) => {
					uni.hideLoading();
					resolve(res)
				},
				fail: (res) => {
					uni.showLoading({
						title:'请求失败'
					})
					uni.hideLoading();
					resolve(false)
				}
			})
		}) 
	}
	
}

export default Base;