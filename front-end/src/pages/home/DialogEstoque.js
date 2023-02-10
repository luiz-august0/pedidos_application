import React, { useState, useMemo } from 'react';
import 
{ 
    Dialog,
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
    InputAdornment,
    Button
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { addEstoqueProd } from '../../services/api';

const containsText = (text, searchProduto) => text.toLowerCase().indexOf(searchProduto.toLowerCase()) > -1;

const DialogEstoque = ({ open, handleClose, dataProd }) => {
    const [ searchProduto, setSearchProduto ] = useState("");
    const [ produtoSelected, setProdutoSelected ] = useState();
    const [ quantidade, setQuantidade ] = useState();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ msgAlert, setMsgAlert ] = useState('');

    const produtosOptions = useMemo(
        () => dataProd.filter((option) => containsText(option, searchProduto)),
        [searchProduto]
    );

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
                html: <i>{quantidade < 0?"Diminuido":"Adicionado"} {quantidade < 0?(quantidade * -1):quantidade} quantidade(s) no estoque do produto {produtoSelected}</i>,
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
        const valueSplited = event.target.value.split('-');
        const value = valueSplited[0].trim();
        setProdutoSelected(value);
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

                <DialogTitle style={{color: '#000'}} id="alert-dialog-title">Manutenção de estoque de produtos</DialogTitle>
                <DialogContent>
                    <form>
                        <Box sx={{ m: 0.5 }}>
                            <FormControl fullWidth>
                                <InputLabel required id="demo-simple-select-label">Produto</InputLabel>
                                <Select
                                style={{width: '300px'}}
                                MenuProps={{ autoFocus: false }}
                                labelId="Produto"
                                id="codigo"
                                value={produtoSelected}
                                label="Produto"
                                onChange={handleChangeProduto}
                                onClose={() => setSearchProduto("")}
                                renderValue={() => produtoSelected}
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
                            <TextField id="quantidade" required value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade" variant="outlined" label="Quantidade" margin="dense" fullWidth type={'number'}/>                        
                        </Box>
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