import { useState } from 'react';
import FormUser from "../form/formUser";
import FormLogin from "../form/formLogin";

function Register() {
    const [mostrarBotao, setMostrarBotao] = useState(false);

    return (
        <>
            {mostrarBotao ? <FormUser setMostrarBotao={setMostrarBotao} /> : <FormLogin setMostrarBotao={setMostrarBotao} />}
        </>
    );
}

export default Register;