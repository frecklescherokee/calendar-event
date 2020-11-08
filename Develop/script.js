// DOM element to hold the current day in the 2nd <p> in the header
var currentDayEl = document.querySelector("#currentDay");

// we will use this to reference the fields within the form
var formEl = document.querySelector("#task-form");

// add an element for the <main> element.  
// we will later listen to this element for button clicks and dropdown changes 
// on all children elements
var pageContentEl = document.querySelector("#calendar-area");



var pageContents = [];


// Array to hold taskPlusRow objects
var fillPageContents = function() {
    var storedContents = JSON.parse(localStorage.getItem("pageContents"));
    console.log ("storedContents contains:" + storedContents);
    if (!storedContents) {
        pageContents = [];
    }
    else {
        pageContents = storedContents;
    }
    console.log ("pageContents contains:" + pageContents);
}

fillPageContents();








var taskNameBeingEdited = "";
var taskRowBeingEdited = "";
var buttonThatWasClicked = "";

var fillTasks = function() {
    for (i = 0; i < 10; i++) {
        // set value of time rows from pageContents array
        if (pageContents[i]) {
            document.getElementById(pageContents[i].row).value = pageContents[i].task;
        }
    }
}

//fillTasks();



var taskFormHandler = function(event) 
{
    // prevent the default page behavior of reloading the page on each submission
    event.preventDefault();
}

// function to handle button clicks for each task 
var taskButtonHandler = function(event) 
{
    event.preventDefault();
    
    // get the id of the row where the value was typed
    var targetEl2 = event.target.id;
    //console.log(targetEl2 + " is the element that was clicked");

    // save the button that was clicked to the buttonThatWasClicked
    buttonThatWasClicked = targetEl2;
    //console.log("the buttonThatWasClicked variable now holds: " + buttonThatWasClicked);

    //////////////////
    // use the button that was clicked to reference the name of the input on that line
    var text = "input[name='task-name-" + targetEl2 + "']"
    console.log ("text var equals " + text);

    //debugger;
    // get the contents of the input element that the user typed
    var taskNameInput = document.querySelector(text).value;
    console.log(taskNameInput + " was written in the box then the save button was clicked.");

    // get the id of the row where the value was typed
    //var targetEl = event.target.id;
    var targetEl = document.querySelector(text).id;
    //console.log(targetEl);

    // save the row being edited to taskRowBeingEdited
    taskRowBeingEdited = targetEl;
    console.log("the taskRowBeingEdited variable contains: " + taskRowBeingEdited);


    // save the task being edited to taskNameBeingEdited
    taskNameBeingEdited = taskNameInput;
    console.log("the taskNameBeingEdited variable now holds: " + taskNameBeingEdited);
    
    
    // remove contents from the form
    //formEl.reset();
    //debugger;
    //console.log(" the row I want to edit is " + taskRowBeingEdited);
    
    // set the text of the box to be what was input
    var rowToEdit = document.querySelector("#" + taskRowBeingEdited);
    //console.log("in button click function, row to edit is " + rowToEdit.id);
    //rowToEdit.placeholder = taskNameBeingEdited;
    rowToEdit.value = taskNameBeingEdited;
    document.getElementById(taskRowBeingEdited).value = taskNameBeingEdited;


    // make an object containing taskNameBeingEdited and taaskRowBeingEdited
    var taskAndRow = 
    {
        task: taskNameBeingEdited,
        row: taskRowBeingEdited
    };
    console.log(taskAndRow);
   
    

    switch (taskRowBeingEdited)
    {
        case "nineAm":
            pageContents[0] = taskAndRow;
            break;
        case "tenAm":
            pageContents[1] = taskAndRow;
            break;
        case "elevenAm":
            pageContents[2] = taskAndRow;
            break;
        case "twelvePm":
            pageContents[3] = taskAndRow;
            break;
        case "onePm":
            pageContents[4] = taskAndRow;
            break;
        case "twoPm":
            pageContents[5] = taskAndRow;
            break;
        case "threePm":
            pageContents[6] = taskAndRow;
            break;
        case "fourPm":
            pageContents[7] = taskAndRow;
            break;
        case "fivePm":
            pageContents[8] = taskAndRow;
            break;
    }

    console.log ("the pageContents array contains");
    console.log(pageContents);

    localStorage.setItem("pageContents", JSON.stringify(pageContents));

}










// Array for the row IDs
var timeRows = 
[
    "#nineAm", "#tenAm", "#elevenAm", "#twelvePm", "#onePm", "#twoPm", "#threePm", "#fourPm", "#fivePm"
]
//console.log(timeRows);



// make an Array of Moment objects for each hour of the day
var workHours = [];

// fill the array with times
var fillWorkHoursArray = function()
{
    for (i = 9; i < 18; i++)
    {
        var hr = moment().hours(i).format("hA");
        //hr.hours(17);
        //console.log(hr);
        workHours.push(hr);
    };
    ///console.log(workHours);
}
fillWorkHoursArray();



// Color Code
// Loop through the rows and apply styling based on hour compared to now
var colorCode = function ()
{
    // if 1pm row equals now, apply present styling
    var now = moment().format("hA");
    //console.log(now + " is the current hour.");

    // loop through workHours array 
    for (i = 0; i < workHours.length; i++)
    {
        // set value of time rows from pageContents array
        if (pageContents[i]) {
            document.getElementById(pageContents[i].row).value = pageContents[i].task;
        }
        
        
        
        
        // console.log(i);
        // console.log(workHours[i]);
        // console.log(timeRows[i]);
        // if now = the hour in question, add "present" class
        if (now === workHours[i]) 
        {
            $(timeRows[i]).addClass("present");
            //console.log (now + " equals " + workHours[i]);
        }
        // if now < the hour in question, add "future" class
        else if (moment().isBefore(moment().hours(i+9)))
        {
            //debugger;
            $(timeRows[i]).addClass("future");
            //console.log (now + " is before " + workHours[i]);
        }
        // if now > the hour in question, add "past" class
        else if (moment().isAfter(moment().hours(i+9)))
        {
            $(timeRows[i]).addClass("past");
            //console.log (now + " is after " + workHours[i]);
        }
    }
}

colorCode();


// Make Text Box editable
$(".row").on("click", "p", function() 
{
  // 'this' refers to the <p> element that was clicked on
  var text = $(this).text();
  console.log(text);

  var textInput = $("<textarea>")
  .addClass("col-10")
  .val(text);

  $(this).replaceWith(textInput);
  console.log(this);

  textInput.trigger("focus");

});

// save text box on click of button
$(".row").on("click", "button", function() 
{
    // 'this' refers to the <p> element that was clicked on
      // get the textarea's current value/text
      var text = $(this)
      .val()
      .trim();
      console.log(text);
      console.log("clicked a button");

    

    colorCode();
});










///////////////////// Jumbotron Date //////////////////////
// get the date in the format "Thursday, September 5th"
var today = moment().format("dddd, MMMM Do");

// add the "today" text to the jumbotron
var showDate = function()
{
    currentDayEl.textContent += today;
}

showDate();







//////////////// event listeners ////////////////

// add an event listener for when a new task is submitted
formEl.addEventListener("submit", taskButtonHandler);

// use an event listener to listen for clicks then call the taskButtonHandler function
pageContentEl.addEventListener("click", taskButtonHandler);