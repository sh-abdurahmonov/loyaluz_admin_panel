import React from "react";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="not-found ">
      <h1 className="error-text">Error 404</h1>
      <h4 className="error-content">
        Woops.Looks like this page doesn't exist
      </h4>
      <a className="link" href="/">
        Go to Home
      </a>
    </div>
  );
}

export default PageNotFound;
