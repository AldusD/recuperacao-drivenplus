import { useState, useEffect, useContext } from "react";
import { Link ,useParams } from 'react-router-dom';
import Styled from "styled-components";
import axios from "axios";

import perk from '../assets/perk-vector.png';
import price from '../assets/price-vector.png';
import UserContext from "../contexts/UserContext";
import Membership from "./Membership";
import Form from "./Form";
import Modal from "./Modal";

export default function MembershipPage() {
    const ID = useParams();
    // State Variables
    const [modal, setModal] = useState(false);
    const [membershipData, setMembershipData] = useState({})
    const [perksArr, setPerksArr] = useState([]);
    const [form, setForm] = useState({
        membershipId: ID.MEMBERSHIP_ID,
        cardName: '',
        cardNumber: '',
        securityNumber: '',
        expirationDate: ''
    });
   
    // Logic
    const { API, setArray } = useContext(UserContext);
    const userToken = localStorage.getItem('userToken');

    const updateForm = e => { 
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })}

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        }
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID.MEMBERSHIP_ID}`, config);
        promise.then(r => {
            console.log(r);
            setMembershipData({...r.data})
            setPerksArr([...r.data.perks])
            setArray([...r.data.perks])
        })
        promise.catch(e => console.log(e))
    }, [])

    const confirm = e => {
        e.preventDefault();
        setModal(true);
        console.log(form)
    }

    // UI
    return (
        <>
            { (modal) ? <Modal form={form} membership={membershipData} setModal={setModal} /> : <></> }
            <MembershipS>
                <Link to="/subscriptions">
                    <Icon>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </Icon>
                </Link>
                <Logo>
                    <img src={membershipData.image} alt="plus" />
                    <h1>{membershipData.name}</h1>
                </Logo>
                <Div>
                    <span>
                        <img src={perk} alt="p" />
                        <h3>Perks:</h3>
                    </span>
                    { perksArr.map((perk, i) => <p key={i}>{i+1}. {perk.title}</p>) }
                </Div>
                <Div>
                    <span>
                        <img src={price} alt="p" />
                        <h3>Price:</h3>
                    </span>
                    <p>US$ {membershipData.price} per month</p>
                </Div>
                <FormS>
                    <input 
                        value={ form.cardName } onChange={ e => updateForm(e)}
                        name="cardName" type="text" placeholder="Name on the credit card" ></input>
                    <input 
                        value={ form.cardNumber } onChange={ e => updateForm(e)}
                        name="cardNumber" type="number" placeholder="Card number" ></input>
                    <FlexInputs>
                        <input 
                            value={ form.securityNumber } onChange={ e => updateForm(e)}
                            name="securityNumber" type="number" placeholder="Security number" ></input>
                        <input 
                            value={ form.expirationDate } onChange={ e => updateForm(e)}
                            name="expirationDate" type="text" placeholder="Expiration date" ></input>
                    </FlexInputs>
                    <button onClick={ e => confirm(e) }>Sign this membership</button>
                </FormS>
            </MembershipS>
        </>
    );
}

const MembershipS = Styled.div`
    display: flex;
    flex-direction: column;
    
    h1, h3, p {
        color: white;
    }

    h1 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
    }
`;

const Icon = Styled.div`
    ion-icon {
        position: fixed;
        top: 10px;
        left: 20px;
        font-size: 40px;
        color: white;
    }
`;

const Div = Styled.div`
    margin-top: 20px;
    margin-left: 20px;

    span {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 2px;
    }

`;

const Logo = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        margin: 66px 0 10px 0;
    }
`;

const FlexInputs = Styled.div`
    display: flex;
    width: 80%;
    
    input {
        box-sizing: border-box;
        margin: 0 4px;
    }
`;

const FormS = Styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    
    input {
        box-sizing: border-box;
        font-family: inherit;
        height: 52px;
        width: 80%;
        background-color: white;
        border: none;
        border-radius: 10px;
        margin-bottom: 16px;
        padding-left: 10px
    }

    input::placeholder {
        color: #E7E7E7;
        font-size: 14px;
    }

    button {
        font-family: inherit;
        background-color: #FF4791;
        color: white;
        font-size: 14px;
        height: 52px;
        width: 300px;
        border: none;
        border-radius: 10px;
        margin-top: 10px;
    }
`;