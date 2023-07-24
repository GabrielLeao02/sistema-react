import { styled } from "styled-components";
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormUser from "../form/formUser";

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
    const [mostrarBotao, setMostrar] = useState(true);

    return (
        <>

            <ContainerStyled>
                <div style={{ display: 'flex', gap: '8px', margin: '5px 0px' }}>
                    <Button variant="contained">Cadastro</Button>
                    <Button variant="contained">Login</Button>
                </div>
                <FormUser />
            </ContainerStyled>
        </>
    )
}
export default Register