import { useState } from 'react';
import axios from 'axios';
import CustomModal from './CustomModal';

const RegistrationForm = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState(''); // Estado para el mensaje

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/api/v2/user/', {
        firstName,
        lastName,
        nickName,
        email,
        password,
      });
  
      if (response.status === 200) {
        // Registro exitoso, puedes asumir que el usuario fue registrado correctamente.
        // Puedes llamar a onRegister si necesitas realizar alguna acción adicional.
  
        // Resto del código para limpiar los campos del formulario, etc.
        setFirstName('');
        setLastName('');
        setNickName('');
        setEmail('');
        setPassword('');
  
        // Opcional: Mostrar algún mensaje al usuario para indicar que el registro fue exitoso.
        setMessage('Registro exitoso. ¡Bienvenido!');
        setModalIsOpen(true);
      } else {
        // Hubo un error en el registro, muestra un mensaje de error.
       
        // Opcional: Mostrar algún mensaje al usuario para indicar que el registro falló.
        setMessage('Error al registrar. Por favor, inténtalo nuevamente.');
        setModalIsOpen(true);
      }
    } catch (error) {
      // Manejar errores aquí si el registro falla
      
      // Opcional: Mostrar algún mensaje al usuario para indicar que el registro falló.
      setMessage('Error al registrar. Por favor, inténtalo nuevamente.');
      setModalIsOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-64 mx-auto mt-4 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
          Nombre:
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
          Apellido:
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nickName" className="block text-gray-700 font-bold mb-2">
          Nickname:
        </label>
        <input
          type="text"
          id="nickName"
          value={nickName}
          onChange={handleNickNameChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Registrarse
      </button>
      <CustomModal isOpen={modalIsOpen} closeModal={closeModal} message={message} />
    </form>
  );
};

export default RegistrationForm;