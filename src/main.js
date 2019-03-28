// 入口文件

import Vue from 'vue/dist/vue.js'
// 1.1  导入路由的包
import VueRouter from "vue-router"
// 1.2安装路由模块
Vue.use(VueRouter)

// 2.1 导入 vue-resource 
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)


// 按需导入Mint-UI 中的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

//  导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入 App 根组件
import app from './App.vue'

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'





var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,  //1.4挂载路由对象 到vm实例上
})