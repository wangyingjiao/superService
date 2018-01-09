import { loginByUsername, logout, getUserInfo, getArea, getButton } from '@/api/login'
import { getToken, setToken, removeToken, setSession } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menu: [],
    buttonshow: [],
    area: []
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
            localStorage.setItem('name', response.data.data.user.name)
            localStorage.setItem('dataScope', response.data.data.user.role.dataScope)
            localStorage.setItem('orgId', response.data.data.user.organization.id)
            localStorage.setItem('userId', response.data.data.user.id)
            const data = response.data
            // setSession(response.data.data.JSESSIONID)
            setToken(data.token)
            resolve()
          } else {
            Message.error('用户名不存在或者密码错误')
            resolve()
          }
        }).catch(error => {
          Message.error('用户名不存在或者密码错误')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, userInfo }) {
      // if (JSON.parse(localStorage.getItem('menu'))) {
      //   console.log(22222222222222222222)
      // }else{
      //   console.log(44444444444444444444444)
      // }
      //commit('SET_MENU', JSON.parse(localStorage.getItem('menu')))
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          console.log(data, '权限列表')
          //localStorage.setItem('menu', JSON.stringify(data.data))
          //console.log(JSON.parse(localStorage.getItem('menu')))
          //var arr = JSON.parse(localStorage.getItem('menu'))
          // if (0) {
          //   commit('SET_MENU', arr)
          // } else {
            commit('SET_MENU', data.data)

         // }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取省市区
    Getarea({ commit }) {
      return new Promise((resolve, reject) => {
        getArea().then(res => {
          // console.log(res)
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
          console.log(res.data.data)
          commit('SET_BUTTONSHOW', res.data.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          localStorage.removeItem('name')
          localStorage.removeItem('dataScope')
          localStorage.removeItem('orgId')
          localStorage.removeItem('menu')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
