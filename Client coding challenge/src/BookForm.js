import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit={props.handleBookGet}>
            <div>
                <label htmlFor="bookName">
                Book Name:
                </label>
                <input type="text" name="bookName" id="bookName"></input>
            </div>
            <div>
                <button type="submit">
                Submit
                </button>
            </div>
            </form>
        </div>
    );
}

export default BookForm;