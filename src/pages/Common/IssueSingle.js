import React from "react";
import "../../styles/Common/issueSingle.scss";

const IssueSingle = (props) => {
    return (
        <div className="ISSUESINGLE">
            <div className="issueSingle-date">{props.date.slice(0, 10)}</div>
            <div className="issueSingle-icon">{props.emoji}</div>
            <div className="issueSingle-title">{props.title}</div>
            <div className="issueSingle-footer">
                <div className="issueSingle-hashtag-warp">
                    {(props.hashtag || []).slice(0, 2).map(hashtag =>
                        <div className="issueSingle-hashtag">#{hashtag.hashtag}</div>
                    )}
                </div>
                <div className="issueSingle-up">
                    <div className="issueSingle-up-icon">🔥</div>
                    <div className="issueSingle-up-nums">{props.upNums}</div>
                </div>
            </div>
        </div>
    )
}

export default IssueSingle;