import React from 'react';

function Book( props ){
    return(
        <div>
            <li>
                <div>
                    {props.bookTitle}, {props.bookAuthor}, {props.bookSnippet}
                    <image src={props.bookThumbnail}></image>
                </div>
            </li>
        </div>
    );
}

export default Book;