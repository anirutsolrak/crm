import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import Contato from '../components/Contato';
import Formulario from '../components/Formulario';
import axios from 'axios'; // Importe o Axios

const Contatos = () => {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const response = await axios.get(
                    'https://api-alura-flix-9ie6ii7ii-anirutsolraks-projects.vercel.app/contatos'
                );
                setContatos(response.data);
            } catch (error) {
                console.error('Erro ao buscar contatos:', error);
            }
        };
        fetchContatos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://api-alura-flix-9ie6ii7ii-anirutsolraks-projects.vercel.app/contatos/${id}`
            );
            setContatos(contatos.filter((contato) => contato.id !== id));
        } catch (error) {
            console.error('Erro ao excluir contato:', error);
        }
    };

    const handleEdit = async (contato) => {
        try {
            await axios.put(
                `https://api-alura-flix-9ie6ii7ii-anirutsolraks-projects.vercel.app/contatos/${contato.id}`,
                contato
            );
            const updatedContatos = contatos.map((c) =>
                c.id === contato.id ? contato : c
            );
            setContatos(updatedContatos);
        } catch (error) {
            console.error('Erro ao editar contato:', error);
        }
    };

    const handleAddContato = async (newContato) => {
        try {
            const response = await axios.post(
                'https://api-alura-flix-9ie6ii7ii-anirutsolraks-projects.vercel.app/contatos',
                newContato
            );
            setContatos([...contatos, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar contato:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Contatos
            </Typography>
            <Formulario
                title="Novo Contato"
                onSubmit={handleAddContato}
                onClear={() => {
                    // Limpar o formulário
                }}
                initialValues={{
                    nome: '',
                    telefone: '',
                    email: '',
                    contatoId: null,
                }}
                contatos={contatos} // Passando a prop contatos
            />
            <List>
                {contatos.map((contato) => (
                    <Contato
                        key={contato.id}
                        contato={contato}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </List>
        </div>
    );
};

export default Contatos;