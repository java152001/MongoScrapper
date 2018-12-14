$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    
        $("#articles").append(
            "<div class='card'><div class='card-header'><strong>"
            + data[i].title + "</strong></div><div class='card-body'><p data-id='"
            + data[i]._id + "' class='card-text'>"
            + data[i].link + "</p></div></div>"
        )
        
    }
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    var thisID = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisID
    })
    .then(function(data) {
        console.log(data);
        $("#notes").append("<div class='row'><h2>" + data.title + "</h2></div>");
        $("#notes").append("<br><div class='row'><div class='input-group'><div class='input-group-prepend'><span class='input-group-text'>Title</span><input type='text' class='form-control' id='titleinput' name='title'></input></div></div></div>");
        $("#notes").append("<br><div class='row'><div class='form-group'><label for='bodyinput'>Note Body: </label><textarea class='form-control' id='bodyinput' rows='3'></textarea></div></div>");
        $("#notes").append("<div class='row'><button type='button' class='btn btn-success' data-id='" + data._id + "' id='savenote'>Save Note</button></div>");

        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        console.log(data); 
        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});