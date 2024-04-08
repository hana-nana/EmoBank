import React from "react";
import * as user from "/src/services/user.js";
class User extends React.Component {
  render() {
    return (
      <div>
        <h1>User API</h1>
        <button
          onClick={async () => {
            const userInfo = {
              userId: "test0101",
              password: "1234",
              gender: "male",
              nickname: "nickname",
            };
            console.log(await user.userCreate(userInfo));
          }}
        >
          회원 가입
        </button>
        <button
          onClick={async () => {
            const userInfo = {
              userId: "test0101",
              password: "1234",
            };
            console.log(await user.userLogin(userInfo));
          }}
        >
          로그인
        </button>
      </div>
    );
  }
}

export default User;
