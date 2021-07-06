import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'Login',
    meta: {isPublic: true},   // 给登录路由一个 meta 属性，用于路由卫士拦截
    component: () => import('../views/Login.vue')
  },
  // 其它路由
  {
    path: '/',
    name: 'Main',
    redirect:'/admin_user/list',   // 默认打开的是管理员列表页面
    component: Main,
    children: [
      // 分类路由
      {
        path: 'category/create',
        name: 'CategoryCreate',
        component: () => import('../views/CategoryCreate.vue')
      },
      {
        path: 'category/list',
        name: 'CategoryList',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: 'category/edit/:id',
        name: 'CategoryEdit',
        props: true,   // 通过组件间通信传值
        component: () => import('../views/CategoryCreate.vue')
      },
      // 物品路由
      {
        path: 'item/create',
        name: 'ItemCreate',
        component: () => import('../views/ItemCreate.vue')
      },
      {
        path: 'item/list',
        name: 'ItemList',
        component: () => import('../views/ItemList.vue')
      },
      {
        path: 'item/edit/:id',
        name: 'ItemEdit',
        props: true,
        component: () => import('../views/ItemCreate.vue')
      },
      // 英雄路由
      {
        path: 'hero/create',
        name: 'HeroCreate',
        component: () => import('../views/HeroCreate.vue')
      },
      {
        path: 'hero/list',
        name: 'HeroList',
        component: () => import('../views/HeroList.vue')
      },
      {
        path: 'hero/edit/:id',
        name: 'HeroEdit',
        props: true,
        component: () => import('../views/HeroCreate.vue')
      },
      // 文章路由
      {
        path: 'article/create',
        name: 'ArticleCreate',
        component: () => import('../views/ArticleCreate.vue')
      },
      {
        path: 'article/list',
        name: 'ArticleList',
        component: () => import('../views/ArticleList.vue')
      },
      {
        path: 'article/edit/:id',
        name: 'ArticleEdit',
        props: true,
        component: () => import('../views/ArticleCreate.vue')
      },
      // 广告位路由
      {
        path: 'ad/create',
        name: 'AdCreate',
        component: () => import('../views/AdCreate.vue')
      },
      {
        path: 'ad/list',
        name: 'AdList',
        component: AdminUserList
      },
      {
        path: 'ad/edit/:id',
        name: 'AdEdit',
        props: true,
        component: () => import('../views/AdCreate.vue')
      },
      // 管理员路由
      {
        path: 'admin_user/create',
        name: 'AdminUserCreate',
        component: () => import('../views/AdminUserCreate.vue')
      },
      {
        path: 'admin_user/list',
        name: 'AdminUserList',
        component: () => import('../views/AdminUserList.vue')
      },
      {
        path: 'admin_user/edit/:id',
        name: 'AdminUserEdit',
        props: true,
        component: () => import('../views/AdminUserCreate.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由卫视拦截
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login');
  }
  next();
})

export default router
