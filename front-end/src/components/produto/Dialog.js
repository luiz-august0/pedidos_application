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
    Snackbar,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { getFornecedores } from '../../services/api';


const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, descricao, unidade, valorUni, fornecedor } = data;
    const [ fornecedores, setFornecedores ] = React.useState([]);
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ unidadeSelected, setUnidadeSelected] = React.useState();
    const [ fornecedorSelected, setFornecedorSelected] = React.useState();

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const getDataFornecedores = async () => {
        const response = await getFornecedores();
        setFornecedores(response.data);
    };

    React.useEffect(() => {
        getDataFornecedores();
    }, []);

    const limpaCampos = () => {
        setUnidadeSelected();
        setFornecedorSelected();
        setMsgAlert('');
        setOpenAlert(false);
    };

    const closeDialog = () => { limpaCampos(); handleClose(); };

    const onConfirm = () => {
        if (descricao === '') {
            alert(true, 'Descrição é obrigatória');
            return;
        }

        if (unidade === '') {
            alert(true, 'Unidade é obrigatória');
            return;
        }

        if (valorUni === '') {
            alert(true, 'Valor unitário é obrigatório');
            return;
        }

        if (fornecedor === '') {
            alert(true, 'Fornecedor é obrigatório');
            return;
        }

        handleFormSubmit();
        limpaCampos();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChangeUnidade = (event) => {
        data.unidade = event.target.value;
        setUnidadeSelected(data.unidade);
    } 

    const handleChangeFornecedor = (event) => {
        data.fornecedor = event.target.value;
        setFornecedorSelected(data.fornecedor);
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
                autoHideDuration={5000} 
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: "top", horizontal: "center"}}>
                    <Alert severity="warning" onClose={handleCloseAlert}>
                        <AlertTitle>Alerta</AlertTitle>
                        {msgAlert} <strong>Verifique!</strong>
                    </Alert>
                </Snackbar>

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{id?"Editar Produto":"Cadastrar Produto"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="descricao" required value={descricao} onChange={e => onChange(e)} placeholder="Descrição" variant="outlined" margin="dense" label="Descrição" fullWidth type={'text'}/>
                        <InputLabel required id="demo-simple-select-label">Unidade</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="unidade"
                        defaultValue={data.unidade !== ''?data.unidade:null}
                        value={data.unidade}
                        label="Unidade"
                        onChange={handleChangeUnidade}
                        >
                            <MenuItem value={'UN'}>Unidade</MenuItem> 
                            <MenuItem value={'KG'}>Kilograma</MenuItem> 
                            <MenuItem value={'PCT'}>Pacote</MenuItem> 
                        </Select>
                        <TextField id="valorUni" required value={valorUni} onChange={e => onChange(e)} placeholder="Valor Unitário" variant="outlined" label="Valor Unitário" margin="dense" fullWidth type={'number'}/>
                        <InputLabel required id="demo-simple-select-label">Fornecedor</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="fornecedor"
                        defaultValue={data.fornecedor !== ''?data.fornecedor:null}
                        value={data.fornecedor}
                        label="Fornecedor"
                        onChange={handleChangeFornecedor}
                        >
                            {fornecedores.map((element) => {
                                return (
                                    <MenuItem value={element.For_Codigo}>{element.For_Codigo} - {element.For_Nome}</MenuItem> 
                                )
                            })}
                        </Select>
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

export default FormDialog;