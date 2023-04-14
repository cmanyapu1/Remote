"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowUserStories() {
  

}

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteButton = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showstar = Boolean(currentUser)
  
  return `
      <li id="${story.storyId}">
        ${showDeleteButton ? Deletebutton(): ""}
        ${showstar ? favoritemarking(currentUser, story): '<span class ="fa fa-star"></span>'}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  console.log(storyList.stories);
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function Storysubmission (evt) {

  const $Title = $("#title").val()
  const $Author = $("#author").val()
  const $URL = $("#URL").val()

  const storyforsubmission = await storyList.addStory(currentUser, {title: $Title, author: $Author, url: $URL})
  $("#all-stories-list").prepend(generateStoryMarkup(storyforsubmission));
  currentUser.ownStories.push(storyforsubmission)
}

$("#newstoryform").on("submit", Storysubmission);

function favoritemarking(username, story) {
  if (username.isFavorite(story) == true) {
    return `<span class="fa fa-star checked"></span>`
    } 
  
  else {
    return `<span class="fa fa-star"></span>`
 }
}

async function togglefavorite(evt) {
  const toggleclick = $(evt.target)
  const targetstoryid = toggleclick.closest("li").attr("id") 
  
  const story = storyList.stories.find(currentstory => targetstoryid === currentstory.storyId)

  if (toggleclick.hasClass("checked")) {
    toggleclick.removeClass("checked");
    currentUser.removefavoriteStory(story)
  }
  else {
    toggleclick.addClass("checked");
    currentUser.favoriteStory(story)
  }
   currentUser.favorites = currentUser.favorites.filter(function(favorite){
    return favorite.storyId !== story.storyId
  })

     
}

$allStoriesList.on("click", ".fa-star", togglefavorite)

function ShowFavoritesHTML() {
  $("#all-favorites-list").html('')
  for (let story of currentUser.favorites) {
    
    if (currentUser.isFavorite(story)){
      $("#all-favorites-list").append(generateStoryMarkup(story))
    }
  }
}

function ShowStoriesHTML() {

  $("#own-stories-list").html('')
  for (let story of currentUser.ownStories) {
      $("#own-stories-list").append(generateStoryMarkup(story, true))
    }
  $(".deletestory").on("click", RemoveStory)
  }


function Deletebutton() {
   return `<button class="deletestory"> X </button>`
   }

 async function RemoveStory(evt) {

    const targetremovestory = $(evt.target)
    const targetstoryidremove = targetremovestory.closest("li").attr("id") 
    await storyList.removeStoryAPI(currentUser, targetstoryidremove)
    ShowStoriesHTML()
  }
  
   $(".deletestory").on("click", RemoveStory)

