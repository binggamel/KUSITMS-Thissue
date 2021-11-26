import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Header} from "../Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {putApi} from "../../services/api";
import "../../styles/Search/Search.scss";

const Search = () => {

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        //
    }

    return (
        <>
            <Header/>
            <div className="search-title">Search</div>
            <div className="search-left">
                <div className="search">
                    <input type="text" className="search-input"/>
                    <NavLink to="/search/" className="search-icon"><FontAwesomeIcon icon={faSearch}/></NavLink>
                </div>
                <div className="search-txt">관심 있는 해시태그를 눌러보세요!</div>

                <div className="search-hashtagbox">
                    <div className="boxwrap">
                        <button className="search-hashtag" id="btn1">#환경</button>
                        <button className="search-hashtag" id="btn2">#동물권</button>
                        <button className="search-hashtag" id="btn3">#생계</button>
                    </div>

                    <div className="boxwrap">
                        <button className="search-hashtag" id="btn4">#어린이</button>
                        <button className="search-hashtag" id="btn5">#정치</button>
                    </div>

                    <div className="boxwrap">
                        <button className="search-hashtag" id="btn6">#지역사회</button>
                        <button className="search-hashtag" id="btn7">#예술</button>
                        <button className="search-hashtag" id="btn1">#문화</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Search;