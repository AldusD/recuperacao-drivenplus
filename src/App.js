import Styled from "styled-components";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/reset.css';
import './assets/bodyBackground.css';
import UserContext from "./contexts/UserContext";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import SubscriptionsPage from "./Components/SubscriptionsPage";
import Membership from "./Components/Membership";
import MembershipPage from "./Components/MembershipPage";

export default function App() {
    const [userData, setUserData] = useState({}); 
    const API = "https://mock-api.driven.com.br/api/v4/driven-plus";

    return (
        <UserContext.Provider value={ {API, userData, setUserData} }>
            <Styles>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path="/signup" element={ <SignupPage />} />
                    <Route path="/subscriptions" element={ <SubscriptionsPage /> } />
                    <Route path="/subscriptions/:MEMBERSHIP_ID" element={ <MembershipPage />} />
                </Routes>
            </BrowserRouter>
        </Styles>
        </UserContext.Provider>
    );
}

const Styles = Styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap');
    font-family: 'Roboto', sans-serif;
`;