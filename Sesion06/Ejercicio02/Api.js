import React, { Component } from "react";

export default class Api extends Component {
  state = { data: [] };

  componentDidMount() {
    const url = "https://wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*"
                .replace("wikipedia.org", "en.wikipedia.org");
    fetch(url)
      .then(r => r.json())
      .then(data => this.setState({ data }))
      .catch(console.error);
  }

  render() {
    const [term, titles = [], desc = [], links = []] = this.state.data;
    return (
      <main style={{ padding: 16 }}>
        <h2>Datos de Wikipedia: {term || "…"}</h2>
        <ul>
          {titles.map((t, i) => (
            <li key={i}>
              <a href={links[i]} target="_blank" rel="noreferrer">{t}</a>
              {desc[i] ? ` — ${desc[i]}` : ""}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}
