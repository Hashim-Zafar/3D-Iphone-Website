import React, { useEffect, useRef, useState } from "react";
import Nav from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
}

export default App;
