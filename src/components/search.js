import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Search(props) {
  const { isLoading, invalidInput, submitHandler: fetchPokemon } = props;
  const [pokemonName, setPokemonName] = useState("");

  const changeHandler = (evt) => {
    setPokemonName(evt.target.value.trim());
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    fetchPokemon(pokemonName);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="searchInput">
        <Form.Control
          size="lg"
          type="text"
          disabled={isLoading}
          onChange={changeHandler}
          placeholder="Search by Pokemon Name"
          isInvalid={invalidInput}
        />
      </Form.Group>
    </Form>
  );
}

export default Search;
