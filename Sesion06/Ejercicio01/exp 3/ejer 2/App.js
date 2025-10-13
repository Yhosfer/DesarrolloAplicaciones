import './App.css';

import Table from "./Table";

function App() {
  const characters = [
    { name: "Dee",    job: "master" },
    { name: "Dennis", job: "zapatote" },
  ];
  return (
    <main>
      <h3>Total: {characters.length}</h3>
      <Table data={characters} />
    </main>
  );
}
export default App;
A