import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant和样式全部导入
import Vant from 'vant'
import 'vant/lib/index.css'
// 全局样式
import './styles/index.less'
// 设置页码基准值
import 'amfe-flexible'
// 加载 dayjs 初始化配置
import './utils/dayjs'
// 注册vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
