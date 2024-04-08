import {useState,useContext, useEffect} from 'react';
import Modal from 'react-modal'

import {accountDetail} from '@/services/account.js'
import { GlobalContext } from '../../../../App';

const UserData = () => {

  const [content,setContent]= useState()
  const {modalState}=useContext(GlobalContext)

  async function fetchData() {
        {
            const response = await accountDetail(sessionStorage.getItem('userId'));
            setContent(" ₩"+response.data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        } 
    }
    useEffect(()=>{
        fetchData();
    },[modalState,content])


  const customModalStyles = Modal.Styles = {
    overlay: {
      backgroundColor: "transparent",
        top: '0px', 
        left: '1250px',
      width:'300px',
      height:'100px',
      border:'1px'
      
    },
    content: {
      color: "black",
      zIndex: "1",
      top: "0%",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "1px",
      display: 'flex', // use flexbox
      flexDirection: 'row', // align items vertically
      alignItems: 'center', // center items horizontally
    },
  };

  return (
    <>
        <Modal
            isOpen={true}
            ariaHideApp={false}
            style={customModalStyles}
            >
            <img src='/assets/piggybank.png' style={{width:'30px'}}></img>
            &nbsp;<b>{content}</b>
            
        </Modal>
        
        
    </>
  )
}

export default UserData