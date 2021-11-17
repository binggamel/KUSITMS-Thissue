import React from "react";
import {Route, Routes} from "react-router-dom";
import {
    Home,
    Login, Signup, Find, Callback,
    IssueDetail, IssueCreate,
    Profile, ProfileIssueCreated, ProfileIssueDraft, ProfileIssueUp, Withdrawal,
    Search, IssueUpdate,
} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path="/auth/callback/" element={<Callback/>}/>
            <Route path="/auth/login/" element={<Login/>}/>
            <Route path="/auth/signup/" element={<Signup/>}/>
            <Route path="/auth/find/" element={<Find/>}/>

            <Route path="/issue/:id/update/" element={<IssueUpdate/>}/>
            <Route path="/issue/:id/" element={<IssueDetail/>}/>
            <Route path="/issue/create/*" element={<IssueCreate/>}/>

            <Route path="/profile/:nickname/issue/created/" element={<ProfileIssueCreated/>}/>
            <Route path="/profile/:nickname/issue/draft/" element={<ProfileIssueDraft/>}/>
            <Route path="/profile/:nickname/issue/up/" element={<ProfileIssueUp/>}/>
            <Route path="/profile/:nickname/withdrawal/" element={<Withdrawal/>}/>
            <Route path="/profile/:nickname/" element={<Profile/>}/>

            <Route path="/search/" element={<Search/>}/>

            <Route path="/" element={<Home/>}/>
        </Routes>
    );
}

export default App;
