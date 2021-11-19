import React from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <>
            <NavLink to="/issue/create/title/" className="header-create">이슈 업!로드</NavLink>
            <NavLink to="/" className="header-logo">Thissue</NavLink>
            <NavLink to="/search/"><FontAwesomeIcon icon={faSearch}/></NavLink>
            <div className="header-auth">
                <NavLink to="/profile/test/">마이페이지</NavLink>
                <button className="header-logout">로그아웃</button>
            </div>
        </>
    )
}

export default Header;