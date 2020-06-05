const mongoose = require( 'mongoose' );
const actors = require('./actor-model');

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieById : function ( movieID ) {
        return moviesCollection
            .findOne({movie_ID: movieID})
            .populate('actors')
            .then( createdMovie => {
                return createdMovie;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    removeActorFromMovieList : function ( newMovie ) {
        return moviesCollection
            .findByIdAndUpdate({movie_ID: id}, {$set: newMovie}, {$new: true})
            .then(updatedMovie => {
                return updatedMovie;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}

module.exports = {
    Movies
};

