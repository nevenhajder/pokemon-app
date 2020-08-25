import React, { useState, useEffect, useReducer } from 'react';
import Search from './components/search';
import SearchHistory from './components/searchHistory';
import PokeCard from './components/pokeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonReducer from './reducers/PokemonReducer';
import './App.css';


function App() {
  const [state, dispatch] = useReducer(PokemonReducer, {
    pokemon: {
      name: '',
      hp: '',
      attack: '',
      defense: '',
    },
    imageUrl: '',
    isLoading: false,
    invalidInput: false,
    descriptionText: '',
  });

  // Get searchHistory from localStorage
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('pokemonHistory')) || []);

  function removeFromHistory(name) {
    const updatedHistory = searchHistory.filter(existing => name !== existing);
    setSearchHistory(updatedHistory);
  }

  const fetchPokemon = async(name) => {
    try {
      dispatch({ type: 'startSearch', isLoading: true });

      const pokeData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      ).then((response) => response.json());

      const descriptionText = await fetch(pokeData.species.url)
        .then((response) => response.json())
        .then((data) => {
          const description = data.flavor_text_entries.find(
            ({ language, version }) =>
              language.name === 'en' && version.name === 'blue'
          );
          return description.flavor_text;
        });

      dispatch({
        type: 'success',
        pokeData,
        descriptionText,
        imageUrl: `https://img.pokemondb.net/artwork/${name}.jpg`,
      });

      const wasSearched = searchHistory.find(searched => searched === pokeData.name) !== undefined;

      if (!wasSearched) {
        setSearchHistory([pokeData.name, ...searchHistory]);
      }

    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  // Write to localStorage every time the searchHistory changes
  useEffect(() => {
    localStorage.setItem('pokemonHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 3 }}>
          <br />
          <SearchHistory searchHistoryArray={searchHistory} clickHandler={fetchPokemon} removeHandler={removeFromHistory} />
        </Col>
        <Col md={{ span: 6 }}>
          <div className="App">
            <br />
            <Search
              isLoading={state.isLoading}
              submitHandler={fetchPokemon}
              invalidInput={state.invalidInput}
            />
            <br />
            <PokeCard
              pokemon={state.pokemon}
              img={state.imageUrl}
              description={state.descriptionText}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
