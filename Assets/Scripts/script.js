// JavaScript Document
//===============================
//Credits
//Sarah Stauber: Leader, API's
//Anthony Knight: API's, JScripter
//Rebecca Brown: Front-End
//Eric Shae: JScript Compiler, Court Jesther, Booze & Snacks
//===============================


// var cardsChosen = [];

// var currentFood = "";
// var currentEvent = "";

// //Ticketmaster API
// var ticketmasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY&postalCode=02910";
// var ticketmasterKey = "VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY";
// var ticketmasterSecret = "X0iHZkGjS3HUf3Y1";

// //Yelp API
// var yelpURL = "";
// var yelpKey = "SaHLyPn3DYzSLycjffQW8_C7YL2rAN0EJ73tUTKzuE24z5k57agTgg5fqlOCujo3pAYX14RTWmkGag4OfmrzyZuYybKKXxFjmHYgUyi8nHj3mSLrl_rohD7359dvWnYx";
// var yelpSecret = "VA711YCfZC8tzofZWEhAVGkUOVHI0TbeddWinQzP9kAkKBrEtaRo9f9EDDGyS6oP";
	
var corsanywhere = 'https://cors-anywhere.herokuapp.com/';
var queryURLSearchYelp = 'https://api.yelp.com/v3/businesses/search';
var apiKeyYelp = 'Bearer -tcLAnA2QhhU9kQ60q8FVq5k0ltA27gBPn7OJtXxqfXEFWcur_Qm-7DKZGuoM9wKAQPrYa1fDsV4yJHBSHvKdnIAZU5yAMwg_NfJXX3or92lVQQSkpvcULui1wlxWnYx';

// // Initialize Firebase
// var config = {
// 	apiKey: "AIzaSyDNzLkz1J-tdFkbsERtH1DGNOJy-QRDXMY",
// 	authDomain: "dinnermovieapi.firebaseapp.com",
// 	databaseURL: "https://dinnermovieapi.firebaseio.com",
// 	projectId: "dinnermovieapi",
// 	storageBucket: "",
// 	messagingSenderId: "658504571017"
// };
// firebase.initializeApp(config);

// var database = firebase.database();


// function getsearchApi() {
//	//Yelp API
//	$.ajax({
//		url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
//		"crossDomain": true,            
//		method: "GET",
//		data: {
//		location: 'Boston, Ma',
//		term: 'restaurants'
//		},
//		headers: {"Authorization" : apiKeyYelp}            
//
//	}).then(function(response) {
//		console.log("Yelp Search ");
//		console.log(response);
//	});		
//}
//
//function getsearchApiTicketMaster() {
//	$.ajax({
//		method:"GET",
//		url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY",
//		async: true,
//		// dataType: "json",
//		data: {
//		postalCode: '03801'
//	}
//
//	}).then(function(response2) {
//		console.log("ticketmaster Search ");
//		console.log(response2);
//	});
//}

$(document).ready(function() { 

// database.ref().on("child_added", function(snapshot) {
// 	console.log(snapshot.val());
// 	//WRITE TO RECENT HERE
// });

	$('#add-event').on('click', function (event) {
		event.preventDefault();
		
		var eventZipInput = $('#event-zip-input').val().trim();
		
		console.log(eventZipInput);
		// $('#event-location-input').val('');
		$('.search-results').empty();

		$.ajax({
			method:"GET",
			url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY",
			async: true,				  
			data: {
				// radius: "5",
				// unit: 'miles',
				postalCode: eventZipInput,
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
					var locationLineTwo = response2._embedded.events[i]._embedded.venues["0"].address.line2;
					var date =	moment(response2._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MM/DD/YY");
					var time = moment(response2._embedded.events[i].dates.start.localTime, "hh:mm:ss").format("hh:mm a");
					
					// var row = $('<div class="row">')
					var col = $('<div class="col s12 m6 l3">');
					var card = $('<div class="card">')

					var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+image+'" width="250px" height="250px"></div>');
					var cardContent = $('<div class="card-content"><span class="card-title activator grey-text text-darken-4">'+title+'<i class="material-icons right">more_vert</i></span><p>'+venues+'</p><p>'
							+locationLineTwo+'</p><p>'+date+' '+time+'</p><div>');

					var cardReveal = $('<div class="card-reveal event-card"> <span class="card-title grey-text text-darken-4" data-eventTitle='+JSON.stringify(title)+'>'+title+
							'<i class="material-icons right">close</i></span><p data-venue='+JSON.stringify(venues)+'>'+venues+'</p><p data-locationLine1='+JSON.stringify(locationLineOne)+'>'+locationLineOne+' '
							+locationLineTwo+'</p> <p data-date='+JSON.stringify(date)+'>'+date+' '+time+'</p><p data-EventUrl='+JSON.stringify(buyTicketsUrl)+'><a href="'+buyTicketsUrl+'" target="_blank">Buy Tickets</a></p></div></div>');   

				// $('#results').append(card.append(cardImg).append(cardContent).append(cardReveal));

					var selectEventButton = $("<button class='btn btn-primary' id='select-event' value='select' data-eventTitle=" + JSON.stringify(title) + ">Select</button>");

					$('.search-results').append(col.append(card.append(cardImg).append(cardContent).append(cardReveal)));
					card.append(selectEventButton);



				}
				//create restaurant search button
				$(".restaurant-search").append("<button class='btn btn-primary' id='add-restaurant' value='Next --> Restaurant Search' data-zip=" + eventZipInput + ">Next --> Restaurant Search</button>");
			} 	
			else { 
				//No search results
				$('.search-results').text("No results. Try a different Zip Code");

				}
				});

	});

$(document).on("click", "#add-restaurant", function(event){
	
	var restaurantZipInput = $("#add-restaurant").attr("data-zip");

	//Yelp API
	$.ajax({
		url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
		"crossDomain": true,            
		method: "GET",
		data: {
		location: restaurantZipInput,
		term: 'restaurants'
		},
		headers: {"Authorization" : apiKeyYelp}            

	}).then(function(response) {
		console.log("Yelp Search ");
		console.log(response);

		$('.search-results').empty();

		if(response.businesses){

			for(i = 0; i < response.businesses.length; i++){
				var restaurantName = response.businesses[i].name;
				var restaurantImage = response.businesses[i].image_url;
				var restaurantRating = response.businesses[i].rating;
				var restaurantAddress1 = response.businesses[i].location.address1;
				var restaurantCity = response.businesses[i].location.city;
				var restaurantState = response.businesses[i].location.state;
				var restaurantPhone = response.businesses[i].phone;
				var yelpRestaurantUrl = response.businesses[i].url;


				var col = $('<div class="col s12 m6 l3">');
				var card = $('<div class="card">')

				var cardImg = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+restaurantImage+'" width="250px" height="250px"></div>');
				var cardContent = $('<div class="card-content"><span class="card-title activator grey-text text-darken-4">'+restaurantName+'<i class="material-icons right">more_vert</i></span><p>Rating: '+restaurantRating+
					' out of 5 Stars</p><p>'+restaurantCity+', '+restaurantState+ '</p><div>');

				var cardReveal = $('<div class="card-reveal restaurant-card"> <span class="card-title grey-text text-darken-4" data-restaurantName='+JSON.stringify(restaurantName)+'>'+restaurantName+
					'<i class="material-icons right">close</i></span><p data-restaurantRating='+JSON.stringify(restaurantRating)+'>Rating: '+restaurantRating+' out of 5 Stars</p><p data-restaurantAddress='
					+JSON.stringify(restaurantAddress1)+'>'+restaurantAddress1+ '</p><p data-restaurantCity='+JSON.stringify(restaurantCity)+'>'+restaurantCity+', '+restaurantState+'</p> <p data-phone='
					+JSON.stringify(restaurantPhone)+'>Phone: '+restaurantPhone+'</p><p data-restaurantUrl='+JSON.stringify(yelpRestaurantUrl)+'><a href="'+yelpRestaurantUrl+'" target="_blank">Reviews</a></p></div></div>');   

				var selectRestaurantButton = $("<button class='btn btn-primary' id='select-restaurant' value='select' data-restaurantName=" + JSON.stringify(restaurantName) + ">Select</button>");

						$('.search-results').append(col.append(card.append(cardImg).append(cardContent).append(cardReveal)));
						card.append(selectRestaurantButton);
			}
		}

		$(".restaurant-search").empty();
		
	});		
});

// $("document").on("click", function() {
// 	console.log(cardChosen);
// 	console.log("You Got a Card");
// 	cardsChosen.append(cardChosen);
});

// });