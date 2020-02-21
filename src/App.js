import React, { useState, useEffect } from 'react';
import Search from './components/search';
import PokeCard from './components/pokeCard';
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

  const fetchPokemon = async (name) => {
    try {
      const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json());
      const descriptionText = await fetch(pokeData.species.url)
        .then(response => response.json())
        .then(data => {
          const description = data.flavor_text_entries.find(({language, version}) => language.name === 'en' && version.name === 'blue');
          return description.flavor_text;
        });

      setPokemon({
        hp: pokeData.stats[5].base_stat,
        name: pokeData.name,
        attack: pokeData.stats[4].base_stat,
        defense: pokeData.stats[3].base_stat
      });

      setDescription(descriptionText);
      invalidInput && setInvalidInput(false);
    } catch(error) {
      console.log(error);
      setInvalidInput(true);
    }

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
            <PokeCard pokemon={pokemon} img={imageUrl} description={description} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
