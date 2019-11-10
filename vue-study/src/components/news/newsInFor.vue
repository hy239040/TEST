<template>
  <div>

       <div v-for="item in newsData" :key="item.id" class="txt">
           <h3>{{item.title}}</h3>
           <p><span>发表时间:{{item.add_time|dataFormat}}</span> <span>点击次数: {{item.click}}</span></p>
           <div v-html="item.content" class="main"></div>
       </div>

       <comment :id='id'></comment>
  </div>
  
</template>

<script>
import comment from '../subcomponents/comment.vue';
export default {
    name:'newsInFor',
    data() {
        return {
            newsData:{},
            id:this.$route.params.id
        }
    },
    created(){
        this.getNewsData()
    },
    components: {
        comment
    },
    methods:{
        getNewsData(){
            
            this.$axios.get('/api/getnew/'+this.id)
                .then(res=>{
                    if (res.data.status===0) {
                        this.newsData=res.data.message

                    }
                })
        }
    }
}
</script>

<style scoped lang='less'>
.txt{
    padding: 10px;
    h3{
        font-size: 16px;
        color:red;
        padding: 10px 0;
    }
    p{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color:#226fff;
        border-bottom: 1px solid #3333;
    }
    .main{
        p{
        color:#333;
            
        }
    }
}

</style>