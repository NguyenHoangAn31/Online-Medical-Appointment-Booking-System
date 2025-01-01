import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Routers from "./route/Routers";
import { useEffect, useState } from "react";
import getUserData from "./route/CheckRouters/token/Token";

function App() {
  return (
    <Router>
      <Routers/>
    </Router>
  )
}

export default App
