import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './styles.css';
import Image from '../../img/logout.png';

const Home = () => {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="main-container">
            <div className="cont-second">
                <h2>Inicio</h2>
                <button className='logout-button' onClick={handleLogout}><img src={Image}  className="image-logout" alt="" width={40} height={40}/></button>
            </div>
            <div class="on-screen">
                <p>Bem Vindo</p>
            </div>
        </div>
    );
};

export default Home;