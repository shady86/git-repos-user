import { useEffect, useState } from "react";

function infiniteScroll(forwardedRef, isLoading, loadMoreItems) {
  console.log("ref", forwardedRef);
  const [initialized, setInitialized] = useState(false);
  const rect = forwardedRef.current && forwardedRef.current.getBoundingClientRect()

  const shouldLoadMoreItems = () =>
    !isLoading() &&
    rect.top > 0 &&
      rect.bottom + 200 + forwardedRef.current.parentNode.offsetHeight >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 200

  console.log("ref", forwardedRef.current && forwardedRef.current.getBoundingClientRect().bottom, window.innerHeight, window.pageYOffset);    
  console.log();
  console.log(forwardedRef.current &&
    forwardedRef.current.getBoundingClientRect().bottom <
      window.innerHeight + window.pageYOffset);
  
      const onWindowEvent = () => shouldLoadMoreItems() && loadMoreItems();

  useEffect(() => {
    window.addEventListener("scroll", onWindowEvent);
    window.addEventListener("resize", onWindowEvent);
    if (!initialized) {
      loadMoreItems();
      setInitialized(true);
    }
    return () => {
      window.removeEventListener("scroll", onWindowEvent);
      window.removeEventListener("resize", onWindowEvent);
    };
  });
}

export default infiniteScroll;
