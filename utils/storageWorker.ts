const storageWorker = (query: string, lastSearches: string[]) => {
  let updatedRequests: string[] = [...lastSearches];
  const queryIndex = lastSearches.indexOf(query)
  if (queryIndex !== -1) {
    updatedRequests.splice(queryIndex, 1);
    updatedRequests.unshift(query)
  } else updatedRequests = [query, ...lastSearches];
  updatedRequests.length = 10;
  window.localStorage.setItem('spoonacularLastTen', JSON.stringify(updatedRequests))
  return updatedRequests;
}

export default storageWorker;