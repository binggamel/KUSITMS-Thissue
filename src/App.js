import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    Home,
    Login, Signup, Find, Callback,
    Profile, ProfileIssueCreated, ProfileIssueDraft, ProfileIssueUp, Withdrawal,
    Search,
} from "./pages";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/auth/callback/" element={<Callback />}/>
                <Route path="/auth/login/" element={<Login />} />
                <Route path="/auth/signup/" element={<Signup />} />
                <Route path="/auth/find/" element={<Find />} />

                <Route path="/profile/issue/created/" element={<ProfileIssueCreated />} />
                <Route path="/profile/issue/draft/" element={<ProfileIssueDraft />} />
                <Route path="/profile/issue/up/" element={<ProfileIssueUp />} />
                <Route path="/profile/withdrawal/" element={<Withdrawal />} />
                <Route path="/profile/" element={<Profile />} />

                <Route path="/search/" element={<Search />} />

                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
