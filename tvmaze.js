"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchterm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.


  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchterm}`);

  console.log(response);

  const shows = response.data.map(data => {
    return {
     id: data.show.id,
     name: data.show.name, 
     summary: data.show.summary,
     image: data.show.image ? data.show.image.medium : 'https://tinyurl.com/tv-missing'
    }
  });

  return shows
}   
          
    


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3 card-img-top">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {

  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  console.log(response);

  const episodes = response.data.map(data => ({
    return {
     id: data.id,
     name: data.name, 
     season: data.season,
     number: data.number
    }
  }));

  return episodes

 }

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { 
  const $episodesList = $("#episodes-list");
  $episodesList.empty()

  for (let episode of episodes) {
    const $episode = $(
        `<li> ${episode.name}, season ${episode.season}, episode ${episode.number} </li>
      `);

    $episodeslist.append($show);  }

    $("#episodes-area").show();

}

$("#shows-list").on("click", ".get-episodes", async function (evt) {
  evt.preventDefault();
  let id = $(evt.target).closest(".Show").data("show-id")
  const episodes = await getEpisodesOfShow(id);

  populateEpisodes(episodes)
  
});



