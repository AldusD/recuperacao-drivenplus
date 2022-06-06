import { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import Membership from "./Membership";

export default function SubscriptionsPage() {
    // State Variables
    const [memberships, setMemberships] = useState([]);

    // Logic
    const { API, userData } = useContext(UserContext);
    const userToken = localStorage.getItem('userToken');
    
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${ userToken }`}
        }
        const promise = axios.get(`${API}/subscriptions/memberships`, config)
        promise.then(r => {
            console.log(r)
            setMemberships([...r.data])
        })
        promise.catch(e => {
            alert("Not Found, please go to drivenplus.com.br/ and try again")
            console.log(e);
        })
    }, [])
    // UI
    return (
        <Subscriptions>
            <h1>Chose the right membership for you!</h1>
            { memberships.map((m, i) => <Membership option={ m } key={ i } /> )}
        </Subscriptions>
    );
}

const Subscriptions = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: white;
        font-size: 1.3em;
        margin: 24px 0;
    }

    div {
        margin-bottom: 10px;
    }
`;