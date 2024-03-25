const e = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const movies = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/", (req, res) => {
  console.log("you are listening in server 3000");
  res.send("this is root server!");
});

app.get("/movies", (req, res) => {
  console.log("hitting the movies endpoint");
  res.status(200).send({ movies });
});

app.post("/movies", (req, res) => {
  const newMovies = req.body;
  movies.push(newMovies);
  res.status(201).send({ newMovies });
});

app.get("/movie/:movieId", (req, res) => {
  console.log("you are listening to dynamic server");
  const id = req.params.movieId;
  const movieArray = movies.find((movie) => movie.albumId === id);
  res.send(movieArray);
});
app.listen(30001);
