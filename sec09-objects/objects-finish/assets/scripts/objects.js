const addMoveBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovieList = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredList = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.toLowerCase().includes(filter));

  filteredList.forEach((movie) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("card");
    const { info, ...otherProps } = movie;
    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    // let text = getFormattedTitle.call(movie) + " - ";
    // call 은 this arguments 뒤에  , 로 추가로 더해지는 arguments를 다루고
    // apply는 뒤에 [] array 형식으로 추가 arguments를 더한다.
    // bind는 앞으로 실행할 함수에 arg를 미리 추가해주고, call 이나 apply는 바로 실행할 함수에 더해준다.
    // let text = getFormattedTitle.apply(movie) + " - ";
    let text = getFormattedTitle() + " - ";
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  let title = document.getElementById("title").value;
  let exName = document.getElementById("extra-name").value;
  let exValue = document.getElementById("extra-value").value;

  if (title.trim() === "" || exName.trim() === "" || exValue.trim() === "") {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title.toUpperCase();
      },
      [exName]: exValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;

  movies.push(newMovie);
  renderMovieList();
};

const searchMovieHandler = () => {
  const searchTerms = document.getElementById("filter-title").value;

  renderMovieList(searchTerms);
};

addMoveBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
