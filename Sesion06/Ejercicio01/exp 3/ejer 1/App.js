import './App.css';

import Table from "./Table";
function App() {
  const characters = [
    { name: "Charlie", job: "Janitor" },
    { name: "Mac",     job: "Bouncer" },
  ];
  return <Table data={characters} />;
}
export default App;
