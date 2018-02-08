# The Perfect Night
[https://catalyticstorm.github.io/Project1/index](https://catalyticstorm.github.io/Project1/index)

## The Contributors
* Sarah Stauber – Team Leader, Jscripter
* Anthony Knight – Jscripter, API’s
* Rebecca Brown – Front-End Designer
* Eric Shae – Jscripter, Jscript Compiler, PPT

## What it Solves
This app makes it quick and easy to find a good show to go to, then find a place nearby for a bite to eat.

## What It Does
* Gets City, State and/or Zip from End User
* Pulls Information from Ticketmaster and Yelp, Respectively
* Gets Location-Based Venues from Ticketmaster and Yelp API’s
* Writes Venues to Screen, Awaits End User Response
* After User Responds, Writes Restaurants to Screen, Awaits Response
* Takes User Input and Writes It to Screen, Pushes Information to Firebase for Recent Searches Box on Home Screen

## What It Uses
* Firebase – Stores Other Users’ Searches and Puts Them on Homepage
* Materialize – Makes the Website Pretty, Restaurant/Event Card System
* Bootstrap – Also Makes the Website Pretty, Alerts/Grid System
* Moment.JS – Decrypts Dates and Times Sent from API’s
* Yelp API – Gets the Restaurant Information in the Selected Area
* Ticketmaster API – Gets Information on Events in the Selected Area
* jQuery – Makes it a Lot Easier to Write to HTML Document
* CORS – Uses a Proxy to Enable API Cross-Origin

## How It Works
Displays Event Cards First. User can Click Three Dot Symbol or Click Image for More Information. User Selects Event, Clicks “Next". Before Clicking Next, User Can Change Event

Displays Restaurant Cards
Like Events Page, User can Click Card Image or Three Dot Symbol for More Information
User Selects Restaurant, Clicks “View Selections”
Before Clicking “View Selections” Button, User can Change Restaurant Selection

### Upon Selection, User is Alerted of Selection
