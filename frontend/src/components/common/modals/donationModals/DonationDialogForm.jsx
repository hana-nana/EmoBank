import {useState,useContext, useEffect} from 'react';
import Modal from 'react-modal'

import { motion } from "framer-motion";
import { modalUse } from '../../../../pages/Home';
import { GlobalContext } from '../../../../App';
import DonationRecommendList from './DonationRecommendList';
import DonationList from './DonationList';
import DonationComplete from './DonationComplete'
import { TypeAnimation } from 'react-type-animation';

import '@/styles/modals/Modal.css'
import DonationPriceInput from './DonationPriceInput';

const clickSound = new Audio('/sounds/Select.mp3')
const playClick = () => {
  clickSound.play() }


const customModalStyles = Modal.Styles = {
    overlay: {
      backgroundColor: "invisible",
      top:"550px",
    },
    content: {
      color: "black",
      zIndex: "1",
      top: "50%",
      
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "none",
    },
  };

const DonationDialogForm = () => {

  const {modalState,setModalState}= useContext(GlobalContext)

  const Donate=(()=> {
    playClick()
    setModalState("donate-list")
  })

  const PastDonation=(()=> {
    playClick()
      setModalState("donate-history")
      setContent(<DonationList/>)
  })





  useEffect(() => {
    let timer;
    switch(modalState){
      case "donate-list":
        setContent(<DonationRecommendList />);
        break;
      case "donate-history":
        setContent(<DonationList />);
        break;
      case "donate-price":
        setContent(<DonationPriceInput/>);
        break;
      case "donate-finish":
        setContent(<DonationComplete />);
        timer = setTimeout(() => setModalState("exit"), 4000);
        break;
      
    }
    return () => clearTimeout(timer);
  }, [modalState]);

  useEffect(()=>{
    if(!modalIsOpen)
      setContent(initialContent)
  },[modalState])


  const initialContent= <>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-35px' }}>
          <TypeAnimation
            sequence={[
              1000,
              '어려움에 처한 이들에게 도움의 손길을 건내주세요',
              1000
            ]}
            wrapper="span"
            speed={25}
            cursor={false}
            style={{ fontWeight: '700',fontSize: '18px', position: 'fixed' }}
        />
        <div style={{ position: 'fixed', top: '0%', display: 'flex', justifyContent: 'center', cursor: 'pointer', textAlign: 'center', marginTop:'10px', fontSize:'18px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', color: 'rgb(36,88,75)' }}>
          <p onClick={Donate} ><b >기부하기</b></p>
        </div>
          
        <div style={{ position: 'fixed', top: '0%',display: 'flex', justifyContent: 'center', cursor: 'pointer', textAlign: 'center', marginTop:'45px',marginBottom:'60px', fontSize:'18px', fontFamily: '"Roboto", sans-serif', fontWeight: '600', color: 'rgb(36,88,75)' }}>
          <p onClick={PastDonation}><b >기부내역보기</b></p>
        </div>

        </div>


    </>

  const [content,setContent] = useState(
       initialContent 
    )

    const exit=(()=>{
      setModalState("exit")
    })
  const {modalIsOpen} = useContext(modalUse); //핵심코드
  const {proximity}=useContext(GlobalContext)

  return (
    <>
        {modalIsOpen && proximity==="donate" && (<div className="layout-detail">
       

            <motion.section 
                className="bottom"
                initial={{y: "100%"}}
                animate={{y: "50%"}}
                transition={{delay: 0.5, duration: 1}}
                exit={{y: "-100%", transition:{ duration: 0.5}}}
                style={{ display: 'flex', justifyContent: 'center' }} // Align contents to center
            >
              <Modal
                isOpen={modalIsOpen && proximity==="deposit"}
                ariaHideApp={false}
                style={customModalStyles}
                onRequestClose={() => {zoomOut}}
                >
              </Modal>

              <div style={{backgroundColor:'none', display:'flex', justifyContent:'center',paddingTop:'5px',height:'100px'}} > 
              <h2>
                {content}
                </h2>
              </div>

              <img className='modalbanner' src="/assets/modalbanner.svg" alt="" style={{ position: 'fixed'}} />
            <img src="/assets/closeblack.png" alt="" onClick={exit} style={{ position: 'fixed', right: '21%', top: '-10%',width: '20px', height: '20px', opacity: '70%', cursor:'pointer' }}/>
              
            </motion.section>
        </div>)}
              {modalState=="donate-finish"  &&
                <div style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end',height:'100%',marginRight:'40px',transform: "translateY(-722px)"}}>
                  <img src="/assets/loader.gif" style={{height:'30px'}}></img>
                </div>
              }
        </>
  )
}

export default DonationDialogForm