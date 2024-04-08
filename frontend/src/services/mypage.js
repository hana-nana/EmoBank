import { api } from './api'

async function mypageInfo(userId) {
  return await api.get('/mypage/info', { params: { userId } })
}

async function mypageSum(userId) {
  return await api.get('/mypage/sum', { params: { userId } })
}

async function mypageAccountHistory(userId) {
  return await api.get('/mypage/account/history', { params: { userId } })
}

async function mypageDepositLine(userId) {
  return await api.get('/mypage/deposit/line', { params: { userId } })
}

async function mypageEmotionRank(userId) {
  return await api.get('/mypage/emotion/rank', { params: { userId } })
}

async function mypageUserUpdate(user) {
  return await api.put('/mypage/info/update', user)
}

async function mypageCalendar(userId) {
  return await api.get('/mypage/calendar', { params: { userId } })
}

export {
  mypageInfo,
  mypageSum,
  mypageAccountHistory,
  mypageDepositLine,
  mypageEmotionRank,
  mypageUserUpdate,
  mypageCalendar
}
