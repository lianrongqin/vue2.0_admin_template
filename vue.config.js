'use strict';
const path = require('path');
const config = require('./config');

let assetsDir = 'static';
// if (config.AppPathPrefix) {
//   assetsDir = config.AppPathPrefix  + '/' + assetsDir;
// }

// 方便发布时同时编译不同环境
const distDir = (function getDistDir() {
  const distDirs = ['stg', 'dev'];
  let r = 'dist_web';
  const lastArgv = process.argv[process.argv.length - 1];
  let i = 0;
  if (lastArgv && (i = distDirs.indexOf(lastArgv)) > -1) {
    r = r + '_' + distDirs[i]
  }
  return r;
})();


function resolve(dir) {
  return path.join(__dirname, dir);
}

var configureWebpack = {
  optimization: {
    runtimeChunk: {
      name: assetsDir + '/js/manifest',
    },
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      maxSize: 512 * 1024,
      minSize: 20 * 1024,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10,
        },
        // 处理异步chunk
        'async-vendors': {
          name: 'async-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: 15,
        },
        febs: {
          name: "febs.dll",
          priority: 20,
          test: /[\\/]node_modules[\\/]febs.*[\\/]/
        },
        components: {
          name: "components.dll",
          priority: 20,
          test: /[\\/]src[\\/]components.*[\\/]/
        }
      },
    }
  }
};

if (process.env.NODE_ENV != 'development') {
  configureWebpack.output = {
    filename: '[name].[hash:7].js'
  }
}

module.exports = {
  outputDir: 'dist_web',
  publicPath: '/',
  assetsDir: assetsDir,
  filenameHashing: true,
  productionSourceMap: process.env.NODE_ENV == 'development',
  devServer: {
    host: config.Host,
    port: config.Port,
    // https: true,
    // proxy: config.Proxy
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/index.scss"'
      },
      scss: {
        prependData: '@import "~@/styles/index.scss";'
      }

    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'webstatic/images/favicon-32x32.png',
      favicon16: 'webstatic/images/favicon-16x16.png'
    }
  },
  transpileDependencies: [
  ],

  chainWebpack: config => {

    config.resolve.alias
      .set('@', resolve('./src'))
      .set('febs', 'febs-browser')
      .set('assets', resolve('src/assets'))
      .set('ext', resolve('./ext'))

    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/assets/svgs'))
      .end();

    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svgs')) // 处理svg目录
      .end()
      .exclude
      .add(resolve('src/styles'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

    config
      .module
      .rule("images")
      .test(/\.(jpg|png|gif)$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        publicPath: '/' + assetsDir + '/images',
        outputPath: assetsDir + '/images',
        name: '[name]_[hash:7].[ext]',
        limit: 1024
      })
      .end();
  },

  configureWebpack,
};
