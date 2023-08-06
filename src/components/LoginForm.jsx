import { useState } from 'react';//dependencia useState que se sirve para manejar estados dentro del componente funcional.
import PropTypes from 'prop-types';// definir los tipos de las propiedades del componente.

//Se define el componente LoginForm que recibe una propiedad onLogin como argumento. 
//onLogin es una función que se utilizará para manejar el inicio de sesión cuando el formulario sea enviado.
const LoginForm = ({ onLogin }) => {
  //declaramos dos variables nickname y password con valores iniciales vacíos
  //Se utilizan dos hooks useState para crear dos estados en el componente: nickname y password
  //Los estados mantendrán el valor actual del nombre de usuario y la contraseña ingresados en el formulario
  //setNickname y set password sirven para actualizar los valores 
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  //se define las funciones que se utilizarán como manejadores de eventos 
  //para el cambio en los campos de nombre de usuario y contraseña 
  //Estas funciones actualizan los estados nickname y password con el valor del campo de entrada en el evento
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Se define la función handleSubmit, que se utilizará como manejador del evento de envío del formulario. 
  // Al hacer clic en el botón de "Iniciar sesión" se ejecutará esta función handleSubmit
  const handleSubmit = async (e) => {
    //llama al método preventDefault del evento para evitar que el formulario se envíe por defecto y recargue la página.
    e.preventDefault();
    try {
      // Aquí se crea el objeto userData con los valores actuales de los estados nickname, password
      const userData = {
        nickname: nickname,
        password: password,
      };
      // Luego, se llama a la función onLogin pasándole el objeto userData como argumento
      //se utiliza para manejar el inicio de sesión.
      onLogin(userData);
      // Limpia los campos del formulario después del inicio de sesión exitoso
      setNickname('');
      setPassword('');
      
    } catch (error) {
      // Manejar errores aquí si la autenticación falla
      console.error('Error de autenticación:', error);
    }
  }

  return (
    //devuelve el JSX del formulario de inicio de sesión, que contiene dos campos de entrada 
    //para el nombre de usuario y la contraseña, y un botón para enviar el formulario.
    <form onSubmit={handleSubmit} className="w-64 mx-auto mt-4 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="nickname" className="block text-gray-700 font-bold mb-2">
          Nombre de usuario:
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
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
        Iniciar sesión
      </button>
    </form>
  );
};

//Se definen las propiedades requeridas para el componente LoginForm
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;