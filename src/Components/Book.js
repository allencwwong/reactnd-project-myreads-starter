import React from "react";
import "../App.css";

class Book extends React.Component {
    render() {
        const { book, bookList } = this.props;
        let bookCover = (book.imageLinks && book.imageLinks.thumbnail) || "";
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${bookCover})`
                            }}
                        />
                        <div className="book-shelf-changer">
                            <select
                                id="bookChanger"
                                defaultValue={book.shelf || "none"}
                                onChange={e =>
                                    this.props.handleClickSelectedBook(
                                        e,
                                        book,
                                        book.id,
                                        bookList
                                    )
                                }
                            >
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author}</div>
                </div>
            </li>
        );
    }
}

export default Book;
