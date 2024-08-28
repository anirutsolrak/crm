import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Bem-vindo ao CRM Simples!
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Link to="/contatos">
          <Button variant="contained" color="primary">
            Gerenciar Contatos
          </Button>
        </Link>
        <Link to="/negocios">
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 20 }}
          >
            Gerenciar Negócios
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
