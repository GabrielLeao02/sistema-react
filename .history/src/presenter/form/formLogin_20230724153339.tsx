import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ContainerGlobal from "../containerGlobal/containerGlobal";
import { SelectChangeEvent } from '@mui/material/Select';
import { isCNPJ, formatToCNPJ, isCPF } from 'brazilian-values';
import bcrypt from 'bcryptjs';
const FormStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

function FormLogin() {
    const [usuario_email_error, setUsuarioEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
   

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

  
    const handleSubmit = async () => {
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

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(usuario_senha, saltRounds);
            formData.usuario_senha = hashedPassword;
            const response = await fetch("http://localhost:5000/salvarusuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar os dados do formulário");
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
                    />                    <TextField
                        id="usuario_senha"
                        name="usuario_senha"
                        error={usuario_email_error}
                        label="Senha"
                        type="password"
                        variant="outlined"
                        value={formData.usuario_senha}
                        onChange={handleChange}
                        helperText={emailErrorText}
                    />

                    <Button variant="contained" onClick={handleSubmit}>
                        Entrar
                    </Button>
                    <Button variant="contained" onClick={formCadastro}>Cadastro</Button>
                </FormStyled>
            
        </>
    );
}

export default FormLogin;
