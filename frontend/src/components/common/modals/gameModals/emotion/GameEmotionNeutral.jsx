import { useEffect } from "react";
import useStore from "../../../../../store/zustore"
import { emotionCreate } from "../../../../../services/emotion";
import { useNavigate } from "react-router-dom";
import "@/styles/common/index.css"
const Neutral = () => {
    const text = ['무난한 하루도 나쁘지 않습니다!', 
'잠시 감정을 쉬어가는 시간이었군요...', '그저그런 감정이라도 특별합니다.'
]
const navigate = useNavigate()
const {setOnlySave,setMiddleOpen,setModalName} = useStore((state)=>state)
const {onlySave, request} = useStore()
const clickSound = new Audio('/sounds/Select.mp3')
const playClick = () => {
  clickSound.play() }

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


const textLength = text.length;
    

const randomIndex = Math.floor(Math.random() * textLength);


const selectedText = text[randomIndex];


    
    return (
        <>
        <div style={{textAlign:'center', display: 'flex' , justifyContent: 'center'}}>
        <p style={{color:'black', fontFamily: 'SF_HambakSnow', marginTop:'-50px', fontSize: '25px'}}>그저그런 상태</p>
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

export default Neutral