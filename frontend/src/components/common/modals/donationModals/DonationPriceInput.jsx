import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const DonationPriceInput = () => {
    const [text,setText]=useState("얼마를 기부하시겠어요?")

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
export default DonationPriceInput