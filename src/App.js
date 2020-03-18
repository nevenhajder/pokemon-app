import React, { useState, useEffect, useReducer } from 'react';
import Search from './components/search';
import PokeCard from './components/pokeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const pokemonReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      pokemon: {
        hp: action.pokeData.stats[5].base_stat,
        name: action.pokeData.name,
        attack: action.pokeData.stats[4].base_stat,
        defense: action.pokeData.stats[3].base_stat
      },
      descriptionText: action.descriptionText,
      imageUrl: action.imageUrl,
      invalidInput: false
    };
  } else if (action.type === 'error') {
    console.log('Error: ', action.error);
    return {
      ...state,
      invalidInput: true
    };
  } else {
    throw new Error('This action type is invalid');
  }
};

function App() {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemon: {
      name: '',
      hp: '',
      attack: '',
      defense: ''
    },
    descriptionText: '',
    imageUrl: '',
    invalidInput: false
  });

  const fetchPokemon = async name => {
    try {
      const pokeData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      ).then(response => response.json());
      const descriptionText = await fetch(pokeData.species.url)
        .then(response => response.json())
        .then(data => {
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
        imageUrl: `https://img.pokemondb.net/artwork/${name}.jpg`
      });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
