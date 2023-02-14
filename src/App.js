
import './App.css';
import { useState, useEffect } from "react";



export default function App() {



  const firstPokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
  const [count, setCount] = useState(11);
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true)
  const nexturl = `https://pokeapi.co/api/v2/pokemon/${count}/`;
  const firstLoad = [];
  let firstClick = true;


  const handeClick = () => {
    if (firstClick) {
      firstClick = false;
      pushToArray()
      loadMorePokemon()
      setCount(count + 1);
      
    } else {
      loadMorePokemon()
      setCount(count + 1);
    }
  };

  function pushToArray() {
    data.forEach(pokemon => {
      firstLoad.push(pokemon)
    })
    setData(firstLoad);
  }

  async function loadMorePokemon() {
    const nextPokemonUrl = await fetch(nexturl);
    const json = await nextPokemonUrl.json();
    firstLoad.push({ name: json.name });
  }



  useEffect(() => {
    setBusy(false);
    const fetchData = async () => {
      const response = await fetch(firstPokemonUrl);
      const json = await response.json();
      setData(json.results);
    }
    fetchData()
  }, [])



  const PokemonList = () => {
    return (
      <ul>
        {data.map((pokemon, index) => {
          return <li key={index}>{pokemon.name}</li>
        })}
      </ul>
    );
  }


  return (
    <div>
      {isBusy ? (
        <h1>Nichts geladen</h1>
      ) : (
        <div>
          <PokemonList />
          <button onClick={handeClick}>Load More</button>
        </div>
      )
      }
    </div>
  )


}
