var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#subscribe").prop("disabled", !connected);
        $("#send").prop("disabled", !connected);
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#launcher").html("");
}

function connect() {
    var socket = new SockJS( $("#url").val());
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
    
        stompClient.subscribe($("#topic").val(), function (platform) {
            showLauncher(platform);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function send() {
    stompClient.send($("#message-url").val(), {}, $("#message-text").val());
}

function subscribe(){
    stompClient.subscribe($("#topic").val(), function (platform) {
        showLauncher(platform);
    });
}

function showLauncher(message) {
    $("#launcher").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#subscribe" ).click(function() { subscribe(); });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { send(); });
});

