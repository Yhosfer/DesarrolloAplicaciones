import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(UserContext);

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-lg font-bold">Gestor de Sesión</h1>
      {isAuthenticated ? (
        <div>
          <span className="mr-4">Hola, {user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <Login />
      )}
    </header>
  );
};

export default Header;
