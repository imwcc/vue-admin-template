import { login, logout, getInfo } from '@/api/user'
import { setAccessToken, setExpiresIn, setExpiresAt, removeToken, getAccessToken, getExpiresAt, getExpiresIn } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getAccessToken(),
    access_token: getAccessToken(),
    expires_at: getExpiresAt(),
    expires_in: getExpiresIn(),
    name: '',
    avatar: ''
  }
}

var headPic = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_ACCESS_TOKEN: (state, token) => {
    console.log('set......' + token)
    state.access_token = token
  },

  SET_EXPIRES_AT: (state, time) => {
    state.expires_at = time
  },

  SET_EXPIRES_IN: (state, time) => {
    state.expires_in = time
  },

  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_ACCESS_TOKEN', data.access_token)
        setAccessToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login with Google
  loginWithGoogle({ commit }, googleAuthResponse) {
    return new Promise((_resolve, _reject) => {
      commit('SET_TOKEN', googleAuthResponse.access_token)
      commit('SET_ACCESS_TOKEN', googleAuthResponse.access_token)
      commit('SET_EXPIRES_AT', googleAuthResponse.expires_at)
      commit('SET_EXPIRES_IN', googleAuthResponse.expires_in)
      setAccessToken(googleAuthResponse.access_token)
      setExpiresAt(googleAuthResponse.expires_at)
      setExpiresIn(googleAuthResponse.expires_in)
      _resolve(true)
    }
    )
  },

  setTokenInfo({ commit }, tokenInfo) {
    return new Promise((resolve, reject) => {
      console.log('user setTokenInfo start')
      commit('SET_ACCESS_TOKEN', tokenInfo.aceess_token)
      commit('SET_EXPIRES_AT', tokenInfo.expires_at)
      commit('SET_EXPIRES_IN', tokenInfo.expires_in)
      console.log('user setTokenInfo finish')
      resolve(true)
    })
  },

  setTokenInfoToCookies(tokenInfo) {
    return new Promise((resolve, reject) => {
      console.log('user setTokenInfoToCookies start')
      setAccessToken(tokenInfo.aceess_token)
      setExpiresAt(tokenInfo.expires_at)
      setExpiresIn(tokenInfo.expires_in)
      resolve(true)
      console.log('user setTokenInfoToCookies finsih')
    })
  },

  setInfo({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', user.name)
      commit('SET_AVATAR', headPic)
      resolve('pass')
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = getDefaultState()
      // const { name, avatar } = data
      resolve(data)

      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   console.log("1111111"+ avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

