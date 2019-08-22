var topics = ['kitten', 'puppy', 'bird', 'otter'];

function displayButtons() {
    $("#searchButtons").empty();
    for (x in topics) {
        var newButton = $("<button>");
        newButton.addClass("animals")
            .attr("data-info", topics[x])
            .text(topics[x]);
        $("#searchButtons").append(newButton);

    }
}

$(function() {

    displayButtons();
})