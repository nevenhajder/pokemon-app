import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function card(props) {
  const {
    img,
    pokemon,
    description
  } = props;

  return (
    <article className="pokeCard__wrapper">
      <div className="pokeCard">
        <div className="pokeCard__front">
          <Image src={img} alt={pokemon.name} fluid />
        </div>
        <Card bg="dark" text="white" className="pokeCard__back">
          <Card.Header style={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Card.Header>
          <Card.Body>
            <ListGroup
              horizontal
              style={{ textAlign: 'center', width: '100%' }}
            >
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                HP <br />
                {pokemon.hp}
              </ListGroup.Item>
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                ATK <br />
                {pokemon.attack}
              </ListGroup.Item>
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                DEF <br />
                {pokemon.defense}
              </ListGroup.Item>
            </ListGroup>
            <Card.Text>
              <br />
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </article>
  );
}

export default card;
