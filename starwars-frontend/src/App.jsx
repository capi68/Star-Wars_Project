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
    <>
    <div style={{display: "flex", justifyContent: "center", width: "100vw", flexDirection: "column", border: "1px solid black"}}>
      <h1 style={{justifyContent: "center", border: "1px solid black", margin: "20px auto" }}>Star Wars Characters</h1>

      {characters.map((c) => (
      <div className='bg-gray-900 rounded-xl shadow-lg p-4 text-center text-white hover:scale-105 transition-transform'>
          <img 
            src={`/images/${c.id}.jpg`} 
            alt={c.name}
            className='w-32 h-64 object-cover rounded-lg mb-4'
            onError={(e) => (e.target.src = "/images/placeolder.jpg")} 
          />

      <h3 className='text-xl font-bold text-yellow-400'>{c.name}</h3>
      <p className='text-sm'>{c.origin_planet || "Unknow" }</p>
      <p className='text-sm text-gray-400'>{c.birth_year}</p>

      </div>
      ))}
    </div>
    </>
  );
}

export default App
