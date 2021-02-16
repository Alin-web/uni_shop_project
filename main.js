import Vue from 'vue'
import App from './App'
// 引入api.js 进行request的二次封装
import {myRequest} from './util/api.js'
Vue.config.productionTip = false
// 定义全局过滤器
Vue.filter('formData',date=>{
	const time = new Date(date);
	let y = time.getFullYear();
	let month = time.getMonth() + 1;
	let m = month.toString().padStart(2, 0);
	let d = time.getDate().toString().padStart(2, 0);
	return y + '-' + m + '-' + d;
})

// 挂载到全局
Vue.prototype.$http = myRequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
