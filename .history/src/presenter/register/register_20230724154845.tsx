import { styled } from "styled-components";
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormUser from "../form/formUser";
import FormLogin from "../form/formLogin";



const DivRowStyled = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 5px 10px;
`


function Register() {
    const [mostrarBotao, setMostrarBotao] = useState(false);

    const formCadastro = () => {
        setMostrarBotao(true);
    };

    return (
        <>
         
                {mostrarBotao ? <FormUser setMostrarBotao={setMostrarBotao} /> : <FormLogin setMostrarBotao={setMostrarBotao} />}
            
        </>
    );
}

export default Register;