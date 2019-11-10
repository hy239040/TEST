<template>
  <div class="cmt_container"> 
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你要评论的内容(最多吐槽100字)" maxlength="100" v-model="msg"></textarea>
        <mt-button type="primary" size='large' @click="postComments" >发表评论</mt-button>

        <div class="list">
              <div class="list_item" v-for="(item, i) in comments" :key="item.id">
                <div class="list_title">
                      <span>第{{i+1}}楼用户: {{item.user_name}}</span> 
                      <span>发表时间: {{item.add_item | dataFormat}}</span>
                      
                </div>
                <div class="item_content">
                      {{item.content ? item.content:'此用户没有评论'}}
                </div>
              </div>
        </div>
        <mt-button type="danger" plain size="large" @click="getMove">加载跟多</mt-button>
  </div>
</template>

<script>
export default {
    name:'comment',
    props:['id'],
    data() {
      return {
        pageindex:1,
        comments:[],
        msg:''
      }
    },
    created(){
      this.getComments()
    },
    methods:{
      getComments(){
        this.$axios.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
          .then(res =>{
            if (res.data.status===0) {
                this.comments=this.comments.concat(res.data.message);
            }
          })
      },
      postComments(){
        if (!this.msg.trim()) {
          return this.toast("内容不能为空!")
        }
        this.$axios.post('api/postcomments/'+this.id,{
          content:this.msg.trim()
        })
          .then(res =>{
                if (res.data.status===0) {
                      this.getComments()
                      this.msg='';
                }
                
          })
      },
      getMove(){
            this.pageindex++;
            this.getComments();
      }
    }
}
</script>

<style scpoed lang='less'>
      .cmt_container{
        // padding: 10px;
        h3{
          font-size: 16px;
          padding: 10px 0;

        }
        .list{
          .list_item{
            margin: 10px 0;
            .list_title{
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                color:#fff;
                border-bottom: 1px solid #3333;
                padding: 10px 2px;
                background-color: #929292;
            }
            .item_content{
              padding: 10px 0;
            }
          }
        }
      }
</style>