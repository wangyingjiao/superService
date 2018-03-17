import instance from '@/utils/fetch'

export function getClass(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
export function getProject(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
export function getSkill() {
  return instance.get(`/apiservice/a/service/skill/serSkillInfo/listData`)
}
// 新增分类
export function addClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/saveData`, obj)
}
// 新增项目
export function addProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/saveData`, obj)
}
// 删除分类
export function delClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/deleteSortInfo`, obj)
}
// 删除项目
export function delProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/deleteSortInfo`, obj)
}
// export function getSuccess(obj) {
//   return instance.post(`/apiservice/a/service/sort/serSortInfo/checkCityItem`, obj)
// }
export function getInfoPic(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/getSerItemInfoPic`, obj)
}
// 编辑分类的数据
export function setClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/formData`, obj)
}

// 编辑项目
export function upProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/upData`, obj)
}
// 编辑分类
export function upClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/upData`, obj)
}

// -----------服务项目------------
// 所属分类
export function Taxonomy(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/sort/serSortInfo/listDataAll`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  // return instance.post(`apiservice/a/service/sort/serSortInfo/listData`)
}

// 定向城市
export function Orienteering(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/getAllCityCodes`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  // return instance.post(`apiservice/a/service/item/serItemInfo/getAllCityCodes`)
}

// 是否
// export function Whether() {
//   return new Promise((resolve, reject) => {
//     instance.get('../../static/dict.json').then(data => {
//       resolve(data)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }

// 服务项目添加
export function ServerAdd(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/saveData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 项目删除
export function ServerDelete(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/deleteData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 项目编辑
export function ServerEdit(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/formData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 项目编辑保存
export function serverEditPre(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/upData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

export function sortList(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/upDataSortNum`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 系统标签
export function serGasqSort() {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serGasqSort/getList`).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 商品删除
export function deleteGoodsData(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/item/serItemInfo/deleteGoodsData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

//已对接E店
export function alreadyButted(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/item/serItemInfo/getEshopGoods`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}

//对接详情E店列表
export function buttedList(){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/item/serItemInfo/getGoodsCode`).then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}

//对接详情已对接商品列表
export function buttedConnList(obj,pageNumber,pageSize){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/item/serItemInfo/getGoodsList?pageNo=${pageNumber}&pageSize=${pageSize}`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}

//对接详情已未对接商品列表
export function noButtedConnList(obj,pageNumber,pageSize){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/item/serItemInfo/getNotJonitGoods?pageNo=${pageNumber}&pageSize=${pageSize}`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}


// -------------技能-----------------

export function getListdata(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增保存技能
export function saveServer(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/saveData`, obj)
}
// 选择服务
export function orderServer(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/insertData`, obj)
}
// 删除技能
export function techDelet(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/deleteSortInfo`, obj)
}
// 编辑技能
export function editTech(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/formData`, obj)
}
// 编辑保存技能
export function upDataTech(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/upData`, obj)
}
