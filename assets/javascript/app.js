
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOpVVj2k7ONn7xFzicQomvok7rr11e1vs",
    authDomain: "rock-paper-scissors-34162.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-34162.firebaseio.com",
    projectId: "rock-paper-scissors-34162",
    storageBucket: "rock-paper-scissors-34162.appspot.com",
    messagingSenderId: "798109536929"
  };
  firebase.initializeApp(config);

  var database=firebase.database();

  // location for all connections
  var connectionsRef = database.ref("/connections");

  // the special firebase location that is updated when client connection states change
  var connectedRef = database.ref(".info/connected");

  // when the connection state changes (connectedRef is the firebase clent connection list)
  connectedRef.on("value", function(snapshot){
        // if they are connected... the val will be true
      if (snapshot.val()){
          // adds the user to our connections list
          var connection = connectionsRef.push(true);
          // removes them from our connections list if they disconnect
          connection.onDisconnect().remove();
      }
  });

  // when our connections list changes
  connectionsRef.on("value", function(snapshot){
    $('#numChildren').html(snapshot.numChildren());
  });

  database.ref().set({
      test:'hello world'
  });
