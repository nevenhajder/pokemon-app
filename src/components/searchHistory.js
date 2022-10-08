import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

function SearchHistory(props) {
  const { searchHistoryArray, removeHandler, clickHandler } = props;
  const [activeItem, setActiveItem] = useState(null);

  const searchClickHandler = (name, index) => {
    clickHandler(name);
    setActiveItem(index);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Search History</Card.Title>
        <ListGroup variant="flush">
          {searchHistoryArray?.map((searchItem, index) => (
            <ListGroup.Item
              key={index}
              active={index === activeItem}
              style={{ cursor: "pointer" }}
              onClick={() => searchClickHandler(searchItem, index)}
            >
              {searchItem.charAt(0).toUpperCase() + searchItem.slice(1)}
              <button
                type="button"
                variant="danger"
                className="close float-right"
                onClick={(evt) => {
                  evt.stopPropagation();
                  removeHandler(searchItem);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {!searchHistoryArray?.length && (
          <p className="text-muted">Nothing to show yet!</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default SearchHistory;
