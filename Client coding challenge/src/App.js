import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      books: [
      ],
      errorMessage: ''
    }
  }

  handleBookGet = ( event ) => {
    event.preventDefault();
    
    const bookName = event.currentTarget.bookName.value;
    console.log(bookName);

    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}+intitle`

    const settings = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }

    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        console.log(responseJSON.items);
        this.setState({
          books : responseJSON.items
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message
        });
      });
  }

  render(){
    return(
      <div>
        <BookForm handleBookGet={this.handleBookGet}/>
        <ul>
          {this.state.books.map((book, index) => {
            return(
              <Book bookTitle={book.volumeInfo.title}
                    bookThumbnail={book.volumeInfo.imageLinks.thumbnail}
                    bookAuthor={book.volumeInfo.authors}
                    bookSnippet={book.searchInfo.textSnippet}/>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default App;
