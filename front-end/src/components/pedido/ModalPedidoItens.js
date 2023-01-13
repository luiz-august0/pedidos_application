import React from 'react';
import Popup from 'reactjs-popup';
import { Button} from '@mui/material';
import './ModalPedidoItens.css';
import GridItensPed from './GridItensPed';

const ModalPedidoItens = ({idPedido, situacaoPed, refreshGrid}) => {
    return (
        <Popup 
            trigger={<Button color='primary' variant='outlined'>Itens</Button>}
            modal
            nested
            >
            {close => (
                <div className="modal">
                    <button className="close" onClick={() => {close(); refreshGrid();}}>
                        &times;
                    </button>
                    <div className="header">Itens do Pedido</div>
                    <div className="content">
						<GridItensPed idPedido={idPedido} situacaoPed={situacaoPed}/>
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default ModalPedidoItens;