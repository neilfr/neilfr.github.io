// nominatim
//3359 Mississauga Rd, Mississauga, ON L5L 1C6
//open streets test
//var queryURL = "https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json&polygon=1&addressdetails=1";

//var address='3359+mississauga+road,+mississauga,+ontario,+canada';
/*var address='chico, california'
var queryURL = "https://nominatim.openstreetmap.org/search?q="+address+"&format=json&polygon=1&addressdetails=1";
$.ajax({
    url: queryURL,
    method: "GET"    
}).then(function(response){
    console.log("nominatim response")
    console.log(response);
    var resultData=response.data;
});
*/

//newswire
/*
var myValue='Odie+'
var url = 'https://newsapi.org/v2/everything?' +
          'q='+
          myValue+
          '&from=2018-11-01&' +
          'sortBy=popularity&' +
          'apiKey=c3dbd1d351404b2195ebc9d349503d2f';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })
*/

//from health canada recall site
function getRecent(lang) {
    var base = 'http://healthycanadians.gc.ca/recall-alert-rappel-avis';
    var uri = base + '/api/recent/' + lang;
    $.ajax({
        url:uri,
        type:'GET',
        Accept:"application/json",
        dataType: 'json',
        success:function(data){
            var frag = document.createDocumentFragment();
            for (var i=0; i<data.results.ALL.length; i++) {
                var a = document.createElement("a");
                var title = document.createTextNode(data.results.ALL[i].title);
                a.appendChild(title);
                a.setAttribute("href", base + data.results.ALL[i].url);
                frag.appendChild(a);
                frag.appendChild(document.createElement("br"));
            }
            $("#responses")[0].appendChild(frag);
        },
        error:function(error){
        },
    });
    return;
};			
var lang='english';
getRecent(lang);
/*
var queryURL = "http://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/";
$.ajax({
    url: queryURL,
    type: "GET",
    Accept:"application/json",
    dataType: 'json'
}).then(function(response){
    console.log("recall response")
    console.log(response);
});
*/
