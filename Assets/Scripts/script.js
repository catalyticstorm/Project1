// JavaScript Document
//===============================
//Credits
//Sarah Stauber: Leader, API's
//Anthony Knight: API's, JScripter
//Rebecca Brown: Front-End
//Eric Shae: JScript Compiler, Court Jesther, Booze & Snacks
//===============================


var cardsChosen = [];

var currentFood = "";
var currentEvent = "";

//Ticketmaster API
var ticketmasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY&postalCode=02910";
var ticketmasterKey = "VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY";
var ticketmasterSecret = "X0iHZkGjS3HUf3Y1";

//Yelp API
var yelpURL = "";
var yelpKey = "SaHLyPn3DYzSLycjffQW8_C7YL2rAN0EJ73tUTKzuE24z5k57agTgg5fqlOCujo3pAYX14RTWmkGag4OfmrzyZuYybKKXxFjmHYgUyi8nHj3mSLrl_rohD7359dvWnYx";
var yelpSecret = "VA711YCfZC8tzofZWEhAVGkUOVHI0TbeddWinQzP9kAkKBrEtaRo9f9EDDGyS6oP";
	
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


function getsearchApi() {
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

database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());
	//WRITE TO RECENT HERE
});

$("#searchButton").on("click", function() {
//	TICKET MASTER API
	$.ajax({
		method:"GET",
		url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=VFqKbEqAQRwPLtAKW0UynnLWlq3YTFkY",
		async: true,
		// dataType: "json",
		data: {
		postalCode: '03801'
	}

	}).then(function(response2) {
		console.log("ticketmaster Search ");
		console.log(response2);
	});
});

$("document").on("click", function() {
	console.log(cardChosen);
	console.log("You Got a Card");
	cardsChosen.append(cardChosen);
});