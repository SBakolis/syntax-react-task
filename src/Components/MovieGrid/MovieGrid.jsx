import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import MovieGridItem from "../MovieGridItem/MovieGridItem";
import Pagination from "@mui/material/Pagination";
import { motion } from "framer-motion";
import "./MovieGrid.scss";

function MovieGrid({ searchQuery, modeFavorite }) {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  useEffect(() => {
    const updateState = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    };

    window.addEventListener("storage", updateState);

    //Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", updateState);
    };
  }, []);

  const { data, status, error } = useQuery([searchQuery, page], async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=247de336`
    );
    return response.json();
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {modeFavorite ? (
        <>
          <motion.div layout className="movie-grid">
            {favorites ? (
              favorites.map((movie) => (
                <MovieGridItem key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>No Favorites...</p>
            )}
          </motion.div>
        </>
      ) : (
        data &&
        status !== "loading" && (
          <>
            <motion.div layout className="movie-grid">
              {data.Search ? (
                data.Search.map((movie) => (
                  <MovieGridItem key={movie.imdbID} movie={movie} />
                ))
              ) : (
                <p>No Results...</p>
              )}
            </motion.div>
            <div className="pagination-wrapper">
              <Pagination
                count={Math.floor(data.totalResults / 10)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </>
        )
      )}
    </>
  );
}

export default MovieGrid;
