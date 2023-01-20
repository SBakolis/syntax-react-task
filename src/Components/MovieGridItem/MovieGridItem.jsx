import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MovieModal from "../MovieModal/MovieModal";
import { motion } from "framer-motion";

function MovieGridItem({ movie }) {
  const [open, setOpen] = useState(false);
  let viewed = JSON.parse(localStorage.getItem("viewed"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <Card
          onClick={() => {
            handleOpen();
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={movie.Poster}
            alt="Movie Poster"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Year}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {viewed && viewed.find((viewed) => viewed === movie.imdbID) && (
                <p>Watched!</p>
              )}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
      {open && (
        <MovieModal
          movie={movie}
          movieID={movie.imdbID}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default MovieGridItem;
