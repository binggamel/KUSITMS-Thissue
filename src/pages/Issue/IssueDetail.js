import React, {useEffect, useState} from "react";
import {Header} from "../Common";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "../../styles/Issue/IssueDetail.scss";


const IssueDetail = ({match}) => {
    const [issue, setIssue] = useState({});

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        // const data = await getApi(`issue/${match.params.id}/`);
        // setIssue(data.results);

        // 서버 연결 후 아래 코드는 삭제
        const issueTest = {
            issueId: 1,
            issueTitle: "테스트제목요1",
            issueContents: "어쩌구 저쩌구 얼레벌레",
            issueCategory: "economy",
            issueHashtag: "해시태그1,해시태그2",
            issueDate: "2020-10-20",
            issueModifiedDate: "2021-11-10",
            issueUps: ["사람1", "2", "3", "4", "5", "6", "7"]
        }
        setIssue(issueTest);
    }

    const getHashtagArray = (hashtag) => {
        return (hashtag || "").split(",");
    }

    return (
        <>
            <Header/>
            {!issue ? <div>로딩중...</div> :
                <>  
                <div className="issueDetail-mintbg"></div>
                <div className="issueDetail-bg"></div>
                    <div className="issueDetail-hashtag-wrap">
                        {getHashtagArray(issue.issueHashtag).map(hashtag =>
                            <NavLink to="" className="issueDetail-hashtag">#{hashtag}</NavLink>)}
                    </div>   
                    <div className="issueDetail-title-underline">
                        <div className="issueDetail-title">{issue.issueTitle}</div>
                    </div>
                    <div className="issueDetail-date-wrap">
                        <div className="issueDetail-date">최초 등록일: {issue.issueDate}</div>
                        <div className="issueDetail-date">최종 수정일: {issue.issueModifiedDate}</div>
                    </div>
                    <div className="issueDetail-contents">{issue.issueContents}</div>
                    <div className="issueDetail-advertise">광고배너 자리입니다.</div>
                    <div className="issueDetail-buttons">
                        <button>업!</button>
                        <div className="issueDetail-share">
                            <FontAwesomeIcon icon={faShareAlt}/>
                        </div>
                    </div>
                    {((issue.issueUps || []).length > 5) ?
                        <div className="issueDetail-up-wrap">
                            업한 사람들
                            {(issue.issueUps || []).slice(0, 5).map(up =>
                                <div className="issueDetail-up">{up}</div>)}
                            <Popup trigger={<div>더보기</div>} modal>
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
                    <div className="issueDetailGraph">그래프가 들어갈 자리입니다.</div>
                    
                    
                </>
            }
        </>
    )
}

export default IssueDetail;