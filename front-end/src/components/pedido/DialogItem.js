import React, { useState, useMemo, useEffect } from 'react';
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
    Snackbar,
    Box,
    FormControl,
    ListSubheader,
    InputAdornment
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

import { getProdutos, getProduto } from '../../services/api';

const containsText = (text, searchProduto) => text.toLowerCase().indexOf(searchProduto.toLowerCase()) > -1;

const FormDialogItem = ({ open, handleClose, handleFormSubmit, onChange, data }) => {
    const {codigo, produto, qtd, valorUni, valorTotal, editMode} = data;
    const [ searchProduto, setSearchProduto ] = useState("");
	const [ produtoSelected, setProdutoSelected ] = useState();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ msgAlert, setMsgAlert ] = useState('');
	const [ produtos, setProdutos ] = useState([]);

    const produtosOptions = useMemo(
        () => produtos.filter((option) => containsText(option, searchProduto)),
        [searchProduto]
    );

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

	const getDataProdutos = async () => {
        const response = await getProdutos();
        let arrayProdutos = [];
        response.data.map((e) => {
            arrayProdutos.push(`${e.Pro_Codigo} - ${e.Pro_Descricao} - ${e.Pro_Unidade} - Estoque atual: ${e.Pro_QtdEst}`);
        })
        setProdutos(arrayProdutos);
    }

    const limpaCampos = () => {
        setSearchProduto("");
        setProdutoSelected();
        setMsgAlert('');
        setOpenAlert(false);
    };

    const closeDialog = () => { limpaCampos(); handleClose(); };

	useEffect(() => {
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
            data.produto = prodInfo;
            onChange(produto, prodInfo);
            handleFormSubmit();
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
        data.valorTotal = parseFloat(qtd * valorUni);
        onChange(valorTotal, parseFloat(qtd * valorUni));
	}

	const handleChangeProduto = async (event) => {
        const valueSplited = event.target.value.split('-');
        const value = valueSplited[0].trim();
        data.editMode = false;
        data.codigo = value;
		setProdutoSelected(data.codigo);
		const response = await getProduto(value);
        data.valorUni = response.data[0].Pro_VlrUni;
        onChange(editMode, false);
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
                        <Box sx={{ m: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel required id="demo-simple-select-label">Produto</InputLabel>
                                <Select
                                style={{width: '300px'}}
                                MenuProps={{ autoFocus: false }}
                                labelId="Produto"
                                id="codigo"
                                defaultValue={data.codigo !== ''?data.codigo:null}
                                value={data.codigo}
                                label="Produto"
                                onChange={handleChangeProduto}
                                onClose={() => setSearchProduto("")}
                                renderValue={() => data.codigo}
                                >
                                <ListSubheader>
                                    <TextField
                                    size="small"
                                    autoFocus
                                    placeholder="Digite para procurar..."
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => setSearchProduto(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key !== "Escape") {
                                        e.stopPropagation();
                                        }
                                    }}
                                    />
                                </ListSubheader>
                                {produtosOptions.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <TextField id="qtd" required value={qtd} onChange={e => handleChangeQtd(e)} placeholder="Quantidade" variant="outlined" margin="dense" label="Quantidade" fullWidth type={'number'}/>
                            <TextField id="valorUni" required value={valorUni} onChange={e => handleChangeValorUni(e)} placeholder="Valor Unitário" variant="outlined" margin="dense" label="Valor Unitário" fullWidth type={'number'}/>
                            <TextField id="valorTotal" value={valorTotal} placeholder="Valor Total" variant="outlined" margin="dense" label="Valor Total" fullWidth type={'number'} inputProps={{readOnly: true}}/>
                        </Box>
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