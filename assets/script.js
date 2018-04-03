
$(document).ready(function(event) {


  var sample = document.getElementById("foobar");
  sample.play();

  var topics = ['Zelda', 'Mario', 'StarFox', 'Pokemon'];
  

    function displayAllResults() {
      
    var x = $(this).data("search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=ForAKN8XmnrQclaePoKcGRq0hCL0l3Nj&limit=20";
  
    $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            $("#gifArea").empty();
            for (var i = 0; i < results.length; i++) {
            var displayDiv = $("<div class='col-md-4'>");
            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var gifyImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
  
            gifyImage.attr("src", staticSrc);
            gifyImage.addClass("datGiphy");
            gifyImage.attr("data-state", "still");
            gifyImage.attr("data-still", staticSrc);
            gifyImage.attr("data-animate", defaultAnimatedSrc);
            displayDiv.append(p);
            displayDiv.append(gifyImage);
            $("#gifArea").prepend(displayDiv);
  
          }
    });
  }
  
    $("#addItem").on("click", function(event) {
      event.preventDefault();
      var newItem = $("#userInput").val().trim();
        $("#userInput").val(newItem);
        topics.push(newItem);
        console.log(topics); 
        displayButtons(); 

        });
 
    function displayButtons(event) {
      $("#myButtons").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn-1">');
        a.attr("id", "item");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
      }
    }
  
    displayButtons();

    $(document).on("click", "#item", displayAllResults);
  
    $(document).on("click", ".datGiphy", pausePlayGifs);
  
    function pausePlayGifs(event) {
       var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  
  });


 