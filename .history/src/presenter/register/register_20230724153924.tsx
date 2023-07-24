import { styled } from "styled-components";
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormUser from "../form/formUser";
import FormLogin from "../form/formLogin";

const ContainerStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  margin-top: 80px;
  width: 80%;  
  max-width: 800px;
`;

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
            <ContainerStyled>
                {mostrarBotao ? <FormUser /> : <FormLogin setMostrarBotao={setMostrarBotao} />}
            </ContainerStyled>
        </>
    );
}

export default Register;