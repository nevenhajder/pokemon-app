import React, { useReducer } from "react";
import Search from "./components/search";
import SearchHistory from "./components/searchHistory";
import PokeCard from "./components/pokeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonReducer, { actionTypes } from "./reducers/PokemonReducer";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [cache, setCache] = React.useState({});
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "pokemonHistory",
    []
  );

  const [
    { pokemon, imageUrl, isLoading, invalidInput, descriptionText },
    dispatch,
  ] = useReducer(PokemonReducer, {
    pokemon: {
      name: "",
      hp: "",
      attack: "",
      defense: "",
    },
    imageUrl: "",
    isLoading: false,
    invalidInput: false,
    descriptionText: "",
  });

  function removeFromHistory(name) {
    const updatedHistory = searchHistory.filter(
      (existing) => name !== existing
    );
    setSearchHistory(updatedHistory);
  }

  const fetchPokemon = async (rawName) => {
    const name = rawName.toLowerCase();

    // Check for pokemon in cache
    if (cache[name]) {
      return dispatch({
        type: actionTypes.success,
        ...cache[name],
      });
    }

    try {
      dispatch({ type: actionTypes.startSearch, isLoading: true });

      const pokeResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (pokeResponse.status === 404) {
        throw new Error(`Couldn't find the Pokémon "${name}"`);
      }

      const pokeData = await pokeResponse.json();

      const descriptionResponse = await fetch(pokeData.species.url);
      const descriptionData = await descriptionResponse.json();
      const descriptionText = descriptionData.flavor_text_entries.find(
        ({ language, version }) =>
          language.name === "en" && version.name === "blue"
      ).flavor_text;

      const collectedData = {
        pokeData,
        descriptionText,
        imageUrl: `https://img.pokemondb.net/artwork/${name}.jpg`,
      };

      dispatch({
        type: actionTypes.success,
        ...collectedData,
      });

      // Store result in cache
      setCache((prevCache) => ({
        ...prevCache,
        [name]: { ...collectedData },
      }));

      // Add to search history
      const wasSearched =
        searchHistory.find((searched) => searched === pokeData.name) !==
        undefined;
      if (!wasSearched) {
        setSearchHistory([pokeData.name, ...searchHistory]);
      }
    } catch (error) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 4 }}>
          <br />
          <SearchHistory
            searchHistoryArray={searchHistory}
            clickHandler={fetchPokemon}
            removeHandler={removeFromHistory}
          />
        </Col>
        <Col md={{ span: 8 }}>
          <div className="App">
            <br />
            <Search
              isLoading={isLoading}
              submitHandler={fetchPokemon}
              invalidInput={invalidInput}
            />
            <br />
            <PokeCard
              pokemon={pokemon}
              img={imageUrl}
              description={descriptionText}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
