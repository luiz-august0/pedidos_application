import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Produto from '../../components/produto/index'
import Fornecedor from '../../components/fornecedor/index';
import Pedidos from '../../components/pedido';
import 'react-pro-sidebar/dist/css/styles.css';
import './styles.css';

const Home = () => {
    const [ selectedComponent, setSelectedComponent ] = useState(<Pedidos/>);

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };
    
    return (
        <div className="main-container">
            <ProSidebar className="sidebar">
                <h2>Menu</h2>
            <Menu>
                <MenuItem onClick={() => setSelectedComponent(Produto)}>Produtos</MenuItem>
                <MenuItem>Clientes</MenuItem>
                <MenuItem>Funcionários</MenuItem>
                <MenuItem>Fornecedores</MenuItem>
                <MenuItem onClick={() => setSelectedComponent(Pedidos)}>Pedidos</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
            </ProSidebar>
            <div className="cont-second">
              {selectedComponent}
            </div>
        </div>
    );
};

export default Home;