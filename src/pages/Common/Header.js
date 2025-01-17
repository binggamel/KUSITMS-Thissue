import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Common/header.scss";
import logo from "../../styles/img/logo.jpg";
import axios from "axios";
import Popup from "reactjs-popup";
import {PopupLogin} from "./index";

const Header = () => {
    const [authInfo, setAuthInfo] = useState([])

    useEffect(() => {
        axios.get("/api/issue/tokenTest/test").then(response => {
            setAuthInfo(response.data);
        })
    })

    return (
        <div className="header">
            <div className="header-bar">
                <NavLink to="/issue/create/title/">
                    <div className="header-create">이슈 업!로드</div>
                </NavLink>
                <div className="header-right">
                    <img src={logo} alt="logo" className="header-logo-img"/>
                    <NavLink to="/" className="header-logo">Thissue</NavLink>

                    <div className="header-search">
                        <input type="text" className="header-search-input"/>
                        <NavLink to="/search/" className="header-search-icon"><FontAwesomeIcon icon={faSearch}/></NavLink>
                    </div>
                    {!authInfo ?
                    <div className="header-auth">
                        <NavLink to="/profile/test/" style={{color: "white"}}>마이페이지</NavLink>
                        {/*<button className="header-logout">로그아웃</button>*/}
                    </div> :
                        <PopupLogin trigger={<div className="header-auth">로그인</div>}/>}
                </div>
            </div>
        </div>
    )
}

export default Header;
