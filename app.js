var config = {
    apiKey: "AIzaSyAgEuXgOYwmHK_RqpVzMIJDRLD5ZB7UbbQ",
    authDomain: "rps-multi-7fedd.firebaseapp.com",
    databaseURL: "https://rps-multi-7fedd.firebaseio.com",
    storageBucket: "rps-multi-7fedd.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database(),
    listPlayers = database.ref("players"),
    selectedPlayer = database.ref("turn"),
    username = "Guest",
    playerInstance = null,
    turnNow = null,
    identifierPlayer = !1,
    presensePlayer1 = !1,
    presencePlayer2 = !1,
    firstPlayer = null,
    secondPlayer = null;