import React from 'react';

const ListItem = ({ list }) => (
  <div className="repo">
    <h3 className="repo__name">
      <a href={list.html_url}>{list.name}</a>
    </h3>
    <p className="repo__description">{list.description}</p>
  </div>
);

export default ListItem;
