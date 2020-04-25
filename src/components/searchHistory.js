import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function searchHistory(props) {
  const { searchHistoryArray } = props;

  return (
    <ListGroup>
      {searchHistoryArray.map((searchItem, index) => (
        <ListGroup.Item key={index} action onClick={() => props.clickHandler(searchItem)}>{searchItem}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
