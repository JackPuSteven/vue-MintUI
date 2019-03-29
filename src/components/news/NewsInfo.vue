<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>

    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <!-- <div class="content">{{newsinfo.zhaiyao}}</div> -->

    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 导入评论子组件
import comment from "../subcomponents/Comment.vue";

export default {
  data() {
    //获取路由中的参数
    return {
      id: this.$route.params.id, //将URL地址中传递过来的 ID 值，挂载到data 上，方便以后调用
      newsinfo: {} //新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnew/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.newsinfo = result.body.message[0];
          } else {
            Toast("获取新闻失败！");
          }
        });
    }
  },

  components: {
    //注册子组件
    //用来注册子组件
    "comment-box": comment
  }
};
</script>


// 这里因为这个CSS类是自定义的，不会造成全局污染，所以scoped可以去掉
<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0; //上下 左右
    color: red;
  }

  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }

  .content {
    img {
      //图片
      width: 100%;
    }
  }
}
</style>