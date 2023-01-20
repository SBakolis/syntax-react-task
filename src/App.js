import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import "./App.scss";
import SearchBar from "./Components/SearchBar/SearchBar";
import MovieGrid from "./Components/MovieGrid/MovieGrid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favMode, setFavMode] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <SearchBar setQuery={setSearchQuery} setFavMode={setFavMode} />
        <Button
          variant="outlined"
          onClick={() => setFavMode(true)}
          startIcon={<FavoriteBorderIcon />}
          className={"app-btn"}
        >
          Favorites
        </Button>
        {favMode ? (
          <MovieGrid searchQuery={""} modeFavorite={true} />
        ) : (
          <>
            {searchQuery ? (
              <MovieGrid searchQuery={searchQuery} modeFavorite={false} />
            ) : (
              <p>Nothing to show here...</p>
            )}
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
