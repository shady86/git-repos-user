import { useEffect, useState } from "react";

export function infiniteScroll(isLoading, loadMoreItems) {
  const [initialized, setInitialized] = useState(false);

  const shouldLoadMoreItems = () => !isLoading() && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
  const onScroll = () => shouldLoadMoreItems() && loadMoreItems();

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    if (!initialized) {
      loadMoreItems();
      setInitialized(true);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
}