import React, { useState, useReducer } from 'react';
import Search from './components/search';
import SearchHistory from './components/searchHistory';
import PokeCard from './components/pokeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonReducer from './reducers/PokemonReducer';
import './App.css';

function getSearchHistory() {
  return JSON.parse(localStorage.getItem('pokemonHistory')) || [];
}

function setSearchHistory(newHistory = '') {
  localStorage.setItem('pokemonHistory', JSON.stringify(newHistory));
}

function App() {
  const [state, dispatch] = useReducer(PokemonReducer, {
    pokemon: {
      name: '',
      hp: '',
      attack: '',
      defense: '',
    },
    imageUrl: '',
    invalidInput: false,
    descriptionText: '',
  });
  const [searchList, setSearchList] = useState(getSearchHistory);

  const fetchPokemon = async (name) => {
    try {
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

      const previousSearchHistory = getSearchHistory();
      const wasSearched = previousSearchHistory.find(searched => searched === pokeData.name) !== undefined;

      if (!wasSearched) {
        const updateSearchHistory = [pokeData.name, ...getSearchHistory()];
        setSearchHistory(updateSearchHistory);
        setSearchList(updateSearchHistory);
      }

    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 3 }}>
          <br />
          <SearchHistory searchHistoryArray={searchList} clickHandler={fetchPokemon} />
        </Col>
        <Col md={{ span: 6 }}>
          <div className="App">
            <br />
            <Search
              changeHandler={fetchPokemon}
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
