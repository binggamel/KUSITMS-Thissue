import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import {SignupCallback, SignupEmail, SignupInfo} from "./components";
import {Header} from "../Common";
import "../../styles/Auth/Signup.scss";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("")
    const [phonenumber, setPhonenumber] = useState("");
    const [sex, setSex] = useState("");

    return (
        <>
            <Header/>
            <div id="signup">
                <div className="popupLogin-title">회원가입</div>
                <Routes>
                    <Route path="email/"
                           element={<SignupEmail
                               email={email}
                               setEmail={setEmail}
                           />}/>
                    <Route path="info/"
                           element={<SignupInfo
                               password={password}
                               setPassword={setPassword}
                               name={name}
                               setName={setName}
                               birthday={birthday}
                               setBirthday={setBirthday}
                               phonenumber={phonenumber}
                               setPhonenumber={setPhonenumber}
                               sex={sex}
                               setSex={setSex}
                           />}/>
                    <Route path="callback/" element={<SignupCallback/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Signup;