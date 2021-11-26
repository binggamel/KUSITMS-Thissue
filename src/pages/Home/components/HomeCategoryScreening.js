import React from "react";
import {NavLink} from "react-router-dom";
import {IssueSingle} from "../../Common";
import {getCategoryEmoji} from "../../../utils/Utils";

const HomeCategoryScreening = (props) => {
    return (
        <>
            {props.issues && props.issues.slice(0, props.itemNums-1).map(issue =>
                <NavLink to={`/issue/${issue._id}/`} key={issue._id}>
                    <IssueSingle
                        key={issue._id}
                        id={issue._id}
                        title={issue.issueTitle}
                        emoji={getCategoryEmoji(issue.issueCategory)}
                        hashtag={issue.issueHashtag}
                        date={issue.issueDate}
                        upNums={issue.ups.length}
                    />
                </NavLink>
            )}
            {props.itemNums < props.issues.length &&
                <div ref={props.setTarget}>
                    {props.isLoaded && "Loading..."}
                </div>
            }
        </>
    )
}

export default HomeCategoryScreening;