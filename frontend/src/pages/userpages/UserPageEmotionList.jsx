import { mypageSum,mypageDepositLine,mypageEmotionRank } from '../../services/mypage'
import { useState,useEffect } from 'react'
import AnalysisCard from '../../components/common/modals/userModals/AnalysisCard'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const UserPageEmotionList = () => {

  const navigate=useNavigate();


  const onClick = () => {
    navigate('/userpagemain');
  };

  return (
  
    <div className='createcontainer' style={{ position: 'fixed', width:'100%', height:'100%', overflowY: 'auto', backgroundColor:'black'}}>
    
    <img src="/assets/curtain.png" className="curtain" style={{ position: 'fixed', top: '-10%', zIndex: '-1'}} />

    <div>
      <img src="/assets/backarrow.svg" alt="" onClick={onClick} style={{ position: 'fixed', top: '48%', left: '6%', width:'1.5%', cursor:'pointer'}} />
    <AnalysisCard></AnalysisCard>
    </div>


    <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-up"></div>
          <div className="img sign-up"></div>
        </div>
      </div>

    </div>


  )
}

export default UserPageEmotionList