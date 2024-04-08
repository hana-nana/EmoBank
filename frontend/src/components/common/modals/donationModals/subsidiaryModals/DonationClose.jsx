

import { useState, useEffect } from "react";

const DonationCardConfirm= (props)=> {

    const [flag,setFlag]=useState(false)

    const cardStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '300px',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1',
        backgroundColor: 'black',
        overflow:'hidden',
        textAlign:'center'
    };


    useEffect(()=>{
        if (props.state==="donate-complete"){
            setFlag(true)
        }
        else
            setFlag(false)
        });

    return (
        <>
        {flag && (
            <>
            <div style={cardStyle}>
                <h1>창이 자동으로 닫힙니다.</h1>
            </div>
            </>
            )}
        </>
    )
}

export default DonationCardConfirm