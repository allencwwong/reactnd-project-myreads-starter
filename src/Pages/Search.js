import React from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./../Components/Book";
import "../App.css";
import { unwatchFile } from "fs";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        };
    }

    handleChangeSearchTerm = e => {
        let searchTerm = e.target.value;
        if (searchTerm.length > 0) {
            BooksAPI.search(searchTerm).then(bookList => {
                Array.isArray(bookList)
                    ? this.setState({
                          bookList: bookList
                      })
                    : this.setState({
                          bookList: []
                      });
            });
        } else {
            this.setState({
                bookList: []
            });
        }
    };

    render() {
        let bookList = [];
        console.log(this.props.filteredBookList);

        if (this.state.bookList.length > 0) {
            this.state.bookList.forEach(book => {
                book.shelf = "none";
                let bookOnShelf = this.props.filteredBookList.filter(
                    filteredBook => {
                        return filteredBook.id === book.id;
                    }
                );

                bookOnShelf[0] && (book.shelf = bookOnShelf[0].shelf);

                bookList.push(
                    <Book
                        key={book.id}
                        bookId={book.id}
                        book={book}
                        bookList={this.state.bookList}
                        handleClickSelectedBook={
                            this.props.handleClickSelectedBook
                        }
                    />
                );
            });
        } else {
            bookList.push(<div>No result...</div>);
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button
                        onClick={() => this.props.handleClickReturnHome()}
                        className="close-search"
                    >
                        Close
                    </button>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={e => this.handleChangeSearchTerm(e)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{bookList}</ol>
                </div>
            </div>
        );
    }
}

export default Search;
