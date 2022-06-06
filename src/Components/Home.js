import Styled from "styled-components";
import { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

export default function Home() {
    // Logic
    const { API, userData, array } = useContext(UserContext);
    const userToken = localStorage.getItem("userToken");

    const navigate = useNavigate();

    const deleteMembership = () => {
        const config = {
            headers: {Authorization: `Bearer ${userToken}`}
        }
        const promise = axios.delete(`${API}/subscriptions`, config);
        promise.then(r => navigate("/subscriptions"));
        promise.catch(e => console.log(e, config))
    }
    
    // UI
    return (
        <HomeS>
            <Header>
                <img src={ userData.membership.image } alt="membership" />
                <ion-icon name="person-circle-outline"></ion-icon>
            </Header>
            <h1>Hello, {userData.name} </h1>
            <Perks className="perks">
                {array.map((p, i) => <a key={i} href={p.link} >{p.title}</a>)}
            </Perks>

            <Buttons>
                
                <button id="new" onClick={() => navigate("/subscriptions")} >Sign new membership</button>
                <button id="cancel" onClick={deleteMembership}>Cancel membership</button>
            </Buttons>
        </HomeS>        
    );
}

const HomeS = Styled.div`
    h1, p, a {
        color: white;
    }

    h1 {
        font-size: 26px;
        text-align: center;
        margin-top: 100px
    }

    a {
        text-decoration: none;
        font-size: 20px;
        width: 60%;
        padding: 20px;
        margin: 10px 0;
        background-color: #FF4791; 
        border-radius: 10px;
    }
`;

const Header = Styled.div`
    position: fixed;
    top: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ion-icon {
        font-size: 50px;
        color: white;
    }

    img {
        width: 90px;
        margin-left: 20px;
    }
`;

const Perks = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Buttons = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 40px;
    right: 0;
    width: 100%;

    button {
        border: none;
        width: 60%;
        height: 50px;
        font-size: 20px;
        color: white;
        border-radius: 10px;
    }

    #new {
        background-color: #FF4791;
        margin-bottom: 10px;
    }
    #cancel {
        background-color: #FF4747;
    }
`;