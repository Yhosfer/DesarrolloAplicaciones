import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);

  const handleLogin = () => {
    const dummyUser = {
      name: "Yhosfer_Quispe",
      email: "YhosferQuispe@gmail.com",
    };
    login(dummyUser);
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Iniciar Sesión
    </button>
  );
};

export default Login;
