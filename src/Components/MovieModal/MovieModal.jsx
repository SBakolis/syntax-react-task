import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./MovieModal.scss";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

function MovieModal({ movie, movieID, open, setOpen, handleClose }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data, status, error } = useQuery(["movie", movieID], async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movieID}&apikey=247de336`
    );
    return response.json();
  });

  useEffect(() => {
    if (localStorage.getItem("favorites")) {
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
        setIsFavorite(true);
      }
    }

    let viewed = [];
    if (localStorage.getItem("viewed")) {
      viewed = JSON.parse(localStorage.getItem("viewed"));
    }
    viewed.push(movieID);
    localStorage.setItem("viewed", JSON.stringify(viewed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      let newFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      let favorites = [];
      if (localStorage.getItem("favorites")) {
        favorites = JSON.parse(localStorage.getItem("favorites"));
      }
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
    //console.log(JSON.parse(localStorage.getItem("favorites")));
    window.dispatchEvent(new Event("storage"));
  };

  const handleCloseClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        backdrop={Backdrop}
        backdropprops={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {status === "loading" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className="movie-modal">
              <div className="modal-controls">
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="search-btn"
                  onClick={handleCloseClick}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="search-btn"
                  onClick={handleFavoriteClick}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
              </div>
              <img
                src={data.Poster}
                alt={"Poster"}
                className="modal-image"
              ></img>
              <div className="movie-data">
                <h2>{data.Title}</h2>
                <p>{data.Plot}</p>
                <p>{data.Actors}</p>
                <p>{data.Director}</p>
                <p>{data.Awards}</p>
                <p>{data.BoxOffice}</p>
                <p>{data.Runtime}</p>
                <p>{data.Language}</p>
                <p>{data.Country}</p>
                <p>{data.Rated}</p>
                <p>{data.Production}</p>
                <p>{data.Website}</p>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default MovieModal;
