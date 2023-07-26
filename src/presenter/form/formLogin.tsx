import React, { useState } from "react";


import styled from "styled-components";
import { SelectChangeEvent, Button, TextField, Typography, Box } from '@mui/material';
import sha256 from 'sha256';


const FormStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

type FormLoginProps = {
    setMostrarBotao: (value: boolean) => void;
};

function FormLogin({ setMostrarBotao }: FormLoginProps) {
    const [usuario_email_error, setUsuarioEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [formData, setFormData] = useState({
        usuario_email: "",
        usuario_senha: ""
    });

    const handleChange = (e: SelectChangeEvent<string[]> | React.ChangeEvent<{ name: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isEmailValid = (email: string) => {
        // Expressão regular para validar o email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const login = () => {
        // Lógica do login

        // Após o login ser realizado com sucesso, chame a função setMostrarBotao
        setMostrarBotao(true);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setLoading(true);

        const { usuario_email, usuario_senha } = formData;
        for (const fieldName in formData) {

            const fieldValue = formData[fieldName as keyof typeof formData];
            if (fieldValue == '') {
                setLoading(false);
                return setErrorLogin('Preencha todos os campos para realizar o login!')
            } else {
                setErrorLogin('')
            }

        }
        if (!isEmailValid(usuario_email)) {
            setUsuarioEmailError(true);
            setEmailErrorText("Insira um email válido!");
            setLoading(false);
            return;
        } else {

            setUsuarioEmailError(false);
            setEmailErrorText("");
        }

        const hashedPassword = sha256(usuario_senha);

        const formDataWithHash = {
            usuario_email,
            usuario_senha: hashedPassword,
        };
        try {


            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataWithHash), // Enviar o objeto criptografado
            });

            if (!response.ok) {
                setLoading(false);
                setErrorLogin('As credenciais fornecidas são inválidas!')
                throw new Error("Erro ao logar");
            } else {
                window.location.href = "/home";
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FormStyled>
                <Typography variant="h4" >Login</Typography>
                <TextField
                    id="usuario_email"
                    name="usuario_email"
                    error={usuario_email_error}
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    value={formData.usuario_email}
                    onChange={handleChange}
                    helperText={emailErrorText}
                />
                <TextField
                    id="usuario_senha"
                    name="usuario_senha"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    value={formData.usuario_senha}
                    onChange={handleChange}
                />
                <Box>
                    <Typography variant="caption" color={"red"}>{errorLogin}</Typography>
                </Box>

                <Button variant="contained" onClick={handleSubmit}>
                    {loading ? "Carregando..." : "Entrar"}
                </Button>
                <Button variant="outlined" onClick={login}>Cadastro</Button>
            </FormStyled>
        </>
    );
}

export default FormLogin;
