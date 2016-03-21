/**
 * Created by Kisora on 2015-10-11.
 */

var personInfo;

$(document).ready(function() {
    getData();
    populateFullViewPersonPic(personInfo);
    populatePersonFullData();
});

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            personInfo = xhttp.responseText;
            personInfo = JSON.parse(personInfo);
            personInfo = personInfo.results[0].user;
        }
    };
    xhttp.open("GET", "https://randomuser.me/api/", false);
    xhttp.send();
}

function populateFullViewPersonPic(){
    $("#personFullViewImage").attr("src",personInfo.picture.medium);
}

function populatePersonFullData(){
    populatePersonName();
    populatePersonDOB();
    populatePersonGender();
    populatePersonLocation();
    populatePersonNationality();
    populatePersonEmail();
    populatePersonUsername();
    populatePersonPassword();
    populatePersonPhone();
    populatePersonCell();
    populatePersonDNI();
    populatePersonMD5();
}

function populatePersonName(){
   var divString = "<div class=\"personFullViewInfo\">" +
       "<div class=\"fullViewRightText\">Name: </div>" +
       "<div class=\"fullViewLeftText\">"+personInfo.name.title+
       " "+personInfo.name.first+
       " "+personInfo.name.last+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonGender(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Gender: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.gender+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonLocation(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Location: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.location.street+
        " "+personInfo.location.city+
        " "+personInfo.location.state+
        " "+personInfo.location.zip+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonEmail(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Email: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.email+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonUsername(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Username: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.username+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonPassword(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Password: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.password+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonDOB(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Date of Birth: </div>" +
        "<div class=\"fullViewLeftText\">"+
        String(new Date(personInfo.dob*1000))+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonPhone(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Phone Number: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.phone+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonCell(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Cell Phone Number: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.cell+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonDNI(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">DNI: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.DNI+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonNationality(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Nationality: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.nationality+"</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonMD5(){
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">MD5: </div>" +
        "<div class=\"fullViewLeftText\">"+personInfo.md5+"</div></div>";
    $('#personInfoDiv').append(divString);
}

