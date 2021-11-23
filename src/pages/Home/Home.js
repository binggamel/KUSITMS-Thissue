import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {categories, Header} from "../Common";
import {IssueRanking} from "./components";
import {getApi} from "../../services/api";
import {NavLink} from "react-router-dom";
import HomeCategoryScreening from "./components/HomeCategoryScreening";


const Home = () => {
    const categoryArray = categories;
    const [issues, setIssues] = useState([]);
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemList, setItemLists] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    useEffect(() => {
        init();
        console.log(itemList);
    }, [itemList]);

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
            },
            {
                issueId: 3,
                issueTitle: "테스트제목3",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 4,
                issueTitle: "테스트제목4",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 5,
                issueTitle: "테스트제목5",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 6,
                issueTitle: "테스트제목6",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 7,
                issueTitle: "테스트제목7",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 8,
                issueTitle: "테스트제목8",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 9,
                issueTitle: "테스트제목9",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 10,
                issueTitle: "테스트제목10",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 11,
                issueTitle: "테스트제목11",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 12,
                issueTitle: "테스트제목12",
                issueCategory: "politics",
                issueHashtag: "해시태그3,해시태그4",
                issueDate: "2020-10-25",
                issueUps: ["사람1", "사람2"]
            },
            {
                issueId: 13,
                issueTitle: "테스트제목13",
                issueCategory: "economy",
                issueHashtag: "해시태그1,해시태그2",
                issueDate: "2020-10-20",
                issueUps: ["사람1"]
            },
            {
                issueId: 14,
                issueTitle: "테스트제목14",
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

    const getMoreItem = async () => {
        setIsLoaded(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        setItemLists(prev => prev.concat(items));
        setIsLoaded(false);
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
                               itemList={itemList}
                               isLoaded={isLoaded}
                               setTarget={setTarget}
                           />}/>
                    {categoryArray.map(category =>
                        <Route path={`${category.englishName}/`}
                               element={<HomeCategoryScreening
                                   issues={getCategoryIssue(category.englishName)}
                                   itemList={itemList}
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