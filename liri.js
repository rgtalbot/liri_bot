//require inquirer
var inquirer = require('inquirer');

//require fs
var fs = require('fs');

//require twitter
var Twitter = require('twitter');

//require spotify
var Spotify = require('spotify-web-api-node');

//require request
var request = require('request');

//require keys.js
var keys = require('./keys.js');

//inquirer prompt to choose a command
inquirer.prompt([
    {
        type: "list",
        message: "Choose Command",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "choice"
    }
]).then(function (prompt) {
    switchFunction(prompt.choice);
});


//function that runs a function depending on the command selected
function switchFunction(expression) {
    switch (expression) {
        case "my-tweets":
            twitter();
            break;
        case "spotify-this-song":
            spotify();
            break;
        case "movie-this":
            movie();
            break;
        case "do-what-it-says":
            itSays();
            break;
        default:
            console.log('invalid entry');
    }
}

//twitter function that pulls your 20 most recent statuses
function twitter() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    client.get('statuses/user_timeline', function (error, tweets) {
        if (error) {
            console.log(error);
        }

        console.log("-------START-------");
        for (var i in tweets) {
            console.log("-------------");
            console.log("Date: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log("Retweeted: " + tweets[i].retweet_count);
            console.log("Favorited: " + tweets[i].favorite_count);
        }

        console.log("--------END-------")

    })
}


//spotify function
function spotify() {


    //prompts the user to enter a song
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter song:',
            name: "song",
            default: parameter
        }

        //once the song is entered, pulls the spotify information
    ]).then(function (song) {
        var spotifyApi = new Spotify({
        });

        spotifyApi.searchTracks(song.song, {limit: 1}).then(function (data) {
            var tracks = data.body.tracks.items;
            console.log("-------START-------");
            for (var i in tracks) {
                console.log("-------------");
                console.log("Artist: " + tracks[i].artists[0].name);
                console.log("Song: " + tracks[i].name);
                console.log("Preview: " + tracks[i].preview_url);
                console.log("Album: " + tracks[i].album.name);
            }
            console.log("--------END-------");
        });
    });
}


//function that runs if they select movie-this
function movie() {

    //prompts the user to enter a movie title
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter movie title: ',
            name: 'title',
            default: movieT
        }
    ]).then(function (movie) {
        console.log(movie.title);


        //pulls information from OMDBApi and console.logs the information.
        var query_url = "http://www.omdbapi.com/?t=" + movie.title + "&y=&plot=long&tomatoes=true&r=json";

        request(query_url, function (error, data, body) {
            if (error) {
                console.log(error)
            }
            console.log("-------START-------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Date: " + JSON.parse(body).Released);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            console.log("--------END-------");

        });
    });
}

// variables for the default searches
var prompt,
    parameter = "The Sign",
    movieT = "Mr. Nobody";


//function that runs what the random.txt says to do.
function itSays() {
    fs.readFile("random.txt", "utf8", function(error, random) {
       var randomTxt = random.split(',');
        prompt = randomTxt[0];
        parameter = randomTxt[1];
        movie = randomTxt[1];
        switchFunction(prompt);
    });
}
