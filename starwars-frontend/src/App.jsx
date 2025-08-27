import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/characters")
    .then(res => setCharacters(res.data))
    .catch(error => console.error(error));
  }, []);

  return(
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {characters.map(c => (
          <li key={c.id}>
            <strong>{c.name}</strong> ({c.origin_planet || "Unknown" })
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
