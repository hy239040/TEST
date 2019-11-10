<template>
    <div>
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id===0?'mui-active':'']" 
                v-for="item in photoData" :key="item.id" 
                @click="get(item.id)"
                >
                    {{item.title}}
                </a>
                
            </div>
        </div>
        <ul class="photolist">
            <li v-for="item in imges" :key="item.id">
                <router-link :to="'/home/photoTXT/photoInFor/'+item.id">
                    <!-- v-lazy:是mint-ui 的懒加载 -->
                    <img v-lazy="item.img_url" alt="">
                    <div>
                        <h4>{{item.title}}</h4>
                        <span>{{item.zhaiyao}}</span>
                    </div>
                </router-link>
               
            </li>
        </ul>
    </div>

</template>

<script>
    //报错:可能严格模式下不能使用mui中的caller, arguments等 属性
    //解决: 1.改mui的源码2. 把项目中的严格忽略掉

    export default {
        name: 'photoTXT',
        data() {
            return {
                photoData: [],
                active:0,
                imges:[]
            }
        },

        created() {
            this.getPhotoTXT();
            this.get(0);
        },
        mounted() {
            this.mui(".mui-scroll-wrapper").scroll({
                scrollX: true,
            })

        },
        methods: {
            getPhotoTXT() {
                this.$axios.get('/api/getimgcategory')
                    .then(res => {
                        if (res.data.status === 0) {
                            this.photoData = res.data.message
                            this.photoData.unshift({
                                title: "全部",
                                id: 0
                            })
                        }
                    })
            },
            getPhotoList(){
                this.$axios.get('api/ getimages/0')
                    .then(res => {
                        if (res.data.status === 0) {
                            this.imges = res.data.message
                            
                        }
                    })
            },
            get(id){
                this.$axios.get('api/getimages/'+id)
                .then(res =>{
                    if (res.data.status === 0) {
                        this.imges=res.data.message 
                    }
                })
            }
            
        }
    }
</script>

<style scoped lang='less'>
    ul {
        padding: 0 10px 30px;
        margin-bottom: 40px;
        margin-top: 10px;

        li {
            list-style: none;
            position: relative;
            border-radius: 30px;
            margin: 10px 0;
            img {
                width: 100%;
                display: block;
            }
            img[lazy=loading] {
                width: 40px;
                height: 400px;
                margin:auto;
            }

            div {
                color: white;
                position: absolute;
                z-index: 1;
                bottom: 10px;
                background-color: #666;
                opacity: 0.7;
                padding: 5px;
            }
        }
    }
</style>