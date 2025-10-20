import { Link } from 'react-router-dom';
export const CoursesPage = () => (
  <>
    <h2>Cursos</h2>
    <ul>
      <li><Link to="/cursos/react">React</Link></li>
      <li><Link to="/cursos/nodejs">Node.js</Link></li>
      <li><Link to="/cursos/sql">SQL</Link></li>
    </ul>
  </>
);
