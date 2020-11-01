// DOM element to hold the current day in the 2nd <p> in the header
var currentDayEl = document.querySelector("#currentDay");

// Array for the row IDs
var timeRows = 
[
    "#nineAm", "#tenAm", "#elevenAm", "#twelvePm", "#onePm", "#twoPm", "#threePm", "#fourPm", "#fivePm"
]
console.log(timeRows);



// make an Array of Moment objects for each hour of the day
var workHours = [];

// fill the array with times
var fillWorkHoursArray = function()
{
    for (i = 9; i < 18; i++)
    {
        var hr = moment().hours(i).format("hA");
        //hr.hours(17);
        console.log(hr);
        workHours.push(hr);
    };
    console.log(workHours);
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









///////////////////// Jumbotron Date //////////////////////
// get the date in the format "Thursday, September 5th"
var today = moment().format("dddd, MMMM Do");

// add the "today" text to the jumbotron
var showDate = function()
{
    currentDayEl.textContent += today;
}

showDate();
