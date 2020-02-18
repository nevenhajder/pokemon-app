import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function card(props) {
  return (
    <article className="card__wrapper">
      <div className="card">
        <div className="card__front">
          <Image src={props.img} alt={props.pokemon.name} fluid />
        </div>
        <Card bg="dark" text="white" className="card__back">
          <Card.Header style={{ textTransform: 'capitalize' }}>
            {props.pokemon.name}
          </Card.Header>
          <Card.Body>
            <ListGroup
              horizontal
              style={{ textAlign: 'center', width: '100%' }}
            >
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                HP <br />
                {props.pokemon.hp}
              </ListGroup.Item>
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                ATK <br />
                {props.pokemon.attack}
              </ListGroup.Item>
              <ListGroup.Item variant="dark" style={{ flex: 1 }}>
                DEF <br />
                {props.pokemon.defense}
              </ListGroup.Item>
            </ListGroup>
            <Card.Text>
              <br />
              {props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </article>
  );
}

export default card;
