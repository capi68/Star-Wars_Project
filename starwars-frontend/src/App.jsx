import { useState, useEffect } from 'react'
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // calls all characters in the database
  useEffect(() => {
    setLoading(true);

    axios
    .get(`${import.meta.env.VITE_API_URL}/characters`)
    .then(res => {
      setTimeout(() => {
        setCharacters(res.data);
        setLoading(false);
      }, 2000);
      
  })
    .catch(error => {
      console.error(error);
      setLoading(false);
  });
  }, []);


  // function to search for character by attribute
  const filteredCharacters = characters.filter((c) => {
    const term = search.toLocaleLowerCase();
    return (
      c.name.toLocaleLowerCase().includes(term) || 
      (c.origin_planet && c.origin_planet.toLocaleLowerCase().includes(term)) || 
      (c.movies && c.movies.toLocaleLowerCase().includes(term))
    );    
  });



  return (
    <>

    {/* Background Image */}
    <img 
      src="/images/Background_Image.jpeg"  
      alt="Background image" 
      className='fixed inset-0 w-full h-full object-cover -z-10' 
    />


    {/* Div Container */ }
    <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6 py-10">
      <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-yellow-400 text-center mb-8">
        Star Wars Characters
      </h1>

      { /* Search Input */ }
      <input 
        type="text"
        placeholder='Buscar por nombre, planeta o pelicula'
        value={search}
        onChange={(e) => { setSearch(e.target.value)}}
        className='mb-6 p-2  border border-gray-400 rounded-md w-80 text-black'
      />

      {/* Grid Characters cards */}

      <div className="grid place-items-center grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl  mx-auto">
        {filteredCharacters.map((c) => (

          //card generated for each character
          <div
            key={c.id}
            className="w-48 bg-gray-800 rounded-2xl shadow-lg p-5 text-center text-white hover:scale-105 transition-transform cursor-pointer "
            onClick={() => setSelectedCharacter(c)}
            >

            {/* Image container*/}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-black">
              <img
                src={`/images/${c.id}.jpg`}
                alt={c.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/images/placeolder.jpg")}
              />
            </div>

            <h3 className="text-xl font-bold text-yellow-400 mt-3">{c.name}</h3>
          </div>
        ))}
      </div>
    </div>

    { /* modal */}
    <AnimatePresence>
    {selectedCharacter && (
      <motion.div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
           onClick={() => setSelectedCharacter(null)}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.4 }}
      >
        <motion.div className='bg-gray-900 rounded-2xl shadow-xl p-6 w-96 text-white relative transform transition-all'
             onClick={(e) => e.stopPropagation()} //Prevents it from closing if we click inside the card
             initial={{ scale: 0.6, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.6, opacity: 0 }}
             transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5
             }}
        >
          { /* Button "X" */ }
          
          <button className='absolute top-2 right-2 text-gray-400 hover:text-white text-xl'
                  onClick={() => setSelectedCharacter(null)}
          > 
            X
          </button>

          {/* Character Image */}
            <div className="w-32 h-32 mx-auto bg-black rounded-full overflow-hidden">
              <img
                src={`/images/${selectedCharacter.id}.jpg`}
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
              />
            </div>

             {/* Character Info */}
            <h2 className="text-2xl font-bold text-yellow-400 mt-4">{selectedCharacter.name}</h2>
            <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
            <p><strong>Birth Year:</strong> {selectedCharacter.birth_year}</p>
            <p><strong>Planet:</strong> {selectedCharacter.origin_planet}</p>
            <p><strong>Movies:</strong> {selectedCharacter.movies}</p>
          </motion.div>
        </motion.div>
    )}
    </AnimatePresence>

    {/* overlay loading */ }
    {loading && (
    <div className='fixed inset-0 bgblack/70 flex flex-col items-center justify-center z-50'>
      <img 
        src="images/Loading-image.gif" alt="Cargando data..."
        className='w-20 h-20 mb-4'
      />
      <p className='text-red-500 text-lg font-semibold'>Cargando personajes...</p>
    </div>
    )}
    </>
  );
}

export default App
