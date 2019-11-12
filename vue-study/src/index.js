/* 


*/
import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
// 导入mui.css
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
// 导入自己的css
import './css/app.less'

// 导入mint-ui
import MintUI from 'mint-ui';

import {
    Toast
} from 'mint-ui'
Vue.prototype.toast = Toast;
Vue.use(MintUI)

import 'mint-ui/lib/style.min.css';

import moment from 'moment';

// 导入axios
import axios from 'axios';
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';
Vue.prototype.$axios = axios

import {Indicator} from 'mint-ui'
axios.interceptors.request.use(
    config =>{//请求成功函数
        // 显示提示框
        Indicator.open();
        return config;
    },
    err =>{//处理失败的函数
        return Promise.reject(err)
    }
);

//axios设置响应拦截器
axios.interceptors.response.use(
    response =>{// 响应成功
        // 关闭提示框
        Indicator.close();
        return response;
    },
    err =>{
        return Promise.reject(err)
    }
)

// 导入封装好了的axios

import {get,post} from './utils/api.js';

Vue.prototype.$http={
    get,post
}

import mui from './lib/mui/js/mui.js'
Vue.prototype.mui = mui;

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 1.导入vuex
import Vuex from 'vuex';
// 2.注册到vue上
Vue.use(Vuex)
// 3.注册仓库
let cart = JSON.parse(localStorage.getItem('cart') || '[]')
const store = new Vuex.Store({
    state: {
        cart: cart
    },
    mutations: {
        // 1. 点击加入购物车,把信息存在cart中
        addToCart(state, goodsList) {
            let flag = true;
            state.cart.some(item => {
                if (item.id == goodsList.id) {
                    item.count += parseInt(goodsList.count)
                    flag = false;
                    return true;
                }
            })
            if (flag) {
                state.cart.push(goodsList);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        // 根据id删除
        removeID(state, id) {
            state.cart = state.cart.filter(item => {
                return item.id != id;
            })
            //更新本地缓存
            localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        // 更新状态
        updateSelected(state, obj) {
            state.cart.some(item => {
                if (item.id == obj.id) {
                    item.selected = obj.selected;
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        getNum(state, obj){
            state.cart.some(item => {
                if (item.id == obj.id) {
                    item.count = obj.num;
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    getters: {
        // 徽标
        
        // 根据id获取对应的数量
        getCountById(state) {
            let num = {};
            state.cart.forEach(item => {
                num[item.id] = item.count
            })
            return num
        },
        // 默认选中
        getSwitch(state) {
            let swith={}
            state.cart.forEach(item => {
                swith[item.id] = item.selected
            })
            return swith

        },
        //计算商品的总价和数量
        getGoods(state) {
            let totalObj = {
                amount: 0, //数量
                sum: 0 //总价
            }

            state.cart.forEach(item => {
                if (item.selected) {
                    totalObj.amount += item.count;
                    totalObj.sum += item.count * item.price

                }
            })
            return totalObj;
        }
    },

})



// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: {top: 0, bottom: 0},
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
//   })
// 配置全局过滤器
// moment(需要格式化的事件).format(时间格式)
Vue.filter('dataFormat', function (data, pattern = 'YYYY-MM-DD hh:mm:ss') {
    return moment(data).format(pattern)
});
// 设置一个公共的路径

new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store

})

/* 
    vuex的概念: 是一个全局的共享数据,存储数据, 相当于操作数据仓库

    data: 操作内部组件的数据
    props: 父传子定义的数据
    vueX: 操作公共的数据



*/