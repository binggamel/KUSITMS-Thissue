import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {categories, Header} from "../Common";
import {IssueRanking} from "./components";
import {getApi} from "../../services/api";
import {NavLink} from "react-router-dom";
import {getCategoryEmoji} from "../../utils/Utils";
import HomeCategoryScreening from "./components/HomeCategoryScreening";


const Home = () => {
    const categoryArray = categories;
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        // const data = await getApi("issue/");
        // setIssues(data.results);

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

    const getCategoryIssue = (category) => {
        return issues.filter(issue => issue.issueCategory === category);
    }

    return (
        <>
            <Header/>
            <IssueRanking/>
            <div className="home-category-wrap">
                <NavLink to="/" className="home-category">전체</NavLink>
                {categoryArray.map(category =>
                    <NavLink to={`/${category.englishName}/`}
                             className="home-category">
                        {category.emoji}{category.koreanName}
                    </NavLink>
                )}
            </div>
            <div className="home-sort-wrap">
                <div className="home-sort">⏰최신순</div>
            </div>
            <div className="home-issue-wrap">
                <Routes>
                    <Route path="/"
                           element={<HomeCategoryScreening
                               issues={issues}
                           />}/>
                    {categoryArray.map(category =>
                        <Route path={`${category.englishName}/`}
                               element={<HomeCategoryScreening
                                   issues={getCategoryIssue(category.englishName)}
                               />}/>
                    )}
                </Routes>
            </div>
        </>
    )
}


export default Home;