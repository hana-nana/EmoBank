import { api } from './api'

async function accountDetail(userId) {
  return await api.get('/account/detail', { params: { userId } })
}

async function accountCreate(account) {
  return await api.post('/account/create', account, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

async function accountUpdate(account) {
  return await api.put('/account/update', account, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { accountDetail, accountCreate, accountUpdate }
