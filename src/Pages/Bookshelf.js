import React from "react";
import { Link } from "react-router-dom";
import Book from "./../Components/Book";

class Bookshelf extends React.Component {
    render() {
        console.log(this.props.myBookList);
        let bookList = {
            currentlyReading: [],
            wantToRead: [],
            read: []
        };
        if (this.props.isBooksLoaded) {
            this.props.myBookList.forEach(book => {
                bookList[book.shelf].push(
                    <Book
                        key={book.id}
                        book={book}
                        bookList={this.props.myBookList}
                        handleClickSelectedBook={
                            this.props.handleClickSelectedBook
                        }
                    />
                );
            });
        }
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.props.isBooksLoaded ? (
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">
                                    Currently Reading
                                </h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookList.currentlyReading}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">
                                    Want to Read
                                </h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookList.wantToRead}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookList.read}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading Books...</div>
                    )}
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Bookshelf;
