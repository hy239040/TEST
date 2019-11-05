<template>
    <div>
        登录
        <h1 class="box">{{title}}</h1>
        <h2>接收参数: {{ this.$route.query }}</h2>

        <!--3.调用组件名-->
        <banner></banner>

        <router-link to="/login/person">普通</router-link>
        <router-link to="/login/vip">vip</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    //1. 导入子模板
    import banner from './public/banner.vue'
    //相当于在组件中配置相关参数
    export default {
        name: "login",
        components:{
            //2. 将模板名注册到组件上
            //banner : banner
            banner
        },
        data(){
            return {
                title:"这是一个标题"
            }
        },
        created(){
            this.show();
        },
        methods:{
            show(){
                console.log('ok');
            }
        }
    }
</script>

<style scoped lang="scss">
    /*
    1. scoped : 用来局限自己的样式. 不影响其他模板
    2. lang="less" : 通过lang属性设置你规定好的样式语法
    */
    div{
        background: palegoldenrod;
        h1{
            color: pink;
        }
    }
</style>