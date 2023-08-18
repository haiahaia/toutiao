import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login/Login'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Layout from '@/views/Layout'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import userEdit from '@/views/User/userEdit'
// import Chat from '@/views/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */'../views/Login/Login')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */'@/views/Search')
  },
  {
    name: 'searchresult',
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */'@/views/Search/SearchResult')
  },
  {
    name: 'articledetail',
    path: '/detail',
    component: () => import(/* webpackChunkName: "ArticleDetail" */'@/views/ArticleDetail')
  },
  {
    name: 'useredit',
    path: '/useredit',
    component: () => import(/* webpackChunkName: "userEdit" */'@/views/User/userEdit')
  },
  {
    name: 'chat',
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */'@/views/Chat')

  },
  {
    name: 'layout',
    path: '/layout',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "Layout" */'@/views/Layout'),
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */'@/views/User')

      },
      {
        name: 'home',
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
