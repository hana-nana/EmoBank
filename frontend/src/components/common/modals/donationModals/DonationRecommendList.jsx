import { TypeAnimation } from 'react-type-animation';
import DonationCards from './subsidiaryModals/DonationCards';
import { useContext,useState } from 'react';
import { GlobalContext } from '../../../../App';
const DonationRecommendList = () => {
      const {modalState}=useContext(GlobalContext)

      return (<>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          
        <TypeAnimation
      sequence={[
        300,
        '기부 가능한 목록을 모두 보여드리겠습니다',
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
export default DonationRecommendList