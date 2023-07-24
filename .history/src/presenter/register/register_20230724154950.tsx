import { useState } from 'react';
import FormUser from "../form/formUser";
import FormLogin from "../form/formLogin";

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