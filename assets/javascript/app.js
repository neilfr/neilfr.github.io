//build the query, submit the get request, and capture the response
var queryURL = "https://api.traveltimeapp.com/v4/time-map";
$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        'X-Application-Id': '7d572579',
        'X-Api-Key': '32ed19950814b4b544dece36c6c77f72'
    }
}).then(function(response){
    console.log(response);
    var resultData=response.data;
});

