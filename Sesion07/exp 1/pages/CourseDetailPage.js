import { useParams, Link } from 'react-router-dom';
export const CourseDetailPage = () => {
  const { courseId } = useParams();
  return (
    <>
      <h3>Curso: {courseId}</h3>
      <Link to="/cursos">Volver</Link>
    </>
  );
};
