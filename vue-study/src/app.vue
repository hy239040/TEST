<template>
    <div class="app_container">
        <!-- 头部 -->
        <mt-header title="vue 项目" >
            <mt-button icon="back" v-show="flag" @click="back" slot="left" >返回</mt-button>
        </mt-header>

        <transition name="section">
            <router-view></router-view>
        </transition>


        <!-- 底部 跳转路由 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="my-tab-item " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="my-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="my-tab-item" to="/cart">
                <span class="mui-icon  mui-icon-extra mui-icon-extra-cart"><span
                        class="mui-badge">{{getBadge}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="my-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                flag: true
            }
        },
        created() {
            this.flag = this.$route.path === '/home' ? false : true;
        },
        watch: {
            '$route.path': function (newVal, oldVal) {
                newVal === "/home" ? this.flag = false : this.flag = true
            }
        },
        computed: {
            getBadge() {
                let total = 0;
                this.$store.state.cart.forEach(item => {
                    total += item.count
                })
                return total
            },
        },
        methods: {
            back(){
                this.$router.back()
            }
        },
    }
</script>

<style scoped lang="less">
    .section-enter {
        opacity: 0;
        transform: translateX(100%);
        overflow-x: hidden;
    }

    .section-enter-active,
    .section-leave-active {
        transition: all 0.8s ease;


    }

    .section-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .app_container {
        padding-bottom: 50px;
        overflow-x: hidden;
    }

    .mui-bar-tab .my-tab-item {
        display: table-cell;
        overflow: hidden;

        width: 1%;
        height: 50px;

        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: #929292;
    }

    .mui-bar-tab .my-tab-item.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .my-tab-item .mui-icon {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .my-tab-item .mui-icon~.mui-tab-label {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }

    .mui-bar-tab .my-tab-item .mui-icon:active {
        background: none;
    }
</style>