import React from "react";
import "../App.css";

class BookChanger extends React.Component {
    render() {
        const { book, category, bookId, bookList } = this.props;
        return (
            <div className="book-shelf-changer">
                <select
                    id="bookChanger"
                    defaultValue={category}
                    onChange={e =>
                        this.props.handleClickSelectedBook(
                            e,
                            bookList,
                            book,
                            bookId
                        )
                    }
                >
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookChanger;
