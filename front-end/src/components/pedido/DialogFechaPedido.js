import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent,DialogTitle, TextField, Alert, AlertTitle, Snackbar } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const FormDialogFechaPedido = ({ openModalFechaPed, handleCloseFechaPed, handleSubmitFechaPed, valorTotal }) => {
	const valorTotalPed = valorTotal;
	const [ valorTotalRecebido, setValorTotalRecebido ] = React.useState();
	const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
	const MySwal = withReactContent(Swal);

	const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

	const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

	const handleChangeValorRecebido = async (event) => {
		setValorTotalRecebido(event.target.value);
	}

	const calculaTotalTroco = () => {
        let troco = 0;
		troco = (parseFloat(valorTotalRecebido) - parseFloat(valorTotalPed)).toFixed(2);
        if (parseFloat(troco).toString() !== 'NaN') {
            return parseFloat(troco);
        } else {
            return parseFloat(-valorTotalPed).toFixed(2);
        }
    }

	const handleConfirmSubmit = () => {
		if (parseFloat(valorTotalRecebido).toFixed(2) >= parseFloat(valorTotalPed).toFixed(2)) {
			handleSubmitFechaPed(true);
			handleCloseAlert();
            setValorTotalRecebido();
		} else {
			handleSubmitFechaPed(false);
			alert(true, 'Valor total recebido deve ser maior ou igual o valor total do pedido');
		}
	}

    return (
        <div>
            <Dialog
                open={openModalFechaPed}
                onClose={handleCloseFechaPed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
				<Snackbar 
                open={openAlert} 
                autoHideDuration={4000} 
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: "top", horizontal: "center"}}>
                    <Alert severity="warning" onClose={handleCloseAlert}>
                        <AlertTitle>Alerta</AlertTitle>
                        {msgAlert} <strong>Verifique!</strong>
                    </Alert>
                </Snackbar>

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{"Fechamento"}</DialogTitle>
                <DialogContent>
                    <form>
						<TextField id="valorTotalPed" required value={valorTotalPed} placeholder="Valor total do pedido" variant="outlined" margin="dense" label="Valor total do pedido" fullWidth type={'number'} property={{readOnly: true}}/>
						<TextField id="valorTotalRecebido" required value={valorTotalRecebido} onChange={e => handleChangeValorRecebido(e)} placeholder="Valor total recebido" variant="outlined" margin="dense" label="Valor total recebido" fullWidth type={'number'}/>
                        <h2 style={{color: '#000'}}>Troco: R${calculaTotalTroco()}</h2>
                    </form>
                </DialogContent>
                <DialogActions>
					<Button onClick={handleCloseFechaPed} color="secondary" variant="outlined">
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={() => handleConfirmSubmit()} variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialogFechaPedido;