import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { DatetimePicker, Dialog, Image, Divider, Loading, NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, CellGroup, Tag, List, PullRefresh, ActionSheet, Popup, Col, Row, Badge, Search } from 'vant'

// 引入vant组件
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Divider)
Vue.use(Loading)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(List)
Vue.use(PullRefresh)

Vue.directive('fofo', {
  inserted (el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextarea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextarea) theTextarea.focus()
    }
  }
})

router.beforeEach((to, from, next) => {
  const x = localStorage.getItem('geek-itheima')
  if (to.name === 'login') {
    if (from.name === null) {
      next()
    }
    if (x) {
      next(false)
    } else {
      next()
    }
  } else {
    console.log(1)
    next()
  }
})

// 取消生产者提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
