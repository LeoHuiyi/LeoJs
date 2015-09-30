var path = require('path');
var webpack = require('webpack');
var hot = 'webpack/hot/dev-server';

// module.exports = function(config) {
//     return {
//         // watch: true,
//         //页面入口
//         entry: config.script.entry,
//         //出口文件输出配置
//         output: {
//             path: config.dest, //js位置
//             publicPath: config.dest, //web打包的资源地址
//             filename: config.script.name
//         },
//         module: { //加载器
//             loaders: [{
//                 test: /\.(js|jsx)?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
//                 include: path.join(__dirname, 'src'),
//                 loaders: ['babel']
//             }]
//         }
//     }
// }

var config = {
    entry: {
        LeoJs: [path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js' // 注意我们使用了变量
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            include: path.join(__dirname, 'src'),
            loaders: ['babel']
        }]
    }
};

module.exports = config;
