import { api } from './api'

async function emotionAI(params) {
  return await api.post('/emotion/ai', params)
}

async function emotionEmoji(params) {
  return await api.post('/emotion/emoji', params)
}

async function emotionCreate(params) {
  return await api.post('/emotion/create', params)
}

async function emotionAlbumCreate(emotionAccountPk) {
  console.log(emotionAccountPk)
  return await api.post(`/emotion/album?emotionAccountPk=${emotionAccountPk}`)
}

async function emotionAlbumGet(userId) {
  return await api.get('/emotion/album', { params: { userId } })
}

async function emotionAlbumDetail(emotionAccountPk) {
  return await api.get('/emotion/album/detail', { params: { emotionAccountPk } })
}

export {
  emotionAI,
  emotionEmoji,
  emotionCreate,
  emotionAlbumCreate,
  emotionAlbumGet,
  emotionAlbumDetail
}
