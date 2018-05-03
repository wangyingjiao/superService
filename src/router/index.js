import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

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
  { path: '/download', component: _import('login/download'), hidden: true },
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
      { path: 'user/index', meta: { keepAlive: true }, component: _import('staff/user'), name: '员工列表' },
      { path: 'role/list', meta: { keepAlive: true }, component: _import('staff/role'), name: '岗位管理' }
    ]
  },
  {
    path: '/c',
    component: Layout,
    redirect: 'c',
    name: '测试',
    children: [
      { path: 'c', meta: { keepAlive: true }, component: _import('staff/c'), name: '测试' }
    ]
  },

  {
    path: '/basic',
    component: Layout,
    redirect: 'basic',
    name: '基础服务',
    children: [
      { path: 'organization', name: '服务机构', component: _import('basic/organization') }

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
      { path: 'Schedule', name: '排期管理', component: _import('technician/Schedule') }
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
      { path: 'skill', name: '技能管理', component: _import('serviceManage/skill') },
      { path: 'station', name: '服务站', component: _import('basic/station') },
      { path: 'buttDetails', name: '对接详情', component: _import('serviceManage/buttDetails') }
    ]
  },
  {
    path: '/clean',
    component: Layout,
    redirect: 'base',
    name: '保洁订单',
    children: [
      { path: 'ordermanage', name: '订单管理', component: _import('clean/ordermanage'), meta: { keepAlive: true } },
      { path: 'addorder', name: '新增订单', component: _import('clean/addorder') },
      { path: 'dispatchmanage', name: '工单管理', component: _import('clean/dispatchmanage') },
      { path: 'returnvisit', name: '回访记录', component: _import('clean/returnvisit') },
      { path: 'orderinfo', name: '订单详情', component: _import('clean/orderinfo') },
      { path: 'dispatchReass', name: '改派记录', component: _import('clean/dispatchReass') },
      { path: 'refund', name: '退款管理', component: _import('clean/refund') },
      { path: 'pay', name: '收款管理', component: _import('clean/pay') }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'base',
    name: ' 用户管理',
    children: [
      { path: 'customermanage', name: '用户管理', component: _import('customer/customermanage') },
      { path: 'addcustomer', name: '新增用户', component: _import('customer/addcustomer') }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: 'set',
    name: '系统管理',
    children: [
      { path: 'log', name: ' 日志管理', component: _import('set/log') },
      { path: 'sysLog', name: ' 对接日志管理', component: _import('set/sysLog') },
      { path: 'appVersion', name: ' APP发版', component: _import('set/appVersion') },
      { path: 'menu', name: ' 菜单管理', component: _import('set/menu') },
      { path: 'dict', name: ' 数据字典', component: _import('set/dict') },
      { path: 'sysJointWait', name: ' 待执行任务', component: _import('set/sysJointWait') },
      { path: 'redis', name: ' redis查询', component: _import('set/redis') },
      { path: 'pushMes', name: ' 推送消息', component: _import('set/pushMes') }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  // base: '/ttms/',
  routes: constantRouterMap
})

