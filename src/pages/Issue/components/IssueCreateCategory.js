import React from "react";
import {categories} from "../../Common";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {NavLink} from "react-router-dom";

const IssueCreateTitle = (props) => {
    const categoryArray = categories.slice(1,);

    const handleCategory = (categoryEnglishName) => {
        props.setCategory(categoryEnglishName);
        props.setIsNextStep(prev => !prev);
        // console.log(props.category);
    }

    return (
        <>
            <div className="issueCreate-step-wrap">
                <div className="issueCreate-step">✔️</div>
                <div className="issueCreate-step">✔️</div>
                <div className="issueCreate-step">분류</div>
            </div>
            <div className="issueCreate-category-guide">글의 카레고리를 설정해주세요.</div>
            {categoryArray.map(category =>
                <button className="issueCreate-category"
                        onClick={() => handleCategory(category.englishName)}>
                    {category.emoji}{category.koreanName}
                </button>
            )}
            <Popup trigger={<div className="issueCreate-next">이슈 등록하기</div>}
                   modal>
                {close => (
                    <>
                        <div className="issueCreate-popup-header">X</div>
                        <div className="issueCreate-popup-title">이슈를 등록하시겠습니까?</div>
                        <div className="issueCreate-popup-contents">
                            허위사실이나 명예훼손 글을 작성한 경우 법적인 처벌을 받을 수 있습니다.
                        </div>
                        <NavLink to="/"
                                 className="issueCreate-popup-button"
                                 onClick={() => props.createIssue(
                                     props.title,
                                     props.contents,
                                     props.hashtag,
                                     props.category,
                                     props.author,
                                     true)}>
                            네, 확인하였습니다.
                        </NavLink>
                        <button className="issueCreate-popup-button"
                                onClick={() => {
                                    close()
                                }}>
                            돌아가기
                        </button>
                    </>
                )}
            </Popup>
        </>
    )
}

export default IssueCreateTitle;