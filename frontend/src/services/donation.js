import { api } from './api'

async function donationRecommend(emotion) {
  return await api.get('/donation/recommend', {
    params: { emotion }
  })
}

async function donationRecommendAll() {
  return await api.get('/donation/recommend/all', {})
}

async function donationPay(payInfo) {
  return await api.post('/donation/pay', payInfo, {})
}

async function donationHistory(userId) {
  return await api.get('/donation/history', {
    params: { userId }
  })
}
export { donationRecommend, donationRecommendAll, donationPay, donationHistory }
