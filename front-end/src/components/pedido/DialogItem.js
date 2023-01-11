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

const FormDialogItem = ({ open, handleClose, handleFormSubmit, onChange, data }) => {
    const {codigo, qtd, valorUni, valorTotal, editMode} = data;
	const [ produtoSelected, setProdutoSelected ] = React.useState();
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
    };

    const closeDialog = () => { limpaCampos(); handleClose(); };

	React.useEffect(() => {
        getDataProdutos();
    }, []);

    const onConfirm = () => {
        if (codigo === '' || codigo === undefined) {
            alert(true, 'Código do produto é obrigatório');
            return;
        }

		if (qtd === '' || qtd === undefined) {
            alert(true, 'Quantidade é obrigatória');
            return;
        }

        if (qtd <= 0) {
            alert(true, 'Quantidade não deve ser menor ou igual a 0');
            return;
        }

		if (valorUni === 0 || valorUni === '') {
            alert(true, 'Valor unitário é obrigatório');
            return;
        }

        if (valorUni <= 0) {
            alert(true, 'Valor unitário não deve ser menor ou igual a 0');
            return;
        }

        if (valorTotal === NaN && valorTotal === 0 && valorTotal === '') {
            alert(true, 'Valor total é obrigatório');
            return;   
        }

        const finalizeSubmit = async() => {
            const response = await getProduto(codigo);
            const prodInfo = response.data[0].Pro_Codigo + ' - ' + response.data[0].Pro_Descricao + ' - ' + response.data[0].Pro_Unidade
            handleFormSubmit(codigo, prodInfo, qtd, valorUni, valorTotal);
            limpaCampos();
        }

        finalizeSubmit();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

	const calculateValorTotal = (qtd, valorUni) => {
        data.valorTotal = (qtd * valorUni).toFixed(2);
        onChange(valorTotal, (qtd * valorUni).toFixed(2));
	}

	const handleChangeProduto = async (event) => {
        data.codigo = event.target.value;
		setProdutoSelected(data.codigo);
		const response = await getProduto(event.target.value);
        data.valorUni = response.data[0].Pro_VlrUni;
        onChange(valorUni, response.data[0].Pro_VlrUni);
		calculateValorTotal(qtd, response.data[0].Pro_VlrUni);
    };

	const handleChangeQtd = async (event) => {
        data.qtd = event.target.value;
        onChange(qtd, event.target.value);
		calculateValorTotal(event.target.value, valorUni);
	}

	const handleChangeValorUni = async (event) => {
        data.valorUni = event.target.value;
        onChange(valorUni, event.target.value)
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

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{editMode?"Editar Item":"Adicionar Item"}</DialogTitle>
                <DialogContent>
                    <form>
						<InputLabel required id="demo-simple-select-label">Produto</InputLabel>
                        <Select
                        id="codigo" 
                        defaultValue={data.codigo !== ''?data.codigo:null}
                        value={data.codigo}
                        label="Produto"
                        onChange={handleChangeProduto}
                        style={{width: '250px'}}
                        >
                            {produtos.map((element) => {
                                return (
                                    <MenuItem value={element.Pro_Codigo}>{element.Pro_Codigo} - {element.Pro_Descricao} - {element.Pro_Unidade}</MenuItem> 
                                )
                            })}
                        </Select>
                        <TextField id="qtd" required value={qtd} onChange={e => handleChangeQtd(e)} placeholder="Quantidade" variant="outlined" margin="dense" label="Quantidade" fullWidth type={'number'}/>
						<TextField id="valorUni" required value={valorUni} onChange={e => handleChangeValorUni(e)} placeholder="Valor Unitário" variant="outlined" margin="dense" label="Valor Unitário" fullWidth type={'number'}/>
						<TextField id="valorTotal" value={valorTotal} placeholder="Valor Total" variant="outlined" margin="dense" label="Valor Total" fullWidth type={'number'} inputProps={{readOnly: true}}/>
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