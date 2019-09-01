import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookApp from "./BookApp";

class App extends React.Component {
    render() {
        return (
            <Router>
                <BookApp />
            </Router>
        );
    }
}

export default App;
