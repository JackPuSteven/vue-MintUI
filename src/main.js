// 入口文件

import Vue from 'vue/dist/vue.js'


// 按需导入Mint-UI 中的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

//  导入MUI的样式
import './lib/mui/css/mui.min.css'

// 导入 App 根组件
import app from './App.vue'





var vm = new Vue({
    el: "#app",
    render: c => c(app)
})