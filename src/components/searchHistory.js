import React, { Fragment, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function SearchHistory(props) {
  const { searchHistoryArray, removeHandler, clickHandler } = props;
  const [activeItem, setActiveItem] = useState(null);

  const searchClickHandler = (name, index) => {
    clickHandler(name);
    setActiveItem(index);
  };

  return (
    <Fragment>
      <h1 className="h5">Search History</h1>
      <ListGroup>
        {searchHistoryArray?.map((searchItem, index) => (
          <ListGroup.Item
            key={index}
            active={index === activeItem}
            style={{ cursor: 'pointer' }}
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
    </Fragment>
  );
}

export default SearchHistory;
