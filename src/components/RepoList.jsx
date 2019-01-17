import React, { useState, useRef } from "react";
import axios from "axios";
import GitRepo from "./GitRepo";
import { useInfiniteScroll } from "../lib/useInfiniteScroll";

const RepoList = () => {
  const [items, setItems] = useState([]);
  const [lastLoadedItem, setLastLoadedItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1)
  const listRef = useRef();

  useInfiniteScroll(listRef, () => isLoading, () => {
    setIsLoading(true);
    axios
      .get("https://api.github.com/users/kamranahmedse/repos", {
        params: {
          page: page,
          per_page: 20
        }
      })
      .then(({ data }) => {
        setItems([...items, ...data]);
        setPage(page + 1);
        setIsLoading(false);
      });
  });

  return items.length ? (
    <ul className="repos-list" ref={listRef}>
      {items.map(item => (
        <li className="repos-list__item" key={item.id}>
          <GitRepo repo={item} />
        </li>
      ))}
    </ul>
  ) : (
    "Lądowanie"
  );
};

export default RepoList;
