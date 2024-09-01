const API_KEY = "401d99613457b207ed11170ac072437a";
const DUMMY_AVATAR = `https://static1.squarespace.com/static/57b711122e69cf5fea1cf5a6/5d2f2f11e13e6e000137d32c/5d2f2f433fa39b0001ee5078/1563374039597/Screen+Shot+2019-07-17+at+10.29.00+AM.png?format=250w`;
const URL = `https://api.themoviedb.org/3`;
const API_URL = `${URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;
const creditsURL = (movieId) =>
  `${URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: id,
      id,
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids[0],
    })
  );

  return movies;
};

export const getActors = async (movieId) => {
  const { cast } = await fetch(creditsURL(movieId)).then((x) => x.json());
  return cast
    .map((actor) => ({
      key: String(actor.id),
      id: actor.id,
      imageUri: actor.profile_path
        ? getImagePath(actor.profile_path)
        : DUMMY_AVATAR,
      name: actor.name,
      character: actor.character,
      order: actor.order,
    }))
    .sort((a, b) => a.order > b.order)
    .slice(0, 20);
};

export const getMovieByGenre = async (genreId) => {
  const url = `${URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
  const { results } = await fetch(url).then((x) => x.json());
  if (results.length > 0) {
    const movie = results[0];

    return {
      id: movie.id,
      title: movie.original_title,
      poster: getImagePath(movie.poster_path),
      backdrop: getBackdropPath(movie.backdrop_path),
      rating: movie.vote_average,
      description: movie.overview,
      releaseDate: movie.release_date,
      genres: genreId,
    };
  }

  return null;
};
