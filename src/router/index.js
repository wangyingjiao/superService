import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), meta: { keepAlive: false }},
  { path: '/download', component: _import('login/download'), meta: { keepAlive: false }},
  { path: '/404', component: _import('404') },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{ path: 'dashboard', meta: { keepAlive: false }, component: _import('dashboard/index') }]
  },

  {
    path: '/sys',
    component: Layout,
    name: '员工管理',
    children: [
      { path: 'user/index', meta: { keepAlive: false }, component: _import('staff/user'), name: '员工列表' },
      { path: 'role/list', meta: { keepAlive: false }, component: _import('staff/role'), name: '岗位管理' }
    ],
    meta: { keepAlive: false }
  },
  {
    path: '/basic',
    component: Layout,
    name: '基础服务',
    children: [
      { path: 'organization', meta: { keepAlive: false }, name: '服务机构', component: _import('basic/organization') }
    ]
  },
  {
    path: '/technician',
    component: Layout,
    name: '服务技师管理',
    children: [
      { path: 'holiday', meta: { keepAlive: false }, name: '休假管理', component: _import('technician/holiday') },
      { path: 'techni', meta: { keepAlive: false }, name: '技师管理', component: _import('technician/techni') },
      { path: 'Schedule', meta: { keepAlive: false }, name: '排期管理', component: _import('technician/Schedule') }
    ]
  },

  {
    path: '/service',
    component: Layout,
    name: '服务管理',
    children: [
      { path: 'class', meta: { keepAlive: false }, name: '服务分类', component: _import('serviceManage/classify') },
      { path: 'project', meta: { keepAlive: false }, name: '服务项目', component: _import('serviceManage/project') },
      { path: 'skill', meta: { keepAlive: false }, name: '技能管理', component: _import('serviceManage/skill') },
      { path: 'station', meta: { keepAlive: false }, name: '服务站', component: _import('basic/station') },
      { path: 'buttDetails', meta: { keepAlive: false }, name: '对接详情', component: _import('serviceManage/buttDetails') }
    ]
  },
  {
    path: '/clean',
    component: Layout,
    name: '保洁订单',
    children: [
      { path: 'ordermanage', name: '订单管理', component: _import('clean/ordermanage') },
      { path: 'addorder', name: '新增订单', component: _import('clean/addorder') },
      { path: 'dispatchmanage', name: '工单管理', component: _import('clean/dispatchmanage')},
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
    name: ' 用户管理',
    children: [
      { path: 'customermanage', meta: { keepAlive: false }, name: '用户管理', component: _import('customer/customermanage') },
      { path: 'addcustomer', meta: { keepAlive: false }, name: '新增用户', component: _import('customer/addcustomer') }
    ]
  },
  {
    path: '/set',
    component: Layout,
    name: '系统管理',
    children: [
      { path: 'log', meta: { keepAlive: false }, name: ' 日志管理', component: _import('set/log') },
      { path: 'sysLog', meta: { keepAlive: false }, name: ' 对接日志管理', component: _import('set/sysLog') },
      { path: 'appVersion', meta: { keepAlive: false }, name: ' APP发版', component: _import('set/appVersion') },
      { path: 'menu', meta: { keepAlive: false }, name: ' 菜单管理', component: _import('set/menu') },
      { path: 'dict', meta: { keepAlive: false }, name: ' 数据字典', component: _import('set/dict') },
      { path: 'sysJointWait', meta: { keepAlive: false }, name: ' 待执行任务', component: _import('set/sysJointWait') },
      { path: 'redis', meta: { keepAlive: false }, name: ' redis查询', component: _import('set/redis') },
      { path: 'pushMes', meta: { keepAlive: false }, name: ' 推送消息', component: _import('set/pushMes') }
    ]
  },

  { path: '*', meta: { keepAlive: false }, redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  // base: '/ttms/',
  routes: constantRouterMap
})

