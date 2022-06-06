import Styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

export default function Membership({ option }) {
    // Logic
    const navigate = useNavigate();
    const select = () => {
        navigate(`/subscriptions/${option.id}`)
    }

    // UI
    return (
        <MembershipS onClick={ select }>
            <img src={option.image} />
            <p>US$ { option.price } </p>             
        </MembershipS>
    );
}

const MembershipS = Styled.div`
    width: 290px;
    height: 180px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px;
    border: 2px solid #7E7E7E;
    border-radius: 12px;

    img {
        width: 92px;
        height: 95px;
    }

    p {
        color: white;
        font-size 24px;
        font-weight: bold;
    }
`;