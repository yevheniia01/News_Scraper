
$.getJSON("/articles", function (data) {
    // For each one
   
    console.log(data[0])
    for (var i = 0; i < data.length; i++) {
        if (i === 5) { break; }
        console.log(data[0])
        var thisId = data[i]._id;
        // Display the apropos information on the page
        $.ajax({
            method:"GET",
            url: "/articles/" + thisId
        })
        .then(function(data){
           
            console.log(data, "input data");
           
            
        })
        var newDiv = $('<div id=' + i + '>')
        $(newDiv).append("<h1 id='fTitle'>"+data[i].title + "</h1>");
        $(newDiv).append("<p class='fSummary' data-id ='"+data[i]._id+"'>"+data[i].summary +"'" +'</p>');
        $(newDiv).append('<a class="fLink" href='+ data[i].link  +'>Link</a>'+"</br>"+"<div class='comment'></div>"+"<input class='bodyinput'></input>" + "<button data-id='" + data[i]._id + "' class='savenote' value = "+$("#bodyinput").val()+">Save Note</button>" )
       $(".display"). append(newDiv)

        //$(thisId).append("<textarea id='bodyinput' name='body'></textarea>")
        
       
        
        console.log(thisId)
    }
});





  var thisId = $(this).attr("data-id");
  var place;
  
// When you click the savenote button
$(document).on("click", '.savenote', function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log($(this), "this")
    //var $this = $(this)
    var thisbody = $(this).parent().children('.bodyinput').val()
    place=$(this).parent().children('.comment')
    console.log($(this).parent(), "parent")
    //var some = "hello"
    //$('#savenote').attr("value", thisbody)
    //var hey2 = $('#savenote').val()
    console.log(thisbody, "body")
    console.log(thisId, "id")
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            //title: $("#titleinput").val(),
            // Value taken from note textarea
            body: thisbody
        }
     }).then(function(err, data) {
         
            // Log the response
            //console.log(body)
            console.log(data.body, "body")
            console.log(data, "DATA");
            console.log(thisbody, "this body")
            //var place = $(this).parent()
            console.log($(this), "ffffffffffffffffff")
            $(place).append("<h4>"+thisbody+"</h4>")
            //$('.comment').text(data.note[0].body)
            console.log(data.note[0].body)
            
            
            // Empty the notes section
            //$("#notes").empty();
            
        });
        /*$.ajax({
            method:"GET",
            url: "/articles/" + thisId
            
        })
        .then(function(data){
           
            console.log(data, "input data");
           
            
        })*/

    // Also, remove the values entered in the input and textarea for note entry
    //$("#titleinput").val("");
    //$("#bodyinput").val("");
});
