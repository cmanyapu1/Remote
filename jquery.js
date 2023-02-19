let movielist = []

let currentId = 0

$(function() {
    $("#new-movie-form").on("submit", function(e) {
        e.preventdefault()
        let title = $("#title").val()
        let rating = $("#rating").val()
        
        let moviedata = {title, rating, currentId}
        movielist.push(moviedata)
        console.log('CHIRAG');

        const HTMLtoAppend = createMovieDataHTML(moviedata)
       console.log(HTMLtoAppend);
        $("#movie-table-body").append(HTMLtoAppend)
        currentId++

        $("#new-movie-form").trigger("reset");
    })
});

function createMovieDataHTML(data) {
    return 
    `<tr>
    <td> ${data.title} </td>
    <td> ${data.rating} </td> 
    <td> <button class="btn btn-danger" id = ${data.currentId}>
        Delete
    </button>
    </td>
    </tr>`;
}

$(function() {
    $("#movie-table-body").on("click", ".btn btn-danger", function(e) {
        $(evt.target)
      .closest("tr")
      .remove();        
    } )
})

