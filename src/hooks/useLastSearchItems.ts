import { useEffect, useState } from "react";
import mergeItemIntoArray from "../utils/mergeItemIntoArray";

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
    const updatedRequests = mergeItemIntoArray(query, lastSearchedItems);
    window.localStorage.setItem(LAST_SEARCHES_KEY, JSON.stringify(updatedRequests));
    setLastSearchedItems(updatedRequests);
  };

  return [lastSearchedItems, addLastSearchedItem];
};

export default useLastSearchItems;
