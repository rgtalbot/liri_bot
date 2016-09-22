# liri_bot

### Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a *Language* Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

----------

### Installation Guide

- Clone or fork the repository to your local machine. From there you will want to use your favorite Terminal Emulator to cd into the folder and run `npm install` to install all the npm packages from the `package.json` file. 
- You will want to then create a `keys.js` file for the twitter key necessary to run the app. Your keys file should look like the one below
~~~~
//twitter Keys
exports.twitterKeys = {
    consumer_key: '<your key here>',
    consumer_secret: '<your key here>',
    access_token_key: '<your key here>',
    access_token_secret: '<your key here>'
}
~~~~
- To get the key you need, you can follow the link below.
    - Twitter: https://apps.twitter.com/app/new

- All that is left to do is run `node liri.js` and enjoy.

--------

### What Each Command Does
1. `node liri.js` - `my-tweets`
		
	* This will show your last 20 tweets and when they were created at in your terminal/bash window.
	
2. `node liri.js` - `spotify-this-song '<song name here>'`

	* This will show the following information about the song in your terminal/bash window
		* Artist(s)
		* The song's name
		* A preview link of the song from Spotify
		* The album that the song is from

	* if no song is provided then your program will default to
		* "The Sign" by Ace of Base
		
3. `node liri.js` - `movie-this '<movie name here>'`

	* This will output the following information to your terminal/bash window:

		* Title of the movie.
		* Year the movie came out.
		* IMDB Rating of the movie.
		* Country where the movie was produced.
		* Language of the movie.
		* Plot of the movie.
		* Actors in the movie.
		* Rotten Tomatoes Rating.
		* Rotten Tomatoes URL.

	* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		* If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
		* It's on Netflix!

4. `node liri.js` - `do-what-it-says`
	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
		* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
		* Feel free to change the text in that document to test out the feature for other commands.


-------

## Copyright
Ryan Talbot (C) 2016. All Rights Reserved.