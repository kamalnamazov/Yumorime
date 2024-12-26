import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import Homepage from "./Components/Homepage";
import Layout from "./Components/Layout";
import GlobalStyle from "./Globalstyle";
import Popular from "./Components/Popular";
import Spotlight from "./Components/Spotlight";
import globalContext from "./context/global";

function App() {
  
  return (
    
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    
  );
}

export default App;