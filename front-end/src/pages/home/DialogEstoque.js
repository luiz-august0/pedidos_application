import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 
{ 
    DialogActions, 
    DialogContent,
    Alert, 
    AlertTitle, 
    Snackbar,
    Select,
    MenuItem,
    InputLabel,
    TextField
} from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { addEstoqueProd } from '../../services/api';

const DialogEstoque = ({ open, handleClose, dataProd }) => {
    const [ produtoSelected, setProdutoSelected ] = React.useState();
    const [ quantidade, setQuantidade ] = React.useState();
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');

    const MySwal = withReactContent(Swal);

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const addEstoque = async() => {
        try {         
            await addEstoqueProd(produtoSelected, quantidade);
            handleClose();
            MySwal.fire({
                html: <i>Adicionado {quantidade} quantidade(s) no estoque do produto {produtoSelected}</i>,
                icon: 'success'
            })
        } catch (error) {
            handleClose();
            MySwal.fire({
                html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                icon: 'error'
            })
        }

        setProdutoSelected();
        setQuantidade();   
    }

    const onConfirm = () => {
        if (produtoSelected === undefined) {
            alert(true, 'Produto é obrigatório');
            return;
        }

        if (quantidade === undefined) {
            alert(true, 'Quantidade é obrigatória');
            return;
        }

        addEstoque();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChangeProduto = (event) => {
        setProdutoSelected(event.target.value);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Snackbar 
                open={openAlert} 
                autoHideDuration={5000} 
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: "top", horizontal: "center"}}>
                    <Alert severity="warning" onClose={handleCloseAlert}>
                        <AlertTitle>Alerta</AlertTitle>
                        {msgAlert} <strong>Verifique!</strong>
                    </Alert>
                </Snackbar>

                <DialogTitle style={{color: '#000'}} id="alert-dialog-title">{"Adicionar estoque de produto"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Produto</InputLabel>
                        <Select
                        id="produto" 
                        value={produtoSelected}
                        label="Produto"
                        onChange={handleChangeProduto}
                        style={{width: '250px'}}
                        >
                            {dataProd.map((element) => {
                                return (
                                    <MenuItem value={element.Pro_Codigo}>{element.Pro_Codigo} - {element.Pro_Descricao} - {element.Pro_Unidade} - Estoque atual:{element.Pro_QtdEst}</MenuItem> 
                                )
                            })}
                        </Select>
                        <TextField id="quantidade" required value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade" variant="outlined" label="Quantidade" margin="dense" fullWidth type={'number'}/>                        
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={() => onConfirm()} variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogEstoque;