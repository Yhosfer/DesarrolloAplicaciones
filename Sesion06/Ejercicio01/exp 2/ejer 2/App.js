import './App.css';

function App() {
  const nombre = "Estudiante";
  return (
    <main className="container">
      <h1>Hola, {nombre}</h1>
      <img alt="logo" src="https://via.placeholder.com/64" />
      <br />
      <p className="nota">JSX usa className, llaves y etiquetas, que es? no se.</p>
    </main>
  );
}
export default App;
