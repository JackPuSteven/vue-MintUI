## 这是一个 Vue-MUI 项目

## 制作首页 App 组件

1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbler 区域，使用的是 MUI 的 Tabbar.html

- 在制作购物车小图标的时候，操作会相对多一些：
- 先把扩展图标的 css 样式，拷贝到项目中
- 拷贝 扩展字体库的 ttf 文件到项目中
- 为购物车小图标，添加如下样式： mui-icon mui-icon-extra mui-icon-extra-cart

3. 要在中间区域放置一个 router-view 展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar, 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据

1. 获取数据，如何获取，使用 vue-resource
2. 使用 vue-resource 的 this.\$http.get 获取数据
3. 获取到的数据要保存到 this.data 身上
4. 使用 v-for 循环 渲染每个 item 项

## 改造区域的样式

## 改造新闻路由链接

## 新闻资讯，页面制作

1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯，列表点击 点击跳转到新闻详情

1. 把列表中的每一项改造为 router-link, 同时，在跳转的时候，应该提供唯一的 ID 标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现新闻详情 的页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件

1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中 ，先手动导入 comment 组件

- `import comment from './commment.vue'`

3. 在父组件中使用 ’compenents‘ 属性将刚才导入的 comment 注册为自己的子组件,父组件就是一个范围比较大的概念
4. 将注册子组件时候，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据，显示到页面中

## 实现点击加载更多评论的功能  
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多 让 pageIndex++ ，然后重新调用 this.getComments()方法 重新获取 最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况 我们在加载更多的时候，每当获取到新数据，应该让老数据 调用数组的 concat方法拼接新数组
