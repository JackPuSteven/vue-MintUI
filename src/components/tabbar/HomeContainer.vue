<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 9宫格 到 6宫格的改造工程 -->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-home"></span> -->
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-email"> -->
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt>

          <!-- <span class="mui-badge">0</span> -->
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt>

          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-location"></span> -->
        <img src="../../images/menu4.png" alt>

        <div class="mui-media-body">留言反馈</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-search"></span> -->
        <img src="../../images/menu5.png" alt>

        <div class="mui-media-body">视频专区</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- <span class="mui-icon mui-icon-phone"></span> -->
        <img src="../../images/menu6.png" alt>

        <div class="mui-media-body">联系我们</div>
      </li>
    </ul>

    <!-- <h3>HomeContainer</h3> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/Swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          console.log(result.body);
          if (result.body.status === 0) {
            // 成功了
            this.lunbotuList = result.body.message;
            // Toast("加载轮播图失败！");
          } else {
            // 失败了
            Toast("加载轮播图失败！");
          }
        });
    }
  },
  created() {
    this.getLunbotu();
  },
  components: {
    swiper
  }
};
</script>


<style lang="scss" scoped>
// 在sass中这样写

// 六宫格的css  ul
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}

//
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
