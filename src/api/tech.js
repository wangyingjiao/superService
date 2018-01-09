import instance from '@/utils/fetch'

// 提交
export function addTech(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianInfo/savePersonalData`, obj)
}
// 获取民族
export function getTech() {
  return instance.get(`/apiservice/a/sys/dict/listData?type=ethnic`)
}
// 获取学历
export function getEducations() {
  return instance.get(`/apiservice/a/sys/dict/listData?type=education`)
}
// 婚姻状况
export function getMatrimony() {
  return instance.get(`/apiservice/a/sys/dict/listData?type=matrimony`)
}
// 获取体重
export function getStrong() {
  return instance.get(`/apiservice/a/sys/dict/techWeightList`)
}
// 获取体重
export function getHeight() {
  return instance.get(`/apiservice/a/sys/dict/techHeightList`)
}

// 获取省级区域
export function getArea() {
  return instance.get(`/apiservice/a/sys/area/getchildArea`)
}
// //获取省
// export function getArea() {
//   return instance.get(`/apiservice/a/sys/area/getchildArea`)
// }

// 选择城市
export function ChooseTheCity(pageNumber,pageSize,obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 所属服务站
export function serviceStation(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/station/serviceStation/getStationByArea`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 技师保存
export function Technician(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/saveData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
// 技师编辑获取ID
export function technicianEditId(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/formData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 技师编辑保存
export function technicianEdit(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/upData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

//添加家庭成员
export function familyAdd(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/saveFamilyMembers`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      console.log(error,"error------")
    })
  })
}

//删除家庭成员
export function familyDelete(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/deleteFamilyMembers`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      console.log(error,"error------")
    })
  })
}

//删除技师
export function technicianDelete(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/deleteData`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      console.log(error,"error-----")
    })
  })
}

//设置app密码
export function appPassWord(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/saveAppPassWordData`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      console.log(error,"error------")
    })
  })
}

//新增休假
export function addVacation(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianHoliday/saveData`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      console.log(error)
    })
  })
}

// 获取休假列表（不要删，上面没用的接口可以删掉，下面的是我加的）
export function getHoliday(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 删除休假
export function delHoliday(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/delete`, obj)
}


//获取用户机构时间
export function serviceTechnicianInfo(){
  return new Promise((resolve,reject)=>{
      instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/getDate`).then(data=>{
          resolve(data)
      }).catch(error=>{
          reject(error)
      })
  })
}
