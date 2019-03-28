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
