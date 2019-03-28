const path = require("path");

// 启用热更新的第2步
const webpack = require("webpack"); //导入webpack模块

// 导入在内存中生成HTML 页面的插件
// 只要是插件，都一定要放到 plugin中去
// 这个插件的两个作用：
// 1. 自动在内存中根据指定页面生成一个内存的页面
// 2. 自动 把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require("html-webpack-plugin");

// 这个配置文件，其实就是一个JS文件， 通过  Node 中的模块操作，向外暴露了一个配置对象
module.exports = {
    // 大家已经学会了举一反四了... 大家觉得，在配置文件中，需要手动指定 入口和出口
    entry: path.join(__dirname, "./src/main.js"), //入口表示 要使用 webpack 打包哪个文件
    output: {
        //输出文件相关的配置
        path: path.join(__dirname, "./dist"), //指定打包好的文件 输出到哪个目录中去
        filename: "bundle.js" //这是指定输出的文件的名称  通常是这个名字不用更改，配置文件用到多直接运行  webpack即可打包
    },

    // devServer: {
    //     //这是配置 dev-server 命令参数的第二种形式，相对来说麻烦一些,第二种方式的第1步
    //     open: true, //自动打开浏览器
    //     port: 3000, //设置我们启动时候的端口
    //     // contentBase: "src", //指定托管的根目录
    //     hot: true //启用热更新 的第一步
    // },
    plugins: [
        // 配置插件的节点  ，这是第3步
        // new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象，第3步

        new htmlWebpackPlugin({
            //创建一个在内存中 生成 HTML 页面的插件
            template: path.join(__dirname, "./src/index.html"), //指定模板页面，将来会根据指定的页面，去生成内存中的 页面
            filename: "index.html" //指定生成的页面的名称
        })
    ],
    module: {
        //这个节点，用于配置 所有第三方 模块加载器
        rules: [
            //所有第三方模块的匹配规则
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] //配置处理.css 文件的第三方 loader模块 规则，loader的调用规则是从右到左进行调用
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"] //配置处理 .less 文件的第三方loader规则
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"] //处理.scss文件的第三方 loader规则,最好是带-loader
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=80000&name=[hash:8]-[name].[ext]"
            }, //处理图片路径的loader ?进行传参  ?limit=76311字节数,
            // limit给定的值是图片的大小，单位是byte,如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的Limit的值，则会被转为base64的字符串
            // 第二个参数：&name=[name].[ext] 【解释：[name]表示之前是什么名，现在就是什么名，[ext]之前的什么后缀名，现在还是什么后缀名】
            // limit=80000&name=[name].[ext]  这句话同时写会导致当图片名称相同的时候，后面的图片会覆盖前面的图片，解决 - 哈希值，哈希值最多32位 [hash:8]意思就是哈希值：取前8位

            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }, //处理字体文件的loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, //配置babel 来转换高级的ES语法
            {test:/\.vue$/, use:'vue-loader'}
        ]
    },

    resolve : {//这是设置，Vue 被导入时候包的 路径 
        alias: { // 修改  设置vue 被导入时候的包的 路径
            // 'vue$' : 'vue/dist/vue.js '
        }
    }

};

// 当我们在 控制台 ，直接输入 webpack 命令执行的时候， webpack 做了以下几步：
// 1.首先， webpack 发现我们并没有通过 命令的形式，给它指定入口和出口
// 2. webpack 就会去 项目的根目录中查找一个叫做  “webpack.config.js ” 配置文件
// 3. 当找到配置文件后，webpack 会去解析这个 配置文件 当解析执行完配置文件后，就得到了配置文件中 导出的配置对象
// 4. 当 webpack拿到了 配置对象后 ，就拿到了配置对象中，指定的入口和出口，然后进行打包构建
// --hot参数好处：异步刷新页面以及局部更新bundle.js (指令，推荐的使用方法)第一种方式一行就ok了

// 把页面放到内存中去  cnpm i html-webpack-plugin -D