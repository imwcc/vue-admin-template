const getters = {
  access_token: state => state.user.access_token,
  expires_in: state => state.user.expires_in,
  expires_at: state => state.user.expires_at,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
