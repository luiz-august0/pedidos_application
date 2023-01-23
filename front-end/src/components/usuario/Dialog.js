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
import { getFuncionarios } from '../../services/api';

const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, usuario, senha, codFuncionario, tipoUsuarioDefault } = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ tipoUsuarioSelected, setTipoUsuarioSelected ] = React.useState();
    const [ funcionarioSelected, setFuncionarioSelected ] = React.useState();
    const [ funcionarios, setFuncionarios ] = React.useState([]);

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const limpaCampos = () => {
        setFuncionarioSelected();
        setTipoUsuarioSelected();
        setMsgAlert('');
        setOpenAlert(false);
    };

    const closeDialog = () => { limpaCampos(); handleClose(); };

    const getDataFuncionarios = async () => {
        const response = await getFuncionarios();
        setFuncionarios(response.data);
    };

    React.useEffect(() => {
        getDataFuncionarios();
    }, []);

    const onConfirm = () => {
        if (usuario === '') {
            alert(true, 'Usuário é obrigatório');
            return;
        }

        if (senha === '') {
            alert(true, 'Senha é obrigatória');
            return;
        }

        if (tipoUsuarioDefault !== "ADM" && codFuncionario === null) {
            alert(true, 'Funcionário é obrigatório para cadastros que não forem administrativos');
            return;
        }

        if (tipoUsuarioDefault === "ADM") {
            setFuncionarioSelected('');
            data.codFuncionario = '';
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

    const handleChangeTipo = (event) => {
        data.tipoUsuarioDefault = event.target.value;
        setTipoUsuarioSelected(data.tipoUsuarioDefault);
        if (event.target.value === "ADM") {
            setFuncionarioSelected('');
            data.codFuncionario = '';
        }
    } 

    const handleChangeFuncionario = (event) => {
        data.codFuncionario = event.target.value;
        setFuncionarioSelected(data.codFuncionario);
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

                <DialogTitle style={{color: '#000'}}id="alert-dialog-title">{id?"Editar Usuário":"Cadastrar Usuário"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="usuario" required value={usuario} onChange={e => onChange(e)} placeholder="Usuário" variant="outlined" margin="dense" label="Usuário" fullWidth type={'text'}/>
                        <TextField id="senha" value={senha} onChange={e => onChange(e)} placeholder="Senha" variant="outlined" margin="dense" label="Senha" fullWidth type={'text'}/>
                        <InputLabel required id="demo-simple-select-label">Tipo do Usuário</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="tipo"
                        value={data.tipoUsuarioDefault}
                        label="Tipo do Usuário"
                        onChange={handleChangeTipo}
                        >
                            <MenuItem value={'ADM'}>Administrador</MenuItem> 
                            <MenuItem value={'FUNC'}>Funcionário</MenuItem> 
                        </Select>
                        {data.tipoUsuarioDefault !== 'ADM'?
                            <div>
                                <InputLabel required id="demo-simple-select-label">Funcionário</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="funcionario"
                                defaultValue={data.codFuncionario !== ''?data.codFuncionario:null}
                                value={data.codFuncionario}
                                label="Funcionário"
                                onChange={handleChangeFuncionario}
                                >
                                    {funcionarios.map((element) => {
                                        return (
                                            <MenuItem value={element.Fun_Codigo}>{element.Fun_Codigo} - {element.Fun_Nome}</MenuItem> 
                                        )
                                    })}
                                </Select>
                            </div>
                        :null}
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