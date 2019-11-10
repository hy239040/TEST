<template>
  <div>
    <div class="photoinfo-container">
      <h3>{{imgData.title}}</h3>
      <p class="subtitle">
        <span>发表时间:{{imgData.add_time|dataFormat}}</span>
        <span>点击次数: {{imgData.click}}</span>
      </p>
    </div>
    <hr />
    <div class="thumbs">
      <vue-preview :slides="list" @close="handle"></vue-preview>
    </div>

    <div class="main" v-html="imgData.content"></div>

    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  name: "photoInFor",
  data() {
    return {
      id: this.$route.params.id,
      imgData: {},
      list: []
    };
  },
  created() {
    this.getimageInfo();
    this.getThumImages();
  },
  methods: {
    getimageInfo() {
      this.$axios.get("api/getimageInfo/" + this.id).then(res => {
        if (res.data.status === 0) {
          console.log(res);

          this.imgData = res.data.message[0];
        }
      });
    },
    getThumImages() {
      this.$axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          result.data.message.forEach(item => {
            item.w = 600;
            item.h = 600;
            item.msrc = item.src;
          });
          this.list = result.data.message;
        }
      });
    },
    handle() {}
  },
  components: {
    // 注册 评论子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .main {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>