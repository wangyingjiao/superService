
import axios from 'axios'
import { resolve } from 'url';

const instance = axios.create({
    headers: { 'content-type': 'application/json;charset=UTF-8' }
})

// --------------------------------服务管理----------------------------


//-----------服务项目------------
// 所属分类
export function Taxonomy(){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/sort/serSortInfo/listData`).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
    // return instance.post(`api/a/service/sort/serSortInfo/listData`)
}

//定向城市
export function Orienteering(obj){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/item/serItemInfo/getAllCityCodes`,obj).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
    // return instance.post(`api/a/service/item/serItemInfo/getAllCityCodes`)
}

//是否
export function Whether(){
    return new Promise((resolve,reject)=>{
        instance.get('../../static/dict.json').then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//服务项目添加
export function ServerAdd(obj){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/item/serItemInfo/saveData`,obj).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//项目删除
export function ServerDelete(obj){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/item/serItemInfo/deleteData`,obj).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//项目编辑
export function ServerEdit(obj){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/item/serItemInfo/formData`,obj).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//项目编辑保存
export function serverEditPre(obj){
    return new Promise((resolve,reject)=>{
        instance.post(`api/a/service/item/serItemInfo/upData`,obj).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

// --------------------------------服务管理 结束----------------------------