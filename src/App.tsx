import React from "react";
import "./App.css";
import FrontPage from "./Containers/FrontPage/FrontPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <FrontPage text="AJT-Checker" />
    </div>
  );
};

export default App;
