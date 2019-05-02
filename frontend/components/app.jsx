import React from "react";
// import { Route } from "react-router-dom";
import MainContent from "./main_content";
import Footer from "./footer";

const App = () => (
  <div>
    <main>
      <MainContent />
    </main>
    <footer className="app-footer">
      <Footer />
    </footer>
  </div>
);

export default App;
