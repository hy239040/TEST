import Vue from "vue";
import VueRouter from "vue-router";
// 安装路由模块
Vue.use(VueRouter);

// 导入模板
import Home from "./components/tabBar/home.vue";
import Member from "./components/tabBar/member.vue";
import Cart from "./components/tabBar/cart.vue";
import Search from "./components/tabBar/search.vue";
import NewsList from "./components/news/newsList.vue";
import NewsInFor from "./components/news/newsInFor.vue";
import PhotoTXT from "./components/share/photoTXT.vue";
import PhotoInFor from "./components/share/photoInFor.vue";

import GoodsList from "./components/goods/goodsList.vue";
import GoodsInFor from "./components/goods/goodsInFor.vue";
// 配置路由, 把路由对象倒出去

import Particulars from "./components/goods/particulars.vue";
import GoodsComment from "./components/goods/goodsComment.vue";
export default new VueRouter({
    routes: [
        {path: "/",redirect: "/home"},
        { path: "/home",component: Home},
        {path: "/Member",component: Member},
        {path: "/Cart",component: Cart},
        {path: "/Search",component: Search},
        {path: "/home/newsList",component: NewsList },
        {path: "/home/newsList/newsInFor/:id",component: NewsInFor},

        { path: "/home/photoTXT",component: PhotoTXT},
        {path: "/home/photoTXT/photoInFor/:id",component: PhotoInFor},

        {path: "/home/goodsList",component: GoodsList},
        {path: "/home/goodsList/goodsInFor/:id",component: GoodsInFor},
        {path: "/home/goodsList/particulars/:id",component: Particulars},
        {path: "/home/goodsList/goodsComment/:id",component: GoodsComment}
    ],
    linkActiveClass: "mui-active"
});

/*
    注意:区分$route和$router两个对象
    $route是路由参数对象: params, query
    $router路由导航对象: 相当于可以使用js来实现路由的前进，后退，跳转

    1.法一:传路由地址
        this. $router. push('/home/ goodsInfo/” + id);
    2.法二:传路由对象, 也是根据path路径传的
        this. $router. push({path:‘, home/ goodsInfo/' + id});
        
    3. 法三:通过命名的路由跳转, 给路由加名字, 使用name属性
        this.$router.push({name:'goodsInFor',params:{id: id}})



*/