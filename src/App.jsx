import React, { useEffect, useRef, useState } from "react";
import Nav from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <Highlights />
    </main>
  );
}

export default App;
