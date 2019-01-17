import React, { useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { infiniteScroll } from "../helpers/infiniteScroll";

export const RepoList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1)

  infiniteScroll(() => isLoading, () => {
    setIsLoading(true);
    axios
      .get("https://api.github.com/users/charlax/repos", {
        params: {
          page: page,
          per_page: 20
        }
      })
      .then(({ data }) => {
        setList([...list, ...data]);
        setPage(page + 1);
        setIsLoading(false);
      });
  });

  return list.length ? (
    <ul className="repos-list" >
      {list.map(item => (
        <li className="repos-list__item" key={item.id}>
          <ListItem list={item} />
        </li>
      ))}
    </ul>
  ) : "Lądowanie";
};

