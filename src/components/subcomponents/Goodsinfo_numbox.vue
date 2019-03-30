<template>
  <!-- 因为数据是异步请求的数据可能会 undefined，所以我们并不知道什么时候能能够拿到max 值 但是总归 有一刻会得到 max值 -->
  <!-- 监听 max  watch.....就可以了....，我们使用watch属性监听来监听这个父组件，监听 max 不管max 会被触发几次但是最后一次肯顶是 max值 -->
  <!-- :data-numbox-max="max"  自己看官方文档 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 分析：子组件什么时候把 数据传递给父组件  思路：每当点击 + / - 就把值传递给 购物车组件，并更新数值 也就是说要绑定三个事件  ==》  本质就是文本框变化了 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    //MUI防止抽风
    // 初始化数字选择框
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
    countChanged() {
      //这里是子组件向父组件传值
      //   每当数据被修改，立即 把最新的数据通过事件机制调用，传递给父组件
      //   console.log(this.$refs.numbox.value );  //向父组件传值方法父组件
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    //属性监听, 这里复习回顾....
    max: function(newVal, oldVal) {
      // 使用JS api 设置  numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


