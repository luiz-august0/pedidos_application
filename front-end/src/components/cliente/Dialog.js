import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import 
{ 
    DialogActions, 
    DialogContent,
    DialogTitle,
    TextField, 
    Alert, 
    AlertTitle, 
    Snackbar
} from '@mui/material';

import { cpf as cpfValid, cnpj as cnpjValid } from 'cpf-cnpj-validator';


const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, nome, cpf, cnpj, contato } = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (nome === '') {
            alert(true, 'Nome é obrigatório');
            return;
        }

        if (cpf !== '') {
            if (!cpfValid.isValid(cpf)) {
                alert(true, 'CPF inválido');
                return;
            }
        }

        if (cnpj !== '') {
            if (!cnpjValid.isValid(cnpj)) {
                alert(true, 'CNPJ inválido');
                return;
            }
        }

        if (contato !== '') {
            if (contato.length < 11) {
                alert(true, 'Número de telefone inválido');
                return;
            }
        }

        handleFormSubmit()
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

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

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{id?"Editar Cliente":"Cadastrar Cliente"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="nome" required value={nome} onChange={e => onChange(e)} placeholder="Nome" variant="outlined" margin="dense" label="Nome" fullWidth type={'text'}/>
                        <TextField id="cpf" value={cpf} onChange={e => onChange(e)} placeholder="CPF" variant="outlined" margin="dense" label="CPF" fullWidth type={'number'}/>
                        <TextField id="cnpj" value={cnpj} onChange={e => onChange(e)} placeholder="CNPJ" variant="outlined" margin="dense" label="CNPJ" fullWidth type={'number'}/>
                        <TextField id="contato" value={contato} onChange={e => onChange(e)} placeholder="Contato" variant="outlined" margin="dense" label="Contato" fullWidth type={'number'}/>
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

export default FormDialog;