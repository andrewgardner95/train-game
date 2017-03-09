//when the search button is clicked, the following function will execute
$("#submit").on("click", function(event){

  // get user input from all text boxes and loggs it
  var trainName = $("#train-name").val().trim();
  console.log(trainName);

  var destination = $("#destination").val().trim();
  console.log(destination);

  var trainTime = $("#train-time").val().trim();
  console.log(trainTime);

  var frequency = $("#frequency").val().trim();
  console.log(frequency);

});