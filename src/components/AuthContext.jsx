import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import  Cookies from 'js-cookie';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Función para comprobar la sesión del usuario al cargar la aplicación
  const checkSession = async () => {
    // Leer los datos del usuario desde la cookie
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
        // Desempaquetar la cookie y convertir la cadena de texto en un objeto JavaScript
        const userObject = JSON.parse(userFromCookie);
        setIsLoggedIn(true);
        setUser(userObject);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // useEffect para comprobar la sesión del usuario al cargar la aplicación
  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8083/api/v2/userAccess', {
        emailOrNickname: userData.nickname,
        password: userData.password,
      });
      // Verificar que la respuesta contiene los datos del usuario
      if (response.data) {
        // Lógica para autenticar al usuario, y si es exitoso:
        setIsLoggedIn(true);
        setUser(response.data);

        // Convertir el objeto userData a una cadena de texto JSON
        const userDataJson = JSON.stringify(response.data);
        // Guardar la cadena de texto JSON en la cookie
        Cookies.set('user', userDataJson);
      } else {
        // Manejar el caso en que la autenticación falla
        console.error('Error de autenticación:', response.data);
      }
    } catch (error) {
      // Manejar errores aquí si la autenticación falla
      console.error('Error de autenticación:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // Eliminar la cookie al cerrar sesión
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
