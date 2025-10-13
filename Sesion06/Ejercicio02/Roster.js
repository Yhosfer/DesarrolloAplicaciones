import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

export default class Roster extends Component {
  state = {
    characters: [
      { name: "Charlie", job: "Janitor" },
      { name: "Mac",     job: "Bouncer" },
    ],
  };

  removeCharacter = (index) =>
    this.setState(s => ({ characters: s.characters.filter((_, i) => i !== index) }));

  addCharacter = (c) =>
    this.setState(s => ({ characters: [...s.characters, c] }));

  render() {
    const { characters } = this.state;
    return (
      <main style={{ padding: 16 }}>
        <h2>Lista (Estado + Formulario)</h2>
        <p>Total: {characters.length}</p>
        <Table data={characters} onDelete={this.removeCharacter} />
        <Form onAdd={this.addCharacter} />
      </main>
    );
  }
}
