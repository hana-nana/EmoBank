import { useEffect, useState } from "react"
import useStore from "@/store/zustore"
import styled from "styled-components"
const Erase =  () => {
    const userId = sessionStorage.getItem('userId')
    const [text, setText] = useState(`부정적 감정은 ${userId}님의 마음을 계속 힘들게 할거에요. 혹시 괜찮다면 저희가 이 감정을 지워드려도 될까요?`)
    const {setModalName, setIsDelete, setMiddleOpen} = useStore((state)=> state)
    const [watch, setWatch] = useState(true)
    const clickSound = new Audio('/sounds/Select.mp3')
    const playClick = () => {
      clickSound.play() }  
    

    const handleYes = () => {
        playClick()
        setWatch(false)
        setText(`${userId}님의 부정적 감정을 지우는 중입니다.`)
        setIsDelete(true)
        
        setTimeout(()=> {
            setText('안좋은 감정 삭제가 완료되었습니다!')
        }, 3000)

        setTimeout(()=> {
            
            setModalName('finish')
        }, 5000)
    }

    useEffect(()=>{
        setMiddleOpen(false)
    }, [])

    const handleNo = () => {
        playClick()
        setWatch(false)
        setModalName('finish')
    }

    return(
        <>
        <p style={{fontSize:"17px", marginTop:'-5px', marginLeft: '-10px'}}><b>{text}</b></p>


       { watch &&
        <div className="erase-container" style={{ display:'block', textAlign: 'end', marginTop:'-8px' }}>
            <div style={{ display: 'inline-block', cursor: 'pointer', marginRight: '5px' }} onClick={handleYes}>
                <p className="erase-yes" style={{fontFamily: '"Roboto", sans-serif', fontSize: '20px', fontWeight:'700', cursor:'pointer'}}>네</p>
            </div>
            &nbsp;&nbsp;
            <div style={{ display: 'inline-block' ,cursor: 'pointer'}} onClick={handleNo}>
                <p className="erase-no" style={{fontFamily: '"Roboto", sans-serif', fontSize: '20px',fontWeight:'700', cursor:'pointer'}} >아니오</p>
            </div>
        </div>
        }

        </>
    )
}
export default Erase