import React, {useEffect, useState} from "react";
import {Header} from "../Common";

const IssueUpdate = ({match}) => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [category, setCategory] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [isNextStep, setIsNextStep] = useState(false);
    const [authInfo, setAuthInfo] = useState([]);

    useEffect(() => {
        init();
        setAuthInfo("익명");
    }, [isNextStep]);

    const init = async () => {
        // const data = await getApi(`issue/${match.params.id}/edit/`);
        // setIssue(data.results);

        const issueTest = {
            issueId: 1,
            issueTitle: "테스트제목1",
            issueContents: "어쩌구 저쩌구 얼레벌레",
            issueCategory: "economy",
            issueHashtag: "해시태그1,해시태그2",
            issueDate: "2020-10-20",
            issueModifiedDate: "2021-11-10",
            issueUps: ["사람1", "2", "3", "4", "5", "6", "7"]
        }
        setTitle(issueTest.issueTitle);
        setContents(issueTest.issueContents);
        setCategory(issueTest.issueCategory);
        setHashtag(issueTest.issueHashtag);
    }

    const updateIssue = async (issueTitle, issueContents, issueHashtag, issueCategory, active) => {
        // await putApi(
        //     `issue/${id}/`,
        //     {issueTitle, issueContents, issueHashtag, issueCategory, active});
        console.log(`제목: ${issueTitle}`);
        console.log(`해시태그: ${issueHashtag}`);
        console.log(`내용: ${issueContents}`);
        console.log(`카테고리: ${issueCategory}`);
        setTitle("");
        setContents("");
        setHashtag("");
        setCategory("");
    }

    return (
        <>
            <Header/>
        </>
    )
}

export default IssueUpdate;
