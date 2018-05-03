import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/c/c', component: _import('staff/c'), meta: { keepAlive: true }},
  { path: '/login', component: _import('login/index'), meta: { keepAlive: true }},
  { path: '/download', component: _import('login/download'), meta: { keepAlive: true }},
  { path: '/404', component: _import('404') },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{ path: 'dashboard', meta: { keepAlive: true }, component: _import('dashboard/index') }]
  },

  {
    path: '/sys',
    component: Layout,
    name: '员工管理',
    children: [
      { path: 'user/index', meta: { keepAlive: true }, component: _import('staff/user'), name: '员工列表' },
      { path: 'role/list', meta: { keepAlive: true }, component: _import('staff/role'), name: '岗位管理' }
    ],
    meta: { keepAlive: true }
  },
  {
    path: '/basic',
    component: Layout,
    name: '基础服务',
    children: [
      { path: 'organization', meta: { keepAlive: true }, name: '服务机构', component: _import('basic/organization') }
    ]
  },
  {
    path: '/technician',
    component: Layout,
    name: '服务技师管理',
    children: [
      { path: 'holiday', meta: { keepAlive: true }, name: '休假管理', component: _import('technician/holiday') },
      { path: 'techni', meta: { keepAlive: true }, name: '技师管理', component: _import('technician/techni') },
      { path: 'Schedule', meta: { keepAlive: true }, name: '排期管理', component: _import('technician/Schedule') }
    ]
  },

  {
    path: '/service',
    component: Layout,
    name: '服务管理',
    children: [
      { path: 'class', meta: { keepAlive: true }, name: '服务分类', component: _import('serviceManage/classify') },
      { path: 'project', meta: { keepAlive: true }, name: '服务项目', component: _import('serviceManage/project') },
      { path: 'skill', meta: { keepAlive: true }, name: '技能管理', component: _import('serviceManage/skill') },
      { path: 'station', meta: { keepAlive: true }, name: '服务站', component: _import('basic/station') },
      { path: 'buttDetails', meta: { keepAlive: true }, name: '对接详情', component: _import('serviceManage/buttDetails') }
    ]
  },
  {
    path: '/clean',
    component: Layout,
    name: '保洁订单',
    children: [
      { path: 'ordermanage', name: '订单管理', component: _import('clean/ordermanage'), meta: { keepAlive: true }},
      { path: 'addorder', meta: { keepAlive: true }, name: '新增订单', component: _import('clean/addorder') },
      { path: 'dispatchmanage', meta: { keepAlive: true }, name: '工单管理', component: _import('clean/dispatchmanage') },
      { path: 'returnvisit', meta: { keepAlive: true }, name: '回访记录', component: _import('clean/returnvisit') },
      { path: 'orderinfo', meta: { keepAlive: true }, name: '订单详情', component: _import('clean/orderinfo') },
      { path: 'dispatchReass', meta: { keepAlive: true }, name: '改派记录', component: _import('clean/dispatchReass') },
      { path: 'refund', meta: { keepAlive: true }, name: '退款管理', component: _import('clean/refund') },
      { path: 'pay', meta: { keepAlive: true }, name: '收款管理', component: _import('clean/pay') }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    name: ' 用户管理',
    children: [
      { path: 'customermanage', meta: { keepAlive: true }, name: '用户管理', component: _import('customer/customermanage') },
      { path: 'addcustomer', meta: { keepAlive: true }, name: '新增用户', component: _import('customer/addcustomer') }
    ]
  },
  {
    path: '/set',
    component: Layout,
    name: '系统管理',
    children: [
      { path: 'log', meta: { keepAlive: true }, name: ' 日志管理', component: _import('set/log') },
      { path: 'sysLog', meta: { keepAlive: true }, name: ' 对接日志管理', component: _import('set/sysLog') },
      { path: 'appVersion', meta: { keepAlive: true }, name: ' APP发版', component: _import('set/appVersion') },
      { path: 'menu', meta: { keepAlive: true }, name: ' 菜单管理', component: _import('set/menu') },
      { path: 'dict', meta: { keepAlive: true }, name: ' 数据字典', component: _import('set/dict') },
      { path: 'sysJointWait', meta: { keepAlive: true }, name: ' 待执行任务', component: _import('set/sysJointWait') },
      { path: 'redis', meta: { keepAlive: true }, name: ' redis查询', component: _import('set/redis') },
      { path: 'pushMes', meta: { keepAlive: true }, name: ' 推送消息', component: _import('set/pushMes') }
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

