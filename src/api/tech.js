import instance from '@/utils/fetch'

// 提交
export function addTech(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianInfo/savePersonalData`, obj)
}
// 获取民族
export function getTech() {
  return instance.get(`/apiservice/a/sys/dict/listData?type=ethnic`)
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
export function ChooseTheCity(pageNumber, pageSize, obj) {
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

// 技师个人编辑保存
export function technicianEdit(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/upData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 技师服务编辑保存
export function technicianServer(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/upDataService`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 技师补充个人编辑保存
export function technicianPlus(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/upDataPlus`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 技师其他编辑保存
export function technicianOther(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/upDataOther`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 添加家庭成员
export function familyAdd(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/saveFamilyMembers`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      console.log(error, 'error------')
    })
  })
}

// 删除家庭成员
export function familyDelete(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/deleteFamilyMembers`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      console.log(error, 'error------')
    })
  })
}

// 删除技师
export function technicianDelete(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/deleteData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      console.log(error, 'error-----')
    })
  })
}

// 设置app密码
export function appPassWord(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/saveAppPassWordData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      console.log(error, 'error------')
    })
  })
}

// 新增休假
export function addVacation(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianHoliday/saveData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      console.log(error)
    })
  })
}

// 获取休假列表
export function getHoliday(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 删除休假
export function delHoliday(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/delete`, obj)
}
// 审核休假
export function reviewedHoliday(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/reviewedHoliday`, obj)
}
// 审核休假
export function getHolidayById(obj) {
  return instance.post(`/apiservice/a/service/technician/serviceTechnicianHoliday/getHolidayById`, obj)
}

// 获取用户机构时间
export function serviceTechnicianInfo(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/getDate`,obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// ----------------------------排----期----管-------理----------------

// 机构和服务站
export function mechanismService() {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/orgList`).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 列表
export function scheduleList(obj, pageNumber, pageSize) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/scheduleList?pageNo=${pageNumber}&pageSize=${pageSize}`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

//机构列表
export function listDataAll({}) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/sys/organization/listDataAll`,{}).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

//服务站联动
export function listByOffice(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/station/serviceStation/listByOffice`,obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

//根据机构返回服务站和技能
export function listByOrgId(obj){
  return new Promise((resolve,reject)=>{
    instance.post(`apiservice/a/service/technician/serviceTechnicianInfo/listByOrgId`,obj).then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}