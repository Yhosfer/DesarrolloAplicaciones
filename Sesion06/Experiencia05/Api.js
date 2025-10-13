import React, { Component } from "react";

export default class App extends Component {        // la guía usa "App" aquí
  state = { data: [] };

  componentDidMount() {
    const url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=dragon+ball&format=json&origin=*";
    fetch(url)
      .then((r) => r.json())
      .then((result) => this.setState({ data: result }));
  }

  render() {
    const { data } = this.state;
    return (
      <ul>
        {data.map((entry, i) => <li key={i}>{String(entry)}</li>)}
      </ul>
    );
  }
}
