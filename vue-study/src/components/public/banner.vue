<template>
    <div>
        <h1>轮播图容器</h1>
        <h2>父亲传递过来的数据是: {{ fromfather }}</h2>
    </div>
</template>

<script>
    export default {
        name: "banner",
        //直接当前data来使用le, 仅限于只读
        props:['fromfather'],
        data(){
            return {
                son:"大头儿子"
            }
        },
        created(){
            this.show();
        },
        methods:{
            show(){
                this.$emit('fn', this.son)
            }
        }
    }
</script>

<style scoped>

</style>