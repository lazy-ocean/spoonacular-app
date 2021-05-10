import { useEffect, useState } from "react";

const LAST_SEARCHES_KEY = "spoonacularLastTen";

const useLastSearchItems = (): [string[], (query: string) => void] => {
  const [lastSearchedItems, setLastSearchedItems] = useState<string[]>([]);

  useEffect(() => {
    const localStorageItem = window.localStorage.getItem(LAST_SEARCHES_KEY);
    const lastSearches = localStorageItem ? JSON.parse(localStorageItem) : [];
    setLastSearchedItems(lastSearches);
  }, []);

  const addLastSearchedItem = (query: string) => {
    if (query === "") return;
    let updatedRequests: string[] = [...lastSearchedItems];
    const queryIndex = lastSearchedItems.indexOf(query);
    if (queryIndex !== -1) {
      updatedRequests.splice(queryIndex, 1);
      updatedRequests.unshift(query);
    } else updatedRequests = [query, ...lastSearchedItems];
    updatedRequests.length = 10;
    window.localStorage.setItem(LAST_SEARCHES_KEY, JSON.stringify(updatedRequests));
    setLastSearchedItems(updatedRequests);
  };

  return [lastSearchedItems, addLastSearchedItem];
};

export default useLastSearchItems;
