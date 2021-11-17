import React from "react";
import {NavLink} from "react-router-dom";

const IssueCreateTitle = (props) => {
    const handleTitle = async (e) => {
        await props.setTitle(e.target.value);
        props.setIsNextStep(prev => !prev);
        // console.log(props.title);
    }

    return (
        <>
            <div className="issueCreate-step-wrap">
                <div className="issueCreate-step">1</div>
                <div className="issueCreate-step">2</div>
                <div className="issueCreate-step">3</div>
            </div>
            <div className="issueCreate-title-guide">이슈화하고자 하는 글의 제목을 입력해주세요.</div>
            <input type="text" value={props.title} onChange={handleTitle}/>
            <NavLink to="/issue/create/contents/" className="issueCreate-next">계속하기</NavLink>
        </>
    )
}

export default IssueCreateTitle;