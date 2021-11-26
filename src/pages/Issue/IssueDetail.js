import React, {useEffect, useState} from "react";
import {Header} from "../Common";
import {NavLink} from "react-router-dom";
import Popup from "reactjs-popup";
import "../../styles/Issue/IssueDetail.scss";

import {postApi} from "../../services/api";
import {getCategoryEmoji} from "../../utils/Utils";
import axios from "axios";

const IssueDetail = (props) => {
    const [issue, setIssue] = useState({});
    const [issues, setIssues] = useState([]);
    const [authInfo, setAuthInfo] = useState({});
    const [isUped, setIsUped] = useState(false);
    console.log(props);

    useEffect(() => {
        init();
    }, [isUped]);

    // useEffect(() => {
    //     axios.get(`/api/issue/${match.params.id}`).then(response => {
    //         // setIssues(response.data);
    //         console.log(response.data);
    //         console.log(match);
    //     })
    // }, [isUped]);

    const init = async () => {
        // const data = await getApi(`issue/${match.params.id}/`);
        // setIssue(data.results);

        // 서버 연결 후 아래 코드는 삭제
        const issueTest = {
            issueId: 1,
            issueAuthor: "유저",
            issueTitle: "테스트제목1",
            issueContents: "어쩌구 저쩌구 얼레벌레 엄청 길게 적어야겠다 룰룰 랄우라누란러만ㅇ러 만ㅇ러 ㅁ낭",
            issueCategory: 2,
            issueHashtag: ["해시태그1", "해시태그2"],
            issueDate: "2020-10-20",
            issueModifiedDate: "2021-11-10",
            issueUps: ["사람1", "2", "3", "4", "5", "6", "7"]
        }

        setIssue(issueTest);

        axios.get("/api/issue").then(response => {
            setIssues(response.data);
        })

        axios.get("/api/issue/tokenTest/test").then(response => {
            setAuthInfo(response.data);
            console.log(response.data)
            setIsUped((issue.issueUps || []).includes(authInfo));
        })
    }

    const doUp = async () => {
        // await postApi
        console.log("이슈 업");
        setIsUped(prev => !prev);
    }

    const undoUp = async () => {
        // await
        console.log("이슈 업 취소");
        setIsUped(prev => !prev);
    }

    const getSimilarIssues = (currentId, categoryId) => {
        return issues.filter(issue => issue.issueCategory === categoryId && issue.issueId !== currentId).slice(0, 5);
    }

    return (
        <>
            <Header/>
            {!issue ? <div>로딩중...</div> :
                <>
                    <div className="issueDetail-mintbg"/>
                    <div className="issueDetail-bg">
                        <div className="issueDetail-left">
                            <div className="issueDetail-hashtag-wrap">
                                {(issue.issueHashtag || []).map(hashtag =>
                                    <NavLink to="">
                                        <div className="issueDetail-hashtag">#{hashtag}</div>
                                    </NavLink>)}
                            </div>
                            <div className="issueDetail-title">{issue.issueTitle}</div>
                            <div className="issueDetail-contents">{issue.issueContents}</div>
                            <div className="issueDetail-footer">
                                작성자 {issue.issueAuthor} | 작성일 {issue.issueDate} | 수정일: {issue.issueModifiedDate}
                            </div>

                            <div className="issueDetail-bottom">
                                <div className="issueDetail-bottom-left">
                                    {isUped ?
                                        <button onClick={() => undoUp()} style={{background: "black"}}>🔥</button> :
                                        <button onClick={() => doUp()}>🔥</button>}
                                    <div className="text">이슈 업!</div>
                                    <div>{(issue.issueUps || []).length}</div>
                                </div>
                                <div className="issueDetail-bottom-right">
                                    <div className="issueDetail-bottom-right-header">
                                        {((issue.issueUps || []).length > 5) ?
                                            <div className="issueDetail-up-wrap">
                                                <div className="issueDetail-bottom-title">업! 한 사람들</div>
                                                <div className="issueDetail-ups">
                                                    {(issue.issueUps || []).slice(0, 4).map(up =>
                                                        <div className="issueDetail-up">{up}</div>)}
                                                    <Popup className="popup-plus" trigger={<div className="plus">+</div>} modal>
                                                        {close => (
                                                            <>
                                                                <div className="close" onClick={() => close()}>✕</div>
                                                                <div className="popup-title">업한 사람들</div>
                                                                <div className="popup-up-wrap">
                                                                {issue.issueUps.map(up =>
                                                                    <div className="issueDetail-up">{up}</div>)}
                                                                </div>
                                                            </>
                                                        )}
                                                    </Popup>
                                                </div>
                                            </div> :
                                            <div className="issueDetail-ups">
                                                {(issue.issueUps || []).map(up =>
                                                    <div className="issueDetail-up">{up}</div>)}
                                            </div>
                                        }
                                        <div className="issueDetail-share">공유</div>
                                    </div>
                                    <div className="issueDetailGraph">
                                        <div className="issueDetail-bottom-title">업! 사용자 통계</div>
                                        30명 이상이 이슈 업! 시 사용자 통계를 확인할 수 있어요.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="issueDetail-right">
                            <div className="issueDetail-right-title">유사한 이슈도 함께 봐요!</div>
                            <div className="issueDetail-right-box">
                                {getSimilarIssues(issue.issueId, issue.issueCategory).map(similarIssue =>
                                    <NavLink
                                        to={`/issue/${similarIssue.issueId}`}>
                                        <div className="issueDetail-similar">{getCategoryEmoji(similarIssue.issueCategory)} {similarIssue.issueTitle}</div>
                                    </NavLink>)}
                            </div>
                            <div className="issueDetail-right-title margin">이런 이슈는 어때요?</div>
                            <div className="issueDetail-right-box">
                                {issues.slice(0, 5).map(issue =>
                                    <NavLink
                                        to={`/issue/${issue.issueId}`}>
                                        <div className="issueDetail-similar">{getCategoryEmoji(issue.issueCategory)} {issue.issueTitle}</div>
                                    </NavLink>)}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default IssueDetail;