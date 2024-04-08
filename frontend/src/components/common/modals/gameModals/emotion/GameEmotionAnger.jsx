import { useEffect } from "react";
import useStore from "../../../../../store/zustore"
import { emotionCreate } from "../../../../../services/emotion";
import { useNavigate } from "react-router-dom";
import '@/styles/common/index.css'

const Anger = () => {
    const {setOnlySave,setMiddleOpen,setModalName} = useStore((state)=>state)
    const {onlySave, request} = useStore()
    
    const text = ['화가 날 때는 소비를 줄여야 해요! 그런 의미에서 저희가 고객님의 돈을 맡아드려도 될까요?', 
'무분별한 소비로 스트레스를 푸는것은 나중에 통장잔고를 봤을 때 더욱 스트레스가 될거에요. 저축을 도와드릴까요?', '분노라는 감정을 억누르기 보다 다스려야합니다. 감정을 다스리면서 재정도 다스려보심이 어떠실지...?'
]
const textLength = text.length;


const randomIndex = Math.floor(Math.random() * textLength);
const clickSound = new Audio('/sounds/Select.mp3')
const playClick = () => {
  clickSound.play() }

const selectedText = text[randomIndex];

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
        if (request.selectedEmotion == 'angry') {
            setModalName('erase')
        }
       
       

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
        <p style={{color:'red', fontFamily: 'SF_HambakSnow', marginTop:'-50px', fontSize: '25px'}}>화난 상태</p>
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

export default Anger