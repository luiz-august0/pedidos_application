import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import 
{ 
    DialogActions, 
    DialogContent,
    DialogTitle,
	InputLabel,
	Select,
	MenuItem,
    TextField, 
    Alert, 
    AlertTitle, 
    Snackbar
} from '@mui/material';

import { getProdutos, getProduto } from '../../services/api';

const FormDialogItem = ({ open, handleClose, handleFormSubmit }) => {
	const [ qtd, setQtd ] = React.useState();
	const [ valorUni, setValorUni ] = React.useState(0);
	const [ produtoSelected, setProdutoSelected ] = React.useState();
	const [ vlrTotalCalc, setVlrTotalCalc ] = React.useState(0);
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
	const [ produtos, setProdutos ] = React.useState([]);

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

	const getDataProdutos = async () => {
        const response = await getProdutos();
        setProdutos(response.data);
    }

    const limpaCampos = () => {
        setProdutoSelected();
        setQtd();
        setValorUni(0);
        setVlrTotalCalc(0);
    }

    const closeDialog = () => { limpaCampos(); handleClose() };

	React.useEffect(() => {
        getDataProdutos();
    }, []);

    const onConfirm = () => {
        if (produtoSelected === '' || produtoSelected === undefined) {
            alert(true, 'Código do produto é obrigatório');
            return;
        }

		if (qtd === '' || qtd === 0 || qtd === undefined) {
            alert(true, 'Quantidade é obrigatória');
            return;
        }

		if (valorUni === 0 || valorUni === '') {
            alert(true, 'Valor unitário é obrigatório');
            return;
        }

        if (vlrTotalCalc === NaN && vlrTotalCalc === 0 && vlrTotalCalc === '') {
            alert(true, 'Valor total é obrigatório');
            return;   
        }

        handleFormSubmit(produtoSelected, qtd, valorUni, vlrTotalCalc);
        limpaCampos();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

	const calculateValorTotal = (qtd, valorUni) => {
		setVlrTotalCalc((qtd * valorUni).toFixed(2));
	}

	const handleChangeProduto = async (event) => {
		setProdutoSelected(event.target.value);
		const response = await getProduto(event.target.value);
		setValorUni(response.data[0].Pro_VlrUni);
		calculateValorTotal(qtd, response.data[0].Pro_VlrUni);
    };

	const handleChangeQtd = async (event) => {
		setQtd(event.target.value);
		calculateValorTotal(event.target.value, valorUni);
	}

	const handleChangeValorUni = async (event) => {
		setValorUni(event.target.value);
		calculateValorTotal(qtd, event.target.value);
	}

    return (
        <div>
            <Dialog
                open={open}
                onClose={closeDialog}
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

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{"Adicionar Item"}</DialogTitle>
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
                            {produtos.map((element) => {
                                return (
                                    <MenuItem value={element.Pro_Codigo}>{element.Pro_Codigo} - {element.Pro_Descricao}</MenuItem> 
                                )
                            })}
                        </Select>
                        <TextField id="qtd" required value={qtd} onChange={e => handleChangeQtd(e)} placeholder="Quantidade" variant="outlined" margin="dense" label="Quantidade" fullWidth type={'number'}/>
						<TextField id="valorUni" required value={valorUni} onChange={e => handleChangeValorUni(e)} placeholder="Valor Unitário" variant="outlined" margin="dense" label="Valor Unitário" fullWidth type={'number'}/>
						<TextField id="valorTotal" value={vlrTotalCalc} placeholder="Valor Total" variant="outlined" margin="dense" label="Valor Total" fullWidth type={'number'} inputProps={{readOnly: true}}/>
				    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary" variant="outlined">
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

export default FormDialogItem;