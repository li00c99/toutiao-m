# toutiao_m

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 移动端适配方案，先安装amfe-flexible
main.js import amfe-flexible 导入 amfe-flexible
### 安装指定版本 npm i postcss-pxtorem@5.1.1 --save-dev 
创建.postcssrc.js 粘贴下列代码
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
}
