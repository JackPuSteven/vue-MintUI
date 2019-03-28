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
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					</span><span class="mui-badge">0</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    
    <h1>APP.vue中的123</h1>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.app-container{
  padding-top:  40px; 
	overflow-x: hidden;  //隐藏横向的滚动条
}

// 从右侧进入，从左侧出去，所以要分开写,右边是正，左边是负的
.v-enter{
		opacity: 0;
		transform: translateX(100%);
		// position:absolute;  //位置是绝对的位置，不会发生元素的横移
}

.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position:absolute;
}

.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;

}
</style>