<template>
  <div>
    <!-- <h3>图片列表</h3> -->
    <!--  顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 类可以放数组，使用三元表达式-->
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active': '' ]"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <!-- 把 li 改成 router-link  因为Li绑定了css 所以指定tag属性进行渲染-->
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>



<script>
// 导入的时期很重要
// 1. 导入 mui 的 js 文件，但是这个文件很有问题
import mui from "../../lib/mui/js/mui.min.js"; //可能发生了冲突，不管了，要一个个改css tabbar的css有点麻烦，不搞这么多了

export default {
  data() {
    return {
      cates: [], //所有分类列表的数组
      list:[], //图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进去页面就主动请求所有图片的数据
    this.getPhotoListByCateId(0)
  },

  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(result => {
          if (result.body.status === 0) {
            //   手动拼接出一个最完整的分类列表
            result.body.message.unshift({ title: " 全部", id: 0 });
            this.cates = result.body.message;
          } else {
            Toast("获取数据失败！ ");
          }
        });
    },

    getPhotoListByCateId(cateId){
      // 根据分类ID 获取图片列表
      this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cateId).then(result =>{
        if(result.body.status == 0){
            this.list = result.body.message;
        }else{
          Toast("获取图片数据失败！")
        }
      })
    }
  },

  mounted() {
    //   如果要操作元素了，最好在mounted里面，因为，这个时候，的DOM元素是最新的
    //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>


<style lang="scss" scoped>
* {
  //touch-action 自己看文档去搞，只是提高流畅度而已，顺便不出警告
  touch-action: pan-y;
}



.photo-list{
    list-style:none;  //把li前面的小黑点去掉
    margin: 0;
    padding: 10px;
    padding-bottom: 0; //最底下多出了10px，所以在这里取消
  

    li{
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;   //图片之间的缝隙
      box-shadow: 0 0 9px #999;
      position: relative;  //图片位置要相对

      
      img{
         width: 100%;
          vertical-align: middle;  //图片不能对齐，有点丑..，图片问题有边界，解决图片边界问题
      }
      img[lazy=loading] { //懒加载千万不能改
      width: 40px;
      height: 300px;
      margin: auto;
    }

      .info{

        color:white;
        text-align: left; //居左
        position:absolute; //文字的位置是绝对的
        bottom: 0; //在底部文字在底部
        background-color:rgba(0,0,0,0.4);
        max-height: 84px;
        .info-title{
          font-size: 14px;

        }
        .info-body{
          font-size: 13px;
        }
      }
  }
}
</style>
