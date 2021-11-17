import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const IssueCreateContents = (props) => {
    const [hashtag1, setHashtag1] = useState([]);
    const [hashtag2, setHashtag2] = useState([]);
    const [hashtag3, setHashtag3] = useState([]);

    const handleContents = (e) => {
        props.setContents(e.target.value);
        props.setIsNextStep(prev => !prev);
        // console.log(props.contents);
    }

    const handleHashtag = async () => {
        await props.setHashtag(`${hashtag1},${hashtag2},${hashtag3}`);
        props.setIsNextStep(prev => !prev);
        // console.log(props.hashtag);
    }

    const handleHashtag1 = (e) => {
        setHashtag1(e.target.value);
    }

    const handleHashtag2 = (e) => {
        setHashtag2(e.target.value);
    }

    const handleHashtag3 = (e) => {
        setHashtag3(e.target.value);
    }

    return (
        <>
            <div className="issueCreate-step-wrap">
                <div className="issueCreate-step">✔️</div>
                <div className="issueCreate-step">2</div>
                <div className="issueCreate-step">3</div>
            </div>
            <div className="issueCreate-contents-guide">글의 내용을 작해주세요.</div>
            <div className="issueCreate-contents-hashtag">
                해시태그 설정:
                #<input type="text" value={hashtag1} onChange={handleHashtag1}/>
                #<input type="text" value={hashtag2} onChange={handleHashtag2}/>
                #<input type="text" value={hashtag3} onChange={handleHashtag3}/>
            </div>
            <input type="text" value={props.contents} onChange={handleContents}/>
            <NavLink to="/issue/create/category/"
                     className="issueCreate-next"
                     onClick={handleHashtag}>계속하기</NavLink>
        </>
    )
}

export default IssueCreateContents;