import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import GoodAdd from '../components/goods/Add.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' }, // 重定向
    { path: '/login', component: Login },

    {
      path: '/home',
      component: Home,
      redirect: '/welcome',  // 重定向到 welcome
      children: [{ path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: "/params", component: Params  },
      { path: "/goods", component: GoodsList  },
      { path: "/goods/add", component: GoodAdd  }
      ]  //home 的子路由
    }
  ]
})


// 挂载路由导航守卫    beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从那个路径跳转过来
  // next 是一个函数 代表放行
  // next()   放行  next('/login')  强制跳转
  if (to.path === '/login') return next();
  // 从sessionStorage中获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  // 没有token，强制跳转到登录页
  next()

})

export default router
