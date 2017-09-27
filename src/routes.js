import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'




const notice = r => require.ensure([], () => r(require('./components/system/Notice')), 'system')
const userPassWord = r => require.ensure([], () => r(require('./components/system/UserPassWord')), 'system')
const userList = r => require.ensure([], () => r(require('./components/system/UserList')), 'system')
const roleList = r => require.ensure([], () => r(require('./components/system/RoleList')), 'system')
const addRole = r => require.ensure([], () => r(require('./components/system/addRole')), 'system')
const sysLog = r => require.ensure([], () => r(require('./components/system/SysLog')), 'system')
const map = r => require.ensure([], () => r(require('./components/system/map')), 'system')
const addMap = r => require.ensure([], () => r(require('./components/system/addMap')), 'system')


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
     {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-gears',
        children: [
            { path: '/notice', component: notice, name: '公告管理',iconCls:'fa fa-circle-o',},
            { path: '/password', component: userPassWord, name: '修改密码',iconCls:'fa fa-circle-o'},
            { path: '/userList', component: userList, name: '用户管理',iconCls:'fa fa-circle-o'},
            { path: '/roleList', component: roleList, name: '角色管理',iconCls:'fa fa-circle-o'},
            { path: '/sysLog', component: sysLog, name: '日志管理',iconCls:'fa fa-circle-o'},
            { path: '/map', component: map, name: '地图',iconCls:'fa fa-circle-o'},
            { path: '/addMap', component: addMap, name: '增加地图',iconCls:'fa fa-circle-o'}
        ]
    },
    /*{  //系统管理->个人设置
        path: '/user/modify',
        name: 'userModify',
        component: userModify
    },
    {  //系统管理->修改密码
        path: '/user/password',
        name: 'userModifyPassWord',
        component: userPassWord
    },
    { //系统管理->用户管理
        path: '/user/list',
        name: 'userList',
        component: userList
    },
    { //系统管理->角色管理
        path: '/user/roleList',
        name: 'roleList',
        component: roleList
    },
    { //系统管理->角色管理
        path: '/user/addRole',
        name: 'addRole',
        component: addRole
    },
    { //系统管理->系统日志
        path: '/user/sysLog',
        name: 'sysLog',
        component: sysLog
    },*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;