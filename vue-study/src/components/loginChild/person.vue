<template>
    <div>
        <mt-header fixed title="固定在顶部"></mt-header>
        <button @click="show">点击</button>
    </div>
</template>

<script>
    //1. 导入toast组件
    // import { Toast } from 'mint-ui'
    export default {
        name: "person",

        methods:{
            show(){
                this.Toast({
                    message:"正确",
                    duration:5000,
                    position: 'top',
                    iconClass:'glyphicon glyphicon-ok'
                })
            },
            getData(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getprodlist')
                    .then(res => {
                        console.log(res)
                    })
            }
        },
        created(){
            this.getData();
        }

    }
</script>

<style scoped>

</style>