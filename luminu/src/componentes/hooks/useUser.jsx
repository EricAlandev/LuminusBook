// UserContext.jsx
import { createContext, useContext,  useState, useEffect } from "react";

const UserContext = createContext(); //Componente pai que terá o contexto global


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const tokenData = localStorage.getItem("token");

    if (userData) setUser(JSON.parse(userData));
    if (tokenData) setToken(tokenData);
  }, []);

  const login = (userData, tokenData) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
  };
  
  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };
  
  /*Aqui, Eu uso o UserContext que é o createContext e provido os valores que serão globais para o children usar. Que no caso, é o user, token, logout. E o children eu vou por no main.jsx. Pois, assim a aplicação inteira podera ter os dados globais.*/

  /*Curiosidade, toto componente que recebe childre, vira componente e não mais rook. Impedindo assim, de se puxar o valor direto. */
  return (

    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

