import * as React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Contato = ({ contato, onEdit, onDelete }) => {
    const [open, setOpen] = React.useState(false);
    const [nome, setNome] = React.useState(contato.nome);
    const [telefone, setTelefone] = React.useState(contato.telefone);
    const [email, setEmail] = React.useState(contato.email);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        onEdit({ ...contato, nome, telefone, email });
        handleClose();
    };

    return (
        <div>
            <ListItem button onClick={handleOpen}>
                <ListItemAvatar>
                    <Avatar>
                        {contato.nome.charAt(0).toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant="subtitle1">{contato.nome}</Typography>}
                    secondary={
                        <>
                            <Typography variant="body2" color="textSecondary">
                                {contato.telefone}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {contato.email}
                            </Typography>
                        </>
                    }
                />
                <Tooltip title="Editar">
                    <IconButton onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton onClick={() => onDelete(contato.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Contato</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edite as informações do contato:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="telefone"
                        label="Telefone"
                        type="text"
                        fullWidth
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Contato;