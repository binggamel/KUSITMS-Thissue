import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {categories, Header} from "../Common";
import {IssueRanking} from "./components";
import {getApi} from "../../services/api";
import {NavLink} from "react-router-dom";

import {getCategoryEmoji} from "../../utils/Utils";
import "../../styles/Home/home.scss";



const Home = () => {
    const categoryArray = categories;
    const [issues, setIssues] = useState([]);
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [itemNums, setItemNums] = useState(window.localStorage.getItem("itemNumsBackup") ? JSON.parse(window.localStorage.getItem("itemNumsBackup")) : 10);
    const [itemNums, setItemNums] = useState(10);

    useEffect(() => {
        init();
    }, [itemNums]);

    const init = async () => {
        // const data = await getApi("issue/");
        // setIssues(data.results);

        const issueTest = [
            {
                issueId: 1,
                issueTitle: "테스트제목1",
                issueCategory: 0,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 2,
                issueTitle: "테스트제목2",
                issueCategory: 3,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 3,
                issueTitle: "테스트제목3",
                issueCategory: 2,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 4,
                issueTitle: "테스트제목4",
                issueCategory: 1,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 5,
                issueTitle: "테스트제목5",
                issueCategory: 0,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 6,
                issueTitle: "테스트제목6",
                issueCategory: 2,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 7,
                issueTitle: "테스트제목7",
                issueCategory: 3,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 8,
                issueTitle: "테스트제목8",
                issueCategory: 11,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 9,
                issueTitle: "테스트제목9",
                issueCategory: 12,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 10,
                issueTitle: "테스트제목10",
                issueCategory: 13,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 11,
                issueTitle: "테스트제목11",
                issueCategory: 13,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 12,
                issueTitle: "테스트제목12",
                issueCategory: 11,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 13,
                issueTitle: "테스트제목13",
                issueCategory: 7,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 14,
                issueTitle: "테스트제목14",
                issueCategory: 6,
                issueHashtag: ["해시태그3", "해시태그4"],
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
        ]
        setIssues(issueTest);
    }

    const getCategoryIssue = (category) => {
        return issues.filter(issue => issue.issueCategory === category);
    }

    const getMoreItem = async () => {
        setIsLoaded(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setItemNums(prev => prev + 10);
        setIsLoaded(false);

        // const previousItemNumsBackup = JSON.parse(window.localStorage.getItem("itemNumsBackup"));
        // console.log(`예전 거: ${previousItemNumsBackup}`);
        // previousItemNumsBackup ?
        //     window.localStorage.setItem("itemNumsBackup", JSON.stringify(previousItemNumsBackup + 10)) :
        //     window.localStorage.setItem("itemNumsBackup", "20");
        // console.log(`함수 내 로컬: ${window.localStorage.getItem("itemNumsBackup")}`);
    }

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await getMoreItem();
            observer.observe(entry.target);
        }
    }

    useEffect(() => {
        let observer;
        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.5,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);

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
                               itemNums={itemNums}
                               isLoaded={isLoaded}
                               setTarget={setTarget}
                           />}/>
                    {categoryArray.map(category =>
                        <Route path={`${category.englishName}/`}
                               element={<HomeCategoryScreening
                                   issues={getCategoryIssue(category.id)}
                                   itemNums={itemNums}
                                   isLoaded={isLoaded}
                                   setTarget={setTarget}
                               />}/>
                    )}
                </Routes>
            </div>
        </>
    )
}


export default Home;

//최신순 부분 버튼으로 노노? (누르면 인기순으로 변경) 버튼이 아닌가?