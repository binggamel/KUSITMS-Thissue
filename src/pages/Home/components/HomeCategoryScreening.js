import React from "react";
import {NavLink} from "react-router-dom";
import {IssueSingle} from "../../Common";
import {getCategoryEmoji} from "../../../utils/Utils";

const HomeCategoryScreening = (props) => {
    return (
        <>
            <div>헬로</div>
            {props.issues.map(issue =>
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
        </>
    )
}

export default HomeCategoryScreening;