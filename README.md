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

1. getComment

## 实现点击加载更多评论的功能

1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多 让 pageIndex++ ，然后重新调用 this.getComments()方法 重新获取 最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况 我们在加载更多的时候，每当获取到新数据，应该让老数据 调用数组的 concat 方法拼接新数组

## 发表评论的功能

1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 检验评论内容是否为空，如果为空，则 Toast 提示用户 评论内容不能为空
4. 通过 vue-resource 发送 一个请求，把评论内容提交给服务器
5. 当发表评论 ok 后，重新刷新列表，以查看最新的评论

- 如果调用 getComments 方法重新刷新列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
- 换一种思路，当评论成功后，在客户端，手动拼接一个最新的评论对象，然后调用 数组的 unshift 方法把最新的评论，追加到 data 中 comments 的开头，这样就能完美实现刷新评论列表的需求

## 改造图片分享 按钮为 路由链接 并显示对应的组件的页面

## 绘制图片列表 组件页面结构，并美化样式

1. 制作顶部的滑动条
2. 制作底部的图片列表

## 制作顶部滑动条的坑们

1. 需要借助于 MUI 的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档发现，这是 JS 组件需要被初始化一下

- 导入 mui.js
- 调用官方提供的方式去初始化

```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```

4. 我们在初始化滑动条的时候，控制条报错：TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

- 经过推测，觉得可能是 mui.js 中用到了这三个东西，但是打包好的 bundler.js 中，默认启用了严格模式，所以，这两者冲突
- 解决方案： 1. 把 mui.min.js 的非严格 模式的代码改掉，但是不显示； 2. 把 webpack 打包时候的严格模式禁用掉；移除严格模式 2 种方式

5. 刚进入图片分享页面的时候，滑动条无法工作，经过分析，发现，如果要初始化，滑动条必须等 DOM 元素加载完毕，所以，把初始化滑动条的方法代码 搬到 mounted 生命周期函数中；
6. 当 滑动条调试 OK 后， 发现， tabbar 无法正常工作，这时候，我们需要把每个 tabbar 按钮的样式中的类‘mui-tab-item’重新改一下名字

7. 获取所有分类，并渲染分类列表

## 制作图片列表区域 懒加载技术

1. 图片列表需要使用懒加载技术，使用 Mint-UI 提供现成的组件 lazy-load
2. 根据 lazy-load 的使用文档 尝试使用
3. 渲染我们的图片列表数据

## 实现了图片列表的懒加载 改造 和 样式美化

## 实现了点击图片 跳转到图片 详情页面

1. 在改造 li 成 router-link 时，指定 tag 渲染成那种元素

## 实现详情页面的布局和美化，同时获取数据，渲染页面

## 实现图片详情中 缩略图 的功能

1. 使用插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. img class 属性不能去掉
4. 每个图片必须有 w 和 h 属性 但是版本改了 具体看官方文档才能做出缩略图

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上 进行项目的开发和预览和测试

1. 要保证手机正常运行；
2. 保证手机和电脑 处于同一 WIFI 环境中，也就是说，手机可以访问到电脑的 IP
3. 打开自己的项目中， package.json 文件 在 dev 脚本中添加一个 --host 指令，把当前电脑的主机 IP 的 WIFI ip 地址设置为 --host 的指令值；

- 如何查看自己电脑所处的 WIFI 的 IP 呢？ cmd 终端 ipconfig 查看无线网的 IP 地址 --host 172.23.232.1 (Total Control)

## 概念： Vuex 是 Vue 配套的 公共数据管理工具，它可以把一些共享 的数据，保存到 vuex 中， 方便整个程序中的任何组件直接获取或修改我们的公共数据

```
const store = new Vuex.store()
const router = new express.Router()
```
