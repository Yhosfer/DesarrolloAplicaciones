import React, { Component } from "react";

export default class Api extends Component {
  state = { data: [] };
  componentDidMount(){
    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Ben+10&format=json&origin=*";
    fetch(url).then(r=>r.json()).then(data=>this.setState({data})).catch(console.error);
  }
  render(){
    const [term, titles=[], desc=[], links=[]] = this.state.data;
    return (
      <section>
        <h2>API: {term || "Wikipedia"}</h2>
        <ul>
          {titles.map((t,i)=>(<li key={i}>
            <a href={links[i]} target="_blank" rel="noreferrer">{t}</a>
            {desc[i] ? ` — ${desc[i]}` : ""}
          </li>))}
        </ul>
      </section>
    );
  }
}
