const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const { Movies } = require('./models/movie-model');
const morgan = require('morgan');

const app = express();

// app.use(express.static('public'));
app.use(morgan('dev'));


app.patch('/api/delete-movie-actor/:movie_ID', jsonParser, (req, res) => {
    console.log('Updating movie');
    let pid = req.params.movie_ID;
    let {id, firstName, lastName} = req.body;

    if (!id) {
        req.statusMessage = 'Id is missing in the body of the request.';
        req.errCode = 406;
        return errorHandler(req, res);
    }

    if (Number(pid) !== id) {
        req.statusMessage = 'Id and movie_ID do not match.';
        req.errCode = 409;
        return errorHandler(req, res);
    }

    if (!firstName || !lastName) {
        req.statusMessage = 'You need to send both firstName and lastName of the actor to remove from the movie list.';
        req.errCode = 403;
        return errorHandler(req, res);
    }
    
    Movies
        .getMovieById(id)
        .then(result => {
            if (!result) {
                req.statusMessage = 'The movie do not exist';
                req.errCode = 404;
                return errorHandler(req, res);
            }
            let movie = result
            let newActors = movie.actors.filter(actor => {
                if (actor.firstName !== firstName || actor.lastName !== lastName) {
                    return actor
                }
            });
            movie.actors = newActors;
            return res.status(201).json(result);
        })
        .catch(err => {
            console.log(err)
            req.statusMessage = 'Something went wrong with the database'
            req.errCode = 500;
            return errorHandler(req, res);
        })

    Movies
        .removeActorFromMovieList(movie)
        .then(result => {
            if (!result) {
                req.statusMessage = 'The actor or movie do not exist';
                req.errCode = 404;
                return errorHandler(req, res);
            }
            return res.status(201).json(result);
        })
        .catch(err => {
            req.statusMessage = 'Something went wrong with the database'
            req.errCode = 500;
            return errorHandler(req, res);
        })

})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});