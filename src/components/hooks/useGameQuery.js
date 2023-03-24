import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import useDebounce from "./useDebounce";

import { BASE_URL, RAWG_SECRET } from "../../utils/constants";

function useGameQuery(searchTerm) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const slug = searchTerm.toLowerCase();
  const URL =
    BASE_URL + `games?search=${slug}?page-size=10?token&key=${RAWG_SECRET}`;

  useEffect(() => {
    const getResults = async () => {
      const response = await axios.get(URL).catch((err) => {
        console.log("error: ", err);
        setError(true);
      });
      if (response.data) {
        const slicedResponse = response.slice(10);
        setResults(slicedResponse);
      }
    };

    setTimeout(() => {
      console.log("test");
      getResults();
    }, 2000);

    return () => clearTimeout();
  }, [results, loading, error, searchTerm]);

  // fetch(URL)
  //   .then((res) => res.json())
  //   .then(({ results }) =>
  //     results === undefined ? setResults([]) : setResults(results)
  //   )
  //   .catch((err) => {
  //     console.error("error: ", err);
  //     setLoading(false);
  //     setError(true);
  //   });

  return {
    results,
    loading,
    error,
  };
}

export default useGameQuery;

// const getRawgApi = useCallback(async () => {
//   try {
//     // _RAWG game details call
//     const response = await fetch(`${domain}/api/videogame/${id}`);
//     const json = await response.json();
//     setData(json);
//     setDataIsReady(true);
//   } catch (e) {
//     console.error(e);
//   }
// }, [id, domain]);
