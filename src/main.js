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

// 注册vuex
import Vuex from "vuex"
Vue.use(Vuex)

// 每次进去网站 肯定会调用 main.js  在刚调用的时候  先从本地存储中  把购物车  的数据读取出来 放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { //this.$store.state.***   所以一开始就要把本地存储的数据加载到car中 防止刷新
        car: car, //购物车中商品的数据用数组 存储起来 在car数组中，存储一些商品的对象 我们可以暂时将这个商品对象  设计成这个样子： {id:商品的id, count: 要购买的数量, price: 商品的单价, selected:true(开关是否打开)}


    },
    mutations: { //this.$store.commit('方法的名称'，按需传递唯一参数) 
        addToCar(state, goodsinfo) {
            //  点击加入购物车，把商品信息保存到store 中的 car上
            // 分析：
            //  1. 如果购物车之前就已经 有对应的商品了 ，那么就只需要更新数量，
            // 2. 如果没有，直接把商品数据 Push 到 car中即可

            // 假设在购物车当中 没有找到 对应的商品
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            });

            //  如果最终循环完毕， 得到的flag 还是false 则把 商品的数据直接push 到购物车中
            if (flag == false) {
                state.car.push(goodsinfo)
            }
            // 当更新car   之后，把 car 数组存储到 本地 的localStorage 中,看google浏览器，持久化输出
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            });
            //  当修改完商品的数量，把最新的购物车数据保存到 本地存储中

            localStorage.setItem('car', JSON.stringify(state.car))



        },

        removeFromCar(state, id) {
            // 根据id，从Store 中的购物车中  删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1)
                    return true;
                }
            });

            // 将删除完毕后的购物车，最新的购物车数据，同步到本地 存储中 
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id === info.id) {
                    item.selected = info.selected
                }
            })

            // 把最新的 所有购物车 的数据商品状态保存到 store中去
            localStorage.setItem('car', JSON.stringify(state.car))



        }

    },
    getters: { //this.$store.getters.***
        // 相当于 计算属性 ，也相当于 filters 
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;

            });
            return c;
        },

        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })

            return o;
        },

        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;

            })
            return o;
        },

        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0, //勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) { //按钮被勾选了之后 
                    o.count += item.count;
                    o.amount += item.price * item.count
                }
            });

            return o;
        }
    }
})

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
    store, //挂载 store状态管理对象
})