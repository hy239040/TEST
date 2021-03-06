## vue-study

#### 1.项目介绍	

这个项目是对vue进行实战训练，利用vue框架搭建一个电商平台。平台主要是提供一些新闻资讯和电子商品。

#### 2.起步

1. webpack.config.js文件中搭建好脚手架
2. npm install package.js中的所有依赖包
3. 创建 index.html 作为打开页面的入口，指定一个区域，作为 MVVM 中的 V
4. 创建 index.js 实例化一个 vm 对象，控制 index.html 的指定区域(也就是V)；
   1. 同时导入项目需要的文件，
   2. 将 router 也挂载到该 vm 实例上
   3. 将该实例在 index.html 指定区域渲染`render:createEle => createEle(App),`
5. 创建 router.js 导入项目所有的路由模块，并配置对应的路由规则，同时导出该路由对象
   1. 由于该路由模块依赖于 Vue ,所以`Vue.use(VueRouter)`
   2. 创建好的路由必须导出，`export default new VueRouter({routes:[路由规则]})`
6. 创建 app.vue 作为所有 vue 路由的主模板，将所有路由在主模板上渲染，同时公共的头部和tabbar部分都渲染在app.vue
7. axios接口：http://www.liulongbin.top:3005/；

#### 3.设置公共部分

1. 导入`axios`用来请求动态获取的数据，并且设置公共的路径

```javascript
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios
```

2. 由于模块中多次用到不同的时间格式，通过`moment.js`插件配置全局的时间过滤器

```javascript
import moment from 'moment'
Vue.filter('time',(date,arg='YYYY-MM-DD hh:mm:ss')=> moment(date).format(arg))
```

3. 由于多个页面都引用了评论功能，创建公共的评论组件，在各个模块分别引用
4. 创建轮播图组件，在需要的模块中单独引用

#### 4.处理路由

1. 由于app.vue有四个分页，所以分别创建四个路由模块，表示四个分页，在 `router.vue`导出对应模板，同时配置路由规则。
2. 将`home.vue`默认为主页面，所有通过主页跳转的路由模块，配置对应的路由路径，设置为`/home/xxx`与其他页面跳转的路由作为区分



#### 5.功能介绍

（只搭建了首页的部分功能和购物车部分）

##### 1.首页

- 充当移动端入口静态的
- 搭建页面主体架子

 具体到页面功能：
 	1.顶部通栏
 	2.轮播图
 	3.导航栏
 	4.底部页签

1.关于导航栏跳转

**I.新闻资讯**：由各个新闻组成的列表，点击可以查看详细新闻

- 新闻详细：利用路由传id，可以看不同的新闻，里面可以评论，利用了axios接口请求



**II.图文分享**：利用axios接口，渲染在页面上，点击顶部导航栏，显示不同的图文，懒加载。

- 图文详细：利用路由传id，可以看不同的图文，里面可以评论。



**III.商品列表**：利用axios接口，渲染在页面上。

- 商品详情：利用路由传id，可以看不同的商品，可以添加到购物车，选择数量。
  - 图文介绍：可以看到商品的规格
  - 商品评论：也是根据id查看不同商品的评论，也可以发表

##### 2.购物车

从商品详情添加的商品信息都存放在购物车里，主要功能展示、添加、编辑、删除



#### 6.处理兼容性

在引用mui组件中的横向区域滑动时，出现区域滑动与底部导航栏出现冲突问题，

```javascript
// 报错，可能是严格模式下不能使用mui，可以将严格模式移除 npm install babel-plugin-transform-remove-strict-mode
// .babelrc文件下修改配置{"plugins": ["transform-remove-strict-mode"]}
// import mui from "./lib/mui/js/mui.js";
// Vue.prototype.mui = mui;
```

同时更改底部导航栏的mui类名，自定义一个类名。将原类名下的样式重新设置给新的类名，使其依然保留mui的原有样式。



### 