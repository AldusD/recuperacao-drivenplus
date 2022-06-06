import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import axios from "axios";

import UserContext from "../contexts/UserContext";

export default function Modal({ form, membership, setModal }) {
    const { API } = useContext(UserContext);
    const userToken = localStorage.getItem("userToken");   
    // Logic
    const navigate = useNavigate();

    const signMembership = () => {
        const config = {
            headers: {Authorization: `Bearer ${userToken}`}
        };
        const body = {...form};
        
        const promise = axios.post(`${API}/subscriptions`, body, config);
        promise.then(r => navigate("/home"))
        promise.catch(e => alert('Invalid data'))
    }

    // UI
    return (
        <Box>
            <Exit onClick={() => setModal(false)}>
                <ion-icon name="close-circle"></ion-icon>
            </Exit>
            <WhiteBox>
                <h2>Are you sure signing the {membership.name} membership (US$ {membership.price})?</h2>
                <div>
                    <button onClick={() => setModal(false)} className="grey" >No</button>
                    <button onClick={signMembership} className="pink" >Sure!</button>
                </div>
            </WhiteBox>
        </Box>
    );
}

const Box = Styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #00000080;
    z-index: 1;
`;

const Exit = Styled.div`
    position: fixed;
    right: 0;
    top: 10px;

    ion-icon {
        font-size: 40px;
        color: white;
    }
`;

const WhiteBox = Styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 40%;
    left: 15%;
    width: 70%;
    height: 200px;
    background-color: white;
    z-index: 2;
    border-radius: 20px;

    h2 {
        font-size: 18px;
        font-weight: bold;
        margin: 30px 20px 20px 20px; 
    }
    
    div {
        display: flex;
        justify-content: center;
    }
    button {
        width: 45%;
        height: 70px;
        border: none;
        font-family: inherit;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border-radius: 10px;
        margin: 5px;
    }
    .grey {
        background-color: #CECECE;
    }
    .pink {
        background-color: #FF4791;
    }
`;