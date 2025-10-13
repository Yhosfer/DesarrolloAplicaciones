import React, { Component } from "react";

class Form extends Component {
  initialState = { name: "", job: "" };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = () => {
    const { name, job } = this.state;
    if (!name.trim() || !job.trim()) return; 

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { name, job } = this.state;

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block" }}>Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Ej: Mr Louis"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block" }}>Trabajo</label>
          <input
            type="text"
            name="job"
            value={job}
            onChange={this.handleChange}
            placeholder="Ej: Teacher"
          />
        </div>

        <input type="button" value="Agregar" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;