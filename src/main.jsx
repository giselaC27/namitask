import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import Modal from 'react-modal';

// Define el elemento raíz de tu aplicación
Modal.setAppElement('#root'); // Asegúrate de que '#root' sea el selector del elemento raíz de tu aplicación


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);