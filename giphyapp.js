console.log("Let's get this party started!");

// Pull giphy via api
// Create Giphy list
// Append giphy to html
// Remove all giphy0

const $searchresults = $("#searchbar");
const $giflist = $("#Giphylist");

$("#giphysearchform").on("submit", async function (e) {
  e.preventDefault();

  let searchinput = $searchresults.val();
  $searchresults.val("");
    console.log("Chirag");
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchinput,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  console.log(response);

  Appendhtml(response.data);
});

function Appendhtml(dataresponse) {
  let url = dataresponse.data[0].images.original.url;

  $("#Giphylist").append("<img id='giphy-image' src = " + url + ">");
}

$("#removeall").on("click", function (e) {
    $("#Giphylist").empty()
});
//pick first one / random
