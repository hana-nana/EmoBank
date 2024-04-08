

import { useState, useEffect,useContext } from "react";

import { GlobalContext} from '@/App'

import { donationPay } from "../../../../../services/donation";
import {accountDetail} from '@/services/account.js'
import { Button } from "react-bootstrap";

const DonationCardConfirm= (props)=> {

    const [flag,setFlag]=useState(false)
    const [amount,setAmount]=useState(0)

    const {donation,setModalState}=useContext(GlobalContext)

    const cardStyle = {
        position: 'fixed',
        top: '40%',
        left: '35%',
        transform: 'translate(-50%, -70%)',
        width: '200px',
        height: '300px',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1',
        backgroundColor: 'black',
        overflow:'hidden',
        textAlign:'center'
    };

    const textStyle = {
        position: 'fixed',
        top: '40%',
        left: '65%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '300px',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1',
        overflow:'hidden',
        textAlign:'center'
    };


    useEffect(()=>{
        if (props.state==="donate-price"){
            setFlag(true)
        }
        else
            setFlag(false)
        });

        async function fetchData() {
                const response = await accountDetail(sessionStorage.getItem('userId'));
                return response.data.balance
        }


        const applause = new Audio('/sounds/applause.mp3')
        const playApplause = () => {
          applause.play()
        }
    const handleSubmit= (async (e)=>{
        e.preventDefault();
        if(amount!=0 && amount< await fetchData()){
            const userId = sessionStorage.getItem('userId');
            const payInfo= {
                name : donation.name,
                userId : userId,
                amount : amount+''
            }
            donationPay(payInfo)
            setAmount(0)
            setModalState("donate-finish")
            playApplause()
        }
    })

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10); 
        setAmount(isNaN(value) ? '' : value);
      };


      const counter = new Audio('/sounds/counter.mp3')
      const playCounter = () => {
        counter.play()
      }

    return (
        <>
        {flag && (
            <>
            <div style={{ backgroundColor: 'rgba(50, 50, 50, 0.8)', borderRadius: '10px', padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={cardStyle}>
            <img src={donation.imageUrl} width="150" height="200" />
            <p style={{ color: 'white', marginTop: '25px' }}><b>{donation.name}</b></p>
        </div>
        <div style={textStyle}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ color: "white" }}>기부금액 : </h2>
                <input
    type="text"
    value={amount} // Prepend the '₩' sign to the value
    onChange={handleChange}
    style={{ border: '1px solid #ccc', width: '150px', textAlign: 'right', marginTop:'10px' }} // Align text to the right
/>
                <div>
                    <Button variant="dark" style={{ marginTop: '10px', width: '100px' }} type="submit" onClick={playCounter}>확인</Button>
                </div>
            </form>
        </div>
    </div>
</>


            )}
        </>
    )
}

export default DonationCardConfirm