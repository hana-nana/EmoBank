import { useEffect } from "react";
import useStore from "../../../../../store/zustore"
import { emotionCreate } from "../../../../../services/emotion";
import { useNavigate } from "react-router-dom";
import "@/styles/common/index.css"
const Good = () => {
    const text = ['축하드려요! 기분 좋은 하루가 되셨나요?', 
    '기쁜 감정은 살아가는데 있어서 정말 중요한 요소입니다.', '행복한 감정은 항상 옳다고 믿습니다!'
]
const textLength = text.length;
const navigate = useNavigate()

const randomIndex = Math.floor(Math.random() * textLength);
const clickSound = new Audio('/sounds/Select.mp3')
const playClick = () => {
  clickSound.play() }

const selectedText = text[randomIndex];

const {setOnlySave,setMiddleOpen,setModalName} = useStore((state)=>state)
const {onlySave, request} = useStore()


const handleClick = () => {
    playClick()
    setMiddleOpen(true)
    setOnlySave(false)

}
let response
const saveEmotion = async() => {
    playClick()
    response = await emotionCreate(request)
    if (response.data.statusCode == 200) {
     
        setModalName('finish')
       

    } else{
        console.error('앗 문제가 발생했어요');
    }
}

useEffect(()=> {
    setOnlySave(true)
},[])

    
    return (
        <>
        <div style={{textAlign:'center', display: 'flex' , justifyContent: 'center'}}>
        <p style={{color:'rgb(219, 20, 60, 0.5)', fontFamily: 'SF_HambakSnow', marginTop:'-50px', fontSize: '25px'}}>행복한 상태</p>
        </div>
        <div>
            
        <p style={{marginTop:'-5px', fontStyle:'italic', fontSize: '15px', textAlign:'center', display: 'flex' , justifyContent: 'center'}}><i>{selectedText}</i></p>
        </div>
        <div style={{display: onlySave ? 'block' : 'none', cursor:'pointer'}}>
         
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'25px' }}>
        <p className="save"  style={{ cursor: 'pointer', marginLeft:'0px', marginRight: '50px', fontSize: '18px',fontFamily: '"Roboto", sans-serif', fontWeight: '600' }} onClick={handleClick}><b>저축습관 기르기</b></p>
         <p className="emotion" style={{ cursor: 'pointer', fontSize: '18px', fontFamily: '"Roboto", sans-serif', fontWeight: '600' }} onClick={saveEmotion}><b>감정만 저장하기</b></p>
        </div>

     </div>
        </>
    )
}

export default Good