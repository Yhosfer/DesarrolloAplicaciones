import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

class App extends Component {
  state = {
    characters: [
      { name: "Charlie", job: "Janitor" },
      { name: "Mac",     job: "Bouncer" },
      { name: "Dee",     job: "Aspiring actress" },
      { name: "Dennis",  job: "Bartender" },
    ],
  };

  removeCharacter = (index) => {
    const characters = this.state.characters.filter((_, i) => i !== index);
    this.setState({ characters });
  };

  handleSubmit = (character) => {
    this.setState({
      characters: [...this.state.characters, character],
    });
  };

  render() {
    const { characters } = this.state;

    return (
      <main style={{ padding: 16 }}>
        <h1>Experiencia 04: Estado y Formularios</h1>

        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />

        <h2>Agregar nuevo</h2>
        <Form handleSubmit={this.handleSubmit} />
      </main>
    );
  }
}

export default App;
