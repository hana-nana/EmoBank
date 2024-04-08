import React from 'react'
import { mypageAccountHistory } from '../../services/mypage'
import { useEffect } from 'react'
import { useState } from 'react'
import '@/styles/common/UserPageSavingList.css'
import { useNavigate } from 'react-router-dom'


const UserPageSavingList = () => {
  const [savingData, setSaving] = useState([])
  
  const [index, setIndex] = useState(null)
  const accountHistory = async (userId) => {
   let response
    response = await mypageAccountHistory(userId)
    setSaving(response.data.data)
  }
const userId = sessionStorage.getItem('userId')
const nickname= sessionStorage.getItem('nickname')
  useEffect(()=>{
    accountHistory(sessionStorage.getItem('userId'))
    
  },[index])
  const handleItemClick = (idx) => {
    setIndex(idx);
  }

  const emotionDict = {
    'angry': '분노한',
    'surprise': '놀란',
    'fear': '두려운',
    'sadness': '슬픈',
    'happiness': '행복한',
    'disgust' : '역겨운',
    'neutral' : '그저그런'
  }
const base = "/assets/"
const emojiDict = {
  'angry': base+"angryface.png",
  'fear': base+"scaredface.png",
  'surprise':base+"surpriseface.png",
  'sadness':base+"sadface.png",
  'happiness': base+"smileface.png",
  'disgust' : base+"disgustface.png",
  'neutral': base+"neutralface.png"
}

  const navigator = useNavigate()
  const goBack = () => {
    window.location.href = '/Home';
  }




  return (
    <div className='overall'>
      <h1 className='title' style={{color:'white', marginTop:'-10px'}}>
        <br />
      {nickname}님의 감정저축내역
      </h1>
     
  
      <img onClick={goBack} src="/assets/backarrow.svg" alt="backarrow" style={{width:'1%', marginBottom: '25px', marginLeft: '170px', marginTop:'-60px', cursor: 'pointer'}}/>
  
   
    
    <div className='use-container'>

    <div className='emotion-container'>
      {savingData.map((item, idx) => (
        <div className='content' key={idx} >
          <div className='describe'>{item.createAt? item.createAt.slice(0,10) : item.createAt}
           <p style={{ color:'blue' }}>{item.amount}원 입금</p> 
          </div>
         
         
          <p className='imoji'>
            { item.memo && 
            <button onClick={() => handleItemClick(idx)} className='imoji-button'>
              <img src={emojiDict[item.kind]} alt="emotion" />
            </button>
            }
            {!item.memo &&
              <button className='imoji-buttons' disabled>
              <img src={emojiDict[item.kind]} alt="emotion" />
            </button>
            }
            </p>
        
          </div>
        ))}
    </div>

    <div className='content-detail'>
    {savingData.map((item, idx) => (
      index === idx && <p style={{marginBottom: '-30px', marginTop: '15px', fontWeight: 'bold'}} key={idx}>{item.createAt? item.createAt.slice(0,10): item.createAt}에 {userId}님은 {emotionDict[item.kind]} 감정이었어요.</p>
      ))}
      <div className='detail-content'>
    {savingData.map((item, idx) => (
      index === idx && <p key={idx}>{item.memo}</p>
      ))}
      
      </div>
    </div>
        </div>
      </div>
  )
}

export default UserPageSavingList