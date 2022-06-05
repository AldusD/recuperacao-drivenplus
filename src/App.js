import Styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/reset.css';
import './assets/bodyBackground.css';
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";

export default function App() {
    return (
        <Styles>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path="/signup" element={ <SignupPage />} />
                </Routes>
            </BrowserRouter>
        </Styles>
    );
}

const Styles = Styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap');
    font-family: 'Roboto', sans-serif;
`;