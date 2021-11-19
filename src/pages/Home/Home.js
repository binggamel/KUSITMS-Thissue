
import React, {useEffect, useState} from "react";
import {categories, Header, IssueSingle} from "../Common";
import {IssueRanking} from "./components";
import {getApi} from "../../services/api";
import {NavLink} from "react-router-dom";
import {getCategoryEmoji} from "../../utils/Utils";


const Home = () => {
    const categoryArray = categories;
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        // const data = await getApi("issue/");
        // setIssues(data.results);

        // 서버 연결 후 아래 코드는 삭제
        const issueTest = [
            {
                issueId: 1,
                issueTitle: "테스트제목1",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 2,
                issueTitle: "테스트제목2",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            }
        ]
        setIssues(issueTest);
    }

    return (
        <> 
            <Header/>
            <IssueRanking/>
            <div className="home-category-wrap">
                {categoryArray.map(category =>
                    <div className="home-category">{category.emoji}{category.koreanName}</div>
                )}
            </div>
            <div className="home-sort-wrap">
                <div className="home-sort">⏰최신순</div>
            </div>
            <div className="home-issue-wrap">
                {issues.map(issue =>
                    <NavLink to={`/issue/${issue.issueId}/`}>
                        <IssueSingle
                            key={issue.issueId}
                            id={issue.issueId}
                            title={issue.issueTitle}
                            emoji={getCategoryEmoji(issue.issueCategory)}
                            hashtag={issue.issueHashtag}
                            date={issue.issueDate}
                            upNums={issue.issueUps.length}
                        />
                    </NavLink>
                )}
            {/* </div>
        </>
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
            </div> */}



    )
}


export default Home;