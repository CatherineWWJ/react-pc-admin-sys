# 项目技术栈

- create-react-app
- react hooks
- mobx
- antd v4
- axios
- react-router-dom + history
- react-quill富文本编辑器
- sass：css预编译器

# 使用scss预处理器

```
yarn add sass -D // 仅在开发环境中依赖，在生产环境中不依赖哦，相当于装在devDependencies中
```

> 注意：创建样式文件名的后缀是scss

# 配置路由

```
yarn add react-router-dom
```

# 组件库antd使用

```
yarn add antd
```

# 配置别名路径

借助**craco插件**帮忙进行webpack配置

```
yarn add -D @craco/craco
```

在根目录创建文件：craco.config.js（文件名称固定）

```
// 添加自定义对于webpack的配置

const path = require('path')

module.exports = {
    // webpack配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src文件所在路径
            '@': path.resolve(__dirname, 'src')
        }
    }
}
```

替换package.json（项目由该插件来接管）

```
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  }
```

# @别名路径提示

在根目录下创建文件 jsconfig.json（该文件是和vscode做配合的，不属于react和webpack）

```
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    }
}
```

# react项目调试工具

> chrome三个点 ---> 更多工具 ---> 扩展程序 ---> chrome应用商店：React Developer Tools

# 封装http工具模块

> 封装axios：实例化 + 2个拦截器

安装依赖包：

```
yarn add axios
```

# mobx登录模块

```
yarn add mobx mobx-react-lite
```

# 处理token失效

> 后端返回一个401的状态码

```
yarn add history
```

[在非组件中实现路由跳转](https://github.com/remix-run/react-router/issues/8264)（问题：在**常规**的js文件中使用**use之类**一系列的router的方法都是**失效**的！

# 使用echarts

```
yarn add echarts
```

# 项目打包

```
yarn build
```

## 项目本地预览

```
npm i -g serve
serve -s ./build  // 在项目根目录中执行
http://localhost:3000/     // 在浏览器中打开预览项目
```

## 打包体积分析

> 分析打包体积，才知道项目中哪部分内容体积过大，才知道如何优化

```
yarn add source-map-explorer
```

package.json中：添加命令

```
"scripts": {
	"analyze": "source-map-explorer 'build/static/js/*.js'"
}

// 'build/static/js/*.js'是想要进行分析的文件目录   *代表所有的意思
```

根目录下执行命令：

```
yarn analyze
```

## 优化-配置CDN

> 对第三方包使用CDN优化
>
> craco：在不破坏当前结构的基础下，进行webpack自定义配置

craco.config.js

```
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
```

index.html

```
<!-- 加载第三方包的 CDN 链接 
  
    这个代码写到head里有可能 也有可能写到body之上 取决于依赖dom完成生成
  -->


  <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL=> { %>
    <script src="<%= cdnURL %>"></script>
    <% }) %>
```

## 优化-路由懒加载

vue中：

```
// Vue 中箭头函数写法导入
() -> import('xxx')   // 好处：只有在真正用到这个文件的时候才导入进来
```

react中：第一次加载的时候都会显示loading，只有在真正用到的时候才会进行请求加载

App.js

```
import { lazy, Suspense } from "react"; // 导入必要的组件
// 按需导入组件
const Login = lazy(() => import('@/pages/Login/index'))
const Layout = lazy(() => import('@/pages/Layout/index'))
const Home = lazy(() => import("./pages/Home"))
const Article = lazy(() => import("./pages/Article"))
const Publish = lazy(() => import("./pages/Publish"))

<Suspense
    fallback={
       <div
           style={{
           textAlign: 'center',
           marginTop: 200
       }}>
          loading...
       </div>
    }>
      <Routes>
          ........
      </Routes>
</Suspense>
```

# 项目完结❀
