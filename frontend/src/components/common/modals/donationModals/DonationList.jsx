import { useState,useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';


const DonationList = () => {
    const [text,setText]=useState("기부 내역을 보여드리겠습니다.")



    return (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <TypeAnimation
          sequence={[
            300,
            text,
            1000
          ]}
          wrapper="span"
          speed={25}
          cursor={false}
          style={{ fontWeight: '700',fontSize: '25px', position: 'fixed', marginTop: '10px' }}
        />
        </div>
    )
  }
export default DonationList