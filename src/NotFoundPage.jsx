import {Link} from "react-router-dom";
import React from "react";

export default function NotFoundPage () {
    return (<div>
            <h1>404</h1>
            <p>the link you are looking for seems to have floated off into space!!!!</p>
            <Link to='/'>Return to homepage</Link>
        </div>
    );
}