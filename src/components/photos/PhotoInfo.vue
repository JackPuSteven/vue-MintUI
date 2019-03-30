<template>
  <div class="photo-container">
    <h3>图片详情</h3>
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击次数：{{photoinfo.click}}次</span>
    </p>
    <hr>

    <!-- 缩略图区域  用法变了   vue2-preview  插件-->

    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      >
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置现成的组件，评论子组件 已经写了.... -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
//   1. 导入评论子组件
import comment from "../subcomponents/Comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的 图片Id
      photoinfo: {}, //图片详情
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    // 获取图片的详情
    getPhotoInfo() {
      // 这里一定要this的id ，因为取消的严格模式
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.photoinfo = result.body.message[0];
          } else {
            Toast("数据获取失败");
          }
        });
    },

    getThumbs() {
      // 获取缩略图
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            // 补全图片宽和高
            result.body.message.forEach(item => {
              //数据不完整，需要改造
              item.w = 600;
              item.h = 400;
            });
            console.log("哈哈哈哈哈");
            // 把完整的数据保存到List中
            this.list = result.body.message;
          } else {
            Toast("获取数据失败！");
          }
        });
    }
  },
  components: {
    //注册子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex; //两边对齐
    justify-content: space-between; //两边对齐， 两个用的多
    font-size: 13px;
  }
  .content {
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