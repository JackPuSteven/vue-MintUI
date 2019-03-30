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

// 时间过滤...不想自己写，找现成的 ==>  moment 包，需要安装一下
// 导入格式化时间的插件
import moment from "moment"

// 请求目录的根路径
// Vue.http.options.root = 'http://www.liulongbin.top:3005/'
// 全局设置 post 时候，表单数据格式组织的形式




Vue.http.options.emulateJSON = true;

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})


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


//  安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)





var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router, //1.4挂载路由对象 到vm实例上
})