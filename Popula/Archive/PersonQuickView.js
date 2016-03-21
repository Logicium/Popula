/**
 * Created by Kisora on 2015-10-09.
 */

var userInfo;

$(document).ready(function() {
    getData();
    populateUserPic(userInfo);
    populateDefaultText(userInfo);

});

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            userInfo = xhttp.responseText;
            userInfo = JSON.parse(userInfo);
        }
    };
    xhttp.open("GET", "https://randomuser.me/api/", false);
    xhttp.send();
}

function populateUserPic(userInfo){
    $("#userImage").attr("src",userInfo.results[0].user.picture.medium);
}

function populateDefaultText(userInfo){
    var topText = "Hi, my name is";
    var bottomText = userInfo.results[0].user.name.first+" "+userInfo.results[0].user.name.last;
    setText(topText,bottomText);
}

$(function () {
    $("#nameButton").click(function () {
        var topText = "Hi, my name is";
        var bottomText = userInfo.results[0].user.name.first+" "+userInfo.results[0].user.name.last;
        setText(topText,bottomText);
    });
});

$(function () {
    $("#emailButton").click(function () {
        var topText = "My email address is";
        var bottomText = userInfo.results[0].user.email;
        setText(topText,bottomText);
    });
});

$(function () {
    $("#birthdayButton").click(function () {
        var topText = "My date of birth is";
        var bottomText = String( new Date(userInfo.results[0].user.dob * 1000));
        setText(topText,bottomText);
    });
});

$(function () {
    $("#addressButton").click(function () {
        var topText = "My home address is";
        var bottomText = userInfo.results[0].user.location.street;
        setText(topText,bottomText);
    });
});

$(function () {
    $("#phoneNumberButton").click(function () {
        var topText = "My phone number is";
        var bottomText = userInfo.results[0].user.phone;
        setText(topText,bottomText);
    });
});

$(function () {
    $("#moreButton").click(function () {
        var topText = "My phone number is";
        var bottomText = userInfo.results[0].user.phone;
        setText(topText,bottomText);
    });
});


function setText(topText,bottomText){
    $("#topText").text(topText);
    $("#bottomText").text(bottomText);
}