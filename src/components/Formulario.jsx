import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const Formulario = ({
  title,
  onSubmit,
  initialValues, // props para valores iniciais
  onClear,
  selectedContato,
  contatos,
  onContatoChange,
}) => {
  const [nome, setNome] = React.useState(initialValues?.nome || '');
  const [telefone, setTelefone] = React.useState(initialValues?.telefone || '');
  const [email, setEmail] = React.useState(initialValues?.email || '');
  const [contatoId, setContatoId] = React.useState(
    initialValues?.contatoId !== null ? initialValues?.contatoId : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, telefone, email, contatoId });
    onClear();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">{title}</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Formulario;
