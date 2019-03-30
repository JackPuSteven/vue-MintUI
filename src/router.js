// 1. 导入  vue-router 包
import VueRouter from "vue-router"
// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import NewList from "./components/news/NewList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"

import PhotoList from "./components/photos/PhotoList.vue"
import PhotoInfo from "./components/photos/PhotoInfo.vue"

import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'

import GoodsDesc from './components/goods/GoodDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'





// 3. 创建路由对象

var router = new VueRouter({
  routes: [ //配置路由规则的
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/home/newslist',
      component: NewList
    },
    {
      // :id表示传递一个参数 【 & 】 进行连接
      path: '/home/newsinfo/:id',
      component: NewsInfo
    },
    {
      path: '/home/photolist',
      component: PhotoList
    },
    {
      path: "/home/PhotoInfo/:id",
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      component: GoodsInfo,
      name: "goodsinfo"
    },
    {
      path: '/home/goodsdesc/:id',
      component: GoodsDesc,
      name: 'goodsdesc'
    },
    {
      path: '/home/goodscomment/:id',
      component: GoodsComment,
      name: 'goodscomment'
    }


  ],
  linkActiveClass: 'mui-active', //覆盖默认的路由高亮的类，默认的类叫做： router-link-active
})

//  把路由对象暴露出去
export default router