import { Link, useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import { useState } from 'react';
import axios from "axios";

import Form from "./Form";

export default function SignupPage() {
    // State Variables
    const [form, setForm] = useState({
        email: '',
        name: '',
        cpf: '',
        password: ''
    });
    
    // Logic
    const API = "https://mock-api.driven.com.br/api/v4/driven-plus";
    
    const updateForm = e => { 
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })}

    const navigate = useNavigate();

    const signup = e => {
        e.preventDefault();
        console.log(form);
        const promise = axios.post(`${API}/auth/sign-up`, form)
        promise.then(r => {
            navigate("/");            
        })
        promise.catch(e => {
            alert("Invalid entry data");
            console.log(e);
        })
    }
    // UI
    return(
        <>
            <Space />
            <Form>
                <input 
                    value={form.username} onChange={ e => updateForm(e)} 
                    name="name" type="text" placeholder="Username" ></input>
                    <input 
                    value={form.CPF} onChange={ e => updateForm(e)} 
                    name="cpf" type="text" placeholder="CPF" ></input>
                    <input 
                    value={form.email} onChange={ e => updateForm(e)} 
                    name="email" type="email" placeholder="E-mail" ></input>
                    <input 
                    value={form.password} onChange={ e => updateForm(e)} 
                    name="password" type="password" placeholder="Password" ></input>
                    <button onClick={ e => signup(e) } >Signup</button>
            </Form>
            <Link to="/" style={{ textdecoration: "none" }}><P>Already has an account? Login here!</P></Link>
        </>
    );
}

const Space = Styled.div`
    height: 150px;
`;

const P = Styled.p`
    color: white;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    text-decoration: underline;
`;