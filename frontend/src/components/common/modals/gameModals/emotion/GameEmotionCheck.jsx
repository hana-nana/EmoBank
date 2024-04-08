import { useContext, useEffect, useState } from "react"
import useStore from "../../../../../store/zustore"
import { emotionCreate } from "../../../../../services/emotion"
import { Button } from "react-bootstrap"
import "@/styles/common/Hover.css"

const Check = () => {
const emotionList = ['fear','sadness','happiness','disgust','neutral','surprise','angry']
const translate = {
    'fear': '공포',
    'sadness': '슬픔',
    'happiness': '행복',
    'surprise': '놀람',
    'disgust': '역겨움',
    'angry': '분노',
    'neutral': '중립',
}

const clickSound = new Audio('/sounds/Select.mp3')
const playClick = () => {
  clickSound.play() }

const {emotion, request} = useStore()
const {setModalName, setEmotion, setRequest} = useStore((store)=>store)
const [selectedEmotion, setSelectedEmotion] = useState(null)
const [check, setCheck] = useState(true)
const [text, setText] = useState('기다려주셔서 감사합니다! 혹시 이 감정이 맞으십니까?')


useEffect(() => {

    if (selectedEmotion) {
        
        setText(`해당 감정 '${translate[selectedEmotion]}'으로 저축을 진행하겠습니다.`)
        setEmotion(selectedEmotion)
       
        
    }
}, [selectedEmotion])

const handleYes = () => {
    playClick()
    setModalName('resultConfirm')
    }

    


const handleNo = () => {
    playClick()
    setCheck(false)
    setText('제가 잘못 생각했군요. 맞는 감정으로 정정해주십시오.')
}

const handleEmotionClick = (selectedEmotion) => {
    playClick()
    setSelectedEmotion(selectedEmotion)
    setRequest({...request,  'selectedEmotion': selectedEmotion})
   
}

return (
    <div>

    <p style={{fontSize:"18px", marginTop:'-35px', marginLeft: '55px'}}><b>{text}</b></p>

    <p style={{display: check ? 'block' : 'none', textAlign: 'center', fontStyle:'italic', color:'darkslategray',fontSize:"20px"}}>
        <i>
        "{translate[emotion]}"
        </i>
    </p>
    <div style={{display: !check ? 'block': 'none'}}>

    
    <div style={{cursor:'pointer'}} >
    
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
  {emotionList.filter(item => item !== emotion).map((item, index) => (
    <div className="kinds" key={index} style={{ cursor: 'pointer', fontSize: 'smaller', fontStyle: 'italic', color: 'rgb(36,88,75)', marginRight: '10px', marginLeft: '10px' }} onClick={() => handleEmotionClick(item)}>
      {translate[item]}
    </div>
  ))}
</div>

    <div style={{ textAlign: 'center', marginTop:'-20px', marginRight: '-690px' }}>
        <button className="complete" style={{ width: '60px', height:'40px', backgroundColor:'transparent', fontSize:'17px', border:'none', cursor:'pointer', fontWeight: '700'}} onClick={handleYes}>완료</button>
    </div>

    </div>
    <div style={{ display: check ? 'block' : 'none', textAlign: 'end', marginTop:'-20px' }}>
    <div style={{ display: 'inline-block', cursor: 'pointer', marginRight: '5px' }} onClick={handleYes}>
        <p className="save" style={{fontFamily: '"Roboto", sans-serif', fontSize: '20px', fontWeight:'700'}}>네</p>
    </div>
    &nbsp;&nbsp;
    <div style={{ display: 'inline-block' ,cursor: 'pointer'}} onClick={handleNo}>
        <p className="emotion" style={{fontFamily: '"Roboto", sans-serif', fontSize: '20px',fontWeight:'700'}} >아니오</p>
    </div>
</div>

    </div>
)

}
export default Check