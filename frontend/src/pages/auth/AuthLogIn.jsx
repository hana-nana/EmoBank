import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {userLogin, userAccountCheck} from "../../services/user"
import useStore from "../../store/zustore";
import '@/styles/common/AuthLogin.scss';
import AuthJoin from './AuthJoin';

const AuthLogIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크
  const {handleGenderChange} = useStore((state)=>state)
  
  const navigate = useNavigate();
  const container1 = useRef(null);
  const container2 = useRef(null);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    let userinfo = {"userId" : userId, "password" : password}
    let result = await userLogin(userinfo)
    handleGenderChange(result.data.gender)
    if (result.data.statusCode === 200) {
      setLoginCheck(false);
      // Store token in local storage
    
      sessionStorage.setItem("token", result.data.accessToken);
      sessionStorage.setItem("userId", result.data.userId); // 여기서 userid를 저장합니다.
      sessionStorage.setItem("nickname", result.data.nickname); // 여기서 role를 저장합니다.
      sessionStorage.setItem("gender", result.data.gender); // 여기서 role를 저장합니다.
      console.log("로그인성공", result);

      if((await userAccountCheck(sessionStorage.getItem('userId'))).data.statusCode == 400) {
        alert('로그인 성공! 연결된 계좌가 없어 계좌 생성 페이지로 이동합니다.')
        navigate("/accountscreate")
      } else {
        alert('로그인 성공! 메인 페이지로 이동합니다.')
        navigate("/Home"); // 로그인 성공시 홈으로 이동합니다.
      }
    
    } else {
      setLoginCheck(true);
    }
  }

  const idInputRef = useRef(null);
  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);
  
  return (
    <div className='logincontainer'>
    <div id="container1" className="container1" ref={container1}>
    <div id="container2" className="container2" ref={container2}>
    <img src="/assets/curtain.png" className="curtain" />
      
      <form onSubmit={handleLogin}>
      <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
      <h1 className='logintitle'>은행방문을 위해 로그인 해주세요</h1>
      <div className="form sign-in">
      
      <div className="input-group">
        <i className="bx bxs-user"></i>
        <input
        ref={idInputRef}
        placeholder="아이디"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input
        placeholder="비밀번호"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

         {loginCheck && (
        <label  style={{color: "red"}}>아이디 혹은 비밀번호가 틀렸습니다.</label>
        )}

        <button className='Btn' onClick={handleLogin}>로그인</button>

        <div className="movelink">
        <Link className="joinlink" to="authjoin">회원가입</Link>
        <Link className="modifypassword" to="authmodifypassword">비밀번호 변경</Link>
        </div>
      
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
  );
};

export default AuthLogIn;