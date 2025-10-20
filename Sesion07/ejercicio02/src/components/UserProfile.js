import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const { isAuthenticated, user } = useContext(UserContext);

  if (!isAuthenticated) {
    return <p className="text-gray-600 mt-4">No has iniciado sesión.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md mt-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">Perfil del Usuario</h2>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Correo:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserProfile;
