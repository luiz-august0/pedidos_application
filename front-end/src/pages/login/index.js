import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './styles.css';
import { AuthContext } from '../../contexts/auth';

const Login = () => {
    const { login } = useContext(AuthContext);
    
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState(""); 
    
    const MySwal = withReactContent(Swal);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === '' && senha === '') {
            MySwal.fire({
            html: <i>Usuário e senha deve ser informado</i>,
            icon: 'error'
            })
            return;
        } 

        login(usuario, senha);
    }
      
    return (
        <div id="login">
            <h1>Sistema de pedidos V1.0</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="lbUsuario" htmlFor="usuario">Usuario</label>
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario"
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label className="lbSenha" htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id ="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">ENTRAR</button>                
                </div>
            </form>
        </div>
    );
};

export default Login;