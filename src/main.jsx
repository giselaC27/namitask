import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import Modal from 'react-modal';

// Define el elemento raíz de tu aplicación
Modal.setAppElement('#root'); // Asegúrate de que '#root' sea el selector del elemento raíz de tu aplicación

// 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* envuelve el componente App por lo que puedes acceder a todos los valore y
    funciones del authContext  */}
    <AuthProvider>
      <App /> {/*  lógica y la estructura de la aplicación.  */}
    </AuthProvider>
  </React.StrictMode>
);
{/*   enlazas y renderizar la aplicación en el navegador para que los componente creado 
se vuelvan visibles   */}