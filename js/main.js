$(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  //make request to api using axios
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=66a6b9d77a4a8c6cada4bc173e72d22d&language=en-US&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
            <div class="col-md-3 col-sm-6 ">
              <div class="well text-center ">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <h5>${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
      });
      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=66a6b9d77a4a8c6cada4bc173e72d22d")
    .then(function (response) {
      let movie = response.data;
      console.log(movie);
      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group table">
                <li class="list-group-item"><strong><b>Genre:</b></strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                <li class="list-group-item"><strong><b>Released:</b></strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong><b>Rated:</b></strong> ${movie.vote_average}</li>
                <li class="list-group-item"><strong><b>Runtime:</b></strong> ${movie.runtime} min.</li>
                <li class="list-group-item"><strong><b>Production Companies:</b></strong> ${movie.production_companies[0].name} min.</li>
                <li class="list-group-item"><strong><b>Production Country:</b></strong> ${movie.production_countries[0].name}</li>   
              </ul>
            </div>
          </div>
          <hr>
          <div class="row plot-row">
            <div class="well">
              <h3><u>Plot</u></h3>
              <p>${movie.overview}</p>
              <hr>
              <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default"><p>Go Back To Search</p></a>
            </div>
          </div>
      `;
      $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}