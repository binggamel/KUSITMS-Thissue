import React from "react";

const IssueSingle = (props) => {
    const hashtagArray = props.hashtag.split(",");

    return (
        <div className="ISSUESINGLE">
            <div className="issuesingle-icon">{props.emoji}</div>
            <div className="issuesingle-title">{props.title}</div>
            <div className="issuesingle-hashtag">{hashtagArray.map(hashtag => `#${hashtag} `)}</div>
            <div className="issuesingle-footer">
                <div className="issuesingle-date">{props.date}</div>
                <div className="issuesingle-upNums">{props.upNums}</div>
            </div>
        </div>
    )
}

export default IssueSingle;