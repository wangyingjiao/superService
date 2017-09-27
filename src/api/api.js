import axios from 'axios';
//axios.defaults.withCredentials = true
let qs=require('qs');
let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} //把参数转成字符串  a=1&b=2

});



let base = '';
//请求登录
export const requestLogin = params => { return instance.post(`/api/rest/login`,  qs.stringify(params)).then(res => res.data);  };


//请求用户管理数据
export const requestUserList = params => { return instance.post(`/api/user/ajaxList`,qs.stringify(params)).then(res => res.data); };
//获取用户信息
export const requestUserInfo = params => { return instance.post(`/api/user/get`,qs.stringify(params)).then(res => res.data); };

//新增用户
export const addUserInfo = params => { return instance.post(`/api/user/add`,qs.stringify(params)).then(res => res.data); };

//编辑用户
export const editUserInfo = params => { return instance.post(`/api/user/modify`,qs.stringify(params)).then(res => res.data); };




//删除角色数据
export const removeUser = params => { return instance.post(`/api/user/delete`,qs.stringify(params)).then(res => res.data); };

//返回所有角色
export const requestRoleInfo=params=>{
    return instance.post(`/api/user/getAllRole`,qs.stringify(params)).then(res=>res.data);
};

//分配角色权限
export const requestRole = params => { return instance.post(`/api/role/menus`,  qs.stringify(params)).then(res => res.data); };

//请求角色管理数据
export const requestRoleList = params => { return instance.post(`/api/role/ajaxList`,qs.stringify(params)).then(res => res.data); };

//保存新增角色数据
export const saveRole = params => { return instance.post(`/api/role/save`,qs.stringify(params)).then(res => res.data); };

//删除角色数据
export const removeRole = params => { return instance.post(`/api/role/delete`,qs.stringify(params)).then(res => res.data); };



//请求日志管理数据
export const requestSyslogList = params => { return instance.post(`/api/sysLog/ajaxList`,qs.stringify(params)).then(res => res.data); };

//修改密码
export const fixPassWord = params => { return instance.post(`/api/user/fixPassWord`,qs.stringify(params)).then(res => res.data); };













/*export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
*/
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser1 = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };