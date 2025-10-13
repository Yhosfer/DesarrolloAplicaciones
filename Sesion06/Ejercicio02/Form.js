import React, { Component } from "react";

export default class Form extends Component {
  state = { name: "", job: "" };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  submitForm = () => {
    const { name, job } = this.state;
    if (!name.trim() || !job.trim()) return;
    this.props.onAdd({ name, job });
    this.setState({ name: "", job: "" });
  };
  render() {
    const { name, job } = this.state;
    return (
      <form onSubmit={e => e.preventDefault()} style={{ marginTop: 12 }}>
        <input name="name" value={name} onChange={this.handleChange} placeholder="Nombre" />
        <input name="job" value={job} onChange={this.handleChange} placeholder="Trabajo" />
        <input type="button" value="Agregar" onClick={this.submitForm} />
      </form>
    );
  }
}
