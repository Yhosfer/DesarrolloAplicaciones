import './App.css';

import React, { Component } from "react";

class App extends Component {
  state = { characters: [
    { name:"Charlie", job:"Janitor" },
    { name:"Mac",     job:"Bouncer" },
  ]};

  removeCharacter = (index) => {
    this.setState(s => ({ characters: s.characters.filter((_,i)=>i!==index) }));
  };

  render() {
    const { characters } = this.state;
    return (
      <table border="1" cellPadding="6">
        <thead><tr><th>Nombre</th><th>Trabajo</th><th></th></tr></thead>
        <tbody>
          {characters.map((r,i)=>(
            <tr key={i}>
              <td>{r.name}</td><td>{r.job}</td>
              <td><button onClick={()=>this.removeCharacter(i)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default App;
