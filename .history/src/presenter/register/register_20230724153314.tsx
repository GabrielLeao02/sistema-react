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
    const [mostrarBotao, setMostrar] = useState(false);

    
    const formCadastro = () => {
        setMostrar(true)
    };
    const formLogin = () => {
        setMostrar(false)
    };
   

    return (
        <>
            <ContainerStyled>
                <div style={{ display: 'flex', gap: '8px', margin: '5px 0px' }}>
                    <Button variant="contained" onClick={formCadastro}>Cadastro</Button>
                    <Button variant="contained" onClick={formLogin}>Login</Button>
                </div>
                {mostrarBotao == true ? <FormUser /> : <FormLogin />}
            </ContainerStyled>
        </>
    )
}

export default Register;