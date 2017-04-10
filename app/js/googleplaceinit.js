function initAutocompleteSearchBasic() {
  initAutocomplete('job-search-basic-place');
}

function initAutocomplete(inputId) {
  // Create the search box and link it to the UI element.
  var input = document.getElementById(inputId);
  var searchBox = new google.maps.places.SearchBox(input);
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    console.log(places[0]);
  });
}