import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal'
import { useContext } from 'react';
import { modalUse } from '../../../../pages/Home';
import { GlobalContext } from '../../../../App';
import "../../../../styles/common/index.css"
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import useStore from '../../../../store/zustore';
import MemocreateForm from '../../functions/MemoCreateForm';
import Select from './emotion/GameEmotionSelect';
import OnlySave from '../../functions/OnlySave';
import { TypeAnimation } from 'react-type-animation';
import SaveComplete from '../../functions/SaveComplete';
import Check from './emotion/GameEmotionCheck';
import { emotionEmoji } from '../../../../services/emotion';
import { Html } from '@react-three/drei';
import IsSave from '../../functions/IsSave';
import { Button } from 'react-bootstrap';
import Erase from './emotion/GameEmojiErase';
import '@/styles/common/Hover.css'



const Dialog = ({isOpen, onRequestClose}) => {
  const { modalIsOpen: modalState, setModal} = useContext(modalUse); //핵심코드
  const {proximity,setZoomed}=useContext(GlobalContext)
  const {handleActive,handleModal,setMiddleOpen, setModalName, setIsDelete} = useStore((state)=> state)
  const {modalOpen, middleOpen, isDelete} = useStore()
  const {setModalState}= useContext(GlobalContext)
  const [create, onCreate] = useState(false)
  const [modalStage,setModalStage] =useState(1)
  const [emoji,setEmoji]=useState("")

  const clickSound = new Audio('/sounds/Select.mp3')
  const playClick = () => {
    clickSound.play() }  
    
    const counter = new Audio('/sounds/counter.mp3')
    const playCounter = () => {
      counter.play()
    }
    
    const bookSound = new Audio('/sounds/book.mp3')
    const playBook = () => {
    bookSound.play()
  }

  const applause = new Audio('/sounds/applause.mp3')
  const playApplause = () => {
    applause.play()
  }
  
    
    const memoWrite = (() => {
      playClick()
      onCreate(true)
      handleActive(true)
      handleModal(true)
      setContent(<p style={{fontSize:'25px', marginBottom:"50px"}}><b>감정메모를 기록해주세요. 메모를 분석해드리겠습니다.</b></p>)
      playBook()
    })

    const simpleDeposit = (() => {
      playClick()
      setModalStage(2);
      setContent(<p style={{fontSize:'25px', marginBottom:"50px"}}><b>현재 감정을 선택해주세요.</b></p>)
      
    })
    
    const {emotion, modalName} = useStore()
    const {modalIsOpen} = useContext(modalUse)

    useEffect(()=>{
      if(!modalIsOpen)
        setContent(initialContent)
      onCreate(false)
      handleModal(false)
      setMiddleOpen(false)
      handleActive(false)
      setModalStage(0)
      setEmoji('')
    },[modalState])
  
    const userId = sessionStorage.getItem('userId')

    
    const initialContent= <>
          <div style={{display: 'flex', justifyContent: 'start' }}>
           <p style={{ fontSize:'25px', position: 'fixed', top: '-11%', left: '33%', fontFamily: '"Roboto", sans-serif', fontWeight: '800'}}>
                {userId}님 감정저축은행에 오신것을 환영합니다! 
          
           </p>
            
          </div>
          <div className='record' style={{ position: 'fixed', top: '0%', display: 'flex', justifyContent: 'center', cursor: 'pointer', textAlign: 'center', marginTop:'10px',marginLeft:'-30px', fontSize:'18px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', color: 'rgb(36,88,75)' }}>
          <p onClick={memoWrite} ><b >기록저축</b></p>
          </div>
          
          <div className='simple' style={{ position: 'fixed', top: '0%',display: 'flex', justifyContent: 'center', cursor: 'pointer', textAlign: 'center', marginTop:'45px',marginLeft:'-30px',marginBottom:'60px', fontSize:'18px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', color: 'rgb(36,88,75)' }}>
          <p onClick={simpleDeposit}><b >간편저축</b></p>
          </div>

          
      </>
  
    const [content,setContent] = useState(
         initialContent 
      )  


      let timer
  useEffect(() => {
   
    switch (modalName) {

      
      case "analyzing":
        setContent(<Check/>)
        break
        
        case "resultConfirm":  
        setContent(<Select/>)
        break
        
        case "erase":
          setContent(<Erase/>)
          break

      case "isSaving":
        setContent(<IsSave/>)
        break
      case "finish":
        setContent(<SaveComplete/>)
        setModalStage(4)
        timer = setTimeout(() => {setModalState("exit")
        setModalStage(0)
        }, 4000);
        playApplause()
        break;
      
    }
    return () => clearTimeout(timer), setModalName('');
  }, [modalName]);


      const emojiClick=(emote)=>{
        playClick()
        setEmoji(emote)
        setContent(<p style={{fontSize:'25px', marginBottom:"50px"}}><b>금액을 정해주세요.</b></p>)
      }

      const [simpAmount,setSimpAmount]=useState(0)
      
      const handleChange = (e) => {
        const value = parseInt(e.target.value, 10); 
        setSimpAmount(isNaN(value) ? '' : value);
      };
      
      const exit=(()=>{
        setModalState("exit")
        setModalStage(0)

      })
      
     
      const handleSubmit= (async (e)=>{
        e.preventDefault();
        if(simpAmount!=0){
            const userId = sessionStorage.getItem('userId');
            const depositInfo= {
                userId : userId,
                emoji : emoji,
                amount : simpAmount
            }
            emotionEmoji(depositInfo)
            setSimpAmount(0)
            setModalStage(3)
            setContent(<p style={{fontSize:'25px', marginBottom:"50px"}}><b>저축이 완료되었습니다.</b></p>)
            timer = setTimeout(() => {
              setModalState("exit")
              setModalStage(0)
              playApplause()
        }, 4000);
        }
        
    })


    useEffect(() => {
      let timer;
      if (isDelete) {
        timer = setTimeout(() => {
          setIsDelete(false);
          
        }, 3000);
      }
      return () => clearTimeout(timer);
    }, [isDelete]);

      return (
        <>
        


        {modalState && proximity==="deposit" && (<div className="layout-detail">
            <motion.section 
                className="top"
                initial={{y: "-100%"}}
                animate={{y: 0}}
                transition={{delay: 0.5, duration: 1}}
                exit={{y: "100%", transition:{ duration: 0.5}}}
            >
            </motion.section>

          {isDelete && 

            <img src="/assets/shredder.gif" alt="shredder" style={{ width: '300px', height:'300px', position: 'fixed', left: '40%', top: '15%', borderRadius: '20px'}} />

          }




          {modalOpen && create &&
              <motion.section
              className='writing'
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 1 }}
              exit={{ opacity: 0 }}
              // whileHover={{ scale: 1.1 }}
              // transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <MemocreateForm/>
              </motion.section>
          }

{middleOpen && <motion.section
            className='amount'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            exit={{ opacity: 0, transition:{ duration: 0.5} }}
            style={{width: '50%', height: '5%'}}
          >
            
            <OnlySave/>
            </motion.section>}




              {modalStage==2 && emoji=="" &&
                <div style={{position:'fixed',display: 'flex',justifyContent:'center',alignItems: 'center',top: '60%', left:'50%'}}>
                <div style={{ display: 'flex', gap:'50px', justifyContent:'center',alignItems: 'center',transform: 'translateY(150px)', position: 'fixed', zIndex: '1000', marginTop: '-400px'  }}>
                  <img className='happiness' onClick={() => emojiClick("happiness")} src="/assets/smileface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="행복" />
                  <img className='angry' onClick={() => emojiClick("angry")} src="/assets/angryface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="분노" />
                  <img className='sadness' onClick={() => emojiClick("sadness")} src="/assets/sadface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="슬픔" />
                  <img className='fear' onClick={() => emojiClick("fear")} src="/assets/scaredface.png" style={{width:'5.8em', height:'5.8em', cursor: 'pointer' }} data-text="두려움" />
                  <img className='surprise' onClick={() => emojiClick("surprise")} src="/assets/surpriseface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="놀람" />
                  <img className='disgust' onClick={() => emojiClick("disgust")} src="/assets/disgustface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="역겨움" />
                  <img className='neutral' onClick={() => emojiClick("neutral")} src="/assets/neutralface.png" style={{width:'5em', height:'5em', cursor: 'pointer' }} data-text="중립" />
              </div>
              </div>
              }

        

              {modalStage==2 && emoji!="" && 
    
          <form onSubmit={handleSubmit}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'start', marginTop:'-50px', marginLeft: '15%' }}>
                      <div style={{ position: 'absolute' }}>
                          <img src="/assets/paper.jpg" alt="paper" style={{ width: '270px', height: '370px', marginLeft:'180px', marginTop: '-220px' }} />
                      </div>

                      <div style={{ zIndex: '999', position: 'absolute', left: '200px', top: '40%' }}>
                          <img src="/assets/Coin2.webp" alt="2" style={{width:'90px',marginTop: '-490px', marginLeft: '73px'}} />
                      </div>

                      <div style={{ position: 'absolute',left: '250px', top: '80px', fontSize: '2em',marginTop: '-200px' }}>
                          <input type="text" value={simpAmount} onChange={handleChange} style={{width:'130px', height:'35px', fontSize:'20px', border: 'none',marginTop: '-200px', padding: '10px'}}/>
                          <img src="/assets/won.png" alt="won" style={{ position: 'absolute', left: '97px', top: '30%', width: '25px', marginBottom:'0px', zIndex: '2'}} />
                      </div>

                      <div style={{ color: 'black', position: 'absolute', left: '315px', top: '245px', transform: 'translateX(-50%)', fontSize: '0.7em', textAlign:'center',marginTop: '-300px'}}>
                          <b>* 금액은 수정가능합니다.</b>
                      </div>

                      <div style={{ position: 'absolute', left: '250px', top: '40px', height:'50px'}}>
                          <button onClick={playCounter} className='submit' type='submit' style={{width:'135px', height:'50px', marginTop: '-200px', backgroundColor:'transparent',border:'none', fontWeight:'900', fontFamily: '"Roboto", sans-serif', letterSpacing:'2px', color: 'darkgreen'}}>저축하기</button>
                      </div>
                  </div>



                      
                
                </form>

              }
              {(modalStage==3 || modalName=="finish") &&
                <label htmlFor=""></label>
              }
              {(modalStage==4 || modalName=="finish") &&
                <label htmlFor=""></label>
              }
              
        

            <motion.section 
                className="bottom"
                initial={{y: "150%"}}
                animate={{y: "50%"}}
                transition={{delay: 0.5, duration: 1}}
                exit={{y: "-100%", transition:{ duration: 0.5}}}
                style={{backgroundColor:'none', display:'flex', justifyContent:'center'}}
            >

              <div style={{backgroundColor:'none', display:'flex', justifyContent:'center',paddingTop:'5px',height:'100px'}} > 
              <h2>
                {content}
                </h2>
              </div>

              <img className='modalbanner' src="/assets/modalbanner.svg" alt="" style={{ position: 'fixed'}} />
            <img src="/assets/closeblack.png" alt="" onClick={exit} style={{ position: 'fixed', right: '21%', top: '-10%',width: '20px', height: '20px', opacity: '70%', cursor:'pointer' }}/>

            </motion.section>


        </div>
        )}
        
        </>
    ) 
    
  }
export default Dialog