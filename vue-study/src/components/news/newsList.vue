<template>
  <div>
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsList/newsInFor/'+item.id" >
						<img class="mui-media-object mui-pull-left" :src= item.img_url>
						<div class="mui-media-body">
                                    <h3> {{item.title}}</h3>
                                <p>
                                    <span>发表时间:{{item.add_time |dataFormat('YYYY-MM-DD')}}</span>
                                    <span>点击次数:{{item.click}}</span>

                                </p>
							
						</div>
					</router-link>
				</li>
			
			</ul>
  </div>
</template>

<script>
export default {
    name:'newsList',
    data() {
        return {
            newsList:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('api/getnewslist')
                .then(res=>{
                        this.newsList=res.message
                })
        }
    }
}
</script>

<style lang='less' scoped>

.mui-media-body{
    h3{
        font-size: 14px;
    }
    p{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color:#226fff
    }
}
</style>