import React, { useState, useEffect } from 'react';
import Search from './components/search';
import Card from './components/card';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: ''
  });

  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);

  const fetchPokemon = name => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      return response.json();
    }).then(data => {
      // Set name and stats
      setPokemon({
        name: data.name,
        hp: data.stats[5].base_stat,
        attack: data.stats[4].base_stat,
        defense: data.stats[3].base_stat
      });
      // Get description data
      return fetch(data.species.url);
    }).then(response => {
      return response.json();
    }).then(data => {
      // Set the description
      const flavor_text = data.flavor_text_entries.find(
        ({ language, version }) => language.name === 'en' && version.name === 'blue'
      ).flavor_text;
      setDescription(flavor_text);
      setInvalidInput(false);
    }).catch(error => {
      console.log(error);
      setInvalidInput(true);
    });

    setImageUrl(`https://img.pokemondb.net/artwork/${name}.jpg`);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="App">
            <br />
            <Search changeHandler={fetchPokemon} invalidInput={invalidInput} />
            <br />
            <Card pokemon={pokemon} img={imageUrl} description={description} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
