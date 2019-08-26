var topics = ['kitten', 'puppy', 'bird', 'otter'];

function checkLocal() {
    if (localStorage.topics) {
        topics = JSON.parse(localStorage.topics);
    }
}

function displayButtons() {
    $("#searchButtons").empty();
    checkLocal();
    for (x in topics) {
        var newButton = $("<button>");
        newButton.addClass("topic")
            .attr("data-info", topics[x])
            .attr("data-offset", 0)
            .text(topics[x]);
        $("#searchButtons").append(newButton);

    }
}

$(document).on("click", ".topic", function(e) {
    if (e.ctrlKey) {
        checkLocal();
        var remove = $(this).text();
        topics.splice(topics.indexOf(remove), 1);
        localStorage.topics = JSON.stringify(topics);
        displayButtons();
        return false;
    }
    var search = $(this).attr("data-info");
    var offset = parseInt($(this).attr("data-offset"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XQiqB5T5zXzeN0k6dUAvPr4MV7P2U2hE&q=" + search + "&limit=10&offset=" + offset;
    offset += 10;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var data = response.data;
        if (data.length <= 0) {
            alert("Sorry, no images found.  Removing button");
            $('.topic[data-info = "' + search + '"').remove();
        }
        for (x in data) {
            if (x % 3 === 0) {
                var newRow = $("<div>");
                newRow.addClass("row");
            }
            var newCol = $("<div>");
            newCol.addClass("col-sm-4 text-center my-2");
            var newImg = $("<img>");
            newImg.attr("data-static", data[x].images.fixed_height_still.url)
                .attr("data-animate", data[x].images.fixed_height.url)
                .attr("data-state", "static")
                .attr("src", data[x].images.fixed_height_still.url)
                .addClass("gif")
                .appendTo(newCol);
            newCol.append("<br>Rating: " + data[x].rating.toUpperCase());
            newRow.append(newCol)
                .prependTo($("#gifDisplay"));
        }
    })
    $(this).attr("data-offset", offset);
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var static = $(this).attr("data-static");
    var animate = $(this).attr("data-animate");
    if (state === "static") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", animate);
    } else {
        $(this).attr("data-state", "static");
        $(this).attr("src", static);
    }
});

displayButtons();

$("#addButton").click(function(event) {

    event.preventDefault();

    var newTopic = $("#searchInput").val().trim();
    if (newTopic.length > 0) {
        topics.push(newTopic);
        localStorage.topics = JSON.stringify(topics);
        $("#searchInput").val("");
        displayButtons();
    } else {
        alert("Please enter a topic!");
        $("#searchInput").val("");
    }
})