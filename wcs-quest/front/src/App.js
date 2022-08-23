import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./Containers/Index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Index />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
