import React from "react";

const SignupEmail = (props) => {
    const handleEmail = (e) => {
        props.setEmail(e.target.value);
    }

    return (
        <>
            <div className="signup-header">
                <span className="checked">회원인증</span> > <span>정보입력</span> > <span>가입완료</span>
            </div>
            <div className="signupInfo-title">개인정보 제공 및 활용 동의</div>
            <div className="signupInfo-contents">어쩌구 저쩌구 활용동의다!</div>
            <div className="signupInfo-checkbox-wrap">
                <input type="checkbox" id="checkbox"/>
                <label htmlFor="checkbox">✓</label>
                <span>이용약관에 동의합니다.</span>
            </div>
            <div className="signupInfo-title">이메일 인증으로 가입하기</div>
            <input className="signupInfo-email" type="text" placeholder="이메일을 입력해주세요" value={props.email}
                   onChange={handleEmail}/>
            <div className="signupInfo-email-button">
                <button>
                    인증번호 전송하기
                </button>
                <div className="signupInfo-text">이메일을 확인해서 인증을 진행해주세요!<br/>메일을 받지 못했을 경우 스팸메일함을 확인해주세요.</div>
            </div>
        </>
    )
}

export default SignupEmail;