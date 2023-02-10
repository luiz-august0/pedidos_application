import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import Produto from '../../components/produto/index';
import Cliente from '../../components/cliente';
import Fornecedor from '../../components/fornecedor/index';
import Funcionario from '../../components/funcionario';
import Pedidos from '../../components/pedido';
import Usuario from '../../components/usuario';
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { MdProductionQuantityLimits, MdBusinessCenter } from "react-icons/md"
import { BsPeopleFill, BsCart3 } from "react-icons/bs"
import { ImBoxAdd } from "react-icons/im"
import { FaPeopleCarry } from "react-icons/fa"
import 'react-pro-sidebar/dist/css/styles.css';
import './styles.css';

import DialogEstoque from './DialogEstoque';
import { getProdutos } from '../../services/api';

const Home = () => {
    const [menuCollapse, setMenuCollapse] = useState(false);
    const [ selectedComponent, setSelectedComponent ] = useState(<Pedidos/>);
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [dataProd, setDataProd] = useState([]);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const getDataProdutos = async () => {
        const response = await getProdutos();
        let arrayProdutos = [];
        response.data.map((e) => {
            arrayProdutos.push(`${e.Pro_Codigo} - ${e.Pro_Descricao} - ${e.Pro_Unidade} - Estoque atual: ${e.Pro_QtdEst}`);
        })
        setDataProd(arrayProdutos);
    }

    const handleLogout = () => {
        logout();
    };

    const handleOpen = () => {
        getDataProdutos();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div className="main-container">
            <ProSidebar collapsed={menuCollapse} className="sidebar">
                <SidebarHeader>
                    <h2>Menu</h2>
                    <div className="closemenu" onClick={menuIconClick}>
                        {menuCollapse ? (
                        <FiArrowRightCircle/>
                        ) : (
                        <FiArrowLeftCircle/>
                        )}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem onClick={() => setSelectedComponent(Produto)} icon={<MdProductionQuantityLimits/>}>Produtos</MenuItem>
                        :null}
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem onClick={() => setSelectedComponent(Cliente)} icon={<BsPeopleFill/>}>Clientes</MenuItem>
                        :null}
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem onClick={() => setSelectedComponent(Funcionario)} icon={<FaPeopleCarry/>}>Funcionários</MenuItem>
                        :null}
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem onClick={() => setSelectedComponent(Fornecedor)} icon={<MdBusinessCenter/>}>Fornecedores</MenuItem>
                        :null}
                        <MenuItem icon={<BsCart3/>} onClick={() => setSelectedComponent(Pedidos)}>Pedidos</MenuItem>
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem icon={<ImBoxAdd/>} onClick={() => handleOpen()}>Manutenção de estoque</MenuItem>
                        :null}
                        {localStorage.getItem('isFuncionario') === 'false'
                        ?<MenuItem icon={<BsPeopleFill/>} onClick={() => setSelectedComponent(Usuario)}>Usuários</MenuItem>
                        :null}
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem onClick={handleLogout} icon={<FiLogOut />}>Sair</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
            <div className="cont-second">
              {selectedComponent}
            </div>
            <DialogEstoque
            open={open} 
            handleClose={handleClose} 
            dataProd={dataProd}
            />
        </div>
    );
};

export default Home;