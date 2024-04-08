import { api } from './api'

async function userCreate(userInfo) {
  return await api.post('/user/create', userInfo)
}

async function userLogin(userInfo) {
  return await api.post('/user/login', userInfo)
}

async function userAccountCheck(userId) {
  return await api.get('/user/account/check', { params: { userId } })
}

export { userCreate, userLogin, userAccountCheck }
