import './App.css';

import { HashRouter, Routes, Route, Link } from "react-router-dom";

function Home(){ return <h2>Home</h2>; }
function About(){ return <h2>About</h2>; }

function App(){
  return (
    <HashRouter>
      <nav style={{display:"flex",gap:12,padding:16}}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;