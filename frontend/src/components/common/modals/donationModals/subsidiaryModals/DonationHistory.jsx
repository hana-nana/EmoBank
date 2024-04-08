

import { useState, useEffect,useContext } from "react";

import { GlobalContext} from '@/App'

import {donationHistory} from '@/services/donation.js'

const DonationHistory= (props)=> {

    const [flag,setFlag]=useState(false)

    const {donation,modalState}=useContext(GlobalContext)
    const [data,setData]=useState([])

    const cardStyle = {
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1',
        backgroundColor: 'black',
        overflow:'hidden',
        textAlign:'center',
        opacity: '0.7'
    };

    async function fetchData() {
        {
            const response = await donationHistory(sessionStorage.getItem('userId'));
            setData(response.data.data)
        } 
    }

    useEffect(()=>{
        if (props.state==="donate-history"){
            setFlag(true)
        }
        else
            setFlag(false)
        });

    useEffect(()=>{
        fetchData();
    },[modalState]);


    return (
        <>
        {flag && (
            <>
            <div style={cardStyle}>
                
                <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {data.map((item, index) => (
                        <li key={index} style={{ color: 'white' }}>
                        <img src={item.imageUrl} style={{ height: '60px',marginTop:'-50px',marginRight:'60px' }}></img>
                            <div style={{ display: 'inline-block'}}>
                                <b> {item.name}</b><br />
                                
                                <strong style={{fontSize:15,color:"yellow"}}>{item.amount}</strong>원<br />
                                <strong style={{fontSize:13}}>{new Date(item.createAt).toLocaleString()}</strong><br />
                                
                            </div>
            
                            <hr></hr>
                        </li>
                    ))}
                </ul>

            </div>
            
            </>
            )}
        </>
    )
}

export default DonationHistory