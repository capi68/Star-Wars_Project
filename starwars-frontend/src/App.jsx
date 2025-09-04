import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/characters")
    .then(res => setCharacters(res.data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
        Star Wars Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {characters.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 rounded-2xl shadow-lg p-5 text-center text-white hover:scale-105 transition-transform"
          >
            {/* Contenedor de imagen con tamaño fijo */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-black">
              <img
                src={`/images/${c.id}.jpg`}
                alt={c.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/images/placeolder.jpg")}
              />
            </div>

            <h3 className="text-xl font-bold text-yellow-400 mt-3">{c.name}</h3>
            <p className="text-sm">{c.origin_planet || "Unknown"}</p>
            <p className="text-sm text-gray-400">{c.birth_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
