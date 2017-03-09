// Initialize Firebase
var config = {
    apiKey: "AIzaSyChSG1kWfScNLEbrujhUVsAUioz-iHgOrw",
    authDomain: "myfirstfirebase-5f022.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-5f022.firebaseio.com",
    storageBucket: "myfirstfirebase-5f022.appspot.com",
    messagingSenderId: "701401392527"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//when the submit button is clicked, the following function will execute
$("#submit").on("click", function(event){
  event.preventDefault();

  // get user input from all text boxes
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#train-time").val().trim();
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    time: trainTime,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

   // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");


  // Prevents moving to new page
  return false;
});

// Create Firebase event for adding train to the database 
// and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().freq;

  // Prettify the employee start
//  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
//  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//  console.log(empMonths);

  // Calculate the total billed rate
//  var empBilled = empMonths * empRate;
//  console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency);
});
