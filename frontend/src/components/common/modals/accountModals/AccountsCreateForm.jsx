import React, { useEffect, useState } from "react";
import Pic from "../../functions/Pic";
import "@/styles/common/AccountsCreateForm.css";
import * as account from "@/services/account.js";
import CreateButton from "../../functions/CreateButton";
import { ToggleMenu } from "@/components/common/functions/ToggleMenu.jsx";
import useStore from "../../../../store/zustore";
import { accountCreate } from "../../../../services/account";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const AccountsCreateForm = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const { bankNum, picUrl } = useStore();
  const navigate = useNavigate();

  useEffect(() => {}, [isOpen]);

  const createUserAccount = async (form) => {
    let response;
    try {
      const token = sessionStorage.getItem("token");

      response = await accountCreate(form, token);

      if (response.status === 200) {
        alert("계좌생성완료");
        navigate("/accountscreate/accountcreateformresult");
      }
    } catch (error) {
      console.error("에러", error);
      alert("에러");
    }
  };

  const create = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호 불일치");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    const formData = new FormData();
    formData.append("accountTypeUniqueNo", bankNum);
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("goal", goal);
    formData.append("image", picUrl);

    createUserAccount(formData);
  };

  return (
    isOpen && (
      <>
        <div className="modalOverlay" onClick={onRequestClose}></div>
        <div className="reactModal">
          <div className="ToggleMenu" style={{ cursor: "pointer" }}>
            <p>은행을 선택하세요</p>
            <ToggleMenu name="bank" required />
          </div>

          <form className="createmodalform" onSubmit={create}>
            <div className="inputs">
              <label htmlFor="accounthost">예금주</label>
              <Form.Control
                id="accounthost"
                type="text"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="예금주 명을 입력하세요"
              />

              <label htmlFor="goal">목표금액</label>
              <Form.Control
                id="goal"
                type="text"
                name="goal"
                required
                onChange={(e) => setGoal(e.target.value)}
                value={goal}
                placeholder="목표금액을 설정해주세요"
              />

              <label htmlFor="password">계좌비밀번호</label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="비밀번호"
              />

              <label htmlFor="passwordcheck">계좌비밀번호 확인</label>
              <Form.Control
                id="passwordcheck"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={passwordConfirm}
                placeholder="비밀번호 확인"
              />
            </div>

            <div id="Image" className="Image">
              <Pic name="image" />
            </div>

            <button className="saveBtn" type="submit">
              저장
            </button>
            <img className="closeBtn" onClick={onRequestClose} src="/assets/close.png" alt="" />
          </form>
          <img className="bankbook" src="/assets/bankbook.png" alt="통장" />
        </div>
      </>
    )
  );
};

export default AccountsCreateForm;
