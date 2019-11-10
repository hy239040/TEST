<template>
   <div>
       <com-box :id="id"></com-box>
   </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    name:'goodsComment',
    data() {
        return {
        id:this.$route.params.id,
            
        }
    },
    components:{
        "com-box":comment
    },
}
</script>

<style>

</style>