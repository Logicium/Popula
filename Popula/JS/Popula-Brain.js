/**
 * Created by Kisora on 2015-10-07.
 */

/*******************************************************/
//INITIAL SETUP SECTION

var users = [];
var personInfo;
var places = [];
var placeInfo;


$(document).ready(function () {
    loadAllWebData();
    setupToolTips();
    hideAllOutputDivs();
    setPeopleToDisplay();
    setPlacesToDisplay();

});

function setupToolTips() {
    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .appendTo(this);
            }
        }
    });
}

function initializeGoogleMapImage(lat, long, header) {
    //header = placeImageHeader || placesImageDiv
    var mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map1 = new google.maps.Map(document.getElementById("placeImageHeader"), mapProp);
    var map2 = new google.maps.Map(document.getElementById("placesImageDiv"), mapProp);
}

function loadAllWebData() {
    loadPeopleObjects();
    loadPlacesObjects();
}

function loadPeopleObjects() {
    for (var i = 0; i < 20; i++) {
        loadPersonObject();
        users[i] = personInfo.results[0].user;
    }
}

function loadPlacesObjects() {
    loadPlaceObject();
    //places = placeInfo;
}

function loadPersonObject() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            personInfo = xhttp.responseText;
            personInfo = JSON.parse(personInfo);
        }
    };
    xhttp.open("GET", "https://randomuser.me/api/", false);
    xhttp.send();
}

function loadPlaceObject() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            places = xhttp.responseText;
            places = JSON.parse(places);
        }
    };
    xhttp.open("GET", "https://restcountries.eu/rest/v1/all", false);
    xhttp.send();
}

function setPeopleToDisplay() {

    for (var i = 0; i < users.length - 1; i++) {
        var startString = "<div class=\"person hvr-shrink\" title=\"\" id=\"person" + i +
            "\" data-person=\"blank\" " +
            "style=\"height:90px;width:90px;border-radius:64px;overflow:hidden;\"><img src=";
        var userImage = String(users[i].picture.thumbnail);
        startString = startString.concat("\"" + userImage + "\" class=\"roundImage hvr-fade\"/></div><br>");
        $("#imageContainer").append(startString);
    }
    assignPersonObjectToImage();
}

function assignPersonObjectToImage() {

    for (var i = 0; i < users.length - 1; i++) {
        var personID = "person".concat(String(i));
        $('#' + personID).data('person', JSON.stringify(users[i]));
        $('#' + personID).attr('title', capitalizeFirstLetter(users[i].name.first) + " " +
            capitalizeFirstLetter(users[i].name.last));
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setPlacesToDisplay() {
    for (var i = 0; i < places.length - 1; i++) {
        var startString = "<div class=\"place hvr-shrink\" title=\"\" id=\"place" + i +
            "\" data-place=\"blank\">";
        startString = startString.concat(places[i].altSpellings[0]);
        startString = startString.concat("</div><br><br>");
        $('#placeImageContainer').append(startString);
    }
    assignPlaceObjectToImage();
}

function assignPlaceObjectToImage() {
    var backgrounds = ["midnightblue", "dodgerblue", "lightskyblue",
        "mediumturquoise", "mediumseagreen", "limegreen", "springgreen", "gold"];
    for (var i = 0; i < places.length - 1; i++) {
        var placeID = "place".concat(String(i));
        $('#' + placeID).data('place', JSON.stringify(places[i]));
        $('#' + placeID).attr('title', places[i].name);
        $('#' + placeID).css('backgroundColor', backgrounds[i % backgrounds.length]);
    }
}


/************************************************************************/
//SEARCH FUNCTIONS

var searchRequest = "";
var peopleResults = [];
var placesResults = [];

$(document).ready(function () {
    $('#searchHeader').on('submit', function (e) {
        e.preventDefault();
        removePreviousResults();
        hideAllOutputDivs();
        getCommand();
        dropSearchResultsView();
    });
});

function getCommand() {
    searchRequest = document.getElementById("search").value;
    document.getElementById("search").value = "";
    searchFor();
}

function searchFor() {
    searchThroughPeople();
    searchThroughPlaces();
    displayResults();
    bindResults();
    resetResults();
}

function bindResults(){
    $( ".person" ).click(function () {
        console.log("person class clicked");
        hidePreviousView();
        var personID = String($(this).attr("id"));
        personID = '#' + personID;
        var personObject = JSON.parse($(personID).data('person'));
        personInfo = personObject;
        setupPersonQuickView(personObject);
        $("#peopleQuickView").fadeIn(1000);
    });

    $( ".place" ).click(function() {
        console.log("Place clicked");
        hidePreviousView();
        var placeID = String($(this).attr("id"));
        console.log(placeID);
        placeID = '#' + placeID;
        var placeObject = JSON.parse($(placeID).data('place'));
        placeInfo = placeObject;
        setupPlacesQuickView(placeObject);
        $("#placesQuickView").fadeIn(1000);
    });

}

function searchThroughPeople() {

    //Extra Credit-- Use Text normalization to improve results
    //IE: Lower-case, punctuation removal, the usual.

    for (var i = 0; i < users.length - 1; i++) {
        if (searchRequest==users[i].name.first) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].name.last)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].location.street)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].location.city)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].location.state)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].location.zip)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].username)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].password)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].phone)) {
            peopleResults.push(users[i]);
        }
        if (searchRequest==(users[i].cell)) {
            peopleResults.push(users[i]);
        }
    }
}

function searchThroughPlaces() {
    for (var i = 0; i < places.length - 1; i++) {
        if (searchRequest==(places[i].name)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].capital)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].region)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].subregion)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].timezones)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].alpha2Code)) {
            placesResults.push(places[i]);
        }
        if (searchRequest==(places[i].alpha3Code)) {
            placesResults.push(places[i]);
        }
    }
}

function displayResults() {
    displayPersonResults();
    displayPlaceResults();
}


function displayPersonResults() {
    for (var i = 0; i < peopleResults.length; i++) {
        var startString = "<div class=\"person\" title=\"\" id=\"personResult" + i +
            "\" data-person=\"blank\" " +
            "><img src=";
        var userImage = String(peopleResults[i].picture.thumbnail);
        startString = startString.concat("\"" + userImage + "\" class=\"roundImage\"/></div><br>");
        $("#personResultsContainer").append(startString);
    }
    assignPersonObjectToSearchResults();
}

function assignPersonObjectToSearchResults() {

    for (var i = 0; i < peopleResults.length; i++) {
        var personID = "personResult".concat(String(i));
        $('#' + personID).data('person', JSON.stringify(peopleResults[i]));
        $('#' + personID).attr('title', capitalizeFirstLetter(peopleResults[i].name.first) + " " +
            capitalizeFirstLetter(peopleResults[i].name.last));
    }
}


function displayPlaceResults() {
    for (var i = 0; i < placesResults.length; i++) {
        var startString = "<div class=\"place hvr-shrink\" title=\"\" id=\"placeResult" + i +
            "\" data-place=\"blank\">";
        startString = startString.concat(placesResults[i].altSpellings[0]);
        startString = startString.concat("</div><br><br>");
        $('#placesResultsContainer').append(startString);
    }
    assignPlaceObjectToSearchResults();
}

function assignPlaceObjectToSearchResults() {
    var backgrounds = ["midnightblue", "dodgerblue", "lightskyblue",
        "mediumturquoise", "mediumseagreen", "limegreen", "springgreen", "gold"];
    for (var i = 0; i < placesResults.length; i++) {
        var placeID = "placeResult".concat(String(i));
        $('#' + placeID).data('place', JSON.stringify(placesResults[i]));
        $('#' + placeID).attr('title', placesResults[i].name);
        $('#' + placeID).css('backgroundColor', backgrounds[i % backgrounds.length]);
    }
}

function removePreviousResults(){
    $("#placesResultsContainer").remove();
    $("#personResultsContainer").remove();
    var refreshedDivPerson = "<div id=\"personResultsContainer\"></div>";
    var refreshedDivPlaces = "<div id=\"placesResultsContainer\"></div>";
    $("#personResults").append(refreshedDivPerson);
    $("#placesResults").append(refreshedDivPlaces);
}

function resetResults() {
    peopleResults = [];
    placesResults = [];
}


/**********************************************************************************************/
//PRIMARY BEHAVIOUR SECTION

//PERSON CLASS IS CLICKED
$(function () {
    $(".person").click(function () {
        console.log("person class clicked");
        hidePreviousView();
        var personID = String($(this).attr("id"));
        personID = '#' + personID;
        var personObject = JSON.parse($(personID).data('person'));
        personInfo = personObject;
        setupPersonQuickView(personObject);
        dropPeopleQuickView();
    });
});

//PLACE CLASS IS CLICKED
$(function () {
    $(".place").click(function () {
        console.log("Place clicked");
        hidePreviousView();
        var placeID = String($(this).attr("id"));
        console.log(placeID);
        placeID = '#' + placeID;
        var placeObject = JSON.parse($(placeID).data('place'));
        placeInfo = placeObject;
        setupPlacesQuickView(placeObject);
        dropPlacesQuickView();
    });
});

function setupPersonQuickView() {
    clearColors();
    changeColor("nameButton");
    populateUserPic(personInfo);
    populateDefaultPersonText(personInfo);
}

function setPlaceText(topText, bottomText) {
    $('#placeTopText').text(topText);
    $('#placeBottomText').text(bottomText);
}

function populateDefaultPlaceText(placeObject) {
    var topText = "Welcome to beautiful";
    var bottomText = placeObject.name;
    setPlaceText(topText, bottomText);
}

function populatePlacePic(placeObject) {
    initializeGoogleMapImage(placeObject.latlng[0], placeObject.latlng[1]);
}

function setupPlacesQuickView(placeObject) {
    clearColors();
    changeColor("placeNameButton");
    populatePlacePic(placeObject);
    populateDefaultPlaceText(placeObject);
}

function populateUserPic(personInfo) {
    $("#userImage").attr("src", personInfo.picture.medium);
}

function populateDefaultPersonText(personInfo) {
    var topText = "Hi, my name is";
    var bottomText = capitalizeFirstLetter(personInfo.name.first) +
        " " + capitalizeFirstLetter(personInfo.name.last);
    setPersonText(topText, bottomText);
}

/************PEOPLE QUICK VIEW BUTTON CLICKS***************************/

$(function () {
    $("#nameButton").click(function () {
        clearColors();
        changeColor("nameButton");
        var topText = "Hi, my name is";
        var bottomText = capitalizeFirstLetter(personInfo.name.first) + " " +
            capitalizeFirstLetter(personInfo.name.last);
        setPersonText(topText, bottomText);
    });
});

$(function () {
    $("#emailButton").click(function () {
        clearColors();
        changeColor("emailButton");
        var topText = "My email address is";
        var bottomText = personInfo.email;
        setPersonText(topText, bottomText);
    });
});

$(function () {
    $("#birthdayButton").click(function () {
        clearColors();
        changeColor("birthdayButton");
        var topText = "My date of birth is";
        var bottomText = String(new Date(personInfo.dob * 1000));
        setPersonText(topText, bottomText);
    });
});

$(function () {
    $("#addressButton").click(function () {
        clearColors();
        changeColor("addressButton");
        var topText = "My home address is";
        var bottomText = personInfo.location.street;
        setPersonText(topText, bottomText);
    });
});

$(function () {
    $("#phoneNumberButton").click(function () {
        clearColors();
        changeColor("phoneNumberButton");
        var topText = "My phone number is";
        var bottomText = personInfo.phone;
        setPersonText(topText, bottomText);
    });
});

$(function () {
    $("#moreButton").click(function () {
        clearColors();
        hidePersonQuickView();
        findPersonsCountry();
        dropPlacesQuickView();
    });
});

$(function () {
    $("#userImage").click(function () {
        clearColors();
        hidePersonQuickView();
        setupPersonFullView();
        showPersonFullView();
    });
});

$(function () {
    $("#personFullViewImage").click(function () {
        clearColors();
        hidePreviousView();
        setupPersonQuickView();
        fadeInPeopleQuickView();
    });
});



function findPersonsCountry() {
    var searchZipcode = personInfo.location.zip;
    getZipcodeData(searchZipcode);
    found = false;
    for (var i = 0; i < places.length - 1; i++) {
        if (String(places[i].alpha2Code)==(extraData.country)) {
            placeInfo = places[i];
            found = true;
            setupPlacesQuickView(places[i]);
            return;
        }
    }
    if ((found == false)) {
        $("#dialog").dialog({
            height: 80,
            width: 350,
            modal: true,
            resizable: false,
            dialogClass: 'no-close'
        });
    }
}

var extraData;

function getZipcodeData(searchZipcode) {
    var searchString = "http://ziptasticapi.com/";
    searchString = searchString.concat(searchZipcode);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            extraLocationData = xhttp.responseText;
            extraLocationData = JSON.parse(extraLocationData);
            console.log(extraLocationData);
            extraData = extraLocationData;
        }
    };
    xhttp.open("GET", searchString, false);
    xhttp.send();
}

/*********PLACES QUICK VIEW BUTTON CLICK**************************/


$(function () {
    $("#placeNameButton").click(function () {
        clearColors();
        changeColor("placeNameButton");
        var topText = "Welcome to beautiful";
        var bottomText = placeInfo.name;
        setPlaceText(topText, bottomText);
    });
});

$(function () {
    $("#subRegionButton").click(function () {
        clearColors();
        changeColor("subRegionButton");
        var topText = "Our subregion is";
        var bottomText = placeInfo.subregion;
        setPlaceText(topText, bottomText);
    });
});

$(function () {
    $("#populationButton").click(function () {
        clearColors();
        changeColor("populationButton");
        var topText = "Our population is";
        var bottomText = placeInfo.population;
        setPlaceText(topText, bottomText);
    });
});

$(function () {
    $("#capitalButton").click(function () {
        clearColors();
        changeColor("capitalButton");
        var topText = "Our capital city is";
        var bottomText = placeInfo.capital;
        setPlaceText(topText, bottomText);
    });
});

$(function () {
    $("#languagesButton").click(function () {
        clearColors();
        changeColor("languagesButton");
        var topText = "Our languages are";
        var bottomText = "";
        for (var i = 0; i < placeInfo.languages.length - 1; i++) {
            bottomText = bottomText.concat(placeInfo.languages[i] + " ");
        }
        setPlaceText(topText, bottomText);
    });
});

$(function () {
    $("#placeMoreButton").click(function () {
        clearColors();
        hidePlacesQuickView();
        setupPlacesFullView();
        showPlacesFullView();
    });
});


/******************************************************************/

function clearColors() {
    //Places QV Buttons
    $("#placeNameButton").css('background', "rgba(255, 255, 255, 0)");
    $("#subRegionButton").css('background', "rgba(255, 255, 255, 0)");
    $("#populationButton").css('background', "rgba(255, 255, 255, 0)");
    $("#capitalButton").css('background', "rgba(255, 255, 255, 0)");
    $("#languagesButton").css('background', "rgba(255, 255, 255, 0)");
    //People QV Buttons
    $("#nameButton").css('background', "rgba(255, 255, 255, 0)");
    $("#emailButton").css('background', "rgba(255, 255, 255, 0)");
    $("#birthdayButton").css('background', "rgba(255, 255, 255, 0)");
    $("#addressButton").css('background', "rgba(255, 255, 255, 0)");
    $("#phoneNumberButton").css('background', "rgba(255, 255, 255, 0)");

}


function changeColor(buttonID) {
    $("#" + buttonID).css('background', "#2ecc40");

    //Better color animation below but is not working.

    //$("#"+buttonID).animate({
    //    background: "rgba(141, 255, 250, 0.5)"
    //}, 1000 );
}

function setPersonText(topText, bottomText) {
    $("#topText").text(topText);
    $("#bottomText").text(bottomText);
}


/**********************************************************************/
//PERSON FULL VIEW SECTION

function setupPersonFullView() {
    populatePersonFullData();
}

function populatePersonFullData() {
    populateFullViewPersonPic();
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

function populateFullViewPersonPic() {
    $("#personFullViewImage").attr('src', personInfo.picture.medium);
}

function populatePersonName() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Name: </div>" +
        "<div class=\"fullViewLeftText\">" + capitalizeFirstLetter(personInfo.name.title) +
        " " + capitalizeFirstLetter(personInfo.name.first) +
        " " + capitalizeFirstLetter(personInfo.name.last) + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonGender() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Gender: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.gender + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonLocation() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Location: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.location.street +
        " " + capitalizeFirstLetter(personInfo.location.city) +
        " " + capitalizeFirstLetter(personInfo.location.state) +
        " " + personInfo.location.zip + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonEmail() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Email: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.email + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonUsername() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Username: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.username + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonPassword() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Password: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.password + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonDOB() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Date of Birth: </div>" +
        "<div class=\"fullViewLeftText\">" +
        String(new Date(personInfo.dob * 1000)) + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonPhone() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Phone Number: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.phone + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonCell() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Cell Phone Number: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.cell + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonDNI() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">DNI: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.dni + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonNationality() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Nationality: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.nationality + "</div></div>";
    $('#personInfoDiv').append(divString);
}

function populatePersonMD5() {
    var divString = "<div class=\"personFullViewInfo\">" +
        "<div class=\"fullViewRightText\">MD5: </div>" +
        "<div class=\"fullViewLeftText\">" + personInfo.md5 + "</div></div>";
    $('#personInfoDiv').append(divString);
}

/******************************************************************************/
//PLACES FULL VIEW

function setupPlacesFullView() {
    populatePlacesData();
}

function populatePlacesData() {
    populateCountryName();
    populateCountryCapital();
    populateCountryAlternateSpellings();
    populateCountryRegion();
    populateCountrySubregion();
    populateCountryTranslations();
    populateCountryPopulation();
    populateCountryLatLong();
    populateCountryDemonym();
    populateCountryArea();
    populateCountryGini();
    //populateCountryTimezones();
    populateCountryBorders();
    populateCountryNativeName();
    populateCountryCallingCodes();
    populateCountryTopLevelDomain();
    populateCountryAlpha2Code();
    populateCountryNameAlpha3Code();
    populateCountryCurrencies();
    populateCountryLanguages();
}


function populateCountryName() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Country Name: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.name + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryCapital() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Capital City: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.capital + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryAlternateSpellings() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Alternate Spellings: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.altSpellings.length - 1; i++) {
        divString = divString.concat(placeInfo.altSpellings[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryRegion() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Region: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.region + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountrySubregion() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Subregions: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.subregions + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryTranslations() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Translations: </div>" +
        "<div class=\"fullViewLeftText\">";
    divString = divString.concat(placeInfo.translations.de + " ");
    divString = divString.concat(placeInfo.translations.es + " ");
    divString = divString.concat(placeInfo.translations.fr + " ");
    divString = divString.concat(placeInfo.translations.ja + " ");
    divString = divString.concat(placeInfo.translations.it + " ");
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryPopulation() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Population: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.population + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryLatLong() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Latitude & Longitude: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.latlng.length - 1; i++) {
        divString = divString.concat(placeInfo.latlng[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryDemonym() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Demonym: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.demonym + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryArea() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Area: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.area + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryGini() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Gini: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.gini + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryTimezones() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Timezones: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.timezones.length - 1; i++) {
        divString = divString.concat(placeInfo.timezones[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryBorders() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Borders: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.borders.length - 1; i++) {
        divString = divString.concat(placeInfo.borders[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryNativeName() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Country Native Name: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.nativeName + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryCallingCodes() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Calling Codes: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.callingCodes.length - 1; i++) {
        divString = divString.concat(placeInfo.callingCodes[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryTopLevelDomain() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Top Level Domains: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.topLevelDomain.length - 1; i++) {
        divString = divString.concat(placeInfo.topLevelDomain[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryAlpha2Code() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Alpha2Code: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.alpha2Code + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryNameAlpha3Code() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Alpha3Code: </div>" +
        "<div class=\"fullViewLeftText\">" + placeInfo.alpha3Code + "</div></div>";
    $('#placesInfoDiv').append(divString);
}

function populateCountryCurrencies() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Currencies: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.currencies.length - 1; i++) {
        divString = divString.concat(placeInfo.currencies[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}

function populateCountryLanguages() {
    var divString = "<div class=\"placesFullViewInfo\">" +
        "<div class=\"fullViewRightText\">Languages: </div>" +
        "<div class=\"fullViewLeftText\">";
    for (var i = 0; i < placeInfo.languages.length - 1; i++) {
        divString = divString.concat(placeInfo.languages[i] + " ");
    }
    divString = divString.concat("</div></div>");
    $('#placesInfoDiv').append(divString);
}


/**********************************************************************************/
//Output Behaviour Section

function hideAllOutputDivs() {
    hidePersonQuickView();
    hidePeopleFullView();
    hideSearchResultsView();
    hidePlacesQuickView();
    hidePlacesFullView();
}

function hidePreviousView() {
    hideAllOutputDivs();
}

function hidePersonQuickView() {
    $('#peopleQuickView').hide();
}

function hidePlacesQuickView() {
    $('#placesQuickView').hide();
}

function hideSearchResultsView() {
    $('#searchResultsView').hide();
}

function hidePeopleFullView() {
    $('#peopleFullView').hide();
}

function hidePlacesFullView() {
    $('#placesFullView').hide();
}

function dropPeopleQuickView() {
    $('#peopleQuickView').show("drop", { direction: "left", easing:"easeInOutCirc" }, 800);
}

function dropPlacesQuickView() {
    $('#placesQuickView').show("drop", { direction: "right", easing:"easeInOutCirc" }, 800);
}

function dropSearchResultsView() {
    $('#searchResultsView').fadeIn(1000);
}

function fadeInPeopleQuickView(){
    $('#peopleQuickView').fadeIn(1000);
}

function showPersonFullView() {
    $('#peopleFullView').fadeIn(1000);
}

function showPlacesFullView() {
    $('#placesFullView').fadeIn(1000);
}
