import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import HomeRampUp from "./pages/HomeRampUp/HomeRampUp";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import PrivateRoutes from "./routes/privateRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/homeRampUp" element={<HomeRampUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
