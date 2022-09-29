import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import Produto from '../../components/produto/index'
import Fornecedor from '../../components/fornecedor/index';
import Pedidos from '../../components/pedido';
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { MdProductionQuantityLimits, MdBusinessCenter } from "react-icons/md"
import { BsPeopleFill, BsCart3 } from "react-icons/bs"
import { ImBoxAdd } from "react-icons/im"
import { FaPeopleCarry } from "react-icons/fa"
import 'react-pro-sidebar/dist/css/styles.css';
import './styles.css';

import { getProdutos } from '../../services/api';
import DialogEstoque from './DialogEstoque';

const Home = () => {

    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const [ selectedComponent, setSelectedComponent ] = useState(<Pedidos/>);

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const [produtos, setProdutos] = useState([]);

    React.useEffect(() => {
        getDataProdutos();
    }, []);

    const getDataProdutos = async () => {
        const response = await getProdutos();
        setProdutos(response.data);
    }

    const [open, setOpen] = useState(false);

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
                        <MenuItem onClick={() => setSelectedComponent(Produto)} icon={<MdProductionQuantityLimits/>}>Produtos</MenuItem>
                        <MenuItem icon={<BsPeopleFill/>}>Clientes</MenuItem>
                        <MenuItem icon={<FaPeopleCarry/>}>Funcionários</MenuItem>
                        <MenuItem icon={<MdBusinessCenter/>}>Fornecedores</MenuItem>
                        <MenuItem icon={<BsCart3/>} onClick={() => setSelectedComponent(Pedidos)}>Pedidos</MenuItem>
                        <MenuItem icon={<ImBoxAdd/>} onClick={() => setOpen(true)}>Adicionar Estoque</MenuItem>
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
            dataProdutos={produtos} 
            />
        </div>
    );
};

export default Home;