import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getSession() {
  return Cookies.get('JSESSIONID')
}
export function setSession(id) {
  return Cookies.set('JSESSIONID', id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
