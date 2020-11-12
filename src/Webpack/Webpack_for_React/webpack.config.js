// 先导入插件 html-webpack-plugin,为了把首页也托管到内存中
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') // 导入在内存中自动生成 index 页面的插件
// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件路径，__dirname表示当前配置文件所在目录
    filename: 'index.html' // 生成内存中首页的名称
})

// 向外暴露一个配置对象；
// exports是node语法，因为webpack是基于node构建的
module.exports = {
    mode: 'development', // development是开发版本 production是产品版本
    plugins: [
        htmlPlugin // 设置都放在外面，显得简洁
    ],
    module: { // 所有第三方模块的匹配规则，webpack默认只能打包后缀.js文件，其他类型都无法直接处理，所以需要配置
        rules: [ // 第三方匹配规则
            // 如果 use 多个方法，要用数组把多个方法包起来
            // 一定要用exclude添加排除项： node_modules 文件，不然会报错
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: { // resolve 在 module.exports中与 module平级
        extensions: ['.js', '.jsx', 'json'], // 表示这几个文件名的后缀可以省略不写, 其中.js和.json是默认可省略的
        alias: {
            '@': path.join(__dirname, './src') // 这样，@ 就表示项目根目录中 src 的这一层路径
        }
    }
}