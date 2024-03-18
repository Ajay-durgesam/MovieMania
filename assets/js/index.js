'use strict';

/**
 * import all components and functions
 */

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";


const pageContent = document.querySelector("[page-content]");
const movieId = window.localStorage.getItem("movieId");



sidebar();



/**
 * fetch all genres eg: [ { "id": "123", "name": "Action" } ]
 * then change genre formate eg: { 123: "Action" }
 */
const genreList = {

  // create genre string from genre_id eg: [23, 43] -> "Action, Romance".
  asString(genreIdList) {
    let newGenreList = [];

    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]); // this == genreList;
    }

    return newGenreList.join(", ");
  }

};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
  for (const { id, name } of genres) {
    genreList[id] = name;
  }

  fetchDataFromServer(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=1`, heroBanner);
});



const heroBanner = function ({ results: movieList }) {

  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Top_rated movies";

  banner.innerHTML = `
    <div class="banner-slider"></div>
    
    <div class="slider-control">
      <div class="control-inner"></div>
    </div>
  `;

  let controlItemIndex = 0;

  for (const [index, movie] of movieList.entries()) {

    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

    sliderItem.innerHTML = `
      <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover" loading=${index === 0 ? "eager" : "lazy"
      }>
      
      <div class="banner-content">
      
        <h2 class="heading">${title}</h2>
      
        <div class="meta-list">
          <div class="meta-item">${release_date?.split("-")[0] ?? "Not Released"}</div>
      
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>
      
        <p class="genre">${genreList.asString(genre_ids)}</p>
      
        <p class="banner-text">${overview}</p>
      
        <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
          <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
      
          <span class="span">Watch Now</span>
        </a>
      
      </div>
    `;
    banner.querySelector(".banner-slider").appendChild(sliderItem);


    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);
    controlItem.setAttribute("data-id", `${id}`);
    

    controlItemIndex++;
    controlItem.innerHTML = `
      <button data-id = ${id} class="card_hover" >
      <img src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title}" loading="lazy" draggable="false" class="img-cover">
      </button>
    `;

    


    banner.querySelector(".control-inner").appendChild(controlItem);

  }

  pageContent.appendChild(banner);

  addHeroSlide();


}



/**
 * Hero slider functionality
 */

const addHeroSlide = function () {

  const sliderItems = document.querySelectorAll("[slider-item]");
  const sliderControls = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItems[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  const sliderStart = function () {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    // `this` == slider-control
    sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
    this.classList.add("active");

    //const movie_id = controlItem.getAttribute('data-id');
    let movie_id = sliderControls[Number(this.getAttribute("slider-control"))].getAttribute("data-id");

    loadVideoComponent(movie_id); //function to generate the trailers and append below the banner

    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  }

  addEventOnElements(sliderControls, "click", sliderStart);

}


// returns only trailers and teasers as array
const filterVideos = function (videoList) {
  return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
}

const loadVideoComponent = function(movie_id) {
  fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&append_to_response=casts,videos,images,releases`, function (movie) {

  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    releases: { countries: [{ certification } = { certification: "N/A" }] },
    genres,
    overview,
    casts: { cast, crew },
    videos: { results: videos }
  } = movie;

  
  // Check if the movieDetail div already exists
  let movieDetail = document.querySelector('.movie-detail');
  //clear the previous trailers......
  if(movieDetail){
    const sliderInner = movieDetail.querySelector(".slider-inner");
    while (sliderInner.firstChild) {
      sliderInner.firstChild.remove();
    }
  }
  
  if (!movieDetail) {
    // Create the movieDetail div if it doesn't exist
    movieDetail = document.createElement("section");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
    
      <div class="detail-box">
        <div class="title-wrapper">
          <h3 class="title-large">Trailers and Clips</h3>
        </div>
      
        <div class="slider-list">
          <div class="slider-inner"></div>
        </div>
      
      </div>
    `;
    pageContent.appendChild(movieDetail);
  }



  let isFirstVideo = true;
  for (const { key, name } of filterVideos(videos)) {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");

    let autoplayValue = isFirstVideo ? "1" : "0"; // Determine the autoplay value based on whether it's the first video or not
    videoCard.innerHTML = `
      <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0&autoplay=${autoplayValue}&mute=1&loop=1"
        frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
    `;

    movieDetail.querySelector(".slider-inner").appendChild(videoCard);

    isFirstVideo = false; // Set the flag to false after processing the first video
  }

  pageContent.appendChild(movieDetail);


});

}



search();