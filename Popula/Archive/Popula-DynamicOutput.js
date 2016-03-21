/**
 * Created by Kisora on 2015-10-08.
 */

function hideAllOutputDivs(){
    hidePeopleQuickView();
    hidePeopleFullView();
    hideSearchResultsView();
    hidePlacesQuickView();
    hidePlacesFullView();
}

function hidePeopleQuickView(){
    $('#peopleQuickView').fadeOut(1000);
}

function hidePlacesQuickView(){
    $('#placesQuickView').fadeOut(1000);
}

function hideSearchResultsView(){
    $('#searchResultsView').fadeOut(1000);
}

function hidePeopleFullView(){
    $('#peopleFullView').fadeOut(1000);
}

function hidePlacesFullView(){
    $('#placesFullView').fadeOut(1000);
}

function showPeopleQuickView(){
    $('#peopleQuickView').fadeIn(1000);
}

function showPlacesQuickView(){
    $('#placesQuickView').fadeIn(1000);
}

function showSearchResultsView(){
    $('#searchResultsView').fadeIn(1000);
}

function showPeopleFullView(){
    $('#peopleFullView').fadeIn(1000);
}

function showPlacesFullView(){
    $('#placesFullView').fadeIn(1000);
}

function expandFromLeft(whichViewInQuestion){

}

function retractFromLeft(whichViewInQuestion){

}

function expandFromRight(){

}

function retractFromRight(){

}

function expandFromTop(){

}

function retractFromTop(){

}

function transitionFromStarttoEnd(viewStart,viewEnd){
    if(viewA.positionOrigin.match("left") &&
       viewA.positionOrigin.match("right")){

    }


}



