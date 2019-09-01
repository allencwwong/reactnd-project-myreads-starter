import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Bookshelf from "./Pages/Bookshelf";
import Search from "./Pages/Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        myBookList: null,
        isBooksLoaded: false
    };

    handleClickSelectedBook = (e, book, bookId) => {
        let selectedShelfCategory = e.target.value,
            myBookList = this.state.myBookList,
            myBook = book;

        if (book.shelf) {
            myBook = myBookList.filter(myBook => {
                return myBook.id === bookId;
            });
            myBook = myBook[0];
        }

        BooksAPI.update(myBook, selectedShelfCategory).then(() => {
            this.setState({
                isBooksLoaded: false
            });
            BooksAPI.getAll().then(books => {
                this.setState({
                    isBooksLoaded: true,
                    myBookList: books
                });
            });
        });
    };

    handleClickSelectedSearchBook = (e, book, bookId, bookList) => {
        console.log(bookId);
        let selectedShelfCategory = e.target.value,
            myBook = bookList.filter(myBook => {
                return myBook.id === bookId;
            });

        console.log(myBook[0], selectedShelfCategory);

        BooksAPI.update(myBook[0], selectedShelfCategory);
    };

    handleClickReturnHome = () => {
        this.props.history.push("/");
    };

    async componentDidMount() {
        // load all book list
        let books = await BooksAPI.getAll();
        this.setState({
            isBooksLoaded: true,
            myBookList: books
        });
    }

    render() {
        let filteredBookList = [];
        if (this.state.isBooksLoaded) {
            this.state.myBookList.forEach(book => {
                filteredBookList.push({
                    id: book.id,
                    shelf: book.shelf
                });
            });
        }

        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    component={props => (
                        <Bookshelf
                            {...props}
                            isBooksLoaded={this.state.isBooksLoaded}
                            myBookList={this.state.myBookList}
                            handleClickSelectedBook={
                                this.handleClickSelectedBook
                            }
                        />
                    )}
                />
                <Route
                    path="/search"
                    component={() => (
                        <Search
                            filteredBookList={filteredBookList}
                            handleClickSelectedBook={
                                this.handleClickSelectedSearchBook
                            }
                            handleClickReturnHome={this.handleClickReturnHome}
                        />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(BooksApp);
