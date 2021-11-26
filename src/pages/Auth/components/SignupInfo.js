import React from "react";
import {NavLink} from "react-router-dom";

const SignupInfo = (props) => {
    const handleName = (e) => {
        props.setName(e.target.value);
    }

    const handlePassword = (e) => {
        props.setPassword(e.target.value);
    }

    const handlePhonenumber = (e) => {
        props.setPhonenumber(e.target.value);
    }

    return (
        <>
            <div className="signup-header">
                <span>회원인증</span> > <span className="checked">정보입력</span> > <span>가입완료</span>
            </div>

            <div className="signup-info">
                <div>이메일 ID</div>
                <input value="csh0sns@snu.ac.kr" className="fixed"/>
            </div>
            <div className="signup-info">
                <div>이름</div>
                <input type="text" value={props.name} onChange={handleName}/>
            </div>
            <div className="signup-info">
                <div>연락처</div>
                <input type="text" value={props.phonenumber} onChange={handlePhonenumber}/>
            </div>
            <div className="signup-info">
                <div>비밀번호</div>
                <input type="password" value={props.password} onChange={handlePassword}/>
            </div>
            <div className="signup-info">
                <div>비밀번호 확인</div>
                <input type="password"/>
            </div>
            <div className="signup-info-dif">
                <div className="name">생년월일</div>
                <div className="signup-input-wrap">
                    <input type="text" placeholder="YYYY"/>
                    <input type="text" placeholder="MM"/>
                    <input type="text" placeholder="DD"/>
                </div>
            </div>
            <div className="signup-info-dif">
                <div className="name">성별</div>
                <div className="signup-checkbox-wrap">
                    <input type="checkbox" id="man"/>
                    <label htmlFor="man">✓</label><span>남성</span>
                    <input type="checkbox" id="woman"/>
                    <label htmlFor="woman">✓</label><span>여성</span>
                    <input type="checkbox" id="guitar"/>
                    <label htmlFor="guitar">✓</label><span>기타</span>
                    <input type="checkbox" id="unselect"/>
                    <label htmlFor="unselect">✓</label><span>선택 안 함</span>
                </div>
            </div>

            <div className="signupInfo-buttons">
                <button className="cancel">취소하기</button>
                <button className="submit"><NavLink to="/auth/signup/callback" className="submit">가입하기</NavLink></button>
            </div>
        </>
    )
}

export default SignupInfo;