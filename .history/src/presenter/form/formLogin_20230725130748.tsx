import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { SelectChangeEvent } from '@mui/material/Select';
import sha256 from 'sha256';
import CircularProgress from '@mui/material/CircularProgress';

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
        setLoading(true)
        try {
            const { usuario_email, usuario_senha } = formData;

            if (!isEmailValid(usuario_email)) {
                setUsuarioEmailError(true)
                setEmailErrorText("Insira um email valido!")
                return;
            } else {
                setUsuarioEmailError(false)
                setEmailErrorText("")
            }


            //   formData.usuario_senha = hashedPassword;
            const hashedPassword = sha256(usuario_senha);
            formData.usuario_senha = hashedPassword;

            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao logar");
            } else {
                window.location.href = "/home";
            }

            setFormData({
                usuario_email: "",
                usuario_senha: ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FormStyled>
                <h1>Login</h1>
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

                <Button variant="contained" onClick={handleSubmit}>
                    {loading ? <CircularProgress
                        variant="determinate"
                        sx={{
                            color: (theme) =>
                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                        }}
                        size={40}
                        thickness={4}
                        
                        value={100}
                    /> : "Entrar"}
                </Button>
                <Button variant="outlined" onClick={login}>Cadastro</Button>
            </FormStyled>
        </>
    );
}

export default FormLogin;
