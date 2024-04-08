import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from "react-router-dom";
import '@/styles/common/PasswordModify.css'

const AuthModifyPassword = () => {
    const [userId, setUserId] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordcheck, setPasswordCheck] = useState("");
    const navigate = useNavigate();
    const container1 = useRef(null);
    const container2 = useRef(null);

    const handleModify = async (event) => {
      event.preventDefault();
      let userInfo = {
        "userId": userId,
        "password": password,
        "nickname": nickname,
      };
      console.log(userInfo);
      let result = await userCreate(userInfo);
      console.log(result.data.statusCode);
      if (result.data.statusCode === 200) {
        alert('변경 성공! 로그인 페이지로 이동합니다.');
        navigate('/authlogin');
      }
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

    const nicknameInputRef = useRef(null);
    useEffect(() => {
      if (nicknameInputRef.current) {
        nicknameInputRef.current.focus();
      }
  }, []);
    
return (

    <div className='modifycontainer'>
    <div id="container1" className="container1" ref={container1}>
    <div id="container2" className="container2" ref={container2}>
    <img src="/assets/curtain.png" className="curtain" />

    <form onSubmit={handleModify}>
      <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
      <h1 className='modifytitle'>비밀번호 변경을 도와드리겠습니다</h1>
      <div className="form sign-in">

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
              id="newPassword"
              placeholder='새 비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
      </div>

      <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input
              type="password"
              id="passwordcheck"
              placeholder='새 비밀번호 확인'
              value={passwordcheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
      </div>

      <button className='Btn' onClick={handleModify}>비밀번호 변경</button>

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

export default AuthModifyPassword