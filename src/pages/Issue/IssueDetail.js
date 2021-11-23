import React, {useEffect, useState} from "react";
import {Header} from "../Common";
import {NavLink} from "react-router-dom";
import Popup from "reactjs-popup";
import {postApi} from "../../services/api";

const IssueDetail = ({match}) => {
    const [issue, setIssue] = useState({});
    const [issues, setIssues] = useState({});
    const [authInfo, setAuthInfo] = useState({});
    const [isUped, setIsUped] = useState(false);

    useEffect(() => {
        init();
        console.log(`업 여부: ${isUped}`);
    }, [isUped]);

    const init = async () => {
        // const data = await getApi(`issue/${match.params.id}/`);
        // setIssue(data.results);

        // 서버 연결 후 아래 코드는 삭제
        const issueTest = {
            issueId: 1,
            issueAuthor: "유저",
            issueTitle: "테스트제목1",
            issueContents: "어쩌구 저쩌구 얼레벌레",
            issueCategory: "economy",
            issueHashtag: ["해시태그1", "해시태그2"],
            issueDate: "2020-10-20",
            issueModifiedDate: "2021-11-10",
            issueUps: ["사람1", "2", "3", "4", "5", "6", "7"]
        }
        const user = "사1";
        setIssue(issueTest);
        setAuthInfo(user);
        setIsUped((issue.issueUps || []).includes(authInfo));
    }

    const doUp = async () => {
        // await postApi
        console.log("이슈 업")
        setIsUped(!isUped);
    }

    const undoUp = async () => {
        // await
        console.log("이슈 업 취소")
        setIsUped(!isUped);
    }

    return (
        <>
            <Header/>
            {!issue ? <div>로딩중...</div> :
                <>
                    <div className="issueDetail-hashtag-wrap">
                        {(issue.issueHashtag || []).map(hashtag =>
                            <NavLink to="" className="issueDetail-hashtag">#{hashtag}</NavLink>)}
                    </div>
                    <div className="issueDetail-title">{issue.issueTitle}</div>
                    <div className="issueDetail-contents">{issue.issueContents}</div>
                    <div className="issueDetail-footer">
                        작성자 {issue.issueAuthor} | 작성일 {issue.issueDate} | 수정일: {issue.issueModifiedDate}
                    </div>

                    <div className="issueDetail-bottom">
                        <div className="issueDetail-bottom-left">
                            {isUped ? <button onClick={() => undoUp()} style={{background: "blue"}}>🔥</button> :
                                <button onClick={() => doUp()}>🔥</button>}
                            <div>이슈 업!</div>
                            <div>{(issue.issueUps || []).length}</div>
                        </div>
                        <div className="issueDetail-bottom-right">
                            <div className="issueDetail-bottom-right-header">
                                {((issue.issueUps || []).length > 5) ?
                                    <div className="issueDetail-up-wrap">
                                        <div className="issueDetail-bottom-title">업! 한 사람들</div>
                                        {(issue.issueUps || []).slice(0, 4).map(up =>
                                            <div className="issueDetail-up">{up}</div>)}
                                        <Popup trigger={<div>+</div>} modal>
                                            {close => (
                                                <>
                                                    <div className="close" onClick={() => close()}>X</div>
                                                    업한 사람들
                                                    {issue.issueUps.map(up =>
                                                        <div className="issueDetail-up">{up}</div>)}
                                                </>
                                            )}
                                        </Popup>
                                    </div> :
                                    <div className="issueDetail-up-wrap">
                                        {(issue.issueUps || []).map(up =>
                                            <div className="issueDetail-up">{up}</div>)}
                                    </div>
                                }
                                <div className="issueDetail-share">공유</div>
                            </div>
                            <div className="issueDetailGraph">
                                <div className="issueDetail-bottom-title">업! 사용자 통계</div>
                                그래프가 들어갈 자리입니다.
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default IssueDetail;