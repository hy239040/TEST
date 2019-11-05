
//1. 在webpack所构建的环境中开发vue
//① 下载  npm i vue
//② 导入
//报错 : 导入的不是vue.js, 说明功能不完善, 是能使用runtime-only方法
//解决: 可以写正确的路径, 不提倡
// import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue'
import App from './app.vue'
import router from  './router.js'

//导入mint-ui
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI);

//按需引入相关模块
import { Button,Header , Toast } from 'mint-ui'
// import { Toast } from 'mint-ui'
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.prototype.Toast = Toast;

//导入axios模块
import axios from 'axios'
Vue.prototype.$axios = axios;


//导入bootstrap
import 'bootstrap/dist/css/bootstrap.css'




new Vue({
    el:'#app',
    data:{
        msg: "ok"
    },
   //通过render函数渲染
    render:  (c) => c(App),
    //5.挂载到vm实例上
    router
})