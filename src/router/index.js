import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'
//import Staff from '../views/staff'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: 'sys',
    name: '员工管理',
    children: [
      { path: 'user/index', component: _import('staff/staffList'), name: '员工列表' },
      { path: 'role/list', component: _import('staff/postManagement'), name: '岗位管理' }
    ]
  },

  {
    path: '/base',
    component: Layout,
    redirect: 'base',
    name: '基础服务',
    children: [
    { path: 'mechanism', name: '服务机构', component: _import('base/mechanism') },
    { path: 'site', name: '服务站', component: _import('base/site') }
    ]
  },

  {
    path: '/technician',
    component: Layout,
    redirect: 'base',
    name: '服务技师管理',
    children: [
    { path: 'holiday', name: '休假管理', component: _import('technician/holiday') },
    { path: 'techni', name: '技师管理', component: _import('technician/techni') },
    { path: 'tech', name: '我你管理', component: _import('technician/tech') }
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: 'service',
    name: '服务管理',
    children: [
    { path: 'class', name: '服务分类', component: _import('serviceManage/classify') },
    { path: 'project', name: '服务项目', component: _import('serviceManage/project') },
    { path: 'skill', name: '技能管理', component: _import('serviceManage/skill') }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

