import React from "react";
import { Route } from "react-router-dom";
import {
    Home,
    Login,
    Signup,
    Find,
    Callback,
    Profile,
    ProfileIssueCreated,
    ProfileIssueDraft,
    ProfileIssueUp,
    Withdrawal,
    Search,
} from "./pages";

const App = () => {
    return (
        <div>
        <Route path="/auth/callback/" component={Callback} />
        <Route path="/auth/login/" component={Login} />
        <Route path="/auth/signup/" component={Signup} />
        <Route path="/auth/find/" component={Find} />

        <Route path="/profile/issue/created/" component={ProfileIssueCreated} />
        <Route path="/profile/issue/draft/" component={ProfileIssueDraft} />
        <Route path="/profile/issue/up/" component={ProfileIssueUp} />
        <Route path="/profile/withdrawal/" component={Withdrawal} />
        <Route path="/profile/" component={Profile} />

        <Route path="/search/" component={Search} />

        <Route path="/" component={Home} exact={true} />
        </div>
    );
};

export default App;
