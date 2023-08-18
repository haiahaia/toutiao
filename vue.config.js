const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#007bff',
            // 'nav-bar-title-text-color': '@white'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, '/src/style/cover.less')}";`
          }
        }
      }
    }
  }
  // rules: [
  //   {
  //     test: /\.less$/,
  //     use: [
  //       // ...其他 loader 配置
  //       {
  //         loader: 'less-loader',
  //         options: {
  //           // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
  //           lessOptions: {
  //             modifyVars: {
  //               // 直接覆盖变量
  //               'nav-bar-background-color': '#007bff',
  //               'border-nav-bar-text-color': '#fff'
  //               // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
  //               // hack: `true; @import "your-less-file-path.less";`
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   }
  // ]
})
