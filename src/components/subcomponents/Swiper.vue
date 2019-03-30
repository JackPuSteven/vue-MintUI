<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for循环的时候必须说过 key -->
      <!-- 将来，谁使用 此轮播图组件，谁为我们传递 lunbotulist -->
      <!-- 此时Lunbotulist  应该是父组件 向子组件传值的来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <!-- 想让图片当做表表达式计算，v-bind : -->

        <!-- 样式是否使用------》》》》day1 的内容 看一下样式怎么用 -->
        <img :src="item.img" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析为什么商品评论中的 轮播图这么丑  ： -->
  <!-- 1.  首页中的 图片 宽和高都使用 100% -->
  <!-- 2. 在商品详情页面中 轮播图的图片，如果也使用 宽高为 100% ，页面不好看 -->
  <!-- 3. 商品详情页面中的轮播图 期望是 高度为 100%  但是宽度为 自适应 -->
  <!-- 4. 经过分析得出原因 ： 首页中的轮播图 和 详情中的轮播图 分歧点是： 宽度到底是100% 还是自适应 -->
  <!-- 5， 既然这两个轮播图 其他方面都是没有冲突的，只是宽度有问题 那么我们可以定义一个属性让 使用轮播图的调用者 手动指定 是否为100%的宽度 -->
</template>


<script>
export default {
  props: ["lunbotuList", "isfull"]
};
</script>


<style lang="scss" scoped>
// 轮播的CSS
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    &:nth-child(1) {
      background-color: white;
      //   height: 60%;
    }
    &:nth-child(2) {
      background-color: white;
      //   height: 60%;
    }
    &:nth-child(2) {
      background-color: white;
      //   height: 60%;
    }

    img {
      // width: 100%;
      height: 100%;
    }

    .full {
      width: 100%;
    }
  }
}
</style>