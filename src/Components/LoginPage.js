import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import logo from '../assets/main-logo.png';
import Form from './Form';

export default function LoginPage() {
    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Logic
    const API = "https://mock-api.driven.com.br/api/v4/driven-plus";

    const login = e => {
        e.preventDefault();
        const body = {email, password};
        const promise = axios.post(`${API}/auth/login`, body);
        promise.then(r => {
            console.log(body, r)
            })
        promise.then(e => {
                console.log(body)
                console.log(e)
            })
    }

    // UI
    return (
        <Login>
            <img src={ logo } alt="Driven+" />
            <Form>
                <input 
                    value={ email } onChange={ e => setEmail(e.target.value)}
                    name="email" type="email" placeholder="E-mail" ></input>
                <input 
                    value={ password } onChange={ e => setPassword(e.target.value)} 
                    name="password" type="password" placeholder="Password" ></input>             
                <button onClick={ login }>Login</button>
            </Form>
            <Link to="/signup" style={{textDecoration: "none"}} ><p>Does not have an account? Signup here!</p></Link>
        </Login>
    );
}

const Login = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin: 140px 0 100px 0;
        width: 80%;
    }

    p {
        color: white;
        font-size: 14px;
        text-align: center;
        text-decoration: underline;
        margin-top: 20px;
    }
`;