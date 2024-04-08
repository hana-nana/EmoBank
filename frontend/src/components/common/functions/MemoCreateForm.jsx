import { emotionCreate, emotionAI } from "../../../services/emotion"
import { useEffect, useState } from "react";
import useStore from "../../../store/zustore";
import Dialog from "../modals/gameModals/GameDialogForm";
import '@/styles/common/MemoCreateForm.css'

const MemocreateForm = () => {
  
  const [content, setContent] = useState('');
  const {setEmotion, handleModal, setModalName, setRequest, setEmotionList} = useStore((state)=>state)

  const {modalName, isDelete} = useStore()
  const [time, setTime] = useState(false)


  const sound = new Audio('/sounds/hmm.mp3')

  const playSound = () => {
       sound.play() }


  const handleInputChange = (event) => {
    setContent(event.target.value);
  };




  let maxEmotion = ''
  const handleSubmit = async () => {
  setTime(true)
  playSound()
  const emotions = {'angry': null, 'fear': null, 'sadness': null, 'neutral': null, 'happiness':null, 'disgust':null, 'surprise':null}  
  
  const userId = sessionStorage.getItem('userId')
  let params = {"userId" : userId, "memo" : content}
  let response

  response = await emotionAI(params)
  response = response.data 
  
  emotions['angry'] = response.angry
  emotions['fear'] = response.fear
  emotions['sadness'] = response.sadness
  emotions['neutral'] = response.neutral
  emotions['happiness'] = response.happiness
  emotions['disgust'] = response.disgust
  emotions['surprise'] = response.surprise
  
  
  const emoPk= response.emotionResultPk
  maxEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
  
  setEmotionList(emotions)
  setEmotion(maxEmotion)
  handleModal(false)
  setRequest({'userId': userId, 'emotionResultPk':emoPk, 'memo': content, 'selectedEmotion': maxEmotion  })

    setModalName('analyzing')

}


  

    return (
      <>
                {time &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '300px', left: '30%', top: '5%',zIndex: '5'}}>
                  <img src="/assets/writing.gif" alt='load' style={{width:'300px'}}></img>
                  
                </div>
                }
      <div className="memocreateformContainer">

                <img className="scrollpaper" src="/assets/scroll.png" alt="scroll"  />
                <form className='text-form'>
                  <textarea 
                  className="papertextarea"
                  name ="memoCreate"
                  id="memoCreate" 
                  placeholder='내용을 입력해주세요 (50자 이내)'
                  cols="41" rows="16" 
                  value={content}
                  onChange={handleInputChange}
                  >
                  </textarea>
                </form>
                <button className="papersaveBtn" onClick={handleSubmit} >저장</button>
                {/* <button  onClick={handleSubmit} style={{zIndex:'2000', marginLeft:'130px', position:'absolute', marginTop:'700px' ,transform:'translateY(-100px)'}} >저장</button>  */}
              
              </div>
              </>
    )
}

export default MemocreateForm