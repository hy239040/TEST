//配置路由

//1. 下载导入相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
//安装到vue中
Vue.use(VueRouter);
//2.导入相应的模板
import Login from './components/login.vue'
import Register from './components/register.vue'
import Person from './components/loginChild/person.vue'
import Vip from './components/loginChild/vip.vue'

//3.创建路由对象
const router = new VueRouter({
    routes:[
        {path:'/login',component: Login, children:[
                {path:'person', component: Person },
                {path:'vip', component: Vip },
            ]},
        {path:'/register/:id',component: Register},
    ]
});

//把路由对象暴露出去
// export default es6提供的
export default router