import React, { useState,  useEffect, useRef } from 'react'
import "./UserPageModify.css"
import * as mypage from "/src/services/mypage.js"
import { useNavigate } from 'react-router'

const UserPageModify = () => {
    const updateMypageInfo = async ( form ) => {
      
        let response
        let data
        try {
            response = await mypage.mypageUserUpdate(form)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원정보 수정 중 에러가 발생했습니다 ㅠ_ㅠ`)
            alert("회원정보 수정 중 에러가 발생했습니다 ㅠ_ㅠ");
        }
        
        data = response.data
        const status = response.status
        console.log(`data : ${data}`)
        console.log(`status : ${status}`)
        
        if (status === 200) {
            console.log(`회원정보 수정 성공!`)
            alert(`회원정보 수정 성공!`)
        }
        else {
            console.log(`회원정보 수정 실패!`)
            alert(`회원정보 수정 실패!`)
        }
    }

const [mypageInfo, setMypageInfo] = useState()
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        getMypageInfo()
    }, [])
    
    const onUpdate = (e) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        const form = e.target
        const userId = form.userId.value
        // const password = form.password.value
        const nickname = form.nickname.value
        const gender = form.gender.value
      
        
        
        mypage.mypageUserUpdate({userId, password, nickname, gender})
    }

    const getMypageInfo = async () => {
        const userId = sessionStorage.getItem('userId');
        const response = await mypage.mypageInfo(userId);
        const data = response.data
     
        setMypageInfo(data)
    }

    const navigate=useNavigate();


    const onClick = () => {
      navigate('/userpagemain');
    };
    
    const container1 = useRef(null);
    const container2 = useRef(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (container1.current) {
          container1.current.classList.add("sign-up");
        }
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (container2.current) {
          container2.current.classList.add("sign-up");
        }
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);

    const nicknameInputRef = useRef(null);
    useEffect(() => {
      if (nicknameInputRef.current) {
        nicknameInputRef.current.focus();
      }
    }, []);


    return (
        <div className='userpagemodifycontainer'>
          <div id="container1" className="container1" ref={container1}>
          <div id="container2" className="container2" ref={container2}>
          <img src="/assets/curtain.png" className="curtain" />
        <img className='backBtn' src="/assets/backarrow.svg" alt="backarrow" onClick={onClick} />

      <form onSubmit={ (e) => onUpdate(e) }>
        <div className="col align-items-center flex-col sign-up">
        <div className="form-wrapper align-items-center">
        <h1 className='userpagemodifytitle'>회원정보조회/수정</h1>
        <div className="form sign-up">


      <div className="input-group">
      <i className="bx bxs-user"></i>
          <input 
            ref={nicknameInputRef}
            type="nickname"
            id="nickname"
            placeholder='새로운 닉네임을 입력해주세요'
            name='nickname'
            autoComplete='nickname'
            required
            defaultValue={mypageInfo?.nickname}                
          />
      </div>
        
      <div className="input-group">
        <i className="bx bxs-user"></i>
          <input 
            type="text"
            id='userId'
            placeholder='기존 아이디'
            name='userId'
            autoComplete='userId'
            required
            readOnly
            defaultValue={mypageInfo?.userId}                
          />
        </div>

        <div className="input-group">
        <i className="bx bxs-user"></i>
          <input 
            type="text"
            id='gender'
            placeholder='gender'
            name='gender'
            autoComplete='gender'
            required
            readOnly
            defaultValue={mypageInfo?.gender}                
          />
        </div>
        


        <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
          <input 
            type="password"
            id='password'
            placeholder='새로운 비밀번호를 입력해주세요'
            name='password'
            autoComplete='password'
            required
            // defaultValue={mypageInfo?.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
          <input 
            type="password"
            id='confirm-password'
            placeholder='새로운 비밀번호를 입력해주세요'
            name='password'
            autoComplete='password'
            required
            // defaultValue={mypageInfo?.password}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='Btn'>
          수정 완료
        </button>
      

        </div>
        </div>
        </div>
      </form>


    <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-up"></div>
          <div className="img sign-up"></div>
        </div>
      </div>

    </div>
    </div>
    </div>
  )
}

export default UserPageModify