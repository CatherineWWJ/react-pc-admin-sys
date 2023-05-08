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

# 学习进度：P118
