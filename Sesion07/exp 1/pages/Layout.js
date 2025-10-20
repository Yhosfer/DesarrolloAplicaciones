import { Link, Outlet } from 'react-router-dom';
const Layout = () => {
 return (
 <>
 <header style={{ padding: '1rem', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
 <nav>
 <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none'
}}>Inicio</Link>
 <Link to="/cursos" style={{ textDecoration: 'none' }}>Cursos</Link>
 </nav>
 </header>

 <main style={{ padding: '1rem', minHeight: '80vh' }}>
 <Outlet />
 </main>

 <footer style={{ padding: '1rem', background: '#f0f0f0', borderTop: '1px solid #ccc', textAlign: 'center' }}>
 <p>© 2025 Mi Universidad - Montesinos el creador de la vida</p>
 </footer>
 </>
 );
};
export default Layout;
