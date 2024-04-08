import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const DonationList = () => {
    const [text,setText]=useState("기부가 완료되었습니다. 감사합니다.")

    return (<>
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
        </>
    )
  }
export default DonationList