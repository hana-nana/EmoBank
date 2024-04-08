import React,{useEffect,useState} from 'react'
import { emotionAlbumGet, emotionAlbumDetail } from '../../services/emotion'

const FrameList = () => {
  const [data, setData] = useState([])
  const [detailMemo, setDetailMemo] = useState()
  const [colors, setColors] = useState()

  const headers = [
    {
      text: 'CreateAt ',
      value: 'createAt'
    },
    {
      text: 'EmotionAccountPk',
      value: 'emotionAccountPk'
    },
    {
      text: 'Rate',
      value: 'rate'
    }
  ];

  async function getAlbum() {
    let result = await emotionAlbumGet(sessionStorage.getItem('userId'))
    setData(result.data.data)
    await setColor(result.data.data)
  }
  
  async function getAlbumDetail(emotionAccountPk) {
    let result = await emotionAlbumDetail(emotionAccountPk);
    setDetailMemo(await result.data.memo)
  }

  async function setColor(iter) {
    let array = []
    iter.forEach(d => {
      array.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
    })
    setColors(array)
  }
  
  useEffect (() => {
    getAlbum()
  }, [])

  return (
    <div>
      <div className='emotion-container'>
      {data.map((item, idx) => (
        <div className='content' key={idx} style={{margin:'10px'}}>
          <button style={{backgroundColor:colors[idx]}} onClick={() => getAlbumDetail(item.emotionAccountPk)}> 
          <p style={{color:'black'}}>{item.createAt? item.createAt.slice(0,10) : item.createAt}</p>
          </button>
        </div>
        ))}
        <button onClick={() => setDetailMemo(null)}>reset</button>
      </div>
      {detailMemo && 
        <div className='emotion-container' style={{alignContent:'center'}}>
          {detailMemo}
        </div>
      }
    </div>
    
  )
}

export default FrameList