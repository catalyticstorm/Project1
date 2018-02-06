// JavaScript Document
//===============================
//Credits
//Sarah Stauber: Leader, Jscripter
//Anthony Knight: API's, JScripter
//Rebecca Brown: Front-End
//Eric Shae: JScript Compiler, Court Jesther, Booze & Snacks
//===============================


var eventTitleSelected;
var eventVenueSelected;
var restaurantNameSelected;
var restaurantRatingSelected;
var restaurantCitySelected;
var restaurantStateSelected;
	
var corsanywhere = 'https://cors-anywhere.herokuapp.com/';
var queryURLSearchYelp = 'https://api.yelp.com/v3/businesses/search';
var apiKeyYelp = 'Bearer -tcLAnA2QhhU9kQ60q8FVq5k0ltA27gBPn7OJtXxqfXEFWcur_Qm-7DKZGuoM9wKAQPrYa1fDsV4yJHBSHvKdnIAZU5yAMwg_NfJXX3or92lVQQSkpvcULui1wlxWnYx';

 // Initialize Firebase
 var config = {
 	apiKey: "AIzaSyDNzLkz1J-tdFkbsERtH1DGNOJy-QRDXMY",
 	authDomain: "dinnermovieapi.firebaseapp.com",
 	databaseURL: "https://dinnermovieapi.firebaseio.com",
 	projectId: "dinnermovieapi",
 	storageBucket: "",
 	messagingSenderId: "658504571017"
 };
 firebase.initializeApp(config);

 var database = firebase.database();




$(document).ready(function() { 


	database.ref().on("child_added", function(snapshot) {
		  console.log(snapshot.val().title);
		  console.log(snapshot.val().venue);
		  console.log(snapshot.val().restName);
		  console.log(snapshot.val().restRate);
		  console.log(snapshot.val().restCity);
		  console.log(snapshot.val().restState);
		$('tbody').append(
			'<tr><td>' + snapshot.val().title +
			'</td><td>' + snapshot.val().venue +
			'</td><td>' + snapshot.val().restName +
			'</td><td>' + snapshot.val().restRate +
			'</td><td>' + snapshot.val().restCity + ', ' + snapshot.val().restState +
			'</td></tr>');




    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

	
	$('#add-event').on('click', function (event) {
		event.preventDefault();
		
		var eventZipInput = $('#event-zip-input').val().trim();
		
		var cityInput = $('#event-city-input').val().trim();
		var stateInput = $('#event-state-input').val().trim();
		
		console.log(eventZipInput);
		// $('#event-location-input').val('');
		$('.search-results').empty();
		$(".restaurant-search").empty();
		$(".alerts").empty();

		$.ajax({
			method:"GET",
			url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY",
			async: true,				  
			data: {
				 radius: "25",
				 unit: 'miles',
				postalCode: eventZipInput,
				city: cityInput,
				stateCode: stateInput
			}

		}).then(function(response2) {

			console.log("ticketmaster Search ");
			console.log(response2);

			console.log("ticketmaster Error Check on _embedded ");
			console.log(response2._embedded);

			// Error checking for _embedded tag on search. If found it will display results.
			// ref: https://stackoverflow.com/questions/3390396/how-to-check-for-undefined-in-javascript
			if (response2._embedded) {

				for (var i = 0; i < response2._embedded.events.length; i++ ) {

					var title = response2._embedded.events[i].name;
					var image = response2._embedded.events[i].images["0"].url;
					var buyTicketsUrl = response2._embedded.events[i].url;
					var venues = response2._embedded.events[i]._embedded.venues["0"].name;						
					var locationLineOne = response2._embedded.events[i]._embedded.venues["0"].address.line1;
					var locationCity = response2._embedded.events[i]._embedded.venues["0"].city.name;
					var locationState = response2._embedded.events[i]._embedded.venues["0"].state.stateCode;
					var date =	moment(response2._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MM/DD/YY");
					var time = moment(response2._embedded.events[i].dates.start.localTime, "hh:mm:ss").format("hh:mm a");
					
					// var row = $('<div class="row">')
					var col = $('<div class="col s12 m6 l3">');
					var card = $('<div class="card small">');

					// <span class="card-title activator grey-text text-darken-4">'+title+'<i class="material-icons right">more_vert</i></span>

					var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+image+'" width="250px" height="250px"><span class="card-title">'+title+'</span></div>');
					var cardContent = $('<div class="card-content"><span class="activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span><p>'+venues+'</p><p>'
							+locationCity+ ', ' + locationState + '</p><p>'+date+' '+time+'</p><div>');

					var cardReveal = $('<div class="card-reveal event-card"> <span class="card-title grey-text text-darken-4" data-eventTitle='+JSON.stringify(title)+'>'+title+
							'<i class="material-icons right">close</i></span><p data-venue='+JSON.stringify(venues)+'>'+venues+'</p><p data-locationLine1='+JSON.stringify(locationLineOne)+'>'+locationLineOne+' '
							+locationCity + ', ' + locationState +'</p> <p data-date='+JSON.stringify(date)+'>'+date+' '+time+'</p><p data-eventUrl='+JSON.stringify(buyTicketsUrl)+'><a href="'+buyTicketsUrl+'" target="_blank">Buy Tickets</a></p></div></div>');   

				// $('#results').append(card.append(cardImg).append(cardContent).append(cardReveal));

					var selectEventButton = $("<button class='btn waves-effect waves-light select-event' value='select' data-eventTitle=" + JSON.stringify(title) + ">Select</button>");
					selectEventButton.attr("data-venue", JSON.stringify(venues)).attr("data-locationLine1", JSON.stringify(locationLineOne));
					selectEventButton.attr("data-date", JSON.stringify(date)).attr("data-time", JSON.stringify(time)).attr("data-eventUrl", JSON.stringify(buyTicketsUrl)).attr("data-eventImage", JSON.stringify(image));

					$('.search-results').append(col.append(card.append(cardImg).append(cardContent).append(cardReveal)));
					card.append(selectEventButton);



				}
				//create restaurant search button
				$(".restaurant-search").append("<button class='btn waves-effect waves-light' id='add-restaurant' value='Next --> Restaurant Search' data-city=" + cityInput + " data-state=" + stateInput + " data-zip=" + eventZipInput + ">Next --> Restaurant Search</button>");
		}
			else { 
				//No search results
				$('.search-results').text("No results. Try a different Zip Code");

				}
				});

	});

	$(document).on("click", ".select-event", function(event){
		$(".alerts").empty();
		var thisEvent = $(this);
		$(".alerts").prepend('<div class="alert alert-primary">You Selected ' + thisEvent.attr("data-eventTitle") + ' at ' + thisEvent.attr("data-venue") + ".</div>");
		eventTitleSelected = thisEvent.attr("data-eventTitle");
		eventVenueSelected = thisEvent.attr("data-venue");
		eventVenueSelected = eventVenueSelected.replace(/^"(.*)"$/, '$1');
//		database.ref().push({
//			title: thisEvent.attr("data-eventTitle"),
//			venue: thisEvent.attr("data-venue")
////			address: thisEvent.attr("data-locationline2")
//		});
		console.log(thisEvent.attr("data-eventTitle"));
		console.log(thisEvent.attr("data-venue"));
	});
	database.ref().on("child_added", function(snapshot) {console.log(snapshot.val().venue);});
$(document).on("click", "#add-restaurant", function(event){
	$(".alerts").empty();
	var restaurantZipInput = $("#add-restaurant").attr("data-zip");
	var restaurantCityInput = $("#add-restaurant").attr("data-city");
	var restaurantStateInput = $("#add-restaurant").attr("data-state");

	//Yelp API
	$.ajax({
		url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
		"crossDomain": true,
		method: "GET",
		data: {
		location: restaurantCityInput + ', ' + restaurantStateInput + ' ' + restaurantZipInput,
		term: 'restaurants'
		},
		headers: {"Authorization" : apiKeyYelp}            

	}).then(function(response) {
		console.log("Yelp Search ");
		console.log(response);

		$('.search-results').empty();

		if(response.businesses){

			for(i = 0; i < response.businesses.length; i++) {
				var restaurantName = response.businesses[i].name;
				var restaurantImage = response.businesses[i].image_url;
				var restaurantRating = response.businesses[i].rating;
				var restaurantAddress1 = response.businesses[i].location.address1;
				var restaurantCity = response.businesses[i].location.city;
				var restaurantState = response.businesses[i].location.state;
				var restaurantPhone = response.businesses[i].phone;
				var yelpRestaurantUrl = response.businesses[i].url;


				var col = $('<div class="col s12 m6 l3">');
				var card = $('<div class="card small">');

				
				var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+restaurantImage+'" width="250px" height="250px"><span class="card-title activator">'+restaurantName+'</span></div>');
				var cardContent = $('<div class="card-content"><span class="activator"><i class="material-icons right">more_vert</i></span><p>Rating: '+restaurantRating+
					' out of 5 Stars</p><p>'+restaurantCity+', '+restaurantState+ '</p><div>');

				var cardReveal = $('<div class="card-reveal restaurant-card"> <span class="card-title grey-text text-darken-4" data-restaurantName='+JSON.stringify(restaurantName)+'>'+restaurantName+
					'<i class="material-icons right">close</i></span><p data-restaurantRating='+JSON.stringify(restaurantRating)+'>Rating: '+restaurantRating+' out of 5 Stars</p><p data-restaurantAddress='
					+JSON.stringify(restaurantAddress1)+'>'+restaurantAddress1+ '</p><p data-restaurantCity='+JSON.stringify(restaurantCity)+'>'+restaurantCity+', '+restaurantState+'</p> <p data-restaurantPhone='
					+JSON.stringify(restaurantPhone)+'>Phone: '+restaurantPhone+'</p><p data-restaurantUrl='+JSON.stringify(yelpRestaurantUrl)+'><a href="'+yelpRestaurantUrl+'" target="_blank">Reviews</a></p></div></div>');   

				//creating select button under each restaurant card and setting the data atrributes to hold the values of the card. We can pass these to the database upon selection
				var selectRestaurantButton = $("<button class='btn waves-effect waves-light select-restaurant' value='select' data-restaurantName=" + JSON.stringify(restaurantName) + ">Select</button>");
				selectRestaurantButton.attr("data-restaurantRating", JSON.stringify(restaurantRating)).attr("data-restaurantAddress", JSON.stringify(restaurantAddress1));
				selectRestaurantButton.attr("data-restaurantCity", JSON.stringify(restaurantCity)).attr("data-restaurantState" , JSON.stringify(restaurantState));
				selectRestaurantButton.attr("data-restaurantPhone", JSON.stringify(restaurantPhone)).attr("data-restaurantUrl", JSON.stringify(yelpRestaurantUrl)).attr("data-restaurantImage", JSON.stringify(restaurantImage));

				//appends the cards and select buttons to the page
				$('.search-results').append(col.append(card.append(cardImg).append(cardContent).append(cardReveal)));
				card.append(selectRestaurantButton);
				
			}
		}
		//gets rid of restaurant search button
		$(".restaurant-search").empty();
		$(".restaurant-search").append("<button class='btn waves-effect waves-light view-selections' value='view-selections'>View Selections</button>");
		
	});		
});
	$(document).on("click", ".select-restaurant", function(event){
		$(".alerts").empty();
		var thisRest = $(this);
		$(".alerts").prepend('<div class="alert alert-primary">You Selected ' + thisRest.attr("data-restaurantName") + ' in ' + thisRest.attr("data-restaurantCity") + ".</div>");
		restaurantNameSelected = thisRest.attr("data-restaurantName");
		restaurantRatingSelected = thisRest.attr("data-restaurantRating");
		restaurantCitySelected = thisRest.attr("data-restaurantCity");
		restaurantStateSelected = thisRest.attr("data-restaurantState");
		restaurantCitySelected = restaurantCitySelected.replace(/^"(.*)"$/, '$1');
		restaurantStateSelected = restaurantStateSelected.replace(/^"(.*)"$/, '$1');
//		database.ref().push({
//			title: thisEvent.attr("data-eventTitle"),
//			venue: thisEvent.attr("data-venue")
////			address: thisEvent.attr("data-locationline2")
//		});
		console.log(thisRest.attr("data-restaurantName"));
		console.log(thisRest.attr("data-restaurantCity"));
	});
// $("document").on("click", function() {
// 	console.log(cardChosen);
// 	console.log("You Got a Card");
// 	cardsChosen.append(cardChosen);
	$(document).on("click", ".view-selections", function() {
		database.ref().push({
			title: eventTitleSelected,
			venue: eventVenueSelected,
			restName: restaurantNameSelected,
			restRate: restaurantRatingSelected,
			restCity: restaurantCitySelected,
			restState: restaurantStateSelected
		});
		$('.search-results').empty();
		$(".restaurant-search").empty();
		$(".alerts").empty();
		
		$(".search-results").html('<div class="col s12 m6"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">' + eventTitleSelected + '</span><p>' + eventVenueSelected + '</p></div></div></div><div class="col s12 m6"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">' + restaurantNameSelected + '</span>    <p>' + restaurantRatingSelected + '</p><p>' + restaurantCitySelected + '</p><p>' + restaurantStateSelected + '</p></div></div></div>');
		
	});
	$(document).on("click", ".jumbotron", function() {});
});
// str = str.replace(/^“(.*)“$/, ‘$1’);
