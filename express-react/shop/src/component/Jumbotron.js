import React from "react";
function JumboTron() {
  return (
    <div className="container-fluid p-5 text-center jumbotron">
      <h1 className="display-5 fw-bold text-white">Black Friday</h1>
      <p className="p-3 fs-4 text-center text-white">
        Using a series of utilities, you can create this jumbotron, just like
        the one in previous versions of Bootstrap. Check out the examples below
        for how you can remix and restyle it to your liking.
      </p>
      <button className="btn btn-secondary btn-lg text-white" type="button">
        Example button
      </button>
    </div>
  );
}

export default JumboTron;
