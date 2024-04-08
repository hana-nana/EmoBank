import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userCreate } from "../../services/user";
import React from 'react';
import useStore from '@/store/zustore.jsx';
import '@/styles/common/AuthJoin.scss';
import GenderDropDown from '@/components/common/functions/GenderDropDown';

const AuthJoin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const { gender } = useStore();
  const [Gender, setGender] = useState('');
  const [nickname, setNickname] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    setGender(gender);
  }, [gender]);

  const navigate = useNavigate();
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
  

  const handleSignup = async (event) => {
    event.preventDefault();
    let userInfo = {
      "userId": userId,
      "password": password,
      "nickname": nickname,
      "gender": Gender
    };
    console.log(userInfo);
    let result = await userCreate(userInfo);
    console.log(result.data.statusCode);
    if (result.data.statusCode === 200) {
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/authlogin');
    }
  };


  const nicknameInputRef = useRef(null);
  useEffect(() => {
    if (nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  }, []);

  return (
    <div className='joincontainer'>
    <div id="container1" className="container1" ref={container1}>
    <div id="container2" className="container2" ref={container2}>
    <img src="/assets/curtain.png" className="curtain" />
      <form onSubmit={handleSignup}>
        <div className="col align-items-center flex-col sign-up">
        <div className="form-wrapper align-items-center">
        <h1 className='jointitle'>감정저축은행에 오신것을 환영합니다</h1>
        <div className="form sign-up">
            <div className="input-group">
            <i className="bx bxs-user"></i>
            <input
              ref={nicknameInputRef}
              type="nickname"
              id="nickname"
              placeholder='닉네임'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            </div>

        <div className="input-group">
        <i className="bx bxs-user"></i>
        <input
          type="text"
          id="userId"
          value={userId}
          placeholder='아이디'
          onChange={(e) => setUserId(e.target.value)}
        />
        </div>

        <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input
          type="password"
          id="password"
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
       
        <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input
          type="password"
          id="passwordcheck"
          placeholder='비밀번호 확인'
          value={passwordcheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        </div>

        <div className="genderdropdown">
        <GenderDropDown
        name="gender"
        required
        />
        <small>
        * 캐릭터 생성시 적용됩니다.
        </small>
        </div>

         {loginCheck && (
        <label  style={{color: "red"}}>아이디 혹은 비밀번호가 틀렸습니다.</label>
        )}
        <button className='Btn' onClick={handleSignup}>회원가입</button>
        
        
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


export default AuthJoin