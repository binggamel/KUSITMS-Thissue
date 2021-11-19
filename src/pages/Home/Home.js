import React from "react";
import './Home.css';
// import './Home.scss';

const Home = () => {
    return (
        <div className="background">
            <div className="menubar">
                <div className="issueUp">
                <ul>
			    <li className="txtUp"><a href="#">이슈업!로드</a></li>
                </ul>
                </div>
                <div className="main">
                    THISSUE
                </div>

                <div>
                    <input type="text" className="input"></input>
                    <img scr="./search.png" className="search"></img>
                </div>

                <div className="login">
                    <ul>
			        <li className="txtLog"><a href="#">Login</a></li>
                    </ul>
                </div>
            </div>

            <div className="txtRanking">
                실시간 이슈 랭킹🔥
            </div>
        </div>


    )
}


export default Home;