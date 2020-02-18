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
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        const stats = response.data.stats;
        setPokemon({
          name: response.data.name,
          hp: stats[5].base_stat,
          attack: stats[4].base_stat,
          defense: stats[3].base_stat
        });

        return response;
      })
      .then(response => {
        axios.get(response.data.species.url).then(response => {
          const flavor_text = response.data.flavor_text_entries.find(
            ({ language, version }) =>
              language.name === 'en' && version.name === 'blue'
          ).flavor_text;
          setDescription(flavor_text);
        });
        setImageUrl(`https://img.pokemondb.net/artwork/${name}.jpg`);
        setInvalidInput(false);
      })
      .catch(error => {
        console.log(error);
        setInvalidInput(true);
      });
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
