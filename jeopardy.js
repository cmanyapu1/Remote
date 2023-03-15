// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const width = 6
const height = 6
const htmlBoard = document.getElementById('jeopardy');


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    console.log('here we are')

    const response = await axios.get(`http://jservice.io/api/categories`,{params: {count: 100}});

    let questions = response.data.filter(x=>x.clues_count>height)

    questions  = _.sampleSize(questions, height)
    
    
    let catId = []
    
    for (let category of questions) {
        catId.push(category.id)
    }

    return catId
}       



/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {

    const response = await axios.get(`http://jservice.io/api/category?id=${catId}`);
      
      
        const firstclues = _.sampleSize(response.data.clues, height)

       let catdata = {
        title: response.data.title,
        clues: []
       }
       console.log("\n\n\n\n")

       console.log(response)
        console.log("\n\n\n\n")

       console.log(catdata);

         //for (let questions of response.data) {
           // catdata.push(questions.title)
            //console.log(questions)

         //}

      //  const catdata = response.data.map(questions => {
        //  return {
          // title: questions.title,
           //clues: []
         // }
        //});


        firstclues.map(data => {
            catdata.clues.push({Question: data.question, Answer: data.answer, Showing: null})
            }
        )

        categories.push(catdata)
        console.log(categories);

        return categories;

}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    $('thead').empty();
    $('tbody').empty();
    $("thead").add("tr")

    const categoryrow = categories.map(data => {
        return data.title
    })


    //top = category name

    for (let x = 0; x < width; x++) {
        const top = document.createElement("th");
        top.innerText = categoryrow[x];
        $("thead").append(top);
        }


        // make main part of the board
        for (let y = 0; y < height; y++) {
            const row = document.createElement("tr");
            for (let x = 0; x < height; x++) {
                const cell = document.createElement("td");
                cell.setAttribute("id", `${y}-${x}`);
                row.append(cell);

            }
            $("tbody").append(row);
        }
    }


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let x = 0 //why do these variables need to be defined
    let y = 0

    y = evt.target.id.charAt(0)
    x = evt.target.id.charAt(2) 

    if (categories[x].clues[y].Showing === null) {
        categories[x].clues[y].Showing = "question";
        let targetcell = document.getElementById(`${y}-${x}`);
        targetcell.append(categories[x].clues[y].Question)
        return
    }
    else if (categories[x].clues[y].Showing === "question") {
        categories[x].clues[y].Showing = "answer"
        let targetcell2 = document.getElementById(`${y}-${x}`);
        targetcell2.replaceChildren();
        targetcell2.append(categories[x].clues[y].Answer)
        return
    }
    else (categories[x].clues[y].Showing === "answer") 
        return
    

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories = [];
   let randomcatids = await getCategoryIds() //why do you have to make this a variable and not fillTable
   
   console.log("Chirag")
   console.log(randomcatids)

    for (let x = 0; x < width; x++) {
        await getCategory(randomcatids[x]);
    }
    fillTable()
}


$("#start").on("click", async function() {
    setupAndStart()
})

$("#jeopardy").on("click", handleClick)

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO