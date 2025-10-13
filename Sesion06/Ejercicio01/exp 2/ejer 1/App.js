import './App.css';

function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return (
    <main>
      <Card title="Componente en DevTools">
        <p>Inspección con pestaña React.</p>
      </Card>
    </main>
  );
}
export default App;
