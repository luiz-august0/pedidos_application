import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './styles.css';
import { AuthContext } from '../../contexts/auth';
import { Oval } from  'react-loader-spinner';

const Login = () => {
    const { login } = useContext(AuthContext);
    
    const [chave, setChave] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState(""); 
    const [loading, setLoading] = useState(false);
    
    const MySwal = withReactContent(Swal);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chave === '') {
            MySwal.fire({
            html: <i>Chave de acesso deve ser informada</i>,
            icon: 'error'
            })
            return;
        }

        if (usuario === '' && senha === '') {
            MySwal.fire({
            html: <i>Usuário e senha deve ser informado</i>,
            icon: 'error'
            })
            return;
        } 

        const doLogin = async() => {
            setLoading(true);
            await login(chave, usuario, senha);
            setLoading(false);
        }

        doLogin();
    }
      
    return (
        <div id="login">
            <h1>Sistema de pedidos V1.0</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="chave">Chave de acesso</label>
                    <input 
                        type="text" 
                        name="chave" 
                        id="chave"
                        value={chave} 
                        onChange={(e) => setChave(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label htmlFor="usuario">Usuario</label>
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario"
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id ="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">
                        {!loading?`ENTRAR`:
                        <Oval
                        height={25}
                        width={25}
                        color="#1976d2"
                        wrapperStyle={{justifyContent: "center"}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#1976d2"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                        />
                        }
                    </button>                
                </div>
            </form>
        </div>
    );
};

export default Login;