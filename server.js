//const e = require("express");
const fs = require("fs").promises;
const express = require("express");
const app = express();
//app.use(express.json());

// app.get("/", (req, res) => {
//   //read movies data from movies.json
//   fs.readFile("../movies.json", "utf8").then((movies) => console.log(movies));
//   res.send({ movies });
// });

// app.get("/movies", (req, res) => {
//   console.log("hitting the movies endpoint");
//   //read movies data from movies.json
//   fs.readFile("./movies.json", "utf8").then((movies) => {
//     //change string into object
//     movies = JSON.parse(movies);
//     console.log({ movies });
//     res.status(200).send({ movies });
//   });
// });

app.get("/movies", (req, res) => {
  console.log("hitting the movies endpoint");
  // Read movies data from movies.json
  fs.readFile("./movies.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send({ error: "Failed to read movies data" });
    }

    try {
      // Parse the JSON string into a JavaScript object
      const movies = JSON.parse(data);
      // Log movies data to console (for debugging)
      console.log({ movies });
      // Send movies data as a response with HTTP status 200 (OK)
      res.status(200).send({ movies });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send({ error: "Failed to parse movies data" });
    }
  });
});

app.post("/movies", (req, res) => {
  const newMovies = req.body;
  movies.push(newMovies);
  res.status(201).send({ newMovies });
});

app.get("/movies/:movieId", (req, res) => {
  console.log("you are listening to dynamic server");
  const id = req.params.movieId;
  const movieArray = movies.find((movie) => movie.albumId === id);
  res.send(movieArray);
});

app.put("/movies/:id", (req, res) => {
  console.log("hitting put endpoint...");
  const albumId = req.params.id;
  const updatedMovieData = req.body;
  const movieIndex = movies.findIndex((movie) => movie.albumId === albumId);

  if (movieIndex === -1) {
    return res.status(404).send({
      status: false,
      Message: "Movie not found",
    });
  }
  //get the old version
  const oldMovies = { ...movies[movieIndex] };
  const updatedMovie = { ...movies[movieIndex], ...updatedMovieData };
  movies.splice(movieIndex, 1, updatedMovie);
  //console.log("new movies-->", newMovies);
  res.status(200).send({
    status: true,
    message: "Movie updated successfully",
    oldMovie: oldMovies,
    updatedMovie: updatedMovie,
  });
});

// app.put("/movies/:id", (req, res) => {
//   const albumId = req.params.id;
//   console.log("id route -->", albumId);
//   const movieIndex = movies.findIndex((movie) => movie.albumId === albumId);
//   console.log("movie index first--->", movieIndex);

//   if (movieIndex === -1) {
//     return res.status(404).send({ status: false, message: "Movie not found" });
//   }
//   // get the old version
//   const oldMovie = { ...movies[movieIndex] };

//   const updatedMovie = { ...movies[movieIndex], ...req.body };
//   movies[movieIndex] = updatedMovie;
//   res.status(200).send({
//     status: true,
//     message: "Movie updated successfully",
//     oldMovie: oldMovie,
//     movie: updatedMovie,
//   });
//   console.log("movie index -->", movieIndex);
// });

app.listen(3001);
