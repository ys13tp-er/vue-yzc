import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Purchase/Home.vue'
import Qr from './views/Purchase/Qr.vue'
import Cart from './views/Purchase/Cart.vue'
import Contact from './views/Purchase/Contact.vue'
import Search from './views/Purchase/Search.vue'
import Oder from './views/Purchase/Oder.vue'
import Login from './views/Purchase/Login.vue'
import Registe from './views/Purchase/Registe.vue'
import Item from './views/Purchase/Item.vue'
import Inf from './views/Purchase/Inf.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/qr',
    name: 'qr',
    component: Qr
  }, {
    path: '/cart',
    name: 'cart',
    component: Cart
  }, {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/oder',
    name: 'oder',
    component: Oder
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registe',
    name: 'registe',
    component: Registe
  },
  {
    name: 'item',
    path: '/item/:id',
    component: Item
  },
  {
    name: 'inf',
    path: '/inf/:id',
    component: Inf
  },
  // 重定向
  {
    path: '/',
    redirect: () => {
      return '/home'
    }
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 全局前置守卫
// 要进入路由，都要先通过这个守卫
router.beforeEach(async (to, from, next) => {
  // 获取token
  let isLogin = localStorage.getItem("token");
  // 如果你没登陆你就进sign
  // 如果你登陆 next

  // 如果你登陆了你就next
  // 或者你就要去登陆页，你也可以next

  // 如果你是首页，分类页，登录页，注册页，详情页，介绍页，或者你登陆了，都可以进去，否则不给你进去
  if (isLogin || to.path === '/home' || to.path === '/login' || to.name === 'registe' || to.name === 'qr' || to.name === 'item' || to.name === 'inf') {
    next()
  } else {
    // 编程式导航
    router.push({
      name: 'login'
    })
  }
})


export default router