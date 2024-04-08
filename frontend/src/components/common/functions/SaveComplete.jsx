import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const SaveComplete = () => {
    const [text,setText]=useState("저축이 완료되었습니다. 감사합니다.")

    return (

        <TypeAnimation
          sequence={[
            300,
            text,
            1000
          ]}
          speed={25}
          cursor={false}
          style={{display: 'flex', fontWeight: '700', fontSize: '30px', marginTop:'-10px'}}
          />

    )
  }
export default SaveComplete