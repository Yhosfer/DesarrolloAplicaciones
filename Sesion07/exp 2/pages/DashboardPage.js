import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate('/login');
    });
  };

  return (
    <div>
      <h3>Bienvenido al Panel de Administración</h3>
      <p>Esta es una ruta protegida.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}
