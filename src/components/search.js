import React from 'react';
import Form from 'react-bootstrap/Form';

function search(props) {
  let delayedFunc = null;

  const changeHandler = pokemonName => {
    clearTimeout(delayedFunc);
    delayedFunc = setTimeout(() => {
      const safePokemonName = pokemonName.trim().toLowerCase();
      props.changeHandler(safePokemonName);
    }, 500);
  };

  return (
    <Form>
      <Form.Group controlId="searchInput">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search by Pokemon Name"
          onChange={ev => changeHandler(ev.target.value)}
          isInvalid={props.invalidInput}
        />
      </Form.Group>
    </Form>
  );
}

export default search;
