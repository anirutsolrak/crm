import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import Negocio from '../components/Negocio';
import Formulario from '../components/Formulario';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Negocios = () => {
    const [negocios, setNegocios] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchNegocios = async () => {
            try {
                const response = await axios.get(
                    'https://api-alura-flix-ten.vercel.app/negocios'
                );
                setNegocios(response.data);
            } catch (error) {
                console.error('Erro ao buscar negócios:', error);
            }
        };
        fetchNegocios();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://api-alura-flix-ten.vercel.app/negocios/${id}`
            );
            setNegocios(negocios.filter((negocio) => negocio.id !== id));
        } catch (error) {
            console.error('Erro ao excluir negócio:', error);
        }
    };

    const handleEdit = async (negocio) => {
        try {
            await axios.put(
                `https://api-alura-flix-ten.vercel.app/negocios/${negocio.id}`,
                negocio
            );
            const updatedNegocios = negocios.map((n) =>
                n.id === negocio.id ? negocio : n
            );
            setNegocios(updatedNegocios);
        } catch (error) {
            console.error('Erro ao editar negócio:', error);
        }
    };

    const handleAddNegocio = async (newNegocio) => {
        try {
            const response = await axios.post(
                'https://api-alura-flix-ten.vercel.app/negocios',
                newNegocio
            );
            setNegocios([...negocios, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar negócio:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Negócios
            </Typography>
            <Formulario
                title="Nova Empresa"
                onSubmit={handleAddNegocio}
                onClear={() => {
                    // Limpar o formulário
                }}
                initialValues={{
                    nome: '',
                    telefone: '',
                    email: '',
                    contatoId: null,
                }}
                open={open}
                handleClose={handleClose}
            />
            <Button variant="contained" color="primary" className="new-negocio-button" onClick={handleOpen}>
                <AddCircleIcon />
                Nova Empresa
            </Button>
            <List>
                {negocios.map((negocio) => (
                    <Negocio
                        key={negocio.id}
                        negocio={negocio}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </List>
        </div>
    );
};

export default Negocios;