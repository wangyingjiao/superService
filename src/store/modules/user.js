import { loginByUsername, logout, getUserInfo, getArea, getButton } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../../store'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menu: [],
    buttonshow: [],
    area: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },  
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_BUTTONSHOW: (state, buttonshow) => {
      state.buttonshow = buttonshow
    },
    SET_AREA: (state, area) => {
      state.area = area
    }
  },

  actions: {
    // 登录
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        var obj = {
          username: userInfo.username,
          password: userInfo.password
        }
        loginByUsername(obj).then(response => {
          if (response.data.code === 1) {
            commit('SET_NAME', response.data.data.user.name)             
            if (response.data.data.user.name) {
              localStorage.setItem('name', response.data.data.user.name)
            }
            if (response.data.data.user.type) {
              localStorage.setItem('type', response.data.data.user.type)
            }
            if (response.data.data.user.role.dataScope) {
              localStorage.setItem('dataScope', response.data.data.user.role.dataScope)
            }
            if (response.data.data.user.organization.id) {
              localStorage.setItem('orgId', response.data.data.user.organization.id)
            }
            if (response.data.data.user.id) {
              localStorage.setItem('userId', response.data.data.user.id)
            }
            if (response.data.data.user.role.id) {
              localStorage.setItem('roleId', response.data.data.user.role.id)
            }
            if (response.data.data.user.station) {
              localStorage.setItem('station', JSON.stringify(response.data.data.user.station))
            }
            setToken(response.data.data.JSESSIONID)
            resolve(response)
          } else {
            // Message.error('用户名不存在或者密码错误')
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, userInfo }) {
      if (JSON.parse(localStorage.getItem('menu'))) {
        commit('SET_MENU', JSON.parse(sessionStorage.getItem('menu')))
        commit('SET_NAME', localStorage.getItem('name'))
      } else {
        return new Promise((resolve, reject) => {
          getUserInfo().then(response => {
            const data = response.data
            sessionStorage.setItem('menu', JSON.stringify(data.data))
            commit('SET_MENU', data.data)
            commit('SET_NAME', localStorage.getItem('name'))
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    // 获取省市区
    Getarea({ commit }) {
      return new Promise((resolve, reject) => {
        getArea().then(res => {
          const data = res.data
          commit('SET_AREA', data.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取按钮权限
    Getbutton({ commit }) {
      return new Promise((resolve, reject) => {
        getButton().then(res => {
          commit('SET_BUTTONSHOW', res.data.data)
          localStorage.setItem('btn', JSON.stringify(res.data.data))
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          store.state.app.visitedViews = []
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENU', [])
          removeToken()
          localStorage.removeItem('name')
          localStorage.removeItem('dataScope')
          localStorage.removeItem('orgId')
          localStorage.removeItem('userId')
          localStorage.removeItem('menu')
          localStorage.removeItem('station')
          localStorage.removeItem('btn')
          localStorage.removeItem('roleId')
          window.sessionStorage.removeItem('orderNumber')
          window.sessionStorage.removeItem('sevicerStustas')
          window.sessionStorage.removeItem('orderStatus')
          window.sessionStorage.removeItem('mechanism')
          window.sessionStorage.removeItem('stationId')
          window.sessionStorage.removeItem('serviceTimeStart')
          window.sessionStorage.removeItem('serviceTimeEnd')
          window.sessionStorage.removeItem('startTime')
          window.sessionStorage.removeItem('endTime')
          window.sessionStorage.removeItem('pageSize')
          window.sessionStorage.removeItem('pageNumber')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
