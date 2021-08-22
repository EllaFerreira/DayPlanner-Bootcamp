//Set current time to the page
function currentTime() {
  current = document.querySelector("#currentDate").innerText = moment().format(
    "dddd, MMMM Do YYYY, h:mm a"
  );
  setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();

//Declaring an empty array as input space and parsing local storage

let myPlan = [];
let savePlan = JSON.parse(localStorage.getItem("userInput"));

if (!savePlan == null) {
  myPlan = savePlan;
}

//Using 'for loop' and JQuery to create the time blocks
//I'm setting the business hours starting 8 am till 5 pm
for (e = 8; e < 18; e++) {
  let form = $("<form>");
  form.attr({
    time: e,
    id: "row-" + e,
    index: e - 8,
  });
  form.addClass("field");
  $(".container").append(form);

  let timeElement = $("<div>");
  timeElement.addClass("time is-one-fifth");
  let timeText = moment(e, "H").format("h a");
  timeElement.text(timeText);
  form.append(timeElement);

  let inputElement = $("<input>");
  inputElement.attr({
    type: "text",
    placeholder: "Tell me more about your plans..",
  });
  inputElement.addClass("input is-primary has-addons");

  //Set colors to change on business hours

  let currentHour = moment().format("H");
  if (savePlan !== null) {
    inputElement.val(savePlan[e - 8]);
  }
  if (currentHour == e) {
    inputElement.addClass("present");
  } else if (currentHour > e) {
    inputElement.addClass("past");
  } else {
    inputElement.addClass("future");
  }
  form.append(inputElement);

  //Creating 'Save' and 'Delete' btn

  let saveIcon = $("<i>");
  saveIcon.addClass("fas fa-check");

  var saveButton = $("<button>");
  saveButton.addClass("save button is-primary is-rounded");
  saveButton.text("Save");
  saveButton.append(saveIcon);
  form.append(saveButton);

  let deleteIcon = $("<i>");
  deleteIcon.addClass("fas fa-times");

  var deleteButton = $("<button>");
  deleteButton.addClass("button is-danger is-rounded dlt");
  deleteButton.text("Delete");
  deleteButton.append(deleteIcon);
  form.append(deleteButton);
}
//Create event listener to 'Save' or 'Delete' from local storage

$(".save").on("click", function (event) {
  event.preventDefault();
  index = $(this).parent().attr("index");
  userInput = $(this).prev().val();
  userInput = myPlan[index];
  localStorage.setItem("userInput", JSON.stringify(myPlan));
});
$(".dlt").on("click", function (event) {
  event.preventDefault();
  // $(this).toggleClass(".dlt");
  if ($(".dlt").hasClass(".dlt")) $(this).remove(userInput);
});
