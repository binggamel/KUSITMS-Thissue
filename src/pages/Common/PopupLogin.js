import React, {useState} from "react";
import Popup from "reactjs-popup";
import "../../styles/Common/popupLogin.scss";
import axios from "axios";
import {NavLink} from "react-router-dom";

const PopupLogin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (email, password) => {
        axios.post("/api/user/login/", {
            email,
            password
        }).then(response => console.log(`${email} ${password} 성공!`));
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(email)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <Popup className="popup-login"
               trigger={props.trigger}
               modal>
            <div className="popupLogin-title">로그인</div>
            <div className="popupLogin-signup-wrap">
                <div>딧슈 회원이 아니신가요?</div>
                <NavLink to="/auth/signup/email/" className="popupLogin-signup">회원가입</NavLink>
            </div>
            <div className="popupLogin-input-wrap">
                <div>이메일 ID</div>
                <input type="text" value={email} onChange={handleEmail}/>
            </div>
            <div className="popupLogin-input-wrap">
                <div>비밀번호</div>
                <input type="text" value={password} onChange={handlePassword}/>
            </div>
            <div className="button-wrap">
                <button className="button"
                     onClick={() => login(email, password)}>
                    로그인
                </button>
                <div className="popupLogin-find">아이디/비밀번호 찾기</div>
            </div>
        </Popup>
    )
}

export default PopupLogin;