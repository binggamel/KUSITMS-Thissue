import React, {useEffect, useState} from "react";
import {categories, Header} from "../Common";
import {putApi} from "../../services/api";
import "../../styles/Profile/Profile.scss";

const Profile = () => {
    const categoryArray = categories.slice(1,);
    const [profile, setProfile] = useState([]);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);

    useEffect(() => {
        init();
    }, [isProfileUpdated]);

    const init = async () => {
        // const data = await getApi("");
        // setProfile(data);

        const profileTest = {
            photo: "사진",
            nickname: "별명",
            isNicknamePrivate: false,
            gender: "여성",
            isGenderPrivate: false,
            age: "22",
            isAgePrivate: false,
            category: "economy"
        }
        setProfile(profileTest);
    }

    const handleCategory = async (categoryEnglishName) => {
        // const category = profile.category + categoryEnglishName;
        // await putApi("", {category});

        profile.category += categoryEnglishName;
        console.log(categoryEnglishName, "추가");
        setIsProfileUpdated(prev => !prev);
    }

    const handleNicknamePrivate = async () => {
        // const isNicknamePrivate = !profile.isNicknamePrivate;
        // await putApi("", {isNicknamePrivate});

        profile.isNicknamePrivate = !profile.isNicknamePrivate;
        console.log("닉네임 공개여부 테스트");
        setIsProfileUpdated(prev => !prev);
    }

    const handleGenderPrivate = async () => {
        // const isNicknamePrivate = !profile.isNicknamePrivate;
        // await putApi("", {isNicknamePrivate});

        profile.isGenderPrivate = !profile.isGenderPrivate;
        console.log("성별 공개여부 테스트");
        setIsProfileUpdated(prev => !prev);
    }
    const handleAgePrivate = async () => {
        // const isNicknamePrivate = !profile.isNicknamePrivate;
        // await putApi("", {isNicknamePrivate});

        profile.isAgePrivate = !profile.isAgePrivate;
        console.log("나이 공개여부 테스트");
        setIsProfileUpdated(prev => !prev);
    }

    return (
        <>
            <Header/>
            <div className="profile-mine">
                내프로필
                <div className="profile-mintbg"></div>
            </div>
            
            <div className="profile-left">
                <div className="profile-photo">{profile.photo}</div>
                <div className="profile-nickname">
                    닉네임: {profile.nickname}
                    {profile.isNicknamePrivate ?
                        <button onClick={() => handleNicknamePrivate()} className="isNicknamePrivate">🌐공개로 전환</button>
                        :
                        <button onClick={() => handleNicknamePrivate()} className="isNicknamePrivate">🔒비공개로 전환</button>
                    }
                </div>
                <div className="profile-gender">성별: {profile.gender}
                    {profile.isGenderPrivate ?
                        <button onClick={() => handleGenderPrivate()} className="isNicknamePrivate">🌐공개로 전환</button>
                        : <button onClick={() => handleGenderPrivate()} className="isNicknamePrivate">🔒비공개로 전환</button>
                    }
                </div>
                <div className="profile-age">나이: {profile.age}
                    {profile.isAgePrivate ?
                        <button onClick={() => handleAgePrivate()} className="isNicknamePrivate">🌐공개로 전환</button>
                        : <button onClick={() => handleAgePrivate()} className="isNicknamePrivate">🔒비공개로 전환</button>
                    }
                </div>
                <div className="profile-category-wrap">
                    {categoryArray.map(category =>
                        <button onClick={() => handleCategory(category.englishName)}
                                className={"profile-category"}>
                            {category.emoji}{category.koreanName}
                        </button>
                    )}
                </div>
            </div>
                
            
        </>
    )
}

export default Profile;