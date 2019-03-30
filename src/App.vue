<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->

    <mt-header fixed title="我的小车·Vue项目"></mt-header>

    <!-- 中间路由 router-view区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 Tabber 区域 Ctrl+D同时选择-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>

        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

    <!-- <h1>APP.vue中的123</h1> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  overflow-x: hidden; //隐藏横向的滚动条
  padding-bottom: 50px;
}

// 从右侧进入，从左侧出去，所以要分开写,右边是正，左边是负的
.v-enter {
  opacity: 0;
  transform: translateX(100%);
  // position:absolute;  //位置是绝对的位置，不会发生元素的横移
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

// 改类名，解决 tabbar点击无法切换的问题
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mint-header {
  //提升头部的高度
  z-index: 99;
}

.mui-icon .mui-badge {
  background-color: red;
}
</style>