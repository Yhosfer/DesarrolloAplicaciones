import './App.css';

import React, { Component } from "react";

class Form extends Component {
  state = { name:"", job:"" };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  submitForm = () => {
    const { name, job } = this.state;
    if (!name.trim() || !job.trim()) return;
    this.props.onAdd({ name, job });
    this.setState({ name:"", job:"" });
  };
  render(){
    const { name, job } = this.state;
    return (
      <form onSubmit={e=>e.preventDefault()}>
        <input name="name" value={name} onChange={this.handleChange} placeholder="Nombre"/>
        <input name="job"  value={job}  onChange={this.handleChange} placeholder="Trabajo"/>
        <input type="button" value="Agregar" onClick={this.submitForm}/>
      </form>
    );
  }
}

class App extends Component {
  state = { characters: [] };
  onAdd = (character) => this.setState(s=>({ characters:[...s.characters, character]}));
  render(){
    return (
      <main>
        <Form onAdd={this.onAdd}/>
        <ul>{this.state.characters.map((c,i)=><li key={i}>{c.name} — {c.job}</li>)}</ul>
      </main>
    );
  }
}
export default App;
