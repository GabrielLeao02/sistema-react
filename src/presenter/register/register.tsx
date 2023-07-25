import { useState } from 'react';
import FormUser from "../form/formUser";
import FormLogin from "../form/formLogin";
import { styled } from 'styled-components';
import ContainerStyled from '../containerGlobal/containerStyled';

const RegisterStyles = styled.div`
    background-image: url("/src/presenter/register/office.jpg");
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0 ;
    display: flex;
    justify-content: end;
    align-items: start;
    padding: 30px;
    box-sizing: border-box;
`

function Register() {
    const [mostrarBotao, setMostrarBotao] = useState(false);

    return (
        <>
            <RegisterStyles>
                <ContainerStyled>
                    {mostrarBotao ? <FormUser setMostrarBotao={setMostrarBotao} /> : <FormLogin setMostrarBotao={setMostrarBotao} />}
                </ContainerStyled>
            </RegisterStyles>
        </>
    );
}

export default Register;