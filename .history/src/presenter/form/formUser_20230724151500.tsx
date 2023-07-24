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

function FormUser() {
    const [usuario_email_error, setUsuarioEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [cpfErrorText, setCpfErrorText] = useState("");
    const [isCpf, setIsCpf] = useState(false);
    const [formData, setFormData] = useState({
        usuario_nome: "",
        usuario_cpf: "",
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
            const { usuario_nome, usuario_cpf, usuario_email, usuario_senha } = formData;

            if (!isCPF(usuario_cpf)) {
                setIsCpf(true)
                setCpfErrorText("Cpf Invalido!")
                return;
            } else {
                setIsCpf(false)
                setCpfErrorText("")
            }

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

            console.log(response.json());
            // Opcionalmente, você pode redefinir os campos do formulário aqui
            setFormData({
                usuario_nome: "",
                usuario_cpf: "",
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
                    <h1>Cadastro de Usuario</h1>
                    <TextField
                        id="usuario_nome"
                        name="usuario_nome"
                        label="Nome"
                        variant="outlined"
                        value={formData.usuario_nome}
                        onChange={handleChange}
                    />
                    <TextField
                        id="usuario_cpf"
                        name="usuario_cpf"
                        label="CPF"
                        error={isCpf}
                        variant="outlined"
                        value={formData.usuario_cpf}
                        onChange={handleChange}
                        helperText={cpfErrorText}
                    />
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
                        Salvar
                    </Button>
                </FormStyled>
            
        </>
    );
}

export default FormUser;
