var path = require('path');
var webpack = require('webpack');
// var hot = 'webpack/hot/dev-server';

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
    plugins: [new webpack.optimize.MinChunkSizePlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: false,
    // entry: {
    //     index: [path.resolve(__dirname, 'src/examples/index.js')],
    //     domIndex: [path.resolve(__dirname, 'src/examples/domIndex.js')],
    //     domUtil: [path.resolve(__dirname, 'src/examples/domUtil.js')],
    //     domCore: [path.resolve(__dirname, 'src/examples/domCore.js')],
    //     domManipulationData: [path.resolve(__dirname, 'src/examples/domManipulationData.js')],
    //     domWrapData: [path.resolve(__dirname, 'src/examples/domWrapData.js')],
    //     domTravesing: [path.resolve(__dirname, 'src/examples/domTravesing.js')],
    //     domAttr: [path.resolve(__dirname, 'src/examples/domAttr.js')],
    //     domCss: [path.resolve(__dirname, 'src/examples/domCss.js')],
    //     domOffset: [path.resolve(__dirname, 'src/examples/domOffset.js')],
    //     domEvent: [path.resolve(__dirname, 'src/examples/domEvent.js')],
    //     domUiPosition: [path.resolve(__dirname, 'src/examples/domUiPosition.js')],
    //     domAnimate: [path.resolve(__dirname, 'src/examples/domAnimate.js')]
    // },
    entry: {//umd
        leoDom: [path.resolve(__dirname, 'src/dom/index.js')]
    },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].js' // 注意我们使用了变量
    // },
    output: {//umd
        path: path.resolve(__dirname, 'umd'),
        filename: '[name].js', // 注意我们使用了变量
        library: ["[name]"],
        libraryTarget: "umd"
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            include: path.join(__dirname, 'src'),
            loaders: ['babel?optional[]=runtime']
        }]
    }
};

module.exports = config;
