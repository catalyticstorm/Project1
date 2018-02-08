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
var eventUrlSelected;
var eventLongSelected;
var eventLatSelected;
var restaurantNameSelected;
var restaurantRatingSelected;
var restaurantCitySelected;
var restaurantStateSelected;
	

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

	database.ref().limitToLast(10).on("child_added", function(snapshot) {

		$('tbody').prepend(
			'<tr><td>' + snapshot.val().title +
			'</td><td>' + snapshot.val().venue +
			'</td><td>' + snapshot.val().restName +
			'</td><td>' + snapshot.val().restRate +
			'</td><td>' + snapshot.val().restCity + ', ' + snapshot.val().restState +
			'</td></tr>');


    }, function(errorObject) {
      	console.log("Errors handled: " + errorObject.code);
    });

	var pageNumberTicket = 0;
	$('#add-event').on('click', function (event) {
		event.preventDefault();
		
		var eventZipInput = $('#event-zip-input').val().trim();		
		var cityInput = $('#event-city-input').val().trim();
		var stateInput = $('#event-state-input').val().trim();
		var pageNumberTicket = 0;
		var pageNumberRestaurants = 20;

		$('.search-results').empty();
		$(".restaurant-search").empty();
		$(".alerts").empty();

	function ticketMaster () {
		$.ajax({
			method:"GET",
			url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY",
			async: true,				  
			data: {
				radius: "25",
				unit: 'miles',
				postalCode: eventZipInput,
				city: cityInput,
				stateCode: stateInput,
				page: pageNumberTicket

			}

		}).then(function(response2) {
			
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
					var long = response2._embedded.events[i]._embedded.venues["0"].location.longitude;
					var lat = response2._embedded.events[i]._embedded.venues["0"].location.latitude;
					
					
					var col = $('<div class="col s12 m6 l3">');
					var card = $('<div class="card small">');

					
					var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+image+'" width="250px" height="250px"><span class="card-title titleCard activator">'+title+'</span></div>');
					var cardContent = $('<div class="card-content"><span class="activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span><p>'+venues+'</p><p>'
							+locationCity+ ', ' + locationState + '</p><p>'+date+' '+time+'</p><div>');

					var cardReveal = $('<div class="card-reveal event-card"> <span class="card-title grey-text text-darken-4" data-eventTitle='+JSON.stringify(title)+'>'+title+
							'<i class="material-icons right">close</i></span><p data-venue='+JSON.stringify(venues)+'>'+venues+'</p><p data-locationLine1='+JSON.stringify(locationLineOne)+'>'+locationLineOne+' '
							+locationCity + ', ' + locationState +'</p> <p data-date='+JSON.stringify(date)+'>'+date+' '+time+'</p><p data-eventUrl='+JSON.stringify(buyTicketsUrl)+'><a href="'+buyTicketsUrl+'" target="_blank">Buy Tickets</a></p></div></div>');   
			
					var selectEventButton = $("<button class='btn waves-effect waves-light select-event' value='select' data-eventTitle=" + JSON.stringify(title) + ">Select</button>");
					selectEventButton.attr("data-venue", JSON.stringify(venues)).attr("data-locationLine1", JSON.stringify(locationLineOne));
					selectEventButton.attr("data-date", JSON.stringify(date)).attr("data-time", JSON.stringify(time)).attr("data-eventUrl", JSON.stringify(buyTicketsUrl)).attr("data-eventImage", JSON.stringify(image));
					selectEventButton.attr("data-lat", JSON.stringify(lat)).attr("data-long", JSON.stringify(long));
					$('.search-results').append(col.append(card.append(cardImg).append(cardContent).append(cardReveal)));
					card.append(selectEventButton);

				}
				//create more results search button
				$(".restaurant-search").append("<button class='btn waves-effect waves-light float-left' id='more-results-event' value='More Results'>More Results</button>");
				//create restaurant search button
				$(".restaurant-search").append("<button class='btn waves-effect waves-light float-right' id='add-restaurant' value='Next --> Restaurant Search' data-city=" + cityInput + " data-state=" + stateInput + " data-zip=" + eventZipInput + ">Next --> Restaurant Search</button>");
			}
			else { 
					//No search results
					$('.search-results').text("No results. Try a different City, State or Zip Code");

				}
		});
	} // end fun for ticketmaster

	ticketMaster ();
		// more ticketmaster results
		$(document).on("click", '#more-results-event', function() {
			$( "#more-results-event").remove();
			$( "#add-restaurant").remove();
			pageNumberTicket++;
			ticketMaster();

		})
	});

	$(document).on("click", ".select-event", function(event){
		$(".alerts").empty();
		var thisEvent = $(this);
		
		eventTitleSelected = thisEvent.attr("data-eventTitle");
		eventVenueSelected = thisEvent.attr("data-venue");
		eventVenueSelected = eventVenueSelected.replace(/^"(.*)"$/, '$1');
		eventUrlSelected = thisEvent.attr("data-eventUrl");
		eventUrlSelected = eventUrlSelected.replace(/^"(.*)"$/, '$1');
		eventLatSelected = thisEvent.attr("data-lat");
		eventLongSelected = thisEvent.attr("data-long");
		eventLatSelected = eventLatSelected.replace(/^"(.*)"$/, '$1');
		eventLongSelected = eventLongSelected.replace(/^"(.*)"$/, '$1');

		Materialize.toast('You Selected ' + eventTitleSelected + ' at ' + eventVenueSelected + '.', 4000);

	});
	
$(document).on("click", "#add-restaurant", function(event){
	
	Materialize.Toast.removeAll();
	var restaurantZipInput = $("#add-restaurant").attr("data-zip");
	var restaurantCityInput = $("#add-restaurant").attr("data-city");
	var restaurantStateInput = $("#add-restaurant").attr("data-state");
	
	 pageNumberRestaurants = 20;
	$('.search-results').empty();	
	
	//Yelp API
	function yelpSearch () {
	$.ajax({
		url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
		"crossDomain": true,
		method: "GET",
		data: {
			latitude: eventLatSelected,
			longitude: eventLongSelected,
			term: 'restaurants',
			limit: 20,
			offset: pageNumberRestaurants
		},
		headers: {"Authorization" : apiKeyYelp}            

	}).then(function(response) {		

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
				
				var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+restaurantImage+'" width="250px" height="250px"><span class="card-title titleCard activator">'+restaurantName+'</span></div>');
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

		$(".restaurant-search").append("<button class='btn waves-effect waves-light more-selections float-left' value='More Restaurants'>More Restaurants</button>");
		$(".restaurant-search").append("<button class='btn waves-effect waves-light view-selections float-right' value='view-selections'>View Selections</button>");
		pageNumberRestaurants += response.businesses.length;
	});

	} // end yelp search function
	yelpSearch();

	$(document).on("click", '.more-selections', function() {
		
		$('more-selections').remove();
		$('view-selections').remove();
	yelpSearch();

	});


});
	$(document).on("click", ".select-restaurant", function(event){
		$(".alerts").empty();
		var thisRest = $(this);

		restaurantNameSelected = thisRest.attr("data-restaurantName");
		restaurantRatingSelected = thisRest.attr("data-restaurantRating");
		restaurantCitySelected = thisRest.attr("data-restaurantCity");
		restaurantStateSelected = thisRest.attr("data-restaurantState");
		restaurantCitySelected = restaurantCitySelected.replace(/^"(.*)"$/, '$1');
		restaurantStateSelected = restaurantStateSelected.replace(/^"(.*)"$/, '$1');

		Materialize.toast('You Selected ' + restaurantNameSelected + ' in ' + restaurantCitySelected + ', '+ restaurantStateSelected +'.' , 4000);
			

	});

	$(document).on("click", ".view-selections", function() {
		Materialize.Toast.removeAll();
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
		
		$(".search-results").append('<div class="col s12"><h2 class="header">ENJOY !</h2></div>');
		$(".search-results").append('<div class="col s12 m6"><div class="card purple darken-4"><div class="card-content white-text"><span class="card-title">' + eventTitleSelected + '</span><p>' + eventVenueSelected + '</p><p><a href="'+eventUrlSelected+'" target="_blank">Buy Tickets Here</a></p></div></div></div><div class="col s12 m6"><div class="card purple darken-4"><div class="card-content white-text"><span class="card-title">' + restaurantNameSelected + '</span>    <p>Rating: ' + restaurantRatingSelected + ' out of 5</p><p>' + restaurantCitySelected + ', '+restaurantStateSelected+'</p></div></div></div>');
		$(".search-results").append('<iframe src="https://giphy.com/embed/3oFzmjrFPw5vuArQSQ" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/budlight-bud-light-dilly-3oFzmjrFPw5vuArQSQ">via GIPHY</a></p>')
	});
	$(document).on("click", ".jumbotron", function() {location.reload();});	
});
