import './App.css';

import { useEffect, useState } from "react";
 function App(){
  const [data,setData] = useState([]);
  useEffect(()=>{
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=5";
    fetch(url).then(r=>r.json()).then(setData).catch(console.error);
  },[]);
  return <ul>{data.map(p=><li key={p.id}>{p.title}</li>)}</ul>;
}

export default App;