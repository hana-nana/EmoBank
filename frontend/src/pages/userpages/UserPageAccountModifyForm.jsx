import React, { useState, useEffect, useRef } from 'react'
import "./UserPageAccountModifyForm.css"
import * as account from "@/services/account.js"
import Pic2 from '../../components/common/functions/Pic2'
import useStore from '@/store/zustore'

import { useNavigate } from 'react-router'

const UserPageAccountModify = ({ isOpen, onRequestClose }) => {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountInfo, setAccountInfo] = useState("")
  const [userId,setUserId] = useState(sessionStorage.getItem('userId'))
  const imageUrl = useStore((state) => state.imageUrl);

  useEffect(() => {}, [isOpen]);

  const getAccountInfo = async () => {
    try {

    const response = await account.accountDetail(sessionStorage.getItem('userId'))
   
    const data = response.data
    
    setAccountInfo(data)
    } catch (error) {
      console.error('Fail', error)
    }} ;
    
  useEffect (() => {
    getAccountInfo()
  }, [])

  const onUpdate = (e) => {
    e.preventDefault();
    const form = e.target; 
    
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const number = form.number.value;
    const name = form.name.value;
    const goal = form.goal.value;
    const createAt = form.createAt.value;
 
    account.accountUpdate({userId, number, password, name, goal, imageUrl, createAt})
    .then(() => {
      alert("수정이 완료 되었습니다");
    })
    .catch((error) => {
      console.error('수정 중 에러가 발생했습니다', error);
    });
  }



const [isModal, setModal] = useState(false)
    const openModal = () => {
        setModal(true);
      };


    const closeModal = () => {
        setModal(false);
      };


  return (
    isOpen && (
      <>
      <div className="modalOverlay" onClick={onRequestClose}></div>
        <div className="reactModal">


      <form className="bankbookeditcontainer" onSubmit={ (e) => onUpdate(e) }>
      
      <label className="goal">
            목표금액 : 
      </label>
      <input 
      className="goalInput"
      type="text"
      id='goal'
      placeholder='목표 금액을 입력해주세요'
      name='goal'
      defaultValue={accountInfo?.goal}         
      />
      <hr className='hr1' />

      <div className="image">
      <img src={imageUrl || accountInfo.imageUrl} alt="Profile" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      </div>
        <Pic2 />
        <label className="owner">
            예금주 : 
        </label>
            <input 
            className="ownerInput"
            type="text"
            id='name'
            placeholder='새로운 예금주 명을 입력해주세요'
            name='name'
            defaultValue={userId}               
          />

        <label className="balance">
          계좌번호 : 
        </label>
          <input 
          className="balanceInput"
            type="text"
            id='number'
            name='number'
            required
            readOnly
            defaultValue={accountInfo?.number}
          />

        <label className="createDate">
          계좌개설일 : 
        </label>
          <input 
          className="createDateInput"
            type="text"
            id='createAt'
            name='createAt'
            required
            readOnly
            defaultValue={accountInfo?.createAt? accountInfo?.createAt.substr(0,10) : accountInfo?.createAt} 
          />
        <p className="logo-title" style={{color:'black' }}>감정저축은행</p>
        <img className="stamp" src="/assets/image10.png" alt="stamp" />
        <button className="saveBtn" type="submit">
          수정 완료
        </button>

        <img className="closeBtn" onClick={onRequestClose} src="/assets/close.png" alt="" />
      </form>

    </div>
    </>
    )
  )
}

export default UserPageAccountModify