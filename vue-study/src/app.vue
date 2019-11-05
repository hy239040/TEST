<template>
    <div>
        <router-link to="/login?id=10&name=xiaoming">登录</router-link>
        <router-link to="/register/1001">注册</router-link>
        <!--配置路由的第六步 : 占位-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style scoped>

.box{
    color: green;
    background: #CCCCCC;
}
</style>