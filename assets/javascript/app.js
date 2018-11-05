//intialize the topic list
var topics = ['lions','aardvarks','platypus'];

//display buttons for topics
function renderButtons(){
    $("#topicButtons").empty(); // clears the html from #topicButtons so we don't keep duplicating the existing list
    for (var i=0; i<topics.length;i++){
        var myBtn=$("<button>");
        myBtn.addClass("topic");
        myBtn.attr("btnTopic",topics[i]);
        myBtn.text(topics[i]);
        $("#topicButtons").append(myBtn);
    }
}

function clickedGiphy(){
    var newSource;
    var $element=$(this);
    var state=$element.attr('giphyState');

    if(state==="still"){
        newSource=$element.attr('giphyURL');
        console.log("your new source is:");
        console.log(newSource);
        $element.attr('src',newSource);
        $element.attr('giphyState','giphy');
    }
    if(state==="giphy"){
        newSource=$element.attr('stillURL');
        console.log("your new source is:");
        console.log(newSource);
        $element.attr('src',newSource);
        $element.attr('giphyState','still');
    }
    
}


// adds topic to the topics array and re-renders the button list
$("#addTopic").on("click", function(event) {
    event.preventDefault(); // can't remember exactly why this is needed
    var topic = $("#topicInput").val();
    topics.push(topic);
    renderButtons();
});

// display giphys
function displayGiphys(){
    $('#resultsContainer').empty(); //clears the previous giphy list

    var $element=$(this);
    var topic=$element.attr('btnTopic');
    console.log("topic of button clicked is:");
    console.log(topic);

    //build the query, submit the get request, and capture the response
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=Y44NDKEHx6dsp5smn0MUNkIU6Ml60CPk&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var resultData=response.data;

        //append rating and still image for each of the returned items to the screen
        for (var i=0;i<resultData.length;i++){
            var $thisGiphyDiv=$('<div>'); //container for the elements for this object
            $thisGiphyDiv.addClass("giphyBlock");
            var $p=$('<p>');
            var $img=$('<img>');
            $img.addClass("giphy");
            $img.attr('giphyURL',resultData[i].images.fixed_height.url);
            $img.attr('stillURL',resultData[i].images.fixed_height_still.url);
            $img.attr('giphyState','still');
            $img.attr('src',resultData[i].images.fixed_height_still.url);
            $p.html("Rating: "+resultData[i].rating);            
            $thisGiphyDiv.append($img);
            $thisGiphyDiv.append($p);
            $('#resultsContainer').append($thisGiphyDiv);
        }
    })
}

// display the giphys when the button is clicked
$(document).on("click", ".topic", displayGiphys);

// display the giphys when the button is clicked
$(document).on("click", ".giphy", clickedGiphy);


// display initial button list
renderButtons();