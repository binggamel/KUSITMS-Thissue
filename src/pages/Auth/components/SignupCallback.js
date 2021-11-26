import React from "react";
import {NavLink} from "react-router-dom";

const SignupCallback = () => {
    return (
        <>
            <div className="signup-header">
                <span>회원인증</span> > <span>정보입력</span> > <span className="checked">가입완료</span>
            </div>
            <div className="signupCallback-title">
                딧슈에 가입하신걸 환영합니다!<br/>다양한 이슈에 힘을 보태봐요🔥
            </div>
            <div className="signupCallback-buttons">
                <button className="mypage">마이페이지</button>
                <button className="home"><NavLink to="/" className="home">홈 화면으로 이동</NavLink></button>
            </div>
        </>
    )
}

export default SignupCallback;