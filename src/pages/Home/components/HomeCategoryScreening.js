import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {IssueSingle} from "../../Common";
import {getCategoryEmoji} from "../../../utils/Utils";

const HomeCategoryScreening = (props) => {
    return (
        <>
            {props.issues.slice(0, props.itemList.length-1).map(issue =>
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
            {props.itemList.length < props.issues.length &&
                <div ref={props.setTarget}>
                    {props.isLoaded && "Loading..."}
                </div>
            }
        </>
    )
}

export default HomeCategoryScreening;