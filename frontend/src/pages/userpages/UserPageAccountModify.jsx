import React, { useState, useEffect, useRef } from 'react'
import "./UserPageAccountModify.css"
import UserPageAccountModifyForm from "./UserPageAccountModifyForm";
import { useNavigate } from 'react-router'

const UserPageAccountModify = () => {
  
const navigate=useNavigate();
const onClick = () => {
  navigate('/userpagemain');
};


const [isModal, setModal] = useState(false)
    const container1 = useRef(null);
    const container2 = useRef(null);
    const openModal = () => {
        setModal(true);
      };


    const closeModal = () => {
        setModal(false);
      };

    useEffect(() => {
      const timer = setTimeout(() => {
        if (container1.current) {
          container1.current.classList.add("sign-in");
        }
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (container2.current) {
          container2.current.classList.add("sign-in");
        }
      }, 500);

      return () => clearTimeout(timer);
    }, []);


  return (
    <>
    <div className='createcontainer'>
    <div id="container1" className="container1" ref={container1}>
    <div id="container2" className="container2" ref={container2}>
    <img src="/assets/curtain.png" className="curtain" />
    

        <h1 className='createtitle'>통장정보조회/수정</h1>
        <img className="accountbook" src="/assets/bankbook.png" alt="통장" />
        <img className="tower" src="/assets/tower.png" alt="타워" />
        <button className='createBtn' onClick={openModal}>
          <img className="plus" src="/assets/plus.svg" alt="" />
          통장보기
        </button>
        <img className='backBtn' src="/assets/backarrow.svg" alt="backarrow" onClick={onClick} />

    
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-up"></div>
          <div className="img sign-up"></div>
        </div>
      </div>

    </div>
    </div>
    </div>
      <UserPageAccountModifyForm isOpen={isModal} onRequestClose={closeModal}/>
      </>
  )
}

export default UserPageAccountModify