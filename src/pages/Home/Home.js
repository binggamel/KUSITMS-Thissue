import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {categories, Header} from "../Common";
import {IssueRanking} from "./components";
import {getApi} from "../../services/api";
import {NavLink} from "react-router-dom";

import {getCategoryEmoji} from "../../utils/Utils";
import {HomeCategoryScreening} from "./components";
import "../../styles/Home/home.scss";
import axios from 'axios';


const Home = () => {
    const categoryArray = categories;
    const [issues, setIssues] = useState([]);
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //const [itemNums, setItemNums] = useState(window.localStorage.getItem("itemNumsBackup") ? JSON.parse(window.localStorage.getItem("itemNumsBackup")) : 10);
    const [itemNums, setItemNums] = useState(10);

    // useEffect(() => {
    //     init();
    // }, [itemNums]);
    useEffect(() => {
        axios.get('/api/issue').then(response => {
            setIssues(response.data);
            // console.log(response.data);
            // console.log(`이슈: ${issues}`);
        })
    }, [itemNums]);

    // const init = async () => {
    //     // const data = await getApi("issue/");
    //     // setIssues(data.results);
    //
    //     const issueTest = [
    //         {
    //             issueId: 1,
    //             issueTitle: "테스트제목1",
    //             issueCategory: 0,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-20",
    //             ups: ["사람1"]
    //         },
    //         {
    //             issueId: 2,
    //             issueTitle: "테스트제목2",
    //             issueCategory: 3,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-25",
    //             ups: ["사람1", "사람2"]
    //         },
    //         {
    //             issueId: 3,
    //             issueTitle: "테스트제목3",
    //             issueCategory: 2,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-20",
    //             ups: ["사람1"]
    //         },
    //         {
    //             issueId: 4,
    //             issueTitle: "테스트제목4",
    //             issueCategory: 1,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-25",
    //             ups: ["사람1", "사람2"]
    //         },
    //         {
    //             issueId: 5,
    //             issueTitle: "테스트제목5",
    //             issueCategory: 0,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-20",
    //             ups: ["사람1"]
    //         },
    //         {
    //             issueId: 6,
    //             issueTitle: "테스트제목6",
    //             issueCategory: 2,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-25",
    //             ups: ["사람1", "사람2"]
    //         },
    //         {
    //             issueId: 7,
    //             issueTitle: "테스트제목7",
    //             issueCategory: 3,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-20",
    //             ups: ["사람1"]
    //         },
    //         {
    //             issueId: 8,
    //             issueTitle: "테스트제목8",
    //             issueCategory: 11,
    //             issueHashtag: ["해시태그3", "해시태그4"],
    //             issueDate: "2020-10-25",
    //             ups: ["사람1", "사람2"]
    //         },
    //     ]
    //     setIssues(issueTest);
    // }

    const getCategoryIssue = (category) => {
        return issues.filter(issue => issue.issueCategory === category);
    }

    const getMoreItem = async () => {
        setIsLoaded(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setItemNums(prev => prev + 10);
        setIsLoaded(false);

        // const previousItemNumsBackup = JSON.parse(window.localStorage.getItem("itemNumsBackup"));
        // previousItemNumsBackup ?
        //     window.localStorage.setItem("itemNumsBackup", JSON.stringify(previousItemNumsBackup + 10)) :
        //     window.localStorage.setItem("itemNumsBackup", "20");
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
            observer.obseve(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);

    return (
        <>
            <Header/>
            <div className="home">
                <div className="home-title">실시간 이슈 랭킹</div>
                <IssueRanking/>
                <div className="home-sort-wrap">
                    <div className="home-title">카테고리별 이슈 모아보기</div>
                    <div className="home-sort">⏰최신순</div>
                </div>
                <div className="home-category-wrap">
                    <NavLink to="/">
                        <div className="home-category">전체</div>
                    </NavLink>
                    {categoryArray.map(category =>
                        <NavLink to={`/${category.englishName}/`}
                                 key={category.id}>
                            <div className="home-category">{category.emoji} {category.koreanName}</div>
                        </NavLink>
                    )}
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
                                   key={category.id}
                                   element={<HomeCategoryScreening
                                       issues={getCategoryIssue(category.id)}
                                       itemNums={itemNums}
                                       isLoaded={isLoaded}
                                       setTarget={setTarget}
                                   />}/>
                        )}
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default Home;

//최신순 부분 버튼으로 노노? (누르면 인기순으로 변경) 버튼이 아닌가?