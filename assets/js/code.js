var topics = ['kitten', 'puppy', 'bird', 'otter'];

function displayButtons() {
    $("#searchButtons").empty();
    for (x in topics) {
        var newButton = $("<button>");
        newButton.addClass("topic")
            .attr("data-info", topics[x])
            .text(topics[x]);
        $("#searchButtons").append(newButton);

    }
}

$(document).on("click", ".topic", function() {
    var search = $(this).attr("data-info");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XQiqB5T5zXzeN0k6dUAvPr4MV7P2U2hE&q=" + search + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var data = response.data;
        var static = "";
        var animate = "";
        for (x in data) {
            var newDiv = $("<div>");
            newDiv.addClass("left");
            var newImg = $("<img>");
            newImg.attr("data-static", data[x].images.fixed_height_still.url)
                .attr("data-animate", data[x].images.fixed_height.url)
                .attr("data-state", "static")
                .attr("src", data[x].images.fixed_height_still.url)
                .addClass("gif")
                .appendTo(newDiv);
            newDiv.append("Rating: " + data[x].rating)
                .prependTo($("#gifDisplay"));
        }
    })
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var static = $(this).attr("data-static");
    var animate = $(this).attr("data-animate");
    console.log(state, static, animate);

    if (state === "static") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", animate);
    } else {
        $(this).attr("data-state", "static");
        $(this).attr("src", static);
    }
});


$(function() {

    displayButtons();

})