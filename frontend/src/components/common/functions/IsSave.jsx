import { useState } from 'react';


const IsSave = () => {
    const [text,setText]=useState("저희 은행만의 감정 밸류 추출 시스템을 통해 고객님이 느끼신 감정을 금액으로 나타냈습니다.")

    return (
        <div style={{fontSize:'19px', height:'200px', marginTop:'2px', marginLeft: '-3px',fontFamily: '"Roboto", sans-serif', fontWeight:'600'}}>
          {text}
        </div>
    )
  }
export default IsSave