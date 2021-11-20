import React, {useEffect, useState} from "react";
import {Header} from "../Common";
import {Route, Routes} from "react-router-dom";
import {IssueCreateCategory, IssueCreateContents, IssueCreateTitle} from "./components";
import {postApi} from "../../services/api";
import '../../styles/IssueCreate.scss';

const IssueCreate = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [category, setCategory] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [isNextStep, setIsNextStep] = useState(false);
    const [authInfo, setAuthInfo] = useState([]);

    useEffect(() => {
        setAuthInfo("익명");
    }, [isNextStep]);

    const createIssue = async (issueTitle, issueContents, issueHashtag, issueCategory, issueAuthor, active) => {
        // await postApi(
        //     "issue/",
        //     {issueTitle, issueContents, issueHashtag, issueCategory, issueAuthor, active});
        console.log("최종으로 보내는 것!")
        console.log(`제목: ${issueTitle}`);
        console.log(`해시태그: ${issueHashtag}`);
        console.log(`내용: ${issueContents}`);
        console.log(`카테고리: ${issueCategory}`);
        console.log(active);
        setTitle("");
        setContents("");
        setHashtag("");
        setCategory("");
    }

    return (
        <>
            <Header/>
            <div className="issueCreate-pageName">이슈 업!로드</div>
            <button className="issueCreate-temporary"
                    onClick={() => createIssue(
                        title,
                        contents,
                        hashtag,
                        category,
                        authInfo,
                        false,
                    )}>
                임시저장
            </button>
            <div className="issueCreate-wrap">
                <Routes>
                    <Route path={`title/`}
                        element={<IssueCreateTitle
                            title={title}
                            setTitle={setTitle}
                            setIsNextStep={setIsNextStep}
                        />}/>
                <Route path="contents/"
                        element={<IssueCreateContents
                            contents={contents}
                            setContents={setContents}
                            hashtag={hashtag}
                            setHashtag={setHashtag}
                            setIsNextStep={setIsNextStep}
                        />}/>
                <Route path="category/"
                        element={<IssueCreateCategory
                            title={title}
                            contents={contents}
                            hashtag={hashtag}
                            category={category}
                            setCategory={setCategory}
                            authInfo={authInfo}
                            setIsNextStep={setIsNextStep}
                            createIssue={createIssue}
                        />}/>
                </Routes>
            </div>
        </>
    )
}

export default IssueCreate;