import React, { useEffect } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

const App = () => {
  useEffect(() => {
    // Init Materialier JS
    M.AutoInit();
  });

  return (
    <div>
      <h1>IT Logger</h1>
    </div>
  );
};

export default App;
