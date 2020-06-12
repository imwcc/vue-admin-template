import Cookies from 'js-cookie'

const AccessTokenKey = 'gota_access_token'
const ExpiresInKey = 'gota_expires_in'
const ExpiresAtKey = 'gota_expires_at'

export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey)
}

export function getExpiresAt() {
  return Cookies.get(ExpiresAtKey)
}

export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token)
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function setExpiresAt(time) {
  return Cookies.set(ExpiresAtKey, time)
}

export function removeToken() {
  return Cookies.remove(AccessTokenKey) && Cookies.remove(ExpiresInKey) && Cookies.remove(ExpiresAtKey)
}
