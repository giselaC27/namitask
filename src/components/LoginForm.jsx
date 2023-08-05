import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí se crea el objeto userData con los valores actuales de los estados
      const userData = {
        nickname: nickname,
        password: password,
      };
      // Luego, se llama a la función onLogin pasándole el objeto userData como argumento
      onLogin(userData);
      // Limpia los campos del formulario después del inicio de sesión
      setNickname('');
      setPassword('');
      
    } catch (error) {
      // Manejar errores aquí si la autenticación falla
      console.error('Error de autenticación:', error);
    }
  }

  return (
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

export default LoginForm;