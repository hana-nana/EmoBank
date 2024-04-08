import { useEffect, useState } from "react";
import { emotionCreate } from "../../../services/emotion";
import useStore from "../../../store/zustore";
import { useContext } from 'react';


const OnlySave = () => {
    const [price, setPrice] = useState('')
    const {request, middleOpen, emotionList, modalName} = useStore()
    const {setModalName, setRequest, setMiddleOpen} = useStore((state)=>state)
    const [text, setText] = useState('')
    const [moneyLoad, setMoneyLoad] = useState(false)

    const counter = new Audio('sounds/counter.mp3')
    const playCounter = () => {
      counter.play()
    }

    let response
    const emoCreate = async() => {
        playCounter()
        setMoneyLoad(true)
        
        response = await emotionCreate({ ...request, 'amount': price });
       
        if (response.data.statusCode == 200) {
            if (request.selectedEmotion == 'angry') {
                setMoneyLoad(false)
                setModalName('erase')
            } 
           
            else {
                setTimeout(()=>{
                  
                    setMiddleOpen(false)
                    setModalName('finish')
                },5000)
            }
        }
    }

    let isOpen 
    useEffect(()=> {
        isOpen = middleOpen
        setModalName('isSaving')
        const key = request['selectedEmotion']
        if (Math.ceil(emotionList[key] * 1000)> 0) {
        setPrice(Math.ceil(emotionList[key] * 1000))
        } else {
           setPrice(Math.ceil(emotionList[key] * -1000))
        }
       
    },[middleOpen])



    const handleSaveChange = (event) => {
        setPrice(event.target.value)
    };


    return (

        <>
        {moneyLoad && 
        <div style={{display:'flex', alignItems:'center', justifyContent:'start', position: 'absolute', marginLeft: '15%'}}>
            <img src="/assets/deposit.gif" alt="money" style={{ width: '300px', height:'300px', position: 'fixed', left: '40%', top: '15%', borderRadius: '20px'}} />
        </div>

        }

<div style={{ position: 'relative', display: 'flex', justifyContent: 'start', marginTop:'-50px', marginLeft: '15%' }}>
            <div style={{ position: 'absolute' }}>
                <img src="/assets/paper.jpg" alt="paper" style={{ width: '270px', height: '370px', marginLeft:'180px', marginTop: '-220px' }} />
            </div>

            <div style={{ zIndex: '999', position: 'absolute', left: '200px', top: '40%' }}>
                <img src="/assets/Coin2.webp" alt="2" style={{width:'90px',marginTop: '-490px', marginLeft: '73px'}} />
            </div>

            <div style={{ position: 'absolute',left: '250px', top: '80px', fontSize: '2em',marginTop: '-200px' }}>
                <input type="text" value={price} onChange={handleSaveChange} style={{width:'130px', height:'35px', fontSize:'20px', border: 'none',marginTop: '-200px', padding: '10px'}}/>
                <img src="/assets/won.png" alt="won" style={{ position: 'absolute', left: '97px', top: '30%', width: '25px', marginBottom:'0px', zIndex: '2'}} />
            </div>

            <div style={{ color: 'black', position: 'absolute', left: '315px', top: '245px', transform: 'translateX(-50%)', fontSize: '0.7em', textAlign:'center',marginTop: '-300px'}}>
                <b>* 금액은 수정가능합니다.</b>
            </div>

            <div style={{ position: 'absolute', left: '250px', top: '40px', height:'50px'}}>
                <button onClick={emoCreate} style={{width:'135px', height:'50px', marginTop: '-200px', backgroundColor:'transparent',border:'none', fontWeight:'900', fontFamily: '"Roboto", sans-serif', letterSpacing:'2px', color: 'darkgreen'}}>저축하기</button>
            </div>
        </div>
        </>
         
        
        );
}
export default OnlySave