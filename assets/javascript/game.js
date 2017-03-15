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

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    time: trainTime,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

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

  //convert trainTime to epoch/unix time (# of minutes since 1970)
  var trainTimeConverted = ((moment(trainTime, "hh:mm")/1000))/60;
  console.log("CONVERTED TRAIN TIME: " + trainTimeConverted + " minutes");

  // create a variable for the current time in minutes
  var currentTime = ((moment()/1000))/60;
  console.log("CURRENT TIME: " + currentTime + " minutes");

  // find the number of minutes between the train time and current time
  var diffTime = currentTime - trainTimeConverted;
  console.log("DIFFERENCE IN TIME: " + diffTime + " minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log("TIME APART: " + tRemainder);
    
  // Minutes Until Train arrives
  var tMinutesTillTrain = Math.ceil(frequency - tRemainder);
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   
  // next arrival time for train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
