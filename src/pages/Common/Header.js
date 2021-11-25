import React from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Common/header.scss";
import logo from "../../styles/img/logo.jpg";

const Header = () => {
    return (
        <>  
        <div className="header-bar">
            <div className="header-bar-create">
                <NavLink to="/issue/create/title/" className="header-create">이슈 업!로드</NavLink>
            </div>
            <img src={logo} alt="logo" className="header-logo-img"></img>            
            <NavLink to="/" className="header-logo">Thissue</NavLink>
            <input type="text" className="header-input"></input>
            <NavLink to="/search/" className="header-search"><FontAwesomeIcon icon={faSearch}/></NavLink>
            <div className="header-auth">
                <NavLink to="/profile/test/" className="header-mypage">마이페이지</NavLink>
                <button className="header-logout">로그아웃</button>
            </div>
        </div>
        </>
    )
}

export default Header;
