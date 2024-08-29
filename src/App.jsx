import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contatos from './pages/Contatos';
import Negocios from './pages/Negocios';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contatos" element={<Contatos />} />
                    <Route path="/negocios" element={<Negocios />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;