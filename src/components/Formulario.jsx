import * as React from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid2,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Formulario = ({
    title,
    onSubmit,
    initialValues,
    onClear,
    selectedContato,
    contatos,
    onContatoChange,
    open,
    handleClose,
}) => {
    const [nome, setNome] = React.useState(initialValues?.nome || '');
    const [telefone, setTelefone] = React.useState(initialValues?.telefone || '');
    const [email, setEmail] = React.useState(initialValues?.email || '');
    const [contatoId, setContatoId] = React.useState(
        initialValues?.contatoId !== null ? initialValues?.contatoId : ''
    );

    const [successMessage, setSuccessMessage] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit({ nome, telefone, email, contatoId });
            setSuccessMessage(true);
            setTimeout(() => {
                handleClose();
                setSuccessMessage(false);
                onClear();
            }, 2000);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    };

    return (
        <div className={`modal-container ${open ? 'modal-open' : ''}`}>
            <div className="modal-content">
                <Button variant="contained" color="primary" className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </Button>
                <Typography variant="h5">{title}</Typography>
                <Grid2 container spacing={2} mt={2}>
                    <Grid2 item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="contato-select-label">Contato</InputLabel>
                            <Select
                                labelId="contato-select-label"
                                id="contato-select"
                                value={contatoId}
                                onChange={(e) => setContatoId(e.target.value)}
                            >
                                <MenuItem value={null}>Selecione um contato</MenuItem>
                                {contatos &&
                                    contatos.map((contato) => (
                                        <MenuItem key={contato.id} value={contato.id}>
                                            {contato.nome}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Salvar
                        </Button>
                    </Grid2>
                </Grid2>
                {successMessage && <Typography variant="body1" color="green">Criado com sucesso!</Typography>}
            </div>
        </div>
    );
};

export default Formulario;