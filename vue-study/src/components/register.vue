<template>
    <div>
        注册
        <h2 @click="getData">你接受到的参数 : {{ this.$route.params }}</h2>
        <banner :fromfather="father" @fn="getData"></banner>
    </div>
</template>

<script>
    /*导入公共的子组件*/
    import banner from './public/banner.vue'
    // import { Toast } from 'mint-ui'
    export default {
        name: "register",
        data(){
            return {
                father:"小头爸爸"
            }
        },
        methods:{
            getData(data){
                console.log("这是父亲的方法, 也拿到了子传递过来的数据:"+data);
                // this.Toast('ok')
            }
        },
        components:{
            banner
        }
    }
</script>

<style scoped>

</style>