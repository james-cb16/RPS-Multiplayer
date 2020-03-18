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

function reformat(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}

function enterRound() {
    var e = database.ref("/chat/" + Date.now());
    playerInstance < 2 ? (identifierPlayer = presensePlayer1 ? 2 : 1, playerRef = database.ref("/players/" + identifierPlayer), playerRef.set({
        name: username,
        wins: 0,
        losses: 0,
        choice: null
    }), playerRef.onDisconnect().remove(), selectedPlayer.onDisconnect().remove(), e.onDisconnect().set({
        name: username,
        time: firebase.database.ServerValue.TIMESTAMP,
        message: "has disconnected.",
        idNum: 0
    }), $("#switch").empty(), $("#switch").append($("<h2>").text("You have entered the game " + username + "! Player: " + identifierPlayer))) : alert("Game is currently full.")
}

function gameFunctionality(e, a) {
    var r = function () {
        $("#result h2").text(firstPlayer.name + " Wins!"), 1 === identifierPlayer && (listPlayers.child("1").child("wins").set(firstPlayer.wins + 1), listPlayers.child("2").child("losses").set(secondPlayer.losses + 1))
    },
        s = function () {
            $("#result h2").text(secondPlayer.name + " Wins!"), 2 === identifierPlayer && (listPlayers.child("2").child("wins").set(secondPlayer.wins + 1), listPlayers.child("1").child("losses").set(firstPlayer.losses + 1))
        },
        t = function () {
            $("#result h2").text("Tie Game!")
        };
    "Rock" === e && "Rock" === a ? t() : "Paper" === e && "Paper" === a ? t() : "Scissors" === e && "Scissors" === a ? t() : "Rock" === e && "Paper" === a ? s() : "Rock" === e && "Scissors" === a ? r() : "Paper" === e && "Rock" === a ? r() : "Paper" === e && "Scissors" === a ? s() : "Scissors" === e && "Rock" === a ? s() : "Scissors" === e && "Paper" === a && r()
}
$("#start").click(function () {
    "" !== $("#username").val() && (username = reformat($("#username").val()), enterRound())
}), $("#username").keypress(function (e) {
    13 === e.which && "" !== $("#username").val() && (username = reformat($("#username").val()), enterRound())
}), $(document).on("click", "li", function () {
    console.log("click");
    var e = $(this).text();
    console.log(playerRef), playerRef.child("choice").set(e), $("#player" + identifierPlayer + " ul").empty(), $("#player" + identifierPlayer + "chosen").text(e), selectedPlayer.transaction(function (e) {
        return e + 1
    })
}), listPlayers.on("value", function (e) {
    playerInstance = e.numChildren(), presensePlayer1 = e.child("1").exists(), presencePlayer2 = e.child("2").exists(), firstPlayer = e.child("1").val(), secondPlayer = e.child("2").val(), presensePlayer1 ? ($("#player1-name").text(firstPlayer.name), $("#player1-wins").text("Wins: " + firstPlayer.wins), $("#player1-losses").text("Losses: " + firstPlayer.losses)) : ($("#player1-name").text("Waiting for Player 1"), $("#player1-wins").empty(), $("#player1-losses").empty()), presencePlayer2 ? ($("#player2-name").text(secondPlayer.name), $("#player2-wins").text("Wins: " + secondPlayer.wins), $("#player2-losses").text("Losses: " + secondPlayer.losses)) : ($("#player2-name").text("Waiting for Player 2"), $("#player2-wins").empty(), $("#player2-losses").empty())
}), selectedPlayer.on("value", function (e) {
    if (turnNow = e.val(), identifierPlayer)
        if (1 === turnNow) turnNow === identifierPlayer ? ($("#current-turn h2").text("It's Your Turn!"), $("#player" + identifierPlayer + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>")) : $("#current-turn h2").text("Waiting for " + firstPlayer.name + " to choose."), $("#player1").css("border", "2px solid yellow"), $("#player2").css("border", "1px solid black");
        else if (2 === turnNow) turnNow === identifierPlayer ? ($("#current-turn").text("It's Your Turn!"), $("#player" + identifierPlayer + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>")) : $("#current-turn").text("Waiting for " + secondPlayer.name + " to choose."), $("#player2").css("border", "2px solid yellow"), $("#player1").css("border", "1px solid black");
        else if (3 === turnNow) {
            gameFunctionality(firstPlayer.choice, secondPlayer.choice), $("#player1-chosen").text(firstPlayer.choice), $("#player2-chosen").text(secondPlayer.choice);
            setTimeout(function () {
                $("#player1-chosen").empty(), $("#player2-chosen").empty(), $("#result").empty(), presensePlayer1 && presencePlayer2 && selectedPlayer.set(1)
            }, 2e3)
        } else $("#player1 ul").empty(), $("#player2 ul").empty(), $("#current-turn").html("<h2>Waiting for another player to join.</h2>"), $("#player2").css("border", "1px solid black"), $("#player1").css("border", "1px solid black")
}), listPlayers.on("child_added", function (e) {
    1 === playerInstance && selectedPlayer.set(1)
});